import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod/v4";
import {
  newsletterEmailHtml,
  newsletterEmailText,
} from "@/lib/email/newsletter-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  email: z.email("Please enter a valid email address"),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const body =
      raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};

    const sanitized = {
      email:
        typeof body.email === "string"
          ? body.email
              .replace(/<[^>]*>/g, "")
              .trim()
              .slice(0, 320)
          : "",
    };

    const result = schema.safeParse(sanitized);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const { email } = result.data;

    const { error } = await resend.emails.send({
      from: `A Certain Woman <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `[ACW Newsletter] New subscriber: ${email}`,
      html: newsletterEmailHtml(email),
      text: newsletterEmailText(email),
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
