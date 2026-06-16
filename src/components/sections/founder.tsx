"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/site/icons";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export function Founder({ withLabel = true }: { withLabel?: boolean }) {
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.13 });

  return (
    <section
      ref={ref}
      id="founder"
      className="bg-cream-1 px-6 py-32 md:px-12 md:py-40"
    >
      <div className="mx-auto grid max-w-[1320px] items-start gap-16 md:grid-cols-[1fr_1.4fr] md:gap-20">
        {/* Portrait — sticky on desktop, slides in from below */}
        <div data-reveal className="md:sticky md:top-[120px]">
          <div className="relative border border-border bg-cream-2 p-4">
            <Image
              src="/assets/namaari_founder.jpg"
              alt="Namaari Inanna Kargbo, Founder of A Certain Woman"
              width={500}
              height={620}
              className="aspect-4/5 w-full object-cover"
            />
            <div className="absolute bottom-4 right-4 flex flex-col items-end bg-cream-1 px-4 py-2.5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <small>FOUNDER</small>
              <span className="font-display text-[18px] italic tracking-normal text-forest">
                Namaari
              </span>
            </div>
          </div>
        </div>

        {/* Letter — staggered children */}
        <div>
          {withLabel && (
            <div data-reveal className="acw-section-label">
              <span className="acw-num">|</span>
              <span>The heart behind the movement</span>
            </div>
          )}

          <h2 data-reveal className="acw-display mt-6">
            A letter
            <br />
            <em>from her hand.</em>
          </h2>

          <blockquote data-reveal className="acw-founder-quote mt-10">
            &ldquo;I created what I once needed, a sacred space for women to be
            seen, held, restored, and reminded of who they are.&rdquo;
          </blockquote>

          <div
            data-reveal
            className="mt-10 flex flex-col gap-5 text-[16px] leading-[1.7] text-ink-2"
          >
            <p>
              <strong className="font-semibold text-forest">
                Namaari Inanna Kargbo
              </strong>
              , Founder and Custodian of A Certain Woman, is a woman of faith,
              mother, storyteller, professional, and servant leader whose life
              carries a message of healing, dignity, and becoming. Shaped by
              grief, resilience, motherhood, survival, and grace, she created A
              Certain Woman as a sacred movement where women are reminded that
              they are not ordinary, not forgotten, and not defined by what they
              have endured.
            </p>
            <p>
              Her work is anchored in the belief that pain can become purpose,
              survival can become service, and every woman can rise again, seen,
              restored, crowned, and becoming all God designed her to be.
            </p>
          </div>

          <p data-reveal className="acw-founder-emph mt-8">
            She is seen. She is becoming. She is crowned for purpose.
          </p>

          <div data-reveal className="mt-12 border-t border-border pt-6">
            <div className="font-display text-[26px] italic text-forest">
              Namaari Inanna Kargbo
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Founder &amp; Custodian, A Certain Woman
            </div>

            <Button
              asChild
              variant="editorial"
              size="pill"
              className="mt-8"
            >
              <Link href="/founder">
                Read the Founder&rsquo;s Letter <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
