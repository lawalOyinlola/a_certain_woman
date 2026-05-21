import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
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
  "A faith-rooted women's movement — healing the heart, restoring the home, awakening the woman God always called her to be. Programs, events, and stories of becoming from Freetown, Sierra Leone.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ${siteTagline}`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "A Certain Woman",
    "women's movement",
    "Christian women",
    "faith-rooted",
    "healing",
    "restoration",
    "women's leadership",
    "women's ministry",
    "Sierra Leone",
    "Freetown",
    "Namaari Inanna Kargbo",
    "Identity Academy",
    "Faith and Flowers",
    "Crown Table",
    "women empowerment",
    "girls mentorship",
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
    title: `${siteName} — ${siteTagline}`,
    description: siteDescription,
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteName} — ${siteTagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ${siteTagline}`,
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
