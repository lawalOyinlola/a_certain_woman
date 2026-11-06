import { escapeHtml as esc } from "./escape";
import { emailDocument, emailFooterText, emailStyle } from "./layout";

type Subscriber = { email?: string; phone?: string };

// The welcome email can be skipped or fail, so this does not say it arrived.
// Phone-only subscribers have no address to write to.
function note(hasEmail: boolean): string {
  return hasEmail
    ? "Add them to the mailing list before the next dispatch."
    : "They signed up with a phone number only, so no email went out to them. A WhatsApp message or a call is a good way to welcome them.";
}

export function newsletterEmailHtml({ email, phone }: Subscriber): string {
  const label = email ? "Email address" : "WhatsApp / Phone";
  const value = email ?? phone ?? "";

  return emailDocument(
    `<div style="${emailStyle.alert}">
    <p style="${emailStyle.label}">${label}</p>
    <p style="margin:0 0 8px;font-size:18px;color:#1F2620">${esc(value)}</p>
    <p style="${emailStyle.note}">${note(Boolean(email))}</p>
  </div>`,
    "New newsletter subscriber",
  );
}

export function newsletterEmailText({ email, phone }: Subscriber): string {
  const label = email ? "Email" : "WhatsApp / Phone";
  const value = email ?? phone ?? "";
  return `A CERTAIN WOMAN: new newsletter subscriber\n${"=".repeat(44)}\n\n${label}: ${value}\n\n${note(Boolean(email))}\n\n--\n${emailFooterText}`;
}
