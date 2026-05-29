import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://acertainwoman.org";

const siteName = "A Certain Woman";
const siteTagline = "Restoring Hearts. Reclaiming Crowns.";
const siteDescription =
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
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

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  alternateName: "ACW",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/assets/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${siteUrl}/assets/og-image.png`,
  description: siteDescription,
  slogan: siteTagline,
  email: "info@acertainwoman.org",
  founder: {
    "@type": "Person",
    name: "Namaari Inanna Kargbo",
    jobTitle: "Founder & Custodian",
  },
  foundingLocation: {
    "@type": "Place",
    name: "Freetown, Sierra Leone",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Freetown",
    addressRegion: "Western Area",
    addressCountry: "SL",
  },
  areaServed: [
    { "@type": "Country", name: "Sierra Leone" },
    { "@type": "Place", name: "West Africa" },
  ],
  knowsAbout: [
    "Women's spiritual formation",
    "Identity restoration",
    "Faith-rooted healing",
    "Women's leadership development",
    "Sisterhood and mentorship",
    "Christian women's gatherings",
    "Girls' mentorship",
    "Responsible fatherhood and positive masculinity",
    "Family wellbeing and male engagement",
    "Community restoration",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Programs",
    itemListElement: [
      {
        "@type": "Service",
        name: "Identity Academy",
        description:
          "A structured pathway for healing, identity, confidence, and leadership for women and girls.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        name: "Faith & Flowers",
        description:
          "A sacred wellness brunch experience for rest, reflection, worship, and renewal.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        name: "Crown Table Spotlight Breakfast",
        description:
          "An invitation-only leadership and recognition experience honoring women of impact, legacy, and purpose.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        name: "Women's Healing Circles",
        description:
          "Safe, intimate spaces for reflection, prayer, release, and restoration.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        name: "Community Outreach",
        description:
          "Compassion-led initiatives supporting vulnerable women, mothers, girls, and families.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        name: "Men Who Stand",
        description:
          "ACW's male engagement program for responsible fatherhood, positive masculinity, family leadership, and legacy-building. Built on the conviction that family wellbeing is strengthened when men also rise in responsibility, healing, and purpose.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
    ],
  },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  alternateName: "ACW",
  description: siteDescription,
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#organization` },
  about: { "@id": `${siteUrl}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/events?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  creator: {
    "@type": "Person",
    name: "Lawal Oyinlola",
    alternateName: "LAWAL",
    url: "https://www.lawaloyinlola.com/",
    sameAs: [
      "https://www.lawaloyinlola.com/",
      "https://www.linkedin.com/in/lawaloyinlola",
      "https://github.com/lawalOyinlola",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteLd),
          }}
        />
      </body>
    </html>
  );
}
