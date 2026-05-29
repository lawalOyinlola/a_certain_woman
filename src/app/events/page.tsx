import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { EventsBrowser } from "./events-browser";
import {
  EVENTS,
  getUpcomingEvents,
  isUpcoming,
  type ACWEvent,
} from "@/lib/data/events";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://acertainwoman.org";

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
      name: event.location,
      address: {
        "@type": "PostalAddress",
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

type SearchParams = Promise<{ tab?: string }>;

export default async function EventsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { tab } = await searchParams;
  const explicit =
    tab === "past" || tab === "all" || tab === "upcoming" ? tab : null;
  const fallback =
    getUpcomingEvents().length > 0 ? ("upcoming" as const) : ("past" as const);
  const initialTab = explicit ?? fallback;

  const eventsJsonLd = EVENTS.map(eventToJsonLd);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      <Nav />
      <main className="pt-32 md:pt-40">
        <header className="mx-auto max-w-[1100px] px-6 text-center md:px-12">
          <div className="acw-section-label justify-center">
            <span className="acw-num">|</span>
            <span>Where she gathers</span>
          </div>
          <h1 className="acw-display acw-display--center mt-6">
            Every <em>gathering.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[1.8] text-muted-foreground">
            Every room we&apos;ve built, and every one we&apos;re building next.
            Speakers, programs, and the women who were there.
          </p>
        </header>

        <div className="mx-auto mt-16 max-w-[1280px] px-6 md:px-12">
          <EventsBrowser initialTab={initialTab} />
        </div>
      </main>
      <Footer />
    </>
  );
}
