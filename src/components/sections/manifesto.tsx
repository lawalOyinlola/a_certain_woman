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
        <div
          className="mx-auto h-16 w-16 text-gold transition-all duration-700"
          style={{ transform: `translateY(${(1 - p) * 40}px)`, opacity: p }}
        >
          <svg viewBox="0 0 60 60" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.6">
            <circle cx="30" cy="30" r="29" />
            <path
              d="M18 24 Q22 18 26 22 Q22 26 18 24 Z M34 24 Q38 18 42 22 Q38 26 34 24 Z"
              fill="currentColor"
              opacity="0.3"
            />
            <path d="M20 36 Q30 44 40 36" />
          </svg>
        </div>

        <h2 className="acw-display mt-10 leading-[1.05]">
          <span className="absolute -translate-x-12 -translate-y-6 font-display text-[120px] italic leading-none text-gold/30">
            &ldquo;
          </span>
          <span className="block">Who is</span>
          <em className="block">A Certain Woman?</em>
          <span className="block">
            She is the one who <em>rises</em>
          </span>
          <span className="block">
            after the <em>fire</em> —
          </span>
          <span className="block">
            crowned, not <em>conquered.</em>
          </span>
        </h2>

        <p className="mx-auto mt-12 max-w-[600px] text-[15px] leading-[1.85] text-ink-2">
          &ldquo;She is not shaped by pressure, comparison, or the broken
          places she has survived. She is restored by grace, guided by wisdom,
          and becoming the woman God always knew she could be.&rdquo;
        </p>

        <div className="mt-10 font-display text-[16px] italic text-gold">
          — A Certain Woman
        </div>
      </div>
    </section>
  );
}