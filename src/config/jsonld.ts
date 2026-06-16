import { siteUrl, siteName, siteTagline, contact, socialUrls } from "@/config/site";
import { siteDescription } from "@/config/metadata";

export const organizationLd = {
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
  email: contact.email,
  telephone: contact.phoneE164,
  sameAs: socialUrls,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "general inquiries",
    email: contact.email,
    telephone: contact.phoneE164,
    areaServed: "SL",
    availableLanguage: "en",
  },
  founder: {
    "@type": "Person",
    name: "Namaari Inanna Kargbo",
    jobTitle: "Founder & Custodian",
  },
  foundingLocation: { "@type": "Place", name: "Freetown, Sierra Leone" },
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
        description: "A structured pathway for healing, identity, confidence, and leadership for women and girls.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        name: "Faith & Flowers",
        description: "A sacred wellness brunch experience for rest, reflection, worship, and renewal.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        name: "Crown Table Spotlight Breakfast",
        description: "An invitation-only leadership and recognition experience honoring women of impact, legacy, and purpose.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        name: "Women's Healing Circles",
        description: "Safe, intimate spaces for reflection, prayer, release, and restoration.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        name: "Community Outreach",
        description: "Compassion-led initiatives supporting vulnerable women, mothers, girls, and families.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        name: "Men Who Stand",
        description: "ACW's male engagement program for responsible fatherhood, positive masculinity, family leadership, and legacy-building.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
    ],
  },
};

export const websiteLd = {
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
