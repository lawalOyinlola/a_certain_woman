"use client";

import { useEffect, useRef, useState } from "react";

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const prog = 1 - (r.top + r.height / 2) / vh;
      setP(Math.max(0, Math.min(1, prog)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-cream-1 px-6 py-40 md:px-12 md:py-52"
    >
      <div className="mx-auto max-w-[1100px] text-center">
        {/* Parallax crown ornament */}
        <div
          className="mx-auto mb-12 h-16 w-16 text-gold"
          style={{ transform: `translateY(${(1 - p) * 40}px)`, opacity: p }}
        >
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

        <h2 className="relative font-display text-[clamp(40px,7vw,108px)] leading-none tracking-[-0.02em] text-forest">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-6 font-display text-[1.4em] italic leading-none text-gold/40"
          >
            &ldquo;
          </span>
          <span className="block">For the woman</span>
          <span className="block">
            who is <em className="italic text-gold">healing quietly.</em>
          </span>
          <span className="block">
            The woman <em className="italic text-gold">rebuilding</em>
          </span>
          <span className="block">her voice, and the one</span>
          <span className="block">
            leading while still <em className="italic text-gold">becoming.</em>
          </span>

          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -bottom-24 font-display text-[1.4em] italic leading-none text-gold/40 scale-x-[-1]"
          >
            &ldquo;
          </span>
        </h2>

        <p className="mx-auto mt-14 max-w-[580px] text-[18px] leading-[1.6] text-muted-foreground">
          Your crown was never lost. Only waiting to be reclaimed.
        </p>

        <div className="mt-8 font-display text-[18px] italic text-gold">
          From the ACW Movement Statement
        </div>
      </div>
    </section>
  );
}
