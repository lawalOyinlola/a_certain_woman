"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const EXPERIENCES = [
  {
    id: "faith-and-flowers",
    n: "01",
    title: "Faith & Flowers",
    sub: "A Sacred Wellness Brunch",
    blurb:
      "A sacred wellness brunch designed for rest, reflection, healing, worship, blooming, and gentle restoration.",
    bestFor: "Women seeking rest, reflection, and spiritual refreshment.",
    features: [
      "Reflection & journaling",
      "Worship and prayer",
      "Bloom bar experience",
      "Brunch & fellowship",
    ],
    cta: "View Upcoming Events",
    href: "/events",
  },
  {
    id: "crown-table",
    n: "02",
    title: "Crown Table Spotlight",
    sub: "A Breakfast Honoring Women of Impact",
    blurb:
      "Invitation-only leadership breakfast celebrating women of resilience, service, quiet impact, legacy, and purpose.",
    bestFor:
      "Women leaders, mentors, professionals, advocates, legacy women.",
    features: [
      "Honoree recognition",
      "Leadership conversation",
      "Legacy storytelling",
      "Crown cards",
    ],
    cta: "Nominate a Woman of Impact",
    href: "/partner",
  },
  {
    id: "identity-academy",
    n: "03",
    title: "The Identity Academy",
    sub: "A Structured Pathway for Becoming",
    blurb:
      "A transformational learning and development program for identity, confidence, healing, leadership, and purpose.",
    bestFor:
      "Women and girls seeking deeper personal development and mentorship.",
    features: [
      "Identity & self-worth",
      "Voice & confidence",
      "Leadership formation",
      "Vision & growth",
    ],
    cta: "Register Interest",
    href: "/contact",
  },
  {
    id: "healing-circles",
    n: "04",
    title: "Women's Healing Circles",
    sub: "Safe Spaces for Prayer & Release",
    blurb:
      "Intimate gatherings where women share, listen, pray, reflect, and find strength in community — with care and confidentiality.",
    bestFor:
      "Women navigating grief, emotional fatigue, transition, or renewal.",
    features: [
      "Guided conversations",
      "Prayer & reflection",
      "Peer support",
      "Restoration declarations",
    ],
    cta: "Join a Healing Circle",
    href: "/contact",
  },
  {
    id: "community-outreach",
    n: "05",
    title: "Community Outreach",
    sub: "Compassion Beyond the Room",
    blurb:
      "Restoration extended into communities — supporting women, mothers, girls, and families through practical care and dignity.",
    bestFor:
      "Vulnerable women, mothers, girls, families, community groups.",
    features: [
      "Mother's Day support",
      "Girls' dignity packs",
      "Food and care packages",
      "School outreach",
    ],
    cta: "Support an Outreach",
    href: "/partner",
  },
];

export function Experiences({ withLabel = true }: { withLabel?: boolean }) {
  const [active, setActive] = useState(0);
  const cur = EXPERIENCES[active];

  return (
    <section
      id="experiences"
      className="acw-bg-forest relative px-6 py-32 md:px-12 md:py-40"
    >
      {withLabel && (
        <div className="mx-auto mb-14 flex max-w-[760px] flex-col items-center text-center">
          <div className="acw-section-label acw-section-label--light">
            <span className="acw-num">IV.</span>
            <span>Signature experiences</span>
          </div>
          <h2 className="acw-display acw-display--center mt-6 text-cream-1">
            The rooms
            <br />
            <em className="text-gold-2">we&apos;ve built.</em>
          </h2>
          <p className="mt-7 max-w-[640px] text-[17px] leading-[1.65] text-cream-1/70">
            Every ACW experience is designed with intention — from the words
            spoken, to the table prepared, to the atmosphere created.
          </p>
        </div>
      )}

      <div className="acw-exp-tab-bar mx-auto max-w-[1320px]">
        {EXPERIENCES.map((e, i) => (
          <button
            key={e.id}
            className={cn("acw-exp-tab", active === i && "is-active")}
            onClick={() => setActive(i)}
          >
            <span className="acw-exp-tab-n">{e.n}</span>
            <span className="acw-exp-tab-title">{e.title}</span>
          </button>
        ))}
      </div>

      <article
        key={cur.id}
        className="acw-fade mx-auto mt-14 max-w-[1100px]"
      >
        <div className="flex items-center justify-center gap-5 text-cream-1/60">
          <span className="font-display text-[22px] italic text-gold-2">
            {cur.n}
          </span>
          <span className="h-px w-10 bg-cream-1/30" />
          <span className="text-[11px] uppercase tracking-[0.3em]">
            {cur.sub}
          </span>
        </div>

        <h3 className="acw-exp-title mt-6">
          <em>{cur.title}.</em>
        </h3>

        <p className="mx-auto mt-7 max-w-[680px] text-center text-[17px] leading-[1.65] text-cream-1/80">
          {cur.blurb}
        </p>

        <div className="mt-14 grid gap-16 border-t border-cream-1/20 pt-12 md:grid-cols-2">
          <div>
            <small className="block text-[11px] uppercase tracking-[0.32em] text-gold-2">
              KEY FEATURES
            </small>
            <ul className="acw-exp-features mt-6">
              {cur.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <small className="block text-[11px] uppercase tracking-[0.32em] text-gold-2">
              BEST FOR
            </small>
            <p className="mt-6 text-[17px] leading-[1.6] text-cream-1/80">
              {cur.bestFor}
            </p>
            <Button
              asChild
              size="pill"
              className="mt-7 bg-gold-2 text-forest hover:bg-cream-1"
            >
              <Link href={cur.href}>
                {cur.cta} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
}
