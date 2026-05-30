import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod/v4";
import {
  contactEmailHtml,
  contactEmailText,
} from "@/lib/email/contact-template";

const resend = new Resend(process.env.RESEND_API_KEY);

function strip(value: string): string {
  return value
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[\x00-\x1F\x7F]/g, "") // strip control chars
    .trim()
    .slice(0, 2000);
}

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
  try {
    const body = await req.json();

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
      const firstIssue = result.error.issues[0]?.message ?? "Invalid submission.";
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    const data = result.data;

    await resend.emails.send({
      from: `A Certain Woman <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: data.email ?? undefined,
      subject: `[ACW Contact] ${data.reason} — ${data.name}`,
      html: contactEmailHtml(data),
      text: contactEmailText(data),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
