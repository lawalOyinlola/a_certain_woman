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
      className="relative bg-cream-2 px-6 py-32 md:px-12 md:py-44"
    >
      <div className="mx-auto max-w-[1080px] text-center">
        {/* Parallax ornament */}
        <div
          className="mx-auto h-14 w-14 text-gold"
          style={{ transform: `translateY(${(1 - p) * 40}px)`, opacity: p }}
        >
          <svg
            viewBox="0 0 60 60"
            width="56"
            height="56"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          >
            <circle cx="30" cy="30" r="29" />
            <path
              d="M18 24 Q22 18 26 22 Q22 26 18 24 Z M34 24 Q38 18 42 22 Q38 26 34 24 Z"
              fill="currentColor"
              opacity="0.3"
            />
            <path d="M20 36 Q30 44 40 36" />
          </svg>
        </div>

        {/* Section label — matches the pattern used everywhere else */}
        <div className="acw-section-label mt-10 justify-center">
          <span className="acw-num">IV.</span>
          <span>Who is A Certain Woman?</span>
        </div>

        {/* Gold hairline */}
        <div className="acw-rule-line mx-auto mt-6" />

        {/* Big editorial pull quote */}
        <h2 className="acw-display acw-display--center relative mt-12">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 left-1/2 translate-x-[-200px] font-display text-[140px] italic leading-none text-gold/20 md:translate-x-[-260px]"
          >
            &ldquo;
          </span>
          <span className="block">
            She is the one who <em>rises</em>
          </span>
          <span className="block">
            after the <em>fire</em>.
          </span>
          <span className="block">
            <em>Crowned</em>, not conquered.
          </span>
        </h2>

        {/* Body */}
        <p className="mx-auto mt-14 max-w-[620px] text-[15px] leading-[1.85] text-ink-2">
          She is not shaped by pressure, comparison or the broken places she has
          survived. She is a woman becoming whole again — rooted in God, led by
          grace, guided by wisdom and rising with purpose.
        </p>

        <div className="mt-10 font-display text-[16px] italic text-gold">
          — A Certain Woman
        </div>
      </div>
    </section>
  );
}
