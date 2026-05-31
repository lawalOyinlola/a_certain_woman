"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // ── Crown parallax (replaces the manual scroll listener) ──────────────
      gsap.fromTo(
        ".manifesto-crown",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "center center",
            scrub: reduced ? false : 1,
            once: reduced,
          },
        },
      );

      // ── Line-by-line text reveal (scrubbed as you scroll through section) ──
      if (!reduced) {
        gsap.from(".manifesto-line", {
          opacity: 0,
          y: 28,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".manifesto-quote",
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        });
      } else {
        // Instant reveal for reduced-motion users.
        gsap.set(".manifesto-line", { opacity: 1, y: 0 });
      }

      // ── Tagline + attribution fade in after the quote ─────────────────────
      gsap.from([".manifesto-tagline", ".manifesto-attr"], {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto-tagline",
          start: "top 88%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-cream-1 px-6 py-40 md:px-12 md:py-52"
    >
      <div className="mx-auto max-w-[1100px] text-center">
        {/* Crown ornament — animated by GSAP above */}
        <div className="manifesto-crown mx-auto mb-12 h-16 w-16 text-gold opacity-0">
          <svg
            viewBox="0 0 60 60"
            width="60"
            height="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M6 44 L12 18 L22 32 L30 12 L38 32 L48 18 L54 44 Z" />
            <line x1="6" y1="44" x2="54" y2="44" />
            <circle cx="12" cy="18" r="1.5" fill="currentColor" />
            <circle cx="30" cy="12" r="1.5" fill="currentColor" />
            <circle cx="48" cy="18" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* Quote — each line reveals as you scroll through */}
        <h2
          className="manifesto-quote relative font-display text-[clamp(40px,7vw,108px)] leading-none tracking-[-0.02em] text-forest"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-6 font-display text-[1.4em] italic leading-none text-gold/40"
          >
            &ldquo;
          </span>
          <span className="manifesto-line block">For the woman</span>
          <span className="manifesto-line block">
            who is <em className="italic text-gold">healing quietly.</em>
          </span>
          <span className="manifesto-line block">
            The woman <em className="italic text-gold">rebuilding</em>
          </span>
          <span className="manifesto-line block">her voice, and the one</span>
          <span className="manifesto-line block">
            leading while still <em className="italic text-gold">becoming.</em>
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -bottom-24 font-display text-[1.4em] italic leading-none text-gold/40 scale-x-[-1]"
          >
            &ldquo;
          </span>
        </h2>

        <p className="manifesto-tagline mx-auto mt-14 max-w-[580px] text-[18px] leading-[1.6] text-muted-foreground">
          Your crown was never lost. Only waiting to be reclaimed.
        </p>

        <div className="manifesto-attr mt-8 font-display text-[18px] italic text-gold">
          From the ACW Movement Statement
        </div>
      </div>
    </section>
  );
}
