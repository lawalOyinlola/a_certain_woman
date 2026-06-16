import type { Metadata, Viewport } from "next";
import { siteUrl, siteName, siteTagline } from "@/config/site";

export const siteDescription =
  "A Certain Woman is a faith-rooted movement based in Freetown, Sierra Leone. We center the restoration of women and engage the men, families, and communities who shape their lives. Through sacred gatherings, healing circles, leadership programs, mentorship, and the Men Who Stand initiative, we work toward a future where every person is healed, honored, and whole.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | ${siteTagline}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "A Certain Woman",
    "ACW",
    "A Certain Woman Sierra Leone",
    "A Certain Woman Freetown",
    "faith-rooted women's movement",
    "Christian women Sierra Leone",
    "women's ministry Freetown",
    "women's healing circles",
    "women's leadership Sierra Leone",
    "Namaari Inanna Kargbo",
    "Identity Academy",
    "Faith and Flowers brunch",
    "Crown Table Spotlight Breakfast",
    "Healed and Held summit",
    "Men Who Stand",
    "Men Who Stand initiative",
    "responsible fatherhood Sierra Leone",
    "positive masculinity",
    "male engagement initiative",
    "She's Seen Mother's Day celebration",
    "Mother's Day outreach Freetown",
    "Christian women conference Sierra Leone",
    "girls mentorship Freetown",
    "Restoring Hearts Reclaiming Crowns",
    "women empowerment West Africa",
    "family wellbeing Sierra Leone",
  ],
  authors: [{ name: "Namaari Inanna Kargbo" }],
  creator: "Namaari Inanna Kargbo",
  publisher: siteName,
  category: "Non-profit",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/assets/logo.svg", type: "image/svg+xml" }],
    apple: [
      { url: "/assets/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} | ${siteTagline}`,
    description: siteDescription,
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteName}. ${siteTagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | ${siteTagline}`,
    description: siteDescription,
    creator: "@acertainwoman",
    images: ["/assets/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6ee" },
    { media: "(prefers-color-scheme: dark)", color: "#1f3d2b" },
  ],
  colorScheme: "light",
};
