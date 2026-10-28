import { NextResponse } from "next/server";
import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod/v4";
import {
  newsletterEmailHtml,
  newsletterEmailText,
} from "@/lib/email/newsletter-template";
import {
  WELCOME_SUBJECT,
  newsletterWelcomeHtml,
  newsletterWelcomeText,
} from "@/lib/email/newsletter-welcome-template";
import { getMailer } from "@/lib/email/mailer";
import {
  PER_RECIPIENT,
  clientKey,
  rateLimit,
  tooManyRequests,
} from "@/lib/rate-limit";

// Normalises only. HTML is escaped where it is used (src/lib/email/escape.ts).
function stripHtml(value: string): string {
  return value
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim();
}

function sanitizePhone(raw: string): string {
  return stripHtml(raw)
    .replace(/[^\d+]/g, "")
    .replace(/(?!^)\+/g, "")
    .slice(0, 20);
}

// Per client address. See src/lib/rate-limit.ts for the limits of an
// in-memory store.
const PER_CLIENT = { name: "newsletter-ip", max: 5, windowMs: 10 * 60_000 };

const schema = z
  .object({
    email: z.string().optional(),
    phone: z.string().optional(),
  })
  .check((ctx) => {
    const { email, phone } = ctx.value;

    if (!email && !phone) {
      ctx.issues.push({
        code: "custom",
        message: "Please provide an email address or phone number.",
        path: ["contact"],
        input: undefined,
      });
      return;
    }

    if (email && !z.email().safeParse(email).success) {
      ctx.issues.push({
        code: "custom",
        message: "Please enter a valid email address.",
        path: ["email"],
        input: email,
      });
    }

    if (phone && (!/^\+\d{7,15}$/.test(phone) || !isValidPhoneNumber(phone))) {
      ctx.issues.push({
        code: "custom",
        message: "Please enter a valid phone number with country code.",
        path: ["phone"],
        input: phone,
      });
    }
  });

export async function POST(req: Request) {
  const mailer = getMailer();
  if (!mailer) {
    console.error(
      "Email is not configured: set SMTP_USER, SMTP_PASS and CONTACT_TO_EMAIL.",
    );
    return NextResponse.json(
      { error: "Could not subscribe. Please try again." },
      { status: 503 },
    );
  }

  const client = rateLimit(PER_CLIENT, clientKey(req));
  if (!client.ok) return tooManyRequests(client.retryAfterSeconds);

  try {
    const raw = await req.json();
    const body =
      raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};

    const sanitized = {
      email:
        typeof body.email === "string"
          ? stripHtml(body.email).slice(0, 320)
          : undefined,
      phone:
        typeof body.phone === "string" ? sanitizePhone(body.phone) : undefined,
    };

    // Drop empty strings so the "at least one" check works correctly
    if (sanitized.email === "") sanitized.email = undefined;
    if (sanitized.phone === "") sanitized.phone = undefined;

    const result = schema.safeParse(sanitized);

    if (!result.success) {
      const firstIssue =
        result.error.issues[0]?.message ?? "Invalid submission.";
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    const { email, phone } = result.data;

    try {
      await mailer.transport.sendMail({
        from: mailer.alertFrom,
        to: mailer.to,
        subject: `[ACW Newsletter] New subscriber: ${email ?? phone}`,
        html: newsletterEmailHtml({ email, phone }),
        text: newsletterEmailText({ email, phone }),
      });
    } catch (err) {
      // Log the SMTP reply, never the transport config (it holds the password).
      console.error(
        "SMTP failed to send newsletter email:",
        err instanceof Error ? err.message : err,
      );
      return NextResponse.json(
        { error: "Could not subscribe. Please try again." },
        { status: 502 },
      );
    }

    // Welcome the subscriber. Skipped for phone-only signups, or when that
    // address already got its allowance this hour. Spent after the team was
    // notified, so a failed send does not use it up. A failure here is logged,
    // not returned: the team already has the signup.
    if (email && rateLimit(PER_RECIPIENT, email.toLowerCase()).ok) {
      try {
        await mailer.transport.sendMail({
          from: mailer.from,
          to: email,
          subject: WELCOME_SUBJECT,
          html: newsletterWelcomeHtml(),
          text: newsletterWelcomeText(),
          headers: { "Auto-Submitted": "auto-replied" },
        });
      } catch (err) {
        console.error(
          "SMTP failed to send newsletter welcome:",
          err instanceof Error ? err.message : err,
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not subscribe. Please try again." },
      { status: 500 },
    );
  }
}
