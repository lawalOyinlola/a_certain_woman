import Image from "next/image";
import Link from "next/link";
import {
  getPastEvents,
  getUpcomingEvents,
  type ACWEvent,
} from "@/lib/data/events";
import { ArrowRight, ArrowRightThin } from "@/components/site/icons";
import { Button } from "@/components/ui/button";

type Mode = "upcoming" | "past";

function formatShortDate(e: ACWEvent): string {
  const [y, m, d] = e.dateISO.split("-").map(Number);
  const start = new Date(y, (m ?? 1) - 1, d ?? 1);
  const month = start.toLocaleString("en-US", { month: "short" }).toUpperCase();
  if (e.endDateISO && e.endDateISO !== e.dateISO) {
    const [, , ed] = e.endDateISO.split("-").map(Number);
    return `${month} ${d}–${ed}`;
  }
  return `${month} ${d}`;
}

export function Events() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  if (upcoming.length === 0 && past.length === 0) return null;

  if (upcoming.length > 0) {
    const [next, ...moreUpcoming] = upcoming;
    const archive = past.slice(0, 4);

    return (
      <section id="events" className="relative px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader mode="upcoming" />

          <FeaturedEvent event={next} mode="upcoming" />

          {moreUpcoming.length > 0 && (
            <div className="mt-20">
              <div className="flex items-end justify-between border-b border-border pb-4">
                <small className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  Also on the calendar
                </small>
                <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  {String(moreUpcoming.length).padStart(2, "0")}{" "}
                  {moreUpcoming.length === 1 ? "event" : "events"}
                </span>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {moreUpcoming.map((e) => (
                  <UpcomingCard key={e.id} event={e} />
                ))}
              </div>
            </div>
          )}

          {archive.length > 0 && (
            <ArchiveStrip events={archive} label="From the archive" />
          )}

          <SeeAllCta />
        </div>
      </section>
    );
  }

  // Past-only mode
  const [latest, ...rest] = past;
  const archive = rest.slice(0, 4);

  return (
    <section id="events" className="relative px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader mode="past" />

        <FeaturedEvent event={latest} mode="past" />

        {archive.length > 0 && (
          <ArchiveStrip events={archive} label="More from the archive" />
        )}

        <SeeAllCta />
      </div>
    </section>
  );
}

function SectionHeader({ mode }: { mode: Mode }) {
  if (mode === "upcoming") {
    return (
      <div className="text-center">
        <div className="acw-section-label justify-center">
          <span className="acw-num">|</span>
          <span>Where she gathers</span>
        </div>
        <h2 className="acw-display acw-display--center mt-6">
          The next
          <br />
          <em>gathering.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.8] text-muted-foreground">
          Sisterhood is built in rooms. Here is the next room we&apos;re
          building, and a glimpse of the ones already filled.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="acw-section-label justify-center">
        <span className="acw-num">|</span>
        <span>Where she gathers</span>
      </div>
      <h2 className="acw-display acw-display--center mt-6">
        The latest
        <br />
        <em>gathering.</em>
      </h2>
      <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.8] text-muted-foreground">
        The next room is still being prepared. While we wait, look back at the
        sisterhood already gathered.
      </p>
    </div>
  );
}

function SeeAllCta() {
  return (
    <div className="mt-16 flex justify-center">
      <Button asChild variant="editorial" size="pill">
        <Link href="/events">
          See all events <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}

function buildStats(event: ACWEvent, mode: Mode) {
  type Stat = { label: string; value: React.ReactNode };
  const stats: Stat[] = [];

  if (mode === "upcoming") {
    if (event.speakers.length > 0) {
      stats.push({
        label: "Speakers",
        value: (
          <span className="text-[13px] text-ink-2">
            {event.speakers.join(" · ")}
          </span>
        ),
      });
    }
    if (event.program.length > 0) {
      stats.push({
        label: "Program",
        value: (
          <span className="font-display text-[20px] italic text-gold">
            {event.program.length}{" "}
            {event.program.length === 1 ? "moment" : "moments"}
          </span>
        ),
      });
    }
  }

  if (event.photos.length > 0) {
    stats.push({
      label: "Photos",
      value: (
        <span className="font-display text-[20px] italic text-gold">
          {event.photos.length}
        </span>
      ),
    });
  }
  if (event.videos && event.videos.length > 0) {
    stats.push({
      label: "Film",
      value: (
        <span className="font-display text-[18px] italic text-gold">
          {event.videos[0].title ?? "Recap"}
        </span>
      ),
    });
  }

  return stats.slice(0, 2);
}

function FeaturedEvent({ event, mode }: { event: ACWEvent; mode: Mode }) {
  const stats = buildStats(event, mode);
  const badge = mode === "upcoming" ? "Next" : "Latest";
  const primaryLabel = mode === "upcoming" ? "Event details" : "View the recap";

  return (
    <article className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div className="relative overflow-hidden rounded-md border border-border bg-cream-2">
        <div className="relative aspect-4/5">
          <Image
            src={event.cover}
            alt={event.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute left-5 top-5 rounded-full bg-cream-1/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-forest backdrop-blur-sm">
            {badge}
          </span>
          <div className="pointer-events-none absolute inset-4 border border-cream-1/30" />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <small className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          {event.date} · {event.location}
        </small>
        <h3 className="mt-4 font-display text-[clamp(40px,4.5vw,72px)] leading-[1.02] tracking-[-0.015em] text-forest">
          {event.title}. <em className="text-gold">{event.subtitle}</em>
        </h3>
        {event.theme && (
          <p className="mt-3 font-display text-[17px] italic text-gold">
            <span className="not-italic font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Theme:{" "}
            </span>
            {event.theme}
          </p>
        )}
        <p className="mt-6 max-w-[520px] text-[15px] leading-[1.85] text-ink-2">
          {event.blurb}
        </p>

        {stats.length > 0 && (
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-5">
            {stats.map((stat, i) => (
              <div key={i}>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-1">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Button asChild variant="editorial" size="pillSm">
            <Link href={`/events#${event.id}`}>
              {primaryLabel} <ArrowRightThin />
            </Link>
          </Button>
          {mode === "upcoming" && (
            <Link href="/partner" className="acw-link-arrow">
              Reserve a seat
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function UpcomingCard({ event }: { event: ACWEvent }) {
  return (
    <Link
      href={`/events#${event.id}`}
      className="group block overflow-hidden rounded-md border border-border bg-cream-1 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold"
    >
      <div className="relative aspect-4/3">
        <Image
          src={event.cover}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-cream-1/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-forest backdrop-blur-sm">
          {formatShortDate(event)}
        </span>
      </div>
      <div className="px-6 py-6">
        <small className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {event.location}
        </small>
        <h4 className="mt-2 font-display text-[26px] leading-[1.05] text-forest">
          {event.title}. <em className="text-gold">{event.subtitle}</em>
        </h4>
        <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-forest transition-[gap,color] duration-200 group-hover:gap-3 group-hover:text-gold">
          View details <ArrowRightThin />
        </span>
      </div>
    </Link>
  );
}

function ArchiveStrip({
  events,
  label,
}: {
  events: ACWEvent[];
  label: string;
}) {
  const grid =
    events.length === 1
      ? "grid-cols-1 max-w-sm"
      : events.length === 2
        ? "grid-cols-2 max-w-3xl"
        : events.length === 3
          ? "grid-cols-2 md:grid-cols-3"
          : "grid-cols-2 md:grid-cols-4";

  return (
    <div className="mt-24">
      <div className="flex items-end justify-between border-b border-border pb-4">
        <small className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          {label}
        </small>
        <Link
          href="/events?tab=past"
          className="text-[11px] uppercase tracking-[0.18em] text-forest transition-colors hover:text-gold"
        >
          Browse past gatherings →
        </Link>
      </div>
      <div className={`mt-8 grid gap-4 md:gap-5 ${grid}`}>
        {events.map((e) => (
          <ArchiveCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}

function ArchiveCard({ event }: { event: ACWEvent }) {
  return (
    <Link
      href={`/events#${event.id}`}
      className="group block overflow-hidden rounded-md border border-border bg-cream-1 transition-colors duration-300 hover:border-gold"
    >
      <div className="relative aspect-4/5">
        <Image
          src={event.cover}
          alt={event.title}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-forest/70 via-forest/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 py-4 text-cream-1">
          <small className="block text-[9px] uppercase tracking-[0.3em] text-cream-1/80">
            {formatShortDate(event)}
          </small>
          <span className="mt-1 block font-display text-[20px] italic leading-tight">
            {event.title}
          </span>
        </div>
        {event.photos.length > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-cream-1/90 px-2 py-0.5 text-[9px] uppercase tracking-[0.28em] text-forest">
            {event.photos.length} photos
          </span>
        )}
      </div>
    </Link>
  );
}
