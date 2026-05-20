"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EVENTS } from "@/lib/data/events";
import { ArrowRight, ArrowRightThin } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Events() {
  const [i, setI] = useState(0);
  const carousel = EVENTS.slice(1);
  const latest = EVENTS[0];
  const cur = carousel[i];

  const next = () => setI((p) => (p + 1) % carousel.length);
  const prev = () => setI((p) => (p - 1 + carousel.length) % carousel.length);

  return (
    <section id="events" className="relative px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center">
          <div className="acw-section-label justify-center">
            <span className="acw-num">V.</span>
            <span>Where she gathers</span>
          </div>
          <h2 className="acw-display acw-display--center mt-6">
            The <em>events.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[1.8] text-muted-foreground">
            Sisterhood is built in rooms. Here are the rooms we&apos;ve built —
            and the ones we&apos;re building next.
          </p>
        </div>

        {/* Featured latest */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="relative overflow-hidden rounded-md border border-border bg-cream-2">
            <div className="relative aspect-4/5">
              <Image
                src={latest.cover}
                alt={latest.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-5 top-5 rounded-full bg-cream-1/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-forest backdrop-blur-sm">
                {latest.status}
              </span>
              <div className="pointer-events-none absolute inset-4 border border-cream-1/30" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <small className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {latest.date} · {latest.location}
            </small>
            <h3 className="mt-4 font-display text-[clamp(40px,4.5vw,72px)] leading-[1.02] tracking-[-0.015em] text-forest">
              {latest.title}
              <em className="text-gold"> — {latest.subtitle}</em>
            </h3>
            <p className="mt-6 max-w-[520px] text-[15px] leading-[1.85] text-ink-2">
              {latest.blurb}
            </p>
            <div className="mt-8">
              <Link href={`/events#${latest.id}`} className="acw-link-arrow">
                View this event <ArrowRightThin />
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-24">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <small className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Upcoming gatherings
            </small>
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              <span>
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(carousel.length).padStart(2, "0")}
              </span>
              <button
                onClick={prev}
                aria-label="Previous"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-cream-2"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-cream-2"
              >
                ›
              </button>
            </div>
          </div>

          <Card
            key={cur.id}
            className="mt-8 overflow-hidden rounded-md border-border bg-cream-1"
          >
            <CardContent className="grid grid-cols-1 gap-0 p-0 md:grid-cols-2">
              <div className="relative aspect-4/3 md:aspect-auto">
                <Image
                  src={cur.cover}
                  alt={cur.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-5 top-5 rounded-full bg-cream-1/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-forest backdrop-blur-sm">
                  {cur.status}
                </span>
              </div>
              <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
                <small className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  {cur.date} · {cur.location}
                </small>
                <h3 className="font-display text-[clamp(28px,3.2vw,44px)] leading-[1.05] text-forest">
                  {cur.title}
                  <em className="text-gold"> — {cur.subtitle}</em>
                </h3>
                <p className="text-[15px] leading-[1.85] text-ink-2">
                  {cur.blurb}
                </p>
                <div className="grid grid-cols-2 gap-6 border-t border-border pt-5">
                  <div>
                    <small className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Speakers
                    </small>
                    <span className="mt-1 block text-[13px] text-ink-2">
                      {cur.speakers.join(" · ")}
                    </span>
                  </div>
                  <div>
                    <small className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Photos
                    </small>
                    <span className="mt-1 block font-display text-[20px] italic text-gold">
                      {cur.photos.length}
                    </span>
                  </div>
                </div>
                <Button
                  asChild
                  variant="editorialOutline"
                  size="pillSm"
                  className="mt-2 w-fit"
                >
                  <Link href={`/events#${cur.id}`}>Event details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-2">
            {carousel.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Event ${k + 1}`}
                className={cn(
                  "h-1 w-10 transition-all",
                  k === i ? "bg-gold" : "bg-border hover:bg-muted-warm/50"
                )}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Button asChild variant="editorial" size="pill">
            <Link href="/events">
              See all events <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}