import { siteUrl } from "@/config/site";

/**
 * Logo for email headers. Email clients block SVG and need an absolute URL,
 * so this is a small PNG served from the live site. It shows once the file
 * is deployed. Locally it points at production, so it stays broken until then.
 */
export const emailLogoUrl = `${siteUrl}/assets/email-logo.png`;

export const emailLogoHtml = `<img src="${emailLogoUrl}" width="56" height="56" alt="A Certain Woman" style="display:block;width:56px;height:56px;margin:0 0 16px;background:#FAF6EE;border-radius:28px;padding:8px;box-sizing:content-box;border:0" />`;
