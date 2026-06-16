import { DM_Serif_Display, Manrope, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AnnouncementBanner } from "@/components/site/announcement-banner";
import { organizationLd, websiteLd } from "@/config/jsonld";
import "./globals.css";

export { metadata, viewport } from "@/config/metadata";

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

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${hand.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AnnouncementBanner />
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </body>
    </html>
  );
}
