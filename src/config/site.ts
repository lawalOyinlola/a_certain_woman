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

/** Mobile money numbers accepted for donations and contributions. */
export const mobileMoney = [
  { provider: "Orange Money", number: "078 733 359" },
  { provider: "Afri Money", number: "033 493 008" },
] as const;

/**
 * The reasons offered in the contact form's "Reason for Contact" dropdown.
 * Single-sourced here so deep links (`contactHref`) and the form stay in sync;
 * a `reason` that isn't in this list is ignored by the form.
 */
export const CONTACT_REASONS = [
  "Join the Movement",
  "Attend an Event",
  "Partner / Sponsor",
  "Media Inquiry",
  "Volunteer",
  "Invite ACW",
  "Share My Story",
  "General Inquiry",
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number];

/**
 * Build a deep link to the contact form that preselects a reason, prefills the
 * message, and scrolls to the form (`#write`). Lets any "purposeful" CTA across
 * the site land the visitor on a pre-contextualised form instead of a blank one.
 */
export function contactHref(opts?: {
  reason?: ContactReason;
  prefill?: string;
}): string {
  const params = new URLSearchParams();
  if (opts?.reason) params.set("reason", opts.reason);
  if (opts?.prefill) params.set("prefill", opts.prefill);
  const qs = params.toString();
  return `/contact${qs ? `?${qs}` : ""}#write`;
}

/** Build a WhatsApp deep link, optionally with a prefilled message. */
export function whatsappHref(text?: string): string {
  return text
    ? `${contact.whatsappUrl}?text=${encodeURIComponent(text)}`
    : contact.whatsappUrl;
}

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
  facebook: {
    label: "Facebook",
    handle: "A Certain Woman",
    url: "https://www.facebook.com/people/A-Certain-Woman/61587369674617/",
  },
} satisfies Record<string, Social | null>;

/** Public profile URLs for schema.org `sameAs` (skips not-yet-provided ones). */
export const socialUrls: string[] = [
  socials.instagram,
  socials.tiktok,
  socials.facebook,
]
  .filter((s): s is Social => s !== null)
  .map((s) => s.url);
