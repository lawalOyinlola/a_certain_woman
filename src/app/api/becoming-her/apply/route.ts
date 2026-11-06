import { NextResponse } from "next/server";
import { contact } from "@/config/site";
import {
  applicationsDryRun,
  applicationsOverride,
  getApplicationStatus,
} from "@/lib/data/becoming-her";
import { MIN_FILL_SECONDS } from "@/lib/becoming-her/application";
import { validateApplication } from "@/lib/becoming-her/validate";
import {
  buildSubmissionXml,
  isKoboConfigured,
  submitToKobo,
} from "@/lib/becoming-her/kobo";
import {
  becomingHerHtml,
  becomingHerSubject,
  becomingHerText,
} from "@/lib/email/becoming-her-template";
import { getMailer } from "@/lib/email/mailer";
import { clientKey, rateLimit, tooManyRequests } from "@/lib/rate-limit";

/**
 * POST /api/becoming-her/apply
 *
 * Takes one application, writes it into the KoboToolbox form, and emails the
 * team a short notice: BECOMING_HER_TO_EMAIL, with BECOMING_HER_CC_EMAIL in
 * copy (both default to the public info address; the copy is dropped when it
 * is the same inbox). The application counts as received when at least one of
 * the two succeeds. When Kobo fails, the email carries the full application
 * so the team can enter it by hand.
 *
 * Nothing about the applicant is logged: only the reference and error text.
 */

// Per client address. Generous on purpose: a school computer lab or a cyber
// café can put many applicants behind one address. See src/lib/rate-limit.ts
// for the limits of an in-memory store.
const PER_CLIENT = { name: "becoming-her-apply", max: 20, windowMs: 60 * 60_000 };

// The longest valid body is about 9 KB of text; anything far past it is not
// a real application.
const MAX_BODY_BYTES = 32 * 1024;

const GENERIC_ERROR = "We could not send your application. Please try again.";

function emailRecipients() {
  const to = process.env.BECOMING_HER_TO_EMAIL?.trim() || contact.email;
  const cc = process.env.BECOMING_HER_CC_EMAIL?.trim() || contact.email;
  // No copy when it would go to the same inbox as the main address.
  return { to, cc: cc.toLowerCase() === to.toLowerCase() ? undefined : cc };
}

export async function POST(req: Request) {
  const now = Date.now();

  const status = getApplicationStatus(now, applicationsOverride());
  if (status !== "open") {
    return NextResponse.json(
      { error: "Applications are not open right now." },
      { status: 403 },
    );
  }

  // Validate everything, send nothing: local testing (BECOMING_HER_DRY_RUN)
  // and, TEMPORARILY, every Vercel preview deployment.
  const dryRun = applicationsDryRun();

  const mailer = getMailer();
  const recipients = emailRecipients();
  const canEmail = Boolean(mailer && recipients);
  const canKobo = isKoboConfigured();
  if (!dryRun && !canEmail && !canKobo) {
    console.error(
      "BecomingHER: no destination. Set KOBO_API_TOKEN, or BECOMING_HER_TO_EMAIL with the SMTP variables.",
    );
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 503 });
  }

  const limit = rateLimit(PER_CLIENT, clientKey(req));
  if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Application too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Application too large." }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = validateApplication(body, now);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const app = result.data;

  const instanceId = `uuid:${crypto.randomUUID()}`;
  const reference = instanceId.slice(5, 13).toUpperCase();

  // Bots: the honeypot was filled, or the whole form took a few seconds.
  // Answer as if it worked, so the bot learns nothing, and send nothing.
  const tooFast = app.elapsed_ms < MIN_FILL_SECONDS * 1000;
  if (app.website || tooFast) {
    return NextResponse.json({ ok: true, reference });
  }

  if (dryRun) {
    console.info(`BecomingHER ${reference}: dry run, nothing sent.`);
    return NextResponse.json({ ok: true, reference });
  }

  let savedToKobo = false;
  if (canKobo) {
    try {
      await submitToKobo(buildSubmissionXml(app, instanceId, new Date(now)));
      savedToKobo = true;
    } catch (err) {
      console.error(
        `BecomingHER ${reference}: Kobo submission failed:`,
        err instanceof Error ? err.message : "unknown error",
      );
    }
  }

  let emailed = false;
  if (mailer && recipients) {
    try {
      await mailer.transport.sendMail({
        from: mailer.alertFrom,
        to: recipients.to,
        cc: recipients.cc,
        subject: becomingHerSubject(app, savedToKobo),
        html: becomingHerHtml(app, reference, savedToKobo),
        text: becomingHerText(app, reference, savedToKobo),
      });
      emailed = true;
    } catch (err) {
      console.error(
        `BecomingHER ${reference}: email failed:`,
        err instanceof Error ? err.message : "unknown error",
      );
    }
  }

  if (!savedToKobo && !emailed) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }
  return NextResponse.json({ ok: true, reference });
}
