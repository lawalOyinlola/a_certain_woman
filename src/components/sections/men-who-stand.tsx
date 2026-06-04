"use client";

import Image from "next/image";
import Link from "next/link";
import { getEventBadgeState } from "@/lib/data/events";
import { MEN_PROGRAM as MEN } from "@/lib/data/programs";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const COVER_IMAGE = "/media/a_man_who_stands/pdf/a_man_who_stand_cover.jpg";

export function MenWhoStand({
  withLabel = true,
  withDevotional = true,
}: {
  withLabel?: boolean;
  withDevotional?: boolean;
}) {
  const badge = getEventBadgeState(MEN.eventId);
  const dev = MEN.devotional;
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.13 });

  return (
    <section
      ref={ref}
      id="men-who-stand"
      className="relative bg-cream-2 px-6 py-32 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1120px]">
        {withLabel && (
          <div data-reveal className="mb-14 flex flex-col items-center text-center">
            <div className="acw-section-label">
              <span className="acw-num">{MEN.n}.</span>
              <span>{MEN.eyebrow}</span>
            </div>
            <h2 className="acw-display acw-display--center mt-6">
              Men who <em>stand.</em>
            </h2>
            <p className="mt-5 max-w-[560px] font-display text-[18px] italic text-muted-foreground">
              {MEN.sub}
            </p>
          </div>
        )}

        <div data-reveal className="acw-twoup">
          <div className="acw-twoup-body">
            <p className="text-[17px] text-ink-2">{MEN.blurb}</p>
            <p className="font-display text-[18px] italic text-muted-foreground">
              {MEN.pull}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {!withDevotional && MEN.pdf && (
                <Button
                  asChild
                  variant="editorialOutline"
                  size="pill"
                  className="w-fit"
                >
                  <a
                    href={MEN.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read the Journal <ArrowRight />
                  </a>
                </Button>
              )}
              <Button asChild variant="editorial" size="pill" className="w-fit">
                <Link href="/contact">
                  Learn about Men Who Stand <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <small className="acw-section-label-mini">KEY FEATURES</small>
            <ul className="acw-checklist mt-6">
              {MEN.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {withDevotional && MEN.bestFor && (
              <div className="mt-10">
                <small className="acw-section-label-mini">BEST FOR</small>
                <p className="mt-3 text-[16px] leading-[1.65] text-ink-2">
                  {MEN.bestFor}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Journal — full devotional shown on the Programs page only */}
        {withDevotional && dev && (
          <div className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            {/* Cover */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-md border border-border">
                <Image
                  src={COVER_IMAGE}
                  alt="Men Who Stand devotional cover"
                  width={600}
                  height={800}
                  className="aspect-3/4 w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-4 border border-cream-1/30" />
              </div>

              {/* Download link */}
              {MEN.pdf && (
                <a
                  href={MEN.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="acw-link-arrow mt-5 inline-flex"
                >
                  Read the full devotional <ArrowRight />
                </a>
              )}
            </div>

            {/* Devotional content */}
            <div className="flex flex-col gap-6">
              <small className="acw-section-label-mini">{dev.week}</small>

              <blockquote className="acw-founder-quote">
                &ldquo;{dev.truth}&rdquo;
              </blockquote>

              <ul className="space-y-3 border-l-2 border-gold pl-6">
                {dev.lines.map((line) => (
                  <li
                    key={line}
                    className="font-display text-[18px] italic text-forest"
                  >
                    {line}
                  </li>
                ))}
              </ul>

              {dev.body.map((p) => (
                <p key={p} className="text-[16px] leading-[1.75] text-ink-2">
                  {p}
                </p>
              ))}

              <div className="border-t border-border pt-6">
                <small className="acw-section-label-mini">PRAYER</small>
                <p className="mt-3 font-display text-[18px] italic leading-[1.55] text-muted-foreground">
                  {dev.prayer}
                </p>
              </div>

              <p className="font-display text-[16px] italic text-gold">
                {dev.sign}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Event badge — only shown before/on the event day */}
      {badge.state !== "past" && (
        <EventBadge state={badge.state} label={badge.label} />
      )}
    </section>
  );
}

function EventBadge({
  state,
  label,
}: {
  state: "today" | "upcoming";
  label: string;
}) {
  const isToday = state === "today";

  return (
    <div
      className="pointer-events-none absolute right-8 top-8 md:right-14 md:top-14"
      aria-label={isToday ? "Event happening today" : `Event on ${label}`}
    >
      {/* Stamp shape */}
      <div
        className={`
          relative flex h-[88px] w-[88px] flex-col items-center justify-center
          rounded-full border-2 text-center md:h-[132px] md:w-[132px]
          ${
            isToday
              ? "border-gold bg-gold text-cream-1 shadow-[0_0_0_4px_rgba(182,145,74,0.18)] md:shadow-[0_0_0_6px_rgba(182,145,74,0.18)]"
              : "border-forest/40 bg-cream-1/90 text-forest backdrop-blur-sm shadow-[0_4px_20px_-6px_rgba(31,61,43,0.2)]"
          }
        `}
      >
        <span
          className={`block text-[9px] uppercase tracking-[0.28em] md:text-[11px] ${isToday ? "text-cream-1/80" : "text-muted-foreground"}`}
        >
          {isToday ? "Today" : "Coming"}
        </span>
        <span
          className={`mt-0.5 block font-display text-[13px] italic leading-tight md:mt-1 md:text-[19px] ${isToday ? "text-cream-1" : "text-forest"}`}
        >
          {isToday ? "Now" : label}
        </span>

        {/* Serrated stamp border */}
        <svg
          viewBox="0 0 88 88"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 2 * Math.PI;
            const r = 42;
            const x = 44 + r * Math.cos(angle);
            const y = 44 + r * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2.4"
                fill={isToday ? "rgb(182,145,74)" : "rgb(31,61,43)"}
                opacity={isToday ? "0.5" : "0.25"}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
