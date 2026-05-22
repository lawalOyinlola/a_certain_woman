"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PERSONAS = [
  {
    n: "01",
    title: "The Healing Woman",
    body: "For women navigating grief, trauma, emotional exhaustion, disappointment, or hidden wounds.",
  },
  {
    n: "02",
    title: "The Rising Woman",
    body: "For women rebuilding confidence, identity, voice, and purpose after difficult seasons.",
  },
  {
    n: "03",
    title: "The Leading Woman",
    body: "For women called to leadership, influence, service, entrepreneurship, ministry, advocacy, and public impact.",
  },
  {
    n: "04",
    title: "The Young Woman",
    body: "For girls and young women discovering self-worth, values, faith, identity, and future direction.",
  },
  {
    n: "05",
    title: "The Community Woman",
    body: "For mothers, caregivers, widows, single parents, survivors, mentors, and everyday women carrying responsibility with grace.",
  },
  {
    n: "06",
    title: "& Allies, Mentors, Partners",
    body: "For everyone who walks alongside her — pastors, sponsors, volunteers, and friends investing in her becoming.",
  },
];

export function WhoWeServe() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setTimeout(() => setActive((p) => Math.max(p, idx)), idx * 80);
          }
        });
      },
      { threshold: 0.3 }
    );
    ref.current.querySelectorAll("[data-idx]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="who" className="bg-cream-1 px-6 py-32 md:px-12 md:py-36">
      <div className="mx-auto mb-16 grid max-w-[1320px] items-end gap-10 md:mb-24 md:grid-cols-[1.5fr_1fr] md:gap-16">
        <div className="flex flex-col gap-7">
          <div className="acw-section-label">
            <span className="acw-num">II.</span>
            <span>Who we serve</span>
          </div>
          <h2 className="acw-display">
            For every woman
            <br />
            <em>still becoming.</em>
          </h2>
        </div>
        <p className="font-display italic text-[18px] leading-snug text-ink-2 md:max-w-[340px] md:justify-self-end md:text-right">
          Women in every season — healing, rising, leading, becoming.
        </p>
      </div>

      <div
        ref={ref}
        className="mx-auto grid max-w-[1320px] grid-cols-1 gap-x-14 gap-y-14 sm:grid-cols-2 md:grid-cols-3"
      >
        {PERSONAS.map((p, i) => (
          <article
            key={p.n}
            data-idx={i}
            className={cn(
              "acw-persona-card transition-all duration-700 ease-out",
              active >= i ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <span className="acw-persona-num">{p.n}</span>
            <h3 className="acw-persona-title mt-4">{p.title}</h3>
            <p className="acw-persona-body mt-5">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
