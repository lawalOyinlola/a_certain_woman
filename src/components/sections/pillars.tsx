"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    n: "01",
    title: "Identity Restoration",
    body: "Helping women rediscover who they are beyond pain, labels, shame, rejection, survival, and societal expectations.",
  },
  {
    n: "02",
    title: "Emotional Healing & Wellness",
    body: "Creating safe, faith-sensitive spaces for reflection, counselling pathways, fellowship, rest, release, and renewal.",
  },
  {
    n: "03",
    title: "Leadership & Empowerment",
    body: "Equipping women with confidence, voice, skills, values, visibility, and opportunities to lead with wisdom and purpose.",
  },
  {
    n: "04",
    title: "Faith & Spiritual Formation",
    body: "Anchoring women in prayer, scripture, purpose, grace, and spiritual strength as part of their healing journey.",
  },
  {
    n: "05",
    title: "Community Impact & Advocacy",
    body: "Working with families, communities, churches, government institutions, and partners to promote dignity, child wellbeing, family support, gender inclusion, and social restoration.",
  },
];

export function Pillars() {
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
              idx * 110
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
      id="pillars"
      className="acw-bg-cream-down relative px-6 py-32 md:px-12 md:py-40"
    >
      <div className="mx-auto mb-20 flex max-w-[760px] flex-col items-center text-center">
        <div className="acw-section-label">
          <span className="acw-num">III.</span>
          <span>What she is built on</span>
        </div>
        <h2 className="acw-display acw-display--center mt-6">
          Five <em>pillars</em>
          <br />
          of transformation.
        </h2>
        <p className="mt-7 max-w-[540px] text-[17px] leading-[1.65] text-muted-foreground">
          The shape of restoration is built — daily, tenderly, on five sacred
          foundations.
        </p>
      </div>

      <div ref={ref} className="mx-auto max-w-[1320px]">
        {PILLARS.map((p, i) => (
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
