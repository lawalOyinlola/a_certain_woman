import { NextResponse } from "next/server";
import { z } from "zod/v4";
import {
  contactEmailHtml,
  contactEmailText,
} from "@/lib/email/contact-template";
import {
  AUTOREPLY_SUBJECT,
  autoReplyHtml,
  autoReplyText,
} from "@/lib/email/autoreply-template";
import { getMailer } from "@/lib/email/mailer";
import { clientKey, rateLimit, tooManyRequests } from "@/lib/rate-limit";

// Normalises only. HTML is escaped where it is used (src/lib/email/escape.ts),
// not removed here: removing tags corrupts real input such as "a < b".
function strip(value: string): string {
  return value
    .replace(/[\x00-\x1F\x7F]/g, "") // strip control chars
    .trim()
    .slice(0, 2000);
}

// Per client address, so one visitor cannot flood the inbox. Per recipient of
// the auto-reply, so nobody can use the form to mail a stranger repeatedly.
// The recipient limit only skips the auto-reply: the team still gets the
// message. See src/lib/rate-limit.ts for the limits of an in-memory store.
const PER_CLIENT = { name: "contact-ip", max: 5, windowMs: 10 * 60_000 };
const PER_RECIPIENT = { name: "contact-recipient", max: 2, windowMs: 60 * 60_000 };

const schema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().optional(),
    phone: z.string().optional(),
    organization: z.string().optional(),
    reason: z.string().min(1, "Please select a reason"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  })
  .check((ctx) => {
    if (!ctx.value.email && !ctx.value.phone) {
      ctx.issues.push({
        code: "custom",
        message: "Please provide at least an email address or phone number.",
        path: ["email"],
        input: ctx.value.email,
      });
    }
    if (ctx.value.email && !z.email().safeParse(ctx.value.email).success) {
      ctx.issues.push({
        code: "custom",
        message: "Invalid email address.",
        path: ["email"],
        input: ctx.value.email,
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
      { error: "Failed to send message. Please try again." },
      { status: 503 },
    );
  }

  const client = rateLimit(PER_CLIENT, clientKey(req));
  if (!client.ok) return tooManyRequests(client.retryAfterSeconds);

  try {
    const raw = await req.json();
    const body =
      raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};

    // Sanitize all string fields before validation
    const sanitized = {
      name: typeof body.name === "string" ? strip(body.name) : "",
      email: typeof body.email === "string" ? strip(body.email) : undefined,
      phone: typeof body.phone === "string" ? strip(body.phone) : undefined,
      organization:
        typeof body.organization === "string"
          ? strip(body.organization)
          : undefined,
      reason: typeof body.reason === "string" ? strip(body.reason) : "",
      message: typeof body.message === "string" ? strip(body.message) : "",
    };

    const result = schema.safeParse(sanitized);

    if (!result.success) {
      const firstIssue =
        result.error.issues[0]?.message ?? "Invalid submission.";
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    const data = result.data;

    try {
      await mailer.transport.sendMail({
        from: mailer.from,
        to: mailer.to,
        replyTo: data.email ?? undefined,
        subject: `[ACW Contact] ${data.reason} — ${data.name}`,
        html: contactEmailHtml(data),
        text: contactEmailText(data),
      });
    } catch (err) {
      // Log the SMTP reply, never the transport config (it holds the password).
      console.error(
        "SMTP failed to send contact email:",
        err instanceof Error ? err.message : err,
      );
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      );
    }

    // Acknowledge the sender. Skipped when no email was given (phone only), or
    // when that address already got its allowance this hour. The allowance is
    // spent here, after the team was notified, so a failed send does not use
    // it up. The team already has the message, so a failure here is logged,
    // not returned. Auto-Submitted stops other auto-responders from replying
    // back.
    if (data.email && rateLimit(PER_RECIPIENT, data.email.toLowerCase()).ok) {
      try {
        await mailer.transport.sendMail({
          from: mailer.from,
          to: data.email,
          subject: AUTOREPLY_SUBJECT,
          html: autoReplyHtml(data),
          text: autoReplyText(data),
          headers: { "Auto-Submitted": "auto-replied" },
        });
      } catch (err) {
        console.error(
          "SMTP failed to send auto-reply:",
          err instanceof Error ? err.message : err,
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
