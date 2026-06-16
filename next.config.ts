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
    ];
  },
};

export default nextConfig;
