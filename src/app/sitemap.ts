import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

const ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/founder", priority: 0.7, changeFrequency: "yearly" },
  { path: "/programs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/events", priority: 0.9, changeFrequency: "weekly" },
  { path: "/stories", priority: 0.8, changeFrequency: "weekly" },
  { path: "/partner", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
