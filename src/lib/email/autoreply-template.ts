import { escapeHtml as esc } from "./escape";
import { emailLogoHtml } from "./layout";

type AutoReply = { name: string; reason: string };

export const AUTOREPLY_SUBJECT = "We received your message | A Certain Woman";

export function autoReplyHtml({ name, reason }: AutoReply): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  body { margin: 0; padding: 0; background: #FAF6EE; font-family: Georgia, serif; }
  .wrap { max-width: 600px; margin: 0 auto; background: #FAF6EE; }
  .header { background: #1F3D2B; padding: 32px 40px; }
  .header h1 { color: #D4AE6B; font-size: 22px; margin: 0; letter-spacing: 0.04em; font-weight: normal; }
  .body { padding: 36px 40px; font-size: 16px; line-height: 1.8; color: #3A4138; }
  .body p { margin: 0 0 18px; }
  .footer { background: #F2EADB; padding: 20px 40px; text-align: center; font-size: 11px; color: #6F6857; letter-spacing: 0.18em; text-transform: uppercase; font-family: Helvetica, sans-serif; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    ${emailLogoHtml}
    <h1>A Certain Woman</h1>
  </div>
  <div class="body">
    <p>Dear ${esc(name)},</p>
    <p>We received your message about <strong>${esc(reason)}</strong>. A member of our team will reply to you shortly.</p>
    <p>This is an automatic message. You can reply to this email if you want to add anything.</p>
    <p>With warmth,<br />A Certain Woman</p>
  </div>
  <div class="footer">Restoring Hearts. Reclaiming Crowns.</div>
</div>
</body>
</html>`;
}

export function autoReplyText({ name, reason }: AutoReply): string {
  return `Dear ${name},

We received your message about ${reason}. A member of our team will reply to you shortly.

This is an automatic message. You can reply to this email if you want to add anything.

With warmth,
A Certain Woman`;
}
