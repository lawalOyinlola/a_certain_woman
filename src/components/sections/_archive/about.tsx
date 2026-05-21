import Link from "next/link";
import Image from "next/image";
import { ArrowRightThin } from "@/components/site/icons";

export function About() {
  return (
    <section id="story" className="relative px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="acw-section-label">
            <span className="acw-num">I.</span>
            <span>Who she is</span>
          </div>
          <h2 className="acw-display mt-6">
            She is not defined
            <br /> by <em>noise.</em>
            <br /> Not by <em>trends.</em>
          </h2>
        </div>

        <div className="space-y-12">
          <figure className="relative">
            <div className="relative overflow-hidden rounded-md border border-border bg-cream-2">
              <div className="relative aspect-4/5">
                <Image
                  src="/photos/02.jpg"
                  alt="Portrait — A Certain Woman"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 480px, 100vw"
                />
                <div className="pointer-events-none absolute inset-3 border border-cream-1/40" />
              </div>
              <div className="flex items-end justify-between border-t border-border bg-cream-1 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>PORTRAIT OF BECOMING</span>
                <span className="font-display text-base italic text-gold">
                  No. 01
                </span>
              </div>
            </div>
            <figcaption className="mt-5 font-display text-[18px] italic leading-snug text-ink-2">
              &ldquo;Clothed in strength and dignity,
              <br /> she laughs without fear of what is to come.&rdquo;
              <span className="mt-2 block text-[10px] uppercase not-italic tracking-[0.3em] text-muted-foreground">
                — Proverbs 31:25
              </span>
            </figcaption>
          </figure>

          <div className="space-y-6 text-[16px] leading-[1.85] text-ink-2">
            <p>
              <span className="acw-dropcap">A</span> Certain Woman is a
              sisterhood for the quiet ones, the rebuilding ones, the ones who
              refuse to shrink and refuse to shout. We gather women who are
              becoming — through prayer, through practice, through the long work
              of grace.
            </p>
            <p>
              She is not waiting for the world to name her worthy. She is the
              woman God named before the world had a word for her.
            </p>
            <Link href="#pillars" className="acw-link-arrow">
              Our four pillars <ArrowRightThin />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
