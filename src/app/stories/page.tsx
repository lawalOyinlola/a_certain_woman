import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Join } from "@/components/sections/join";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/site/icons";
import { contactHref } from "@/config/site";
import { StoriesGrid } from "./stories-grid";

export const metadata: Metadata = {
  title: "Stories of Becoming",
  description:
    "Testimonies, reflections, and journal posts from A Certain Woman. Stories of healing, leadership, community, and founder reflections from women across Sierra Leone.",
  alternates: { canonical: "/stories" },
  openGraph: {
    title: "Stories of Becoming | A Certain Woman",
    description:
      "Healing, leadership, community, and founder reflections from the women of A Certain Woman.",
    url: "/stories",
  },
  twitter: {
    title: "Stories of Becoming | A Certain Woman",
    description:
      "Testimonies, reflections, and journal posts from the women of ACW.",
  },
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

        {/* A gentle invitation to contribute, so the page also gathers stories
            and not only tells them. Routes to a prefilled contact form. */}
        <section className="bg-cream-2 px-6 py-20 md:px-12 md:py-24">
          <div className="mx-auto flex max-w-170 flex-col items-center text-center">
            <div className="acw-section-label justify-center">
              <span className="acw-num">|</span>
              <span>Your story</span>
            </div>
            <h2 className="acw-display acw-display--center mt-6">
              Is your story
              <br />
              <em>still becoming?</em>
            </h2>
            <p className="mt-6 max-w-140 text-[16px] leading-[1.7] text-muted-foreground">
              If you carry a story of healing, of rising, of quiet faith, we
              would be honored to hold it. Share as much or as little as you
              wish, and only what you are ready to. Every story is shared
              anonymously, with no names and no faces, unless you ask us
              otherwise.
            </p>
            <Button asChild variant="editorial" size="pill" className="mt-9">
              <Link
                href={contactHref({
                  reason: "Share My Story",
                  prefill: "I would like to share my story.",
                })}
              >
                Share your story <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>

        <Join paths={["join", "programs", "partner"]} />
      </main>
      <Footer />
    </>
  );
}
