/**
 * Single source of truth for site-wide constants: canonical URL, brand
 * tagline, and contact/social details. Import from here instead of
 * re-declaring these values per file, so SEO, footer, contact page, and
 * email templates stay consistent.
 */

// Canonical host is the www apex (acertainwoman.org 308-redirects to www).
// Trailing slash stripped so `${siteUrl}${path}` never double-slashes.
const FALLBACK_SITE_URL = "https://www.acertainwoman.org";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL
).replace(/\/+$/, "");

export const siteName = "A Certain Woman";
export const siteTagline = "Restoring Hearts. Reclaiming Crowns.";
export const menTagline =
  "Restoring Strength. Redefining Manhood. Building Legacy.";
export const founderName = "Namaari Inanna Kargbo";

export const contact = {
  email: "info@acertainwoman.org",
  location: "Freetown, Sierra Leone",
  phoneDisplay: "+232 79 609125",
  phoneE164: "+23279609125",
  // wa.me wants digits only (country code + number, no '+').
  whatsappUrl: "https://wa.me/23279609125",
} as const;

export const mailtoHref = `mailto:${contact.email}`;
export const telHref = `tel:${contact.phoneE164}`;

type Social = { label: string; handle: string; url: string };

export const socials = {
  instagram: {
    label: "Instagram",
    handle: "@a__certain__woman",
    url: "https://instagram.com/a__certain__woman",
  },
  tiktok: {
    label: "TikTok",
    handle: "@a__certain__woman",
    url: "https://www.tiktok.com/@a__certain__woman",
  },
  // TODO: add the Facebook page URL once the client provides it.
  facebook: null as Social | null,
} satisfies Record<string, Social | null>;

/** Public profile URLs for schema.org `sameAs` (skips not-yet-provided ones). */
export const socialUrls: string[] = [
  socials.instagram,
  socials.tiktok,
  socials.facebook,
]
  .filter((s): s is Social => s !== null)
  .map((s) => s.url);
