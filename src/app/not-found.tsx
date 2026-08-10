import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { NotFoundSuggestion } from "@/components/site/not-found-suggestion";
import { SITE_ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "That page could not be found. Browse A Certain Woman's programs, events, stories, and ways to partner.",
  // A 404 should never be indexed, and should not be treated as a canonical
  // destination for whatever URL happened to produce it.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="top">
        <PageHero
          eyebrow="404  ·  PAGE NOT FOUND"
          title={
            <>
              This page has
              <br />
              <em>wandered off.</em>
            </>
          }
          sub="The link may be old, or the address slightly mistyped. Everything else is still here."
        />

        <section className="bg-cream-1 px-6 pb-24 md:px-12 md:pb-28">
          <div className="mx-auto max-w-190 text-center">
            <NotFoundSuggestion />

            <div className="mt-16 border-t border-border pt-14">
              <small className="acw-section-label-mini justify-center">
                OR START ANYWHERE
              </small>
              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                {SITE_ROUTES.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className="rounded-full border border-gold/30 bg-cream-2 px-4 py-2 text-[13px] leading-[1.4] text-forest transition-colors hover:border-gold hover:bg-cream-3"
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
