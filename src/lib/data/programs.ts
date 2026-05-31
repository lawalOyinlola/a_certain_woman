export type Devotional = {
  week: string;
  truth: string;
  lines: string[];
  body: string[];
  prayer: string;
  sign: string;
};

/** A women's signature program — rendered as a tab / stacked block. */
export type WomenProgram = {
  kind: "women";
  id: string;
  n: string;
  title: string;
  sub: string;
  blurb: string;
  bestFor: string;
  features: string[];
  cta: string;
  href: string;
};

/** Men Who Stand — rendered as its own section, optionally with a devotional. */
export type MenProgram = {
  kind: "men";
  id: string;
  n: string;
  title: string;
  eyebrow: string;
  sub: string;
  blurb: string;
  pull: string;
  features: string[];
  eventId: string;
  pdf?: string;
  devotional?: Devotional;
};

export type Program = WomenProgram | MenProgram;

export const PROGRAMS: Program[] = [
  {
    kind: "women",
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
    kind: "women",
    id: "crown-table",
    n: "02",
    title: "Crown Table Spotlight",
    sub: "A Breakfast Honoring Women of Impact",
    blurb:
      "Invitation-only leadership breakfast celebrating women of resilience, service, quiet impact, legacy, and purpose.",
    bestFor: "Women leaders, mentors, professionals, advocates, legacy women.",
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
    kind: "women",
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
    kind: "women",
    id: "healing-circles",
    n: "04",
    title: "Women's Healing Circles",
    sub: "Safe Spaces for Prayer & Release",
    blurb:
      "Intimate gatherings where women share, listen, pray, reflect, and find strength in community, with care and confidentiality.",
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
    kind: "women",
    id: "community-outreach",
    n: "05",
    title: "Community Outreach",
    sub: "Compassion Beyond the Room",
    blurb:
      "Restoration extended into communities, supporting women, mothers, girls, and families through practical care and dignity.",
    bestFor: "Vulnerable women, mothers, girls, families, community groups.",
    features: [
      "Mother's Day support",
      "Girls' dignity packs",
      "Food and care packages",
      "School outreach",
    ],
    cta: "Support an Outreach",
    href: "/partner",
  },
  {
    kind: "men",
    id: "men-who-stand",
    n: "06",
    title: "Men Who Stand",
    eyebrow: "Male engagement",
    sub: "Restoring Strength. Redefining Manhood. Building Legacy.",
    blurb:
      "ACW's male engagement program, encouraging responsible leadership, fatherhood, accountability, protection without control, emotional maturity, faith, and legacy-building.",
    pull: "Men Who Stand exists because women's healing, family wellbeing, and community transformation are strengthened when men also choose responsibility, healing, accountability, and legacy.",
    features: [
      "Responsible fatherhood",
      "Positive masculinity",
      "Family leadership",
      "Emotional maturity",
      "Community mentorship",
      "Faith and accountability",
      "Protection and dignity",
      "Legacy-building",
    ],
    eventId: "men-who-stand-launch-2026",
    pdf: "/media/a_man_who_stands/pdf/Men%20Who%20Stand%20Final%20Devotional%20For%20May.pdf",
    devotional: {
      week: "Final Weekly Devotional · Before the June Launch",
      truth: "A man who stands builds a different legacy.",
      lines: [
        "He honors women with dignity.",
        "He fathers and mentors with presence.",
        "He refuses to pass on what wounded him.",
        "He chooses healing over harm, responsibility over excuses, and legacy over pride.",
      ],
      body: [
        "A man who stands is not perfect. But he is willing. He is learning. He is healing. He is becoming.",
      ],
      prayer:
        "May God shape you into a man of honor, presence, wisdom, and strength. May your home feel your peace, your children feel your presence, your community feel your character, and your nation feel your contribution.",
      sign: "With love, A Certain Woman.",
    },
  },
];

/** The five women's signature programs (tabs / stacked blocks). */
export const WOMEN_PROGRAMS = PROGRAMS.filter(
  (p): p is WomenProgram => p.kind === "women",
);

/** Men Who Stand — always present in PROGRAMS above. */
export const MEN_PROGRAM = PROGRAMS.find(
  (p): p is MenProgram => p.kind === "men",
)!;

/** Total signature programs across the site (women's programs + Men Who Stand). */
export const TOTAL_PROGRAMS = PROGRAMS.length;
