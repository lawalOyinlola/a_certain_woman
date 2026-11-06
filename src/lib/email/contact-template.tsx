import { escapeHtml as esc } from "./escape";
import {
  emailDocument,
  emailFooterText,
  emailStyle,
} from "./layout";

export type ContactEmailData = {
  name: string;
  email?: string;
  phone?: string;
  organization?: string;
  reason: string;
  message: string;
};

export function contactEmailHtml(d: ContactEmailData): string {
  const label = (text: string) =>
    `<p style="${emailStyle.label}">${text}</p>`;
  const value = (html: string) => `<p style="${emailStyle.value}">${html}</p>`;

  return emailDocument(
    `<div style="${emailStyle.alert}">
    ${label("From")}
    ${value(d.email ? `${esc(d.name)} &lt;${esc(d.email)}&gt;` : esc(d.name))}

    ${d.email ? `${label("Email")}${value(esc(d.email))}` : ""}
    ${d.phone ? `${label("Phone / WhatsApp")}${value(esc(d.phone))}` : ""}
    ${d.organization ? `${label("Organization")}${value(esc(d.organization))}` : ""}

    ${label("Reason")}
    <div><span style="${emailStyle.reasonBadge}">${esc(d.reason)}</span></div>

    ${label("Message")}
    <p style="${emailStyle.message}">${esc(d.message)}</p>
    <p style="margin:32px 0 0;font-size:13px;color:#6F6857;font-family:Helvetica,Arial,sans-serif">${replyHint(d, true)}</p>
  </div>`,
    "New message received",
  );
}

// Tells the team how to answer: hitting reply works when the visitor left an
// email, because the notification carries it as Reply-To.
function replyHint(d: ContactEmailData, html: boolean): string {
  const name = html ? esc(d.name) : d.name;
  return d.email
    ? `Hit reply and your answer goes straight to ${name}.`
    : `${name} left no email, so reach them on the phone number above.`;
}

export function contactEmailText(d: ContactEmailData): string {
  return [
    "A CERTAIN WOMAN: new message from the website",
    "=".repeat(48),
    `Name:    ${d.name}`,
    d.email ? `Email:   ${d.email}` : null,
    d.phone ? `Phone:   ${d.phone}` : null,
    d.organization ? `Org:     ${d.organization}` : null,
    `Reason:  ${d.reason}`,
    "",
    d.message,
    "",
    replyHint(d, false),
    "",
    "--",
    emailFooterText,
  ]
    .filter((l) => l !== null)
    .join("\n");
}
