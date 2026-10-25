import { NextResponse } from "next/server";
import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod/v4";
import {
  newsletterEmailHtml,
  newsletterEmailText,
} from "@/lib/email/newsletter-template";
import { getMailer } from "@/lib/email/resend";

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim();
}

function sanitizePhone(raw: string): string {
  return stripHtml(raw)
    .replace(/[^\d+]/g, "")
    .replace(/(?!^)\+/g, "")
    .slice(0, 20);
}

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
      "Email is not configured: set RESEND_API_KEY, RESEND_FROM_EMAIL and CONTACT_TO_EMAIL.",
    );
    return NextResponse.json(
      { error: "Could not subscribe. Please try again." },
      { status: 503 },
    );
  }

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

    const { error } = await mailer.resend.emails.send({
      from: `A Certain Woman <${mailer.from}>`,
      to: mailer.to,
      subject: `[ACW Newsletter] New subscriber: ${email ?? phone}`,
      html: newsletterEmailHtml({ email, phone }),
      text: newsletterEmailText({ email, phone }),
    });

    if (error) {
      console.error("Resend failed to send newsletter email:", error);
      return NextResponse.json(
        { error: "Could not subscribe. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not subscribe. Please try again." },
      { status: 500 },
    );
  }
}
