export function newsletterEmailHtml(email: string): string {
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
  .value { font-size: 18px; color: #1F2620; margin: 0 0 8px; }
  .note { font-size: 14px; color: #6F6857; margin: 20px 0 0; font-family: Helvetica, sans-serif; }
  .footer { background: #F2EADB; padding: 20px 40px; text-align: center; font-size: 11px; color: #6F6857; letter-spacing: 0.18em; text-transform: uppercase; font-family: Helvetica, sans-serif; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>A Certain Woman</h1>
    <p>New newsletter subscriber</p>
  </div>
  <div class="body">
    <p class="label">Email address</p>
    <p class="value">${email}</p>
    <p class="note">Add this address to your mailing list.</p>
  </div>
  <div class="footer">Restoring Hearts. Reclaiming Crowns.</div>
</div>
</body>
</html>`;
}

export function newsletterEmailText(email: string): string {
  return `A CERTAIN WOMAN — New Newsletter Subscriber\n${"=".repeat(44)}\n\n${email}\n\nAdd this address to your mailing list.`;
}
