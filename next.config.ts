import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Cloudflare Turnstile (the BecomingHER application) loads its script and its
// challenge frame from this origin.
const TURNSTILE = "https://challenges.cloudflare.com";

/**
 * Content Security Policy, sent as Report-Only for now: browsers report what
 * it would block and block nothing. Switch the header name to
 * Content-Security-Policy once the reports are clean.
 *
 * Scripts keep 'unsafe-inline' because the pages are static: Next.js inlines
 * its bootstrap scripts, and a nonce would make every page render on demand.
 * The policy still limits where scripts, frames and connections can come
 * from, who can frame the site, and where forms can post.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${TURNSTILE}${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "media-src 'self' blob:",
  `connect-src 'self' ${TURNSTILE}`,
  `frame-src ${TURNSTILE}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: csp },
  // Older browsers ignore frame-ancestors; this covers them.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // No "x-powered-by: Next.js" banner.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    // Prefer AVIF (~20% smaller than WebP) with WebP/source fallback.
    // Targets the Lighthouse "Improve image delivery" insight.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        // "Our Work" was folded into the About page; preserve the indexed URL
        // and any inbound links with a permanent (308) redirect.
        source: "/our-work",
        destination: "/about",
        permanent: true,
      },

      // Known aliases: singular/plural slips and the names people reach for
      // that aren't ours. Each is written out rather than guessed at runtime,
      // so every redirect on the site is reviewable in one place and no
      // unmatched URL can quietly answer 200. Anything not listed here falls
      // through to the 404, which offers the nearest page instead.
      { source: "/contacts", destination: "/contact", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/program", destination: "/programs", permanent: true },
      { source: "/programmes", destination: "/programs", permanent: true },
      { source: "/programme", destination: "/programs", permanent: true },
      { source: "/event", destination: "/events", permanent: true },
      // BecomingHER spellings people will type from a flyer or a WhatsApp
      // message. /apply stays temporary (307), so a later cohort or another
      // programme can claim it.
      { source: "/becomingher", destination: "/becoming-her", permanent: true },
      { source: "/crown-circle", destination: "/becoming-her", permanent: true },
      { source: "/apply", destination: "/contact?reason=becoming-her", permanent: false },
      // Stories is shelved until there are real ones to tell. Its URL and the
      // words people search for instead all land on the gallery, which is the
      // closest thing the site now has to the stories of a gathering. These
      // stay temporary (307) so the URL can be reclaimed when the page returns.
      { source: "/stories", destination: "/gallery", permanent: false },
      { source: "/story", destination: "/gallery", permanent: false },
      { source: "/testimonials", destination: "/gallery", permanent: false },
      { source: "/photos", destination: "/gallery", permanent: true },
      { source: "/media", destination: "/gallery", permanent: true },
      { source: "/partners", destination: "/partner", permanent: true },
      { source: "/sponsor", destination: "/partner", permanent: true },
      { source: "/donate", destination: "/partner", permanent: true },
      { source: "/give", destination: "/partner", permanent: true },
      { source: "/support", destination: "/partner", permanent: true },
      { source: "/founders-letter", destination: "/founder", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
