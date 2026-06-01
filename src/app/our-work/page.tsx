import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Impact } from "@/components/sections/impact";
import { Join } from "@/components/sections/join";
import { Faq } from "@/components/sections/faq";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What kind of work does A Certain Woman do?",
    a: "A Certain Woman works across five areas: women's identity and healing, leadership and empowerment, support for girls and young women, family and community wellbeing, and advocacy and partnership. We support women and girls emotionally, spiritually, socially, and practically.",
  },
  {
    q: "What are healing circles?",
    a: "Healing circles are safe, intimate spaces for reflection, prayer, release, and restoration, where women can process pain, release shame, and begin again. They sit alongside guided reflection sessions, wellness brunches, and story-sharing spaces.",
  },
  {
    q: "Does A Certain Woman work with girls and young women?",
    a: "Yes. We support girls and young women with identity, self-worth, confidence, and direction through school outreach, mentorship programmes, identity sessions, life skills training, and faith and values formation.",
  },
  {
    q: "What is the Men Who Stand initiative?",
    a: "Men Who Stand is A Certain Woman's male engagement initiative for responsible fatherhood, positive masculinity, family leadership, and legacy-building. It is built on the conviction that family wellbeing is strengthened when men also rise in responsibility, healing, and purpose.",
  },
  {
    q: "How can I take part in a programme or gathering?",
    a: "Visit our Events page to see upcoming gatherings, or reach out through the Contact page to find the right programme for you. We welcome women and girls at every stage of their journey.",
  },
  {
    q: "How can I support the work of A Certain Woman?",
    a: "You can support our work by partnering with us, sponsoring an event, funding the Identity Academy, supporting community outreach, or becoming a monthly partner. Visit our Partner page to see every way to give and collaborate.",
  },
];

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "How A Certain Woman supports women and girls in Sierra Leone: identity restoration, emotional healing, leadership development, motherhood support, community outreach, and faith-based mentorship.",
  alternates: { canonical: "/our-work" },
  openGraph: {
    title: "Our Work | A Certain Woman",
    description:
      "Identity, healing, leadership, motherhood, and outreach. The faith-rooted work A Certain Woman is doing for women and girls in Sierra Leone and West Africa.",
    url: "/our-work",
  },
  twitter: {
    title: "Our Work | A Certain Woman",
    description:
      "Identity, healing, leadership, motherhood, and outreach for women and girls in Sierra Leone.",
  },
};

const AREAS = [
  {
    title: "Women's Identity & Healing",
    blurb:
      "We support women in rediscovering identity, releasing shame, rebuilding confidence, and finding language for their healing journey.",
    items: [
      "Healing circles",
      "Guided reflection sessions",
      "Prayer and restoration gatherings",
      "Journaling tools",
      "Wellness brunches",
      "Story-sharing spaces",
      "Emotional support pathways",
    ],
  },
  {
    title: "Leadership & Empowerment",
    blurb:
      "We prepare women to lead in their homes, workplaces, churches, businesses, communities, and public spaces.",
    items: [
      "Leadership breakfasts",
      "Mentorship circles",
      "Public speaking sessions",
      "Women in leadership conversations",
      "Personal development workshops",
      "Visibility and storytelling platforms",
      "Recognition of women's impact",
    ],
  },
  {
    title: "Girls & Young Women",
    blurb:
      "We support girls and young women with identity, self-worth, values, confidence, education, safety, dreams, and future direction.",
    items: [
      "School outreach",
      "Girls' identity sessions",
      "Mentorship programs",
      "Confidence-building workshops",
      "Life skills training",
      "Faith and values formation",
      "Career and purpose conversations",
    ],
  },
  {
    title: "Family & Community Wellbeing",
    blurb:
      "When women heal, families and communities are strengthened. We support mothers, caregivers, widows, single parents, families, and community groups.",
    items: [
      "Motherhood support initiatives",
      "Family wellbeing conversations",
      "Community outreach",
      "Intergenerational gatherings",
      "Parenting encouragement spaces",
      "Men and family partnership",
      "Social support referrals",
    ],
  },
  {
    title: "Advocacy & Partnership",
    blurb:
      "We partner with institutions, churches, ministries, NGOs, and community leaders to promote dignity, protection, gender inclusion, child wellbeing, and women's empowerment.",
    items: [
      "Women's wellbeing",
      "Child and family protection",
      "Mental and emotional wellness",
      "Gender inclusion",
      "Faith and community mobilization",
      "Leadership visibility",
      "Survivor-sensitive support",
    ],
  },
];

export default function OurWorkPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <PageHero
          eyebrow="OUR WORK"
          title={
            <>
              Faith. Healing.
              <br />
              <em>Leadership.</em>
            </>
          }
          sub="A Certain Woman works at the intersection of faith, healing, identity, leadership, wellness, advocacy, and community transformation. We support women and girls emotionally, spiritually, socially, and practically."
        />

        {AREAS.map((a, i) => (
          <section
            key={a.title}
            className={cn(
              "px-6 py-24 md:px-12 md:py-28",
              i % 2 ? "bg-cream-2" : "bg-cream-1",
            )}
          >
            <Reveal className="mx-auto max-w-[1120px]">
              <div className="acw-twoup">
                <div data-reveal className="acw-twoup-left">
                  <div className="acw-section-label">
                    <span className="acw-num">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span>Area of work</span>
                  </div>
                  <h2 className="acw-page-h2 mt-6">{a.title}</h2>
                </div>
                <div data-reveal className="acw-twoup-body">
                  <p className="text-[18px] text-ink-2">{a.blurb}</p>
                  <ul className="acw-checklist">
                    {a.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </section>
        ))}

        <Impact />

        <Faq
          className="bg-cream-1"
          label="Questions"
          heading={
            <>
              How the
              <br />
              <em>work works.</em>
            </>
          }
          items={FAQS}
        />

        <Join withLabel={false} />
      </main>
      <Footer />
    </>
  );
}
