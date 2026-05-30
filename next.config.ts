import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF (~20% smaller than WebP) with WebP/source fallback.
    // Targets the Lighthouse "Improve image delivery" insight.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
