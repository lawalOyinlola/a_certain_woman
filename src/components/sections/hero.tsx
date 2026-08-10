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
import { contactHref } from "@/config/site";

const marqueeItems = [
  "BECOMING",
  "HEALING",
  "LEADING",
  "RESTORED",
  "SEEN",
  "CROWNED WITH PURPOSE",
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
      className="acw-grain acw-bg-hero relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-10 pt-30 md:px-12 md:pt-40"
    >
      {/* Parallax sprigs. The scroll transform sits on the outer element and
          the breeze on the inner one, so neither overwrites the other. */}
      <div
        className="pointer-events-none absolute top-12 -left-36 h-150 w-100 text-forest opacity-30"
        style={{
          transform: `translate3d(0, ${scrollY * 0.15}px, 0) rotate(-12deg)`,
        }}
      >
        <div className="acw-sway h-full w-full">
          <Sprig />
        </div>
      </div>
      <div
        className="pointer-events-none absolute -bottom-10 -right-24 h-97.5 w-65 text-forest opacity-30"
        style={{
          transform: `translate3d(0, ${scrollY * -0.1}px, 0) rotate(168deg)`,
        }}
      >
        <div className="acw-sway acw-sway--slow h-full w-full">
          <Sprig />
        </div>
      </div>

      <div className="relative w-full max-w-5xl flex-center flex-col gap-8 text-center">
        {/* Eyebrow */}

        {/* Tagline — stacked mega */}
        <div className="flex-center flex-col">
          <div className="acw-tagline-small acw-rise acw-rise-delay-1 text-muted-foreground">
            She is not just a woman, she is ...
          </div>
          <h1 className="acw-tagline-mega">
            <span className="acw-rise acw-rise-delay-2 block">A Certain </span>
            <span className="acw-rise acw-rise-delay-3 ml-[0.18em] block italic text-gold">
              Woman.
            </span>
          </h1>
        </div>

        <div className="acw-fade flex-center gap-4 text-[11px] uppercase tracking-[0.32em] text-gold">
          <Crown />
          <span>A FAITH-ROOTED WOMEN&apos;S MOVEMENT</span>
          <Crown flip />
        </div>
        {/* Rule with star */}
        <div className="acw-rise acw-rise-delay-4 flex items-center justify-center gap-4 text-gold">
          <span className="acw-rule-line" />
          <Star />
          <span className="acw-rule-line" />
        </div>

        <p className="acw-rise acw-rise-delay-4 mx-auto max-w-160 text-balance text-[15px] leading-[1.7] text-ink-2">
          Restoring identity. Nurturing healing. Raising leaders. Creating safe
          spaces where women are seen, heard, healed, and crowned with purpose.
        </p>

        <div className="acw-rise acw-rise-delay-5 mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="editorial" size="pill">
            <Link
              href={contactHref({
                reason: "Join the Movement",
                prefill: "I would like to join the movement.",
              })}
            >
              Join the Movement <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="editorialOutline" size="pill">
            <Link href="/programs">Explore Our Programs</Link>
          </Button>
        </div>

        {/* Marquee */}
        <div className="acw-rise acw-rise-delay-6 mt-20 overflow-hidden border-y border-border py-4">
          <div className="acw-marquee-track" aria-hidden>
            {[0, 1].map((i) => (
              <div key={i} className="flex shrink-0 items-center">
                {marqueeItems.map((w) => (
                  <div key={w} className="flex items-center gap-0">
                    <span className="px-4">{w}</span>
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
