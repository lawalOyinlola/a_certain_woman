import { siteUrl } from "@/config/site";

/**
 * Logo for email headers. Email clients block SVG and need an absolute URL,
 * so this is a small PNG served from the live site. It shows once the file
 * is deployed. Locally it points at production, so it stays broken until then.
 */
export const emailLogoUrl = `${siteUrl}/assets/email-logo.png`;

export const emailLogoHtml = `<img src="${emailLogoUrl}" width="56" height="56" alt="A Certain Woman" style="display:block;width:56px;height:56px;margin:0 0 16px;background:#FAF6EE;border-radius:28px;padding:8px;box-sizing:content-box;border:0" />`;

const siteHost = siteUrl.replace(/^https?:\/\//, "");

/** Footer shared by every email: the tagline and a link to the site. */
export const emailFooterHtml = `<div class="footer">Restoring Hearts. Reclaiming Crowns.<br /><a href="${siteUrl}" style="color:#1F3D2B;text-decoration:none;letter-spacing:0.12em">${siteHost}</a></div>`;

export const emailFooterText = `Restoring Hearts. Reclaiming Crowns.\n${siteUrl}`;

/** Inline call to action for the visitor-facing emails. */
export const eventsUrl = `${siteUrl}/events`;
export const linkStyle = "color:#B6914A;text-decoration:underline";
