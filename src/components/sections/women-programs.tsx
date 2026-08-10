"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WOMEN_PROGRAMS, type WomenProgram } from "@/lib/data/programs";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

/** Eyebrow + title + blurb — the part shown before the tabs on mobile.
 * `titleAs` keeps the heading order valid: h3 when a section h2 sits above
 * (home page), h2 when the section label is hidden (/programs, under the h1). */
function ProgramHead({
  p,
  detail = false,
  titleAs: Title = "h3",
}: {
  p: WomenProgram;
  detail?: boolean;
  titleAs?: "h2" | "h3";
}) {
  return (
    <>
      <div className="flex items-center justify-center gap-5 text-cream-1/60">
        <span className="font-display text-[22px] italic text-gold-2">
          {p.n}
        </span>
        <span className="h-px w-10 bg-cream-1/30" />
        <span className="text-[11px] uppercase tracking-[0.3em]">{p.sub}</span>
      </div>

      <Title className="acw-exp-title mt-6">
        <em>{p.title}.</em>
      </Title>

      <p className="mx-auto mt-7 max-w-170 text-center text-[17px] leading-[1.65] text-cream-1/80">
        {p.blurb}
      </p>

      {detail && p.body && (
        <p className="mx-auto mt-4 max-w-170 text-center text-[16px] leading-[1.75] text-cream-1/60">
          {p.body}
        </p>
      )}
    </>
  );
}

/** Key features + best-for + CTA grid. */
function ProgramBody({
  p,
  detail = false,
}: {
  p: WomenProgram;
  detail?: boolean;
}) {
  const features = detail ? p.features : p.features.slice(0, 4);
  const bestFor = detail && p.detailBestFor ? p.detailBestFor : p.bestFor;

  return (
    <div className="grid gap-16 border-t border-cream-1/20 pt-12 md:grid-cols-2">
      <div>
        <small className="block text-[11px] uppercase tracking-[0.32em] text-gold-2">
          KEY FEATURES
        </small>
        <ul className="acw-exp-features mt-6">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>
      <div>
        <small className="block text-[11px] uppercase tracking-[0.32em] text-gold-2">
          BEST FOR
        </small>
        <p className="mt-6 text-[17px] leading-[1.6] text-cream-1/80">
          {bestFor}
        </p>
        <Button
          asChild
          size="pill"
          className="mt-7 bg-gold-2 text-forest hover:bg-cream-1"
        >
          <Link href={p.href}>
            {p.cta} <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}

/** Hand-drawn levitating hint nudging users to click the tabs. */
function ProgramsHint() {
  return (
    <div className="acw-programs-hint" aria-hidden>
      <span
        className="acw-programs-hint-text"
        style={{ fontFamily: "var(--font-hand)" }}
      >
        click to view each program
      </span>
      <svg
        width="50"
        height="38"
        viewBox="0 0 50 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* curve from near the text, sweeping down to the tabs */}
        <path d="M2 4C20 6 38 12 41 32" />
        {/* arrowhead — tip (41,32) is exactly the curve's endpoint */}
        <path d="M33 26 L41 32 L47 24" />
      </svg>
    </div>
  );
}

export function WomenPrograms({
  withLabel = true,
  layout = "tabs",
}: {
  withLabel?: boolean;
  layout?: "tabs" | "stacked";
}) {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const cur = WOMEN_PROGRAMS[active];
  // When the section label/h2 is hidden (/programs), the program titles become
  // the top heading under the page h1, so they must be h2 (not h3) to keep the
  // heading order sequential.
  const titleAs = withLabel ? "h3" : "h2";
  // One ref per tab button so arrow-key navigation can call .focus() on the
  // newly selected tab, keeping DOM focus in sync with tabIndex.
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Stacked (/programs): reveal each program block as it enters. Tabs (home):
  // stagger the heading and tab bar; the active panel keeps its own fade.
  const revealRef = useGsapReveal<HTMLElement>(
    layout === "stacked"
      ? { batch: true, stagger: 0.1, from: { y: 44 } }
      : { stagger: 0.14 },
  );

  return (
    <section
      ref={revealRef}
      id="programs"
      className="acw-bg-forest relative px-6 py-32 md:px-12 md:py-40"
    >
      {withLabel && (
        <div
          data-reveal
          className="mx-auto mb-14 flex max-w-190 flex-col items-center text-center"
        >
          <div className="acw-section-label acw-section-label--light">
            <span className="acw-num">|</span>
            <span>Signature programs</span>
          </div>
          <h2 className="acw-display acw-display--center mt-6 text-cream-1">
            The rooms
            <br />
            <em className="text-gold-2">we&apos;ve built.</em>
          </h2>
          <p className="mt-7 max-w-160 text-[17px] leading-[1.65] text-cream-1/70">
            Every ACW experience is designed with intention, from the words
            spoken, to the table prepared, to the atmosphere created.
          </p>
        </div>
      )}

      {layout === "tabs" ? (
        <div className="mx-auto flex max-w-330 flex-col">
          {/* Tabs — below the active title on mobile, above it on desktop */}
          <div
            data-reveal
            role="tablist"
            aria-label="Signature programs"
            className="acw-exp-tab-bar relative order-2 md:order-1"
          >
            {!interacted && <ProgramsHint />}
            {WOMEN_PROGRAMS.map((e, i) => (
              <button
                key={e.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`${e.id}-tab`}
                role="tab"
                aria-selected={active === i}
                aria-controls={`${e.id}-panel`}
                tabIndex={active === i ? 0 : -1}
                className={cn("acw-exp-tab", active === i && "is-active")}
                onClick={() => {
                  setActive(i);
                  setInteracted(true);
                }}
                onKeyDown={(ev) => {
                  const last = WOMEN_PROGRAMS.length - 1;
                  if (ev.key === "ArrowRight") {
                    ev.preventDefault();
                    const next = i < last ? i + 1 : 0;
                    setActive(next);
                    setInteracted(true);
                    tabRefs.current[next]?.focus();
                  } else if (ev.key === "ArrowLeft") {
                    ev.preventDefault();
                    const prev = i > 0 ? i - 1 : last;
                    setActive(prev);
                    setInteracted(true);
                    tabRefs.current[prev]?.focus();
                  }
                }}
              >
                <span className="acw-exp-tab-n">{e.n}</span>
                <span className="acw-exp-tab-title">{e.title}</span>
              </button>
            ))}
          </div>

          {/* Full program panel — head + body in one tabpanel so both are owned by the active tab */}
          <div
            key={cur.id + "-panel"}
            role="tabpanel"
            id={`${cur.id}-panel`}
            aria-labelledby={`${cur.id}-tab`}
            className="acw-fade order-1 mx-auto w-full max-w-275 md:order-2 md:mt-14"
          >
            <ProgramHead p={cur} titleAs={titleAs} />
            <div className="mt-12 md:mt-14">
              <ProgramBody p={cur} />
            </div>
          </div>
        </div>
      ) : (
        // Stacked — every program shown in full so visitors scroll through each.
        <div className="mx-auto max-w-275 space-y-28 md:space-y-36">
          {WOMEN_PROGRAMS.map((p) => (
            <article
              key={p.id}
              id={p.id}
              data-reveal
              className="scroll-mt-28 md:scroll-mt-32"
            >
              <ProgramHead p={p} detail titleAs={titleAs} />
              <div className="mt-12 md:mt-14">
                <ProgramBody p={p} detail />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
