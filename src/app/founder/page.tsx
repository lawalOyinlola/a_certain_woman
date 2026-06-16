import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/site/icons";
import { Join } from "@/components/sections/join";

export const metadata: Metadata = {
  title: "Why I Do What I Do — A Founder Reflection",
  description:
    "A founder reflection by Namaari Inanna Kargbo. The grief, survival, faith, and grace behind A Certain Woman, and why she builds sacred spaces of dignity for women and girls.",
  alternates: { canonical: "/founder" },
  openGraph: {
    title: "Why I Do What I Do — Namaari Inanna Kargbo",
    description:
      "The heart behind A Certain Woman, in the founder's own words. A story of grief, survival, faith, and the belief that pain can become purpose.",
    url: "/founder",
  },
  twitter: {
    title: "Why I Do What I Do — Namaari Inanna Kargbo",
    description:
      "The heart behind A Certain Woman, in the founder's own words.",
  },
};

/** Bold section break, mirroring the centered headings in the letter. */
function Break({ children }: { children: React.ReactNode }) {
  return (
    <h2
      data-reveal
      className="my-12 text-center font-display text-[clamp(22px,2.4vw,30px)] italic leading-[1.25] text-forest"
    >
      {children}
    </h2>
  );
}

export default function FounderPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <PageHero
          eyebrow="FOUNDER REFLECTION  ·  WHY I DO WHAT I DO"
          title={
            <>
              Why I do
              <br />
              <em>what I do.</em>
            </>
          }
          sub="A founder reflection by Namaari Inanna Kargbo. Not just a woman, A Certain Woman."
        />

        {/* Opening quote + portrait */}
        <section className="bg-cream-1 px-6 pb-8 pt-4 md:px-12">
          <Reveal className="mx-auto max-w-[760px]">
            <div
              data-reveal
              className="mx-auto mb-14 w-fit border border-border bg-cream-2 p-4"
            >
              <Image
                src="/assets/namaari_founder.jpg"
                alt="Namaari Inanna Kargbo, Founder of A Certain Woman"
                width={420}
                height={520}
                // LCP element on this page — load eagerly so it isn't
                // lazy-discovered (which also caused the late layout shift).
                priority
                sizes="360px"
                className="aspect-4/5 w-full max-w-[360px] object-cover"
              />
            </div>
            <blockquote
              data-reveal
              className="acw-founder-quote mx-auto text-center !border-l-0 !pl-0"
            >
              &ldquo;When I create spaces of dignity, I am creating what I once
              needed.&rdquo;
            </blockquote>
          </Reveal>
        </section>

        {/* The letter */}
        <section className="bg-cream-1 px-6 pb-24 pt-8 md:px-12 md:pb-28">
          <Reveal
            batch
            stagger={0.04}
            className="mx-auto max-w-[680px] text-[17px] leading-[1.85] text-ink-2 [&>p]:mb-6 [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:font-display [&>p:first-child]:first-letter:text-[64px] [&>p:first-child]:first-letter:leading-[0.8] [&>p:first-child]:first-letter:text-forest"
          >
            <p data-reveal>
              I was born into wealth, love, presence, covenant, and covering.
            </p>
            <p data-reveal>
              My parents were young, but they were intentional. My father was a
              beautiful man, inside and out. He was kind, generous, polite,
              firm, fierce, present, protective, and full of leadership. He was
              not just a provider; he was a covering.
            </p>
            <p data-reveal>
              My father was never absent from my life for long. The longest he
              would usually be away was a weekend, because he believed love was
              action. The only times we were sometimes separated were when he
              went back to the village, because my papa was a country man
              through and through. He did not joke with his getaways and his
              poyo. He loved his peace, and the village was his place of rest.
            </p>
            <p data-reveal>
              I believe I took that from him. I love tranquility. I operate best
              when life is calm. I understand now that some of the peace I long
              for is connected to the peace I once knew through him.
            </p>
            <p data-reveal>
              I loved my father deeply, and I still miss him every day.
            </p>
            <p data-reveal>
              When he passed away twenty-seven years ago, something in me
              changed. That was when I first understood fear. That was when I
              first understood loneliness. That was when I understood what it
              feels like for a covering to leave. And, in many ways, I have been
              watchful ever since.
            </p>
            <p data-reveal>
              When my father died, I began to understand pain, lack,
              inconsistency, and uncertainty. He worked for Customs all his life
              and held a good position, so we had enough. But his presence was
              more than provision. His love was structure. His leadership was
              safety. His covering was peace.
            </p>
            <p data-reveal>
              My father set the bar so high that, even today, I sometimes
              struggle when it comes to partnership. For me, it has never been
              only about money. It has always been about presence. That is a
              conversation for another day.
            </p>
            <p data-reveal>
              I became an adult at eleven years old. Not because my mother was
              unable to provide, but because she was young, only thirty-two,
              trying to understand and navigate grief while also carrying
              children who still needed her. She was in shock. And as the eldest
              sibling, I slowly became a mother figure in ways I was too young
              to fully understand.
            </p>

            <Break>Then the war came.</Break>

            <p data-reveal>
              And with it came pain I did not ask for. I was sexually abused,
              and I carried that hurt silently for twenty-one years. I only
              opened up to my sister a few years ago.
            </p>
            <p data-reveal>
              It was hard. It was painful. It was messy. But it shaped me into
              the woman I am today, and it forms part of the heart behind A
              Certain Woman.
            </p>
            <p data-reveal>
              I do what I do because I know what it means for a girl to lose
              safety too early. I know what it means to carry grief without
              language. I know what it means to survive violation and still have
              to show up. I know what it means to become strong before you are
              ready. I know what it means to mother others while still needing
              mothering yourself. I know what it means to carry pain quietly and
              still believe that God can use what tried to destroy you.
            </p>
            <p data-reveal>
              Every woman deserves healing. Every woman deserves restoration.
              Every woman deserves to be reminded of her identity before the
              world exposes her to experiences that try to tell her otherwise.
            </p>
            <p data-reveal>
              We are worthy. We are called. We are not what happened to us. We
              are still becoming.
            </p>
            <p data-reveal>
              I also learned love, resilience, and service through my mother.
              Even when life was uncomfortable, painful, and unfair, she stood.
              She became both mother and father to us in ways no woman should
              have to, yet she kept trusting God through grief, pressure, mental
              health battles, and the heavy responsibility of holding a family
              together.
            </p>

            <Break>She was, and forever will remain, our Certain Woman.</Break>

            <p data-reveal>
              So, when I serve women, I am serving from memory. When I speak
              healing, I am speaking from survival. When I create spaces of
              dignity, I am creating what I once needed. When I remind women of
              their worth, I am also reminding the little girl in me who had to
              grow up too soon.
            </p>
            <p data-reveal>
              Through rape, through teenage pregnancy, through grief, through
              war, through responsibility, through pain, and through having to
              show up for my mother and siblings in the most unstructured and
              unsolicited ways, I am still thankful.
            </p>

            <Break>
              Not because it was easy. Not because it was fair. But because God
              kept me.
            </Break>

            <p data-reveal>
              And because everything I survived became part of the woman I am
              becoming.
            </p>
            <p data-reveal>
              This is why I do what I do. This is why I serve. This is why I
              build. This is why I carry A Certain Woman.
            </p>

            <Break>Because I am not just a woman. I am A Certain Woman.</Break>
          </Reveal>
        </section>

        {/* Signature + closing */}
        <section className="bg-cream-2 px-6 py-20 md:px-12 md:py-24">
          <Reveal className="mx-auto max-w-[680px] text-center">
            <p data-reveal className="acw-founder-emph mx-auto max-w-[520px]">
              Restoring hearts. Reclaiming crowns.
            </p>
            <div
              data-reveal
              className="mx-auto mt-10 w-fit border-t border-border pt-6"
            >
              <div className="font-display text-[26px] italic text-forest">
                Namaari Inanna Kargbo
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Founder &amp; Custodian, A Certain Woman
              </div>
            </div>
            <div
              data-reveal
              className="mt-10 flex flex-wrap justify-center gap-3"
            >
              <Button asChild variant="editorial" size="pill">
                <Link href="/contact">
                  Join the Movement <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="editorialOutline" size="pill">
                <Link href="/about">About A Certain Woman</Link>
              </Button>
            </div>
          </Reveal>
        </section>

        <Join />
      </main>
      <Footer />
    </>
  );
}
