import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { EventDetail } from "@/components/sections/event-detail";
import { EVENTS } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming gatherings, healing circles, leadership conferences, and outreach events from A Certain Woman.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 md:pt-40">
        <header className="mx-auto max-w-[1100px] px-6 text-center md:px-12">
          <div className="acw-section-label justify-center">
            <span className="acw-num">VI.</span>
            <span>Where she gathers</span>
          </div>
          <h1 className="acw-display acw-display--center mt-6">
            All <em>events.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[1.8] text-muted-foreground">
            Every room we&apos;ve built, and every one we&apos;re building next
            — speakers, programs, and the women who were there.
          </p>
        </header>

        <div className="mx-auto mt-20 max-w-[1280px] px-6 md:px-12">
          {EVENTS.map((e) => (
            <EventDetail key={e.id} event={e} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}