"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Crown,
  Diamond,
  Star,
  ArrowRight,
  Sprig,
} from "@/components/site/icons";
import { Button } from "@/components/ui/button";

const marqueeItems = [
  "BECOMING",
  "HEALING",
  "DISCERNING",
  "DIGNIFIED",
  "LED BY GRACE",
  "REBUILDING WITH WISDOM",
];

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="acw-grain acw-bg-hero relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-10 pt-28 md:px-12 md:pt-32"
    >
      {/* parallax sprigs */}
      <div
        className="pointer-events-none absolute top-20 -left-16 h-[360px] w-[240px] text-forest opacity-30"
        style={{
          transform: `translate3d(0, ${scrollY * 0.15}px, 0) rotate(-12deg)`,
        }}
      >
        <Sprig />
      </div>
      <div
        className="pointer-events-none absolute -bottom-10 -right-20 h-[360px] w-[240px] text-forest opacity-30"
        style={{
          transform: `translate3d(0, ${scrollY * -0.1}px, 0) rotate(168deg)`,
        }}
      >
        <Sprig />
      </div>

      <div className="relative w-full max-w-5xl flex-center flex-col gap-8 text-center">
        {/* Eyebrow */}
        <div className="acw-fade flex-center gap-4 text-[11px] uppercase tracking-[0.32em] text-gold">
          <Crown />
          <span>EST. FEB 2026 · A SISTERHOOD OF BECOMING</span>
          <Crown flip />
        </div>

        {/* Tagline — stacked mega */}
        <div className="flex-center flex-col">
          <div className="acw-tagline-small acw-rise acw-rise-delay-1 text-muted-foreground">
            She is not just a woman
          </div>
          <h1 className="acw-tagline-mega">
            <span className="acw-rise acw-rise-delay-2 block">A Certain</span>
            <span className="acw-rise acw-rise-delay-3 ml-[0.18em] block italic text-gold">
              Woman.
            </span>
          </h1>
        </div>

        {/* Rule with star */}
        <div className="flex items-center justify-center gap-4 text-gold">
          <span className="acw-rule-line" />
          <Star />
          <span className="acw-rule-line" />
        </div>

        <p className="mx-auto mt-4 max-w-[600px] text-balance text-[15px] leading-[1.7] text-ink-2">
          A sisterhood for women in every season of becoming — healing with
          grace, rising in purpose and guided by the life God has called them to
          build.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="editorial" size="pill">
            <Link href="#join">
              Join the sisterhood <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="editorialOutline" size="pill">
            <Link href="#story">Read her story</Link>
          </Button>
        </div>

        {/* Marquee */}
        <div className="mt-20 overflow-hidden border-y border-border py-4">
          <div className="acw-marquee-track">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center">
                  {marqueeItems.map((w) => (
                    <div key={w} className="flex items-center">
                      <span>{w}</span>
                      <Diamond />
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
