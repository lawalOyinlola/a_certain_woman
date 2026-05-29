import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://acertainwoman.org";

const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Googlebot-Image",
  "Google-Extended",
  "Bingbot",
  "DuckDuckBot",
  "Slurp",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "FacebookBot",
  "facebookexternalhit",
  "Twitterbot",
  "LinkedInBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
