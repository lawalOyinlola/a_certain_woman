"use client";

import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { TOTAL_PROGRAMS } from "@/lib/data/programs";
import { getPastEvents } from "@/lib/data/events";

export function Impact() {
  const programsCount = String(TOTAL_PROGRAMS).padStart(2, "0");
  const gatheringsCount = String(getPastEvents().length + 1).padStart(2, "0");

  const stats = [
    {
      // TODO(ACW): replace with a real, verified figure before launch.
      value: "4000+",
      label: "Women Reached",
      desc: "Through gatherings, devotionals, outreach, and community engagement.",
    },
    {
      // TODO(ACW): replace with a real, verified figure before launch.
      value: "25+",
      label: "Safe Spaces Created",
      desc: "Through brunches, healing circles, table conversations, and reflection.",
    },
    {
      value: programsCount,
      label: "Programs Designed",
      desc: "For identity, healing, leadership, family wellbeing, and male engagement.",
    },
    {
      value: gatheringsCount,
      label: "Gatherings Hosted",
      desc: "Brunches, breakfasts, a summit, and outreach where women gathered to rise.",
    },
  ];

  const headerRef = useGsapReveal<HTMLDivElement>({ stagger: 0.14 });
  const gridRef = useGsapReveal<HTMLDivElement>({
    targets: "[data-stat]",
    stagger: 0.1,
    from: { y: 30, opacity: 0 },
    trigger: { start: "top 85%" },
  });

  return (
    <section
      id="impact"
      className="acw-bg-forest relative px-6 py-32 md:px-12 md:py-40"
    >
      <div
        ref={headerRef}
        className="mx-auto mb-16 flex max-w-190 flex-col items-center text-center"
      >
        <div data-reveal className="acw-section-label acw-section-label--light">
          <span className="acw-num">|</span>
          <span>Our impact so far</span>
        </div>
        <h2
          data-reveal
          className="acw-display acw-display--center mt-6 text-cream-1"
        >
          Growing,
          <br />
          <em className="text-gold-2">faithfully.</em>
        </h2>
        <p
          data-reveal
          className="mt-7 max-w-150 text-[17px] leading-[1.65] text-cream-1/70"
        >
          A young movement, building with intention. These numbers are early,
          honest, and growing, every one a woman seen, a space made safe, a
          crown reclaimed.
        </p>
      </div>

      <div
        ref={gridRef}
        className="mx-auto grid max-w-275 grid-cols-1 gap-px overflow-hidden border border-cream-1/15 bg-cream-1/15 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            data-stat
            className="flex flex-col items-center bg-forest px-6 py-12 text-center"
          >
            <span className="font-display text-[clamp(48px,6vw,72px)] leading-none text-gold-2">
              {s.value}
            </span>
            <span className="mt-5 text-[11px] uppercase tracking-[0.28em] text-cream-1">
              {s.label}
            </span>
            <span className="mt-3 text-[14px] leading-[1.6] text-cream-1/60">
              {s.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
