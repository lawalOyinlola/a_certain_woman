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
            setTimeout(
              () => setActive((p) => Math.max(p, idx)),
              idx * 100
            );
          }
        });
      },
      { threshold: 0.3 }
    );
    ref.current.querySelectorAll("[data-idx]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="who"
      className="bg-cream-2 px-6 py-32 md:px-12 md:py-36"
    >
      <div className="mx-auto mb-16 grid max-w-[1320px] items-end gap-16 md:grid-cols-[1fr_2fr] md:gap-16">
        <div>
          <div className="acw-section-label">
            <span className="acw-num">II.</span>
            <span>Who we serve</span>
          </div>
        </div>
        <h2 className="acw-display">
          For every woman
          <br />
          <em>still becoming.</em>
        </h2>
      </div>

      <div ref={ref} className="mx-auto max-w-[1320px]">
        {PERSONAS.map((p, i) => (
          <article
            key={p.n}
            data-idx={i}
            className={cn("acw-row", active >= i ? "is-in" : "is-out")}
          >
            <span className="acw-row-num">{p.n}</span>
            <h3 className="acw-row-title">{p.title}</h3>
            <p className="acw-row-body">{p.body}</p>
            <span className="acw-row-tick">
              <svg
                width="22"
                height="14"
                viewBox="0 0 22 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M1 7h20M16 1l5 6-5 6" />
              </svg>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
