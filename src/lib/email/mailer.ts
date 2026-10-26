import nodemailer, { type Transporter } from "nodemailer";

type Mailer = {
  transport: Transporter;
  from: { name: string; address: string };
  to: string;
};

let cached: Mailer | null = null;

/**
 * SMTP transport, sender and recipient, built on first use rather than at
 * module load, so `next build` needs no credentials. Returns null when
 * SMTP_USER, SMTP_PASS or CONTACT_TO_EMAIL is missing; callers answer 503.
 *
 * The mailbox is hosted at Hostinger, so the defaults are Hostinger's:
 * smtp.hostinger.com on port 465 (implicit TLS). SMTP_USER signs in.
 * SMTP_FROM is the optional sender address (an alias of that mailbox) and
 * SMTP_FROM_NAME its display name. Hostinger may reject a From that is not
 * the mailbox or one of its aliases; the logged SMTP reply says so.
 */
export function getMailer(): Mailer | null {
  if (cached) return cached;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!user || !pass || !to) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);
  cached = {
    transport: nodemailer.createTransport({
      host: process.env.SMTP_HOST?.trim() || "smtp.hostinger.com",
      port,
      // 465 is implicit TLS. Any other port (587) upgrades with STARTTLS.
      secure: port === 465,
      requireTLS: port !== 465,
      auth: { user, pass },
      // A form request must not hang until the platform kills it.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    }),
    from: {
      name: process.env.SMTP_FROM_NAME || "A Certain Woman",
      address: process.env.SMTP_FROM || user,
    },
    to,
  };
  return cached;
}
