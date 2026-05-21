import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Join } from "@/components/sections/join";
import { StoriesGrid } from "./stories-grid";

export const metadata: Metadata = {
  title: "Stories of Becoming",
  description:
    "Stories of becoming — healing, leadership, community, and founder reflections from the women of A Certain Woman.",
  alternates: { canonical: "/stories" },
};

export default function StoriesPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <PageHero
          eyebrow="STORIES OF BECOMING"
          title={
            <>
              Every woman
              <br />
              carries a <em>story.</em>
            </>
          }
          sub="Some are still healing. Some are still blooming. Some are still finding language. At A Certain Woman, we honor the journey of becoming."
        />

        <section className="bg-cream-1 px-6 py-24 md:px-12 md:py-28">
          <StoriesGrid />
        </section>

        <Join withLabel={false} />
      </main>
      <Footer />
    </>
  );
}
