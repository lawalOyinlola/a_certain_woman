"use client";

import { useEffect, useRef, useState } from "react";
import { PillarIcon } from "@/components/site/icons";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PillarKind = "tree" | "crown" | "heart" | "house";

const PILLARS: { n: string; title: string; body: string; icon: PillarKind }[] = [
  {
    n: "01",
    title: "Rooted in God",
    body: "Before becoming, before building — she is rooted in God. Through quiet study, daily prayer and a soul that learns to stay, she is strengthened from within.",
    icon: "tree",
  },
  {
    n: "02",
    title: "Led by Grace",
    body: "Not by ambition's sharp edges. Not by hustle's loud bargain. Grace is her compass, her covering, and her way home.",
    icon: "crown",
  },
  {
    n: "03",
    title: "Restored in Identity",
    body: "She is not reduced to her past, her pain, or the names life once gave her. She is restored to truth, dignity, and the woman God always saw.",
    icon: "heart",
  },
  {
    n: "04",
    title: "Raised for Purpose",
    body: "She rises not to perform, but to serve, lead, love, and build what will outlive her.",
    icon: "house",
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
              () => setActive((prev) => Math.max(prev, idx)),
              idx * 120
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
      className="acw-bg-cream-down relative px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1280px] text-center">
        <div className="acw-section-label justify-center">
          <span className="acw-num">II.</span>
          <span>What she is built on</span>
        </div>
        <h2 className="acw-display acw-display--center mt-6">
          Four <em>pillars.</em>
          <br /> One sacred becoming.
        </h2>
        <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[1.8] text-muted-foreground">
          The shape of becoming is not an accident. It is built daily,
          tenderly - through faith, grace, healing and the quiet courage to keep becoming.
        </p>
      </div>

      <div
        ref={ref}
        className="mx-auto mt-20 grid max-w-[1280px] grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {PILLARS.map((p, i) => (
          <Card
            key={p.n}
            data-idx={i}
            className={cn(
              "group relative overflow-hidden rounded-md border border-border bg-cream-1 transition-all duration-700",
              active >= i
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            )}
          >
            <CardContent className="flex h-full flex-col px-7 py-10">
              <div className="font-display text-[40px] italic leading-none text-gold/70">
                {p.n}
              </div>
              <div className="mt-8 h-12 w-12 text-forest">
                <PillarIcon kind={p.icon} />
              </div>
              <h3 className="mt-6 font-display text-[26px] leading-tight text-forest">
                {p.title}
              </h3>
              <div className="my-5 h-px w-10 bg-gold" />
              <p className="text-[14px] leading-[1.75] text-ink-2">{p.body}</p>
              <div className="mt-auto flex items-center justify-between pt-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>Pillar {p.n}</span>
                <span className="h-px w-8 bg-border" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}