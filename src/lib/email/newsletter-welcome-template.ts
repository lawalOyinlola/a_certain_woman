import {
  emailFooterHtml,
  emailFooterText,
  emailLogoHtml,
  eventsUrl,
  linkStyle,
} from "./layout";

export const WELCOME_SUBJECT = "You're on the list | A Certain Woman";

export function newsletterWelcomeHtml(): string {
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
  .footer { background: #F2EADB; padding: 20px 40px; text-align: center; font-size: 11px; color: #6F6857; letter-spacing: 0.18em; text-transform: uppercase; font-family: Helvetica, sans-serif; line-height: 2; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    ${emailLogoHtml}
    <h1>A Certain Woman</h1>
  </div>
  <div class="body">
    <p>Dear friend,</p>
    <p>Thank you for joining us. Your address is now on our mailing list.</p>
    <p>Our letters come quietly and not too often: a word of encouragement, news from the sisterhood, and an invitation to the next gathering. Your first one will arrive with our next dispatch.</p>
    <p>Until then, see what is coming up on our <a href="${eventsUrl}" style="${linkStyle}">events page</a>.</p>
    <p>With warmth,<br />A Certain Woman</p>
  </div>
  ${emailFooterHtml}
</div>
</body>
</html>`;
}

export function newsletterWelcomeText(): string {
  return `Dear friend,

Thank you for joining us. Your address is now on our mailing list.

Our letters come quietly and not too often: a word of encouragement, news from the sisterhood, and an invitation to the next gathering. Your first one will arrive with our next dispatch.

Until then, see what is coming up on our events page:
${eventsUrl}

With warmth,
A Certain Woman

--
${emailFooterText}`;
}
