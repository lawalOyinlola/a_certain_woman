import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Experiences } from "@/components/sections/experiences";
import { MenWhoStand } from "@/components/sections/men-who-stand";
import { Join } from "@/components/sections/join";

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

        <Experiences withLabel={false} />

        <MenWhoStand />

        <Join withLabel={false} />
      </main>
      <Footer />
    </>
  );
}
