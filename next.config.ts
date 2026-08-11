import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
