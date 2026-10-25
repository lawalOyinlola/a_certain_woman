import { Resend } from "resend";

type Mailer = { resend: Resend; from: string; to: string };

let cached: Mailer | null = null;

/**
 * Resend client plus sender and recipient, built on first use rather than at
 * module load. The Resend constructor throws without an API key, and Next
 * evaluates route modules during `next build`, so a module-level client made
 * every build (CI included) depend on production credentials. Returns null
 * when any of the three env vars is missing; callers answer 503.
 */
export function getMailer(): Mailer | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !from || !to) return null;
  cached = { resend: new Resend(key), from, to };
  return cached;
}
