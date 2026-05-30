export type ContactEmailData = {
  name: string;
  email?: string;
  phone?: string;
  organization?: string;
  reason: string;
  message: string;
};

export function contactEmailHtml(d: ContactEmailData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  body { margin: 0; padding: 0; background: #FAF6EE; font-family: Georgia, serif; }
  .wrap { max-width: 600px; margin: 0 auto; background: #FAF6EE; }
  .header { background: #1F3D2B; padding: 32px 40px; }
  .header h1 { color: #D4AE6B; font-size: 22px; margin: 0; letter-spacing: 0.04em; font-weight: normal; }
  .header p { color: #F2EADB; font-size: 12px; margin: 6px 0 0; letter-spacing: 0.2em; text-transform: uppercase; }
  .body { padding: 36px 40px; }
  .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.3em; color: #6F6857; margin-bottom: 4px; font-family: Helvetica, sans-serif; }
  .value { font-size: 16px; color: #1F2620; margin: 0 0 24px; padding-bottom: 16px; border-bottom: 1px solid rgba(31,38,32,0.12); }
  .reason-badge { display: inline-block; background: #1F3D2B; color: #FAF6EE; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; padding: 5px 14px; border-radius: 99px; margin: 0 0 24px; font-family: Helvetica, sans-serif; }
  .message { font-size: 15px; line-height: 1.8; color: #3A4138; white-space: pre-wrap; margin: 0; }
  .footer { background: #F2EADB; padding: 20px 40px; text-align: center; font-size: 11px; color: #6F6857; letter-spacing: 0.18em; text-transform: uppercase; font-family: Helvetica, sans-serif; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>A Certain Woman</h1>
    <p>New message received</p>
  </div>
  <div class="body">
    <p class="label">From</p>
    <p class="value">${d.email ? `${d.name} &lt;${d.email}&gt;` : d.name}</p>

    ${d.email ? `<p class="label">Email</p><p class="value">${d.email}</p>` : ""}
    ${d.phone ? `<p class="label">Phone / WhatsApp</p><p class="value">${d.phone}</p>` : ""}
    ${d.organization ? `<p class="label">Organization</p><p class="value">${d.organization}</p>` : ""}

    <p class="label">Reason</p>
    <div><span class="reason-badge">${d.reason}</span></div>

    <p class="label">Message</p>
    <p class="message">${d.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
  </div>
  <div class="footer">Restoring Hearts. Reclaiming Crowns.</div>
</div>
</body>
</html>`;
}

export function contactEmailText(d: ContactEmailData): string {
  return [
    "A CERTAIN WOMAN — New Contact Form Submission",
    "=".repeat(48),
    `Name:    ${d.name}`,
    d.email ? `Email:   ${d.email}` : null,
    d.phone ? `Phone:   ${d.phone}` : null,
    d.organization ? `Org:     ${d.organization}` : null,
    `Reason:  ${d.reason}`,
    "",
    d.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
}
