import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { EventsBrowser } from "./events-browser";
import { EVENTS, isUpcoming, type ACWEvent } from "@/lib/data/events";
import { siteUrl } from "@/config/site";

function eventToJsonLd(event: ACWEvent) {
  const upcoming = isUpcoming(event);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${siteUrl}/events#${event.id}`,
    name: event.theme
      ? `${event.title}: ${event.subtitle}`
      : `${event.title}. ${event.subtitle}`,
    description: event.blurb,
    startDate: event.dateISO,
    endDate: event.endDateISO ?? event.dateISO,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: true,
    inLanguage: "en",
    url: `${siteUrl}/events#${event.id}`,
    image: [`${siteUrl}${event.cover}`],
    location: {
      "@type": "Place",
      name: event.venue ?? event.location,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.venue,
        addressLocality: event.location.split(",")[0]?.trim() ?? event.location,
        addressCountry: event.location.toLowerCase().includes("sierra leone")
          ? "SL"
          : undefined,
      },
    },
    organizer: { "@id": `${siteUrl}/#organization` },
    performer: { "@id": `${siteUrl}/#organization` },
    ...(upcoming
      ? {
          offers: {
            "@type": "Offer",
            url: `${siteUrl}/partner`,
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            validFrom: event.dateISO,
          },
        }
      : {}),
  };
}

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past gatherings from A Certain Woman: the Healed and Held Launch Summit, Faith and Flowers wellness brunch, Crown Table Spotlight Breakfast, healing circles, and leadership conferences in Freetown, Sierra Leone.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events | A Certain Woman",
    description:
      "Faith and Flowers, Crown Table, Healed and Held, and every gathering of A Certain Woman. Search and browse upcoming and past events.",
    url: "/events",
  },
  twitter: {
    title: "Events | A Certain Woman",
    description:
      "Faith and Flowers, Crown Table, Healed and Held, and every ACW gathering.",
  },
};

type SearchParams = Promise<{ tab?: string; q?: string }>;

export default async function EventsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { tab, q } = await searchParams;
  const explicit =
    tab === "past" || tab === "all" || tab === "upcoming" ? tab : null;
  const initialTab = explicit ?? ("all" as const);

  const eventsJsonLd = EVENTS.map(eventToJsonLd);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      <Nav />
      <main id="top">
        <PageHero
          eyebrow="WHERE SHE GATHERS"
          title={
            <>
              Every <em>gathering.</em>
            </>
          }
          sub="Every room we've built, and every one we're building next. Speakers, programs, and the women who were there."
        />

        <div className="mx-auto mt-16 max-w-[1280px] px-6 md:px-12">
          <EventsBrowser initialTab={initialTab} initialQuery={q} />
        </div>
      </main>
      <Footer />
    </>
  );
}
