import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Experiences } from "@/components/sections/experiences";
import { Join } from "@/components/sections/join";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Identity Academy, Faith and Flowers, Crown Table, healing circles, mentorship, and the Men Who Stand initiative — programs designed to meet women at every stage of becoming.",
  alternates: { canonical: "/programs" },
};

const MEN = {
  n: "06",
  title: "Men Who Stand",
  sub: "Restoring Strength. Redefining Manhood. Building Legacy.",
  blurb:
    "ACW's male engagement initiative — encouraging responsible leadership, fatherhood, accountability, protection without control, emotional maturity, faith, and legacy-building.",
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
          sub="Our programs are designed to meet women at different stages of their journey — from healing to leadership, from restoration to service, from private pain to public purpose."
        />

        <Experiences withLabel={false} />

        {/* Men Who Stand */}
        <section className="bg-cream-1 px-6 py-24 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1120px]">
            <div className="mb-14 flex flex-col items-center text-center">
              <div className="acw-section-label">
                <span className="acw-num">{MEN.n}.</span>
                <span>Male engagement</span>
              </div>
              <h2 className="acw-page-h2 mt-6">
                Men who <em>stand.</em>
              </h2>
              <p className="mt-5 max-w-[560px] font-display text-[18px] italic text-muted-foreground">
                {MEN.sub}
              </p>
            </div>

            <div className="acw-twoup">
              <div className="acw-twoup-body">
                <p className="text-[17px] text-ink-2">{MEN.blurb}</p>
                <p className="font-display text-[18px] italic text-muted-foreground">
                  Women&apos;s restoration and family wellbeing are
                  strengthened when men also rise in responsibility, healing,
                  and purpose.
                </p>
                <Button asChild variant="editorial" size="pill" className="mt-4 w-fit">
                  <Link href="/contact">
                    Learn About Men Who Stand <ArrowRight />
                  </Link>
                </Button>
              </div>
              <div>
                <small className="acw-section-label-mini">KEY FEATURES</small>
                <ul className="acw-checklist mt-6">
                  {MEN.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Join withLabel={false} />
      </main>
      <Footer />
    </>
  );
}
