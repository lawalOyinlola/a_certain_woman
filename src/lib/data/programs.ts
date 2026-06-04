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
  /** Short intro shown everywhere. */
  blurb: string;
  /** Continuation shown on /programs only — flows from blurb, adds new content. */
  body?: string;
  bestFor: string;
  /** Extended best-for shown on /programs only. */
  detailBestFor?: string;
  /** Max 8 items. Home tabs show first 4; /programs shows all. */
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
  /** Who this program is designed for — shown on /programs. */
  bestFor?: string;
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
      "A sacred wellness brunch designed for women to pause, breathe, reflect, and bloom through faith, beauty, and sisterhood.",
    body: "Rooted in scripture and sacred intention, it brings together worship, guided reflection, a bloom bar experience, soft movement, brunch, and affirmation into one morning designed to help women breathe again.",
    bestFor: "Women seeking rest, reflection, and spiritual refreshment.",
    detailBestFor:
      "Women seeking rest, reflection, emotional renewal, sisterhood, and spiritual refreshment.",
    features: [
      "Reflection and journaling",
      "Scripture reading",
      "Worship and prayer",
      "Bloom bar experience",
      "Wellness conversation",
      "Soft movement or yoga",
      "Brunch and sisterhood",
      "Affirmation cards",
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
      "Invitation-only leadership breakfast honoring women of resilience, service, quiet impact, legacy, and purpose.",
    body: "It creates a dignified space where women are recognized in front of their peers, stories that deserve to be heard are told, and leadership is strengthened through the reminder that impact does not always announce itself.",
    bestFor: "Women leaders, mentors, professionals, advocates, legacy women.",
    detailBestFor:
      "Women leaders, mentors, community builders, professionals, educators, advocates, entrepreneurs, and legacy women.",
    features: [
      "Honoree recognition",
      "Leadership conversation",
      "Legacy storytelling",
      "Crown cards",
      "Networking breakfast",
      "Women of impact spotlight",
      "Partner visibility",
      "Media and storytelling moments",
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
      "A structured learning pathway helping women and girls heal limiting narratives, build confidence, clarify purpose, and develop leadership.",
    body: "Participants move through a progressive curriculum that addresses self-worth, emotional resilience, voice, values, and vision, culminating in the capacity to lead with intention and serve with impact.",
    bestFor:
      "Women and girls seeking deeper personal development and mentorship.",
    detailBestFor:
      "Women and girls seeking deeper personal development, mentorship, leadership formation, and guided transformation.",
    features: [
      "Identity and self-worth",
      "Healing from labels and shame",
      "Emotional resilience",
      "Voice and confidence",
      "Values and boundaries",
      "Leadership formation",
      "Vision and personal growth",
      "Faith and purpose",
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
      "Intimate gatherings where women share, listen, pray, reflect, and find strength in sisterhood, held with care and confidentiality.",
    body: "Each circle is designed with spiritual sensitivity and grace. Nothing shared leaves the room. Women are given space to release, to be heard, and to be reminded that their pain does not define their next chapter.",
    bestFor:
      "Women navigating grief, emotional fatigue, transition, or renewal.",
    detailBestFor:
      "Women navigating grief, emotional fatigue, disappointment, transition, loneliness, or spiritual renewal.",
    features: [
      "Guided conversations",
      "Prayer and reflection",
      "Emotional release",
      "Scripture encouragement",
      "Peer support",
      "Journaling prompts",
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
      "Compassion-led work that brings practical care, dignity, and encouragement directly to women, girls, and families in the community.",
    body: "We go to where women are. Every outreach visit, care package, and school session is built on the conviction that compassion is not charity but a declaration that she is seen, and that she matters.",
    bestFor: "Vulnerable women, mothers, girls, families, community groups.",
    detailBestFor:
      "Vulnerable women, girls, mothers, families, widows, single parents, and community groups who need practical care, encouragement, and dignity.",
    features: [
      "Mother's Day community support",
      "Girls' dignity packs",
      "Food and care packages",
      "Widows and single mothers support",
      "School outreach",
      "Community prayer and encouragement",
      "Women's health conversations",
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
    bestFor:
      "Men, fathers, mentors, husbands, sons, community leaders, and male allies committed to dignity, accountability, and healthy family leadership.",
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
