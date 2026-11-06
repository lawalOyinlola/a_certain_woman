import { siteUrl } from "@/config/site";

/**
 * Logo for email headers. Email clients block SVG and need an absolute URL,
 * so this is a small PNG served from the live site. It shows once the file
 * is deployed. Locally it points at production, so it stays broken until then.
 */
export const emailLogoUrl = `${siteUrl}/assets/email-logo.png`;

export const emailLogoHtml = `<img src="${emailLogoUrl}" width="56" height="56" alt="A Certain Woman" style="display:block;width:56px;height:56px;margin:0 0 16px;background:#FAF6EE;border-radius:28px;padding:8px;box-sizing:content-box;border:0" />`;

const siteHost = siteUrl.replace(/^https?:\/\//, "");

const sans = "Helvetica,Arial,sans-serif";

/**
 * Every style is inline on purpose. Gmail drops a <style> block in several
 * cases (accounts read over IMAP/POP in the Gmail app, forwarded mail, a block
 * it cannot parse), and the email then shows as unstyled text. Inline styles
 * survive all of those.
 */
export const emailStyle = {
  body: `margin:0;padding:0;background:#FAF6EE;font-family:Georgia,serif`,
  wrap: `max-width:600px;margin:0 auto;background:#FAF6EE`,
  header: `background:#1F3D2B;padding:32px 40px`,
  title: `margin:0;color:#D4AE6B;font-size:22px;letter-spacing:0.04em;font-weight:normal;font-family:Georgia,serif`,
  headerNote: `margin:6px 0 0;color:#F2EADB;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;font-family:${sans}`,
  footer: `background:#F2EADB;padding:20px 40px;text-align:center;font-size:11px;color:#6F6857;letter-spacing:0.18em;text-transform:uppercase;font-family:${sans};line-height:2`,
  /** Plain letter body: the visitor-facing emails. */
  letter: `padding:36px 40px;font-size:16px;line-height:1.8;color:#3A4138;font-family:Georgia,serif`,
  letterParagraph: `margin:0 0 18px`,
  /** Alert body: the team-facing emails. */
  alert: `padding:36px 40px;font-family:Georgia,serif`,
  label: `margin:16px 0 4px;font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#6F6857;font-family:${sans}`,
  value: `margin:0 0 24px;padding-bottom:16px;font-size:16px;color:#1F2620;border-bottom:1px solid #DDDBD3`,
  note: `margin:20px 0 0;font-size:14px;color:#6F6857;font-family:${sans}`,
  reasonBadge: `display:inline-block;margin:0 0 24px;padding:5px 14px;background:#1F3D2B;color:#FAF6EE;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;border-radius:99px;font-family:${sans}`,
  message: `margin:0;font-size:15px;line-height:1.8;color:#3A4138;white-space:pre-wrap`,
};

/** Footer shared by every email: the tagline and a link to the site. */
export const emailFooterHtml = `<div style="${emailStyle.footer}">Restoring Hearts. Reclaiming Crowns.<br /><a href="${siteUrl}" style="color:#1F3D2B;text-decoration:none;letter-spacing:0.12em">${siteHost}</a></div>`;

export const emailFooterText = `Restoring Hearts. Reclaiming Crowns.\n${siteUrl}`;

/**
 * The page shared by every email: header with logo, the given body, footer.
 * `headerNote` is trusted markup, not visitor input.
 */
export function emailDocument(body: string, headerNote?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="${emailStyle.body}">
<div style="${emailStyle.wrap}">
  <div style="${emailStyle.header}">
    ${emailLogoHtml}
    <h1 style="${emailStyle.title}">A Certain Woman</h1>
    ${headerNote ? `<p style="${emailStyle.headerNote}">${headerNote}</p>` : ""}
  </div>
  ${body}
  ${emailFooterHtml}
</div>
</body>
</html>`;
}

/** Inline call to action for the visitor-facing emails. */
export const eventsUrl = `${siteUrl}/events`;
export const linkStyle = "color:#B6914A;text-decoration:underline";
