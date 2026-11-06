import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Programs } from "@/components/sections/programs";
import { Join } from "@/components/sections/join";
import { Faq } from "@/components/sections/faq";
import { CrownCircle } from "@/components/site/crown-circle";
import { ArrowRight } from "@/components/site/icons";
import Link from "next/link";
import { BECOMING_HER } from "@/lib/data/becoming-her";

// Revalidate hourly so the Men Who Stand date badge stays current.
export const revalidate = 3600;

const FAQS = [
  {
    q: "What programs does A Certain Woman offer?",
    a: "A Certain Woman runs six signature programs: Faith & Flowers (a sacred wellness brunch), the Crown Table Spotlight Breakfast, the Identity Academy, Women's Healing Circles, Community Outreach, and Men Who Stand, our male engagement program.",
  },
  {
    q: "What is the Identity Academy?",
    a: "The Identity Academy is a structured, transformational learning and development pathway covering identity and self-worth, voice and confidence, leadership formation, and vision and growth. It is designed for women and girls seeking deeper personal development and mentorship.",
  },
  {
    q: "What is Faith & Flowers?",
    a: "Faith & Flowers is a sacred wellness brunch designed for rest, reflection, healing, worship, and gentle restoration. It includes reflection and journaling, worship and prayer, a bloom bar experience, and brunch and fellowship.",
  },
  {
    q: "What is the Crown Table Spotlight Breakfast?",
    a: "The Crown Table Spotlight is an invitation-only leadership breakfast that honors women of resilience, service, quiet impact, legacy, and purpose, through honoree recognition, leadership conversation, and legacy storytelling.",
  },
  {
    q: "Are A Certain Woman's programs only for women?",
    a: "Most of our signature programs are designed for women and girls at different stages of their journey. Men Who Stand is our male engagement program for responsible fatherhood, positive masculinity, family leadership, and legacy-building, built on the conviction that family wellbeing grows stronger when men also rise.",
  },
  {
    q: "How do I register or sign up for a program?",
    a: "It depends on the program. You can register interest in the Identity Academy or join a Healing Circle through the Contact page, view upcoming dates for Faith & Flowers on the Events page, or reach out about Crown Table and outreach. When in doubt, contact us and we will point you to the right next step.",
  },
];

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Signature ACW programs: Identity Academy, Faith and Flowers wellness brunch, Crown Table Spotlight Breakfast, women's healing circles, mentorship, community outreach, and the Men Who Stand initiative.",
  alternates: { canonical: "/programs" },
  openGraph: {
    title: "Programs | A Certain Woman",
    description:
      "Identity Academy, Faith and Flowers, Crown Table, healing circles, and Men Who Stand. Programs designed to meet women at every stage of becoming.",
    url: "/programs",
  },
  twitter: {
    title: "Programs | A Certain Woman",
    description:
      "Identity Academy, Faith and Flowers, Crown Table, healing circles, and more.",
  },
};

export default function ProgramsPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <PageHero
          eyebrow="PROGRAMS  ·  ONGOING WORK"
          title={
            <>
              The <em>programs.</em>
            </>
          }
          sub="Our programs are designed to meet women at different stages of their journey: from healing to leadership, from restoration to service, from private pain to public purpose."
        />

        {/* Feature: the girls' mentorship pilot, which has its own page. */}
        <section className="bg-cream-2 px-6 py-14 md:px-12">
          <Link
            href={BECOMING_HER.path}
            className="group mx-auto flex max-w-280 flex-col items-center gap-6 border border-gold/40 bg-cream-1 px-7 py-9 text-center transition-colors hover:border-gold md:flex-row md:gap-10 md:px-12 md:text-left"
          >
            <CrownCircle decorative className="h-24 w-24 shrink-0" />
            <div className="flex-1">
              <small className="acw-section-label-mini">
                New · Founding pilot · {BECOMING_HER.season}
              </small>
              <h2 className="font-display text-[clamp(30px,3.4vw,44px)] leading-tight text-forest">
                Becoming<em className="text-gold">HER</em>: The Crown Circle
              </h2>
              <p className="mt-2 text-[16px] leading-[1.65] text-muted-foreground text-pretty">
                Mentorship for {BECOMING_HER.places} girls and young women aged{" "}
                {BECOMING_HER.ages} in {BECOMING_HER.location}. Free to apply.
                Free to participate.
              </p>
            </div>
            <span className="acw-link-arrow shrink-0 group-hover:gap-4.5 group-hover:text-gold">
              Discover the programme <ArrowRight />
            </span>
          </Link>
        </section>

        <Programs withLabel={false} layout="stacked" withDevotional />

        <Faq
          className="bg-cream-1"
          label="Questions"
          heading={
            <>
              About the
              <br />
              <em>programs.</em>
            </>
          }
          items={FAQS}
        />

        <Join paths={["join", "events", "partner"]} />
      </main>
      <Footer />
    </>
  );
}
