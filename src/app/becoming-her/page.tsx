import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { CrownCircle } from "@/components/site/crown-circle";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { contact, contactHref, mailtoHref } from "@/config/site";
import {
  BECOMING_HER,
  THEMES,
  applicationsOverride,
  dayMonth,
} from "@/lib/data/becoming-her";
import { ApplyAction, JourneyHeadline, JourneySlip } from "@/components/becoming-her/live";
import { BecomingHerMotion } from "./motion";

// Hourly, so a cached page is never more than an hour behind the dates. The
// date-driven parts also update in the browser (see ./live.tsx).
export const revalidate = 3600;

const TITLE = "BecomingHER: The Crown Circle";
const DESCRIPTION =
  "A free, faith-based mentorship programme for 20 girls and young women aged 14–21 in Freetown. Six Saturdays, January to March 2027, on identity, wellbeing, boundaries, digital safety and leadership.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: BECOMING_HER.path },
  openGraph: {
    title: `${TITLE} | A Certain Woman`,
    description: `${BECOMING_HER.tagline} 20 places for ages 14–21 in Freetown, January to March 2027. Free to apply and to take part.`,
    url: BECOMING_HER.path,
  },
  twitter: {
    title: `${TITLE} | A Certain Woman`,
    description: `${BECOMING_HER.tagline} A free mentorship programme for girls and young women in Freetown.`,
  },
};

const FAQS = [
  {
    q: "Who can apply?",
    a: "Girls and young women aged 14 to 21 in Freetown who are willing to learn, take part respectfully and keep to the schedule. No school nomination is needed. There are twenty places, so applying does not guarantee one.",
  },
  {
    q: "Does it cost anything?",
    a: "No. There is no fee to apply or to take part. Attendance arrangements, and any practical support we can offer, are shared before enrolment.",
  },
  {
    q: "Who gives consent?",
    a: "Participants aged 14 to 17 need a parent or guardian's consent alongside their own agreement. Participants aged 18 to 21 consent for themselves.",
  },
  {
    q: "What will families be told?",
    a: "Before enrolment we share the confirmed session schedule, the venue, how we will communicate, and how a participant or family can raise a concern.",
  },
  {
    q: "Is this counselling?",
    a: "No. BecomingHER offers mentorship and learning. It does not replace professional counselling or specialist care.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const PARTNER_HREF = contactHref({
  reason: "Partner / Sponsor",
  prefill:
    "I would like to support BecomingHER: The Crown Circle by sharing the opportunity, sponsoring, or giving in-kind support.",
});

const PREPARE = [
  "Your date of birth and the area you live in",
  "A phone number that is safe for us to use",
  "If you are under 18, your parent or guardian's name and number",
  "Two short answers in your own words: why you want to join, and what you hope to learn",
  "Whether you can come on every date",
];

const CAPTIONS = {
  launch: "Healed & Held, the launch of A Certain Woman, Freetown, February 2026.",
  crownTable: "The Crown Table Spotlight Breakfast, March 2026.",
  faithFlowers: "Faith & Flowers, a wellness brunch, April 2026.",
};

const BELIEF =
  "A young woman does not have to prove her worth before she deserves care, respect and room to grow. She does not need every answer, or the loudest voice in the room.";

/**
 * The time this render happened, to the minute (the browser clock in
 * ./live.tsx rounds the same way). Reading the clock here is intended: the
 * page is regenerated hourly, and the browser corrects it after hydration.
 */
function renderMinute(): number {
  return Math.floor(Date.now() / 60_000) * 60_000;
}

/** A photograph that moves inside its frame as the page scrolls. */
function Photo({
  src,
  alt,
  caption,
  ratio,
  sizes,
  drift = 6,
  className,
}: {
  src: string;
  alt: string;
  caption: string;
  ratio: string;
  sizes: string;
  drift?: number;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className={`acw-bh-frame ${ratio}`}>
        <div className="acw-bh-frame-inner" data-bh-parallax={drift}>
          <Image src={src} alt={alt} fill sizes={sizes} />
        </div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function BecomingHerPage() {
  const serverNow = renderMinute();
  const override = applicationsOverride();

  return (
    <>
      <Nav />
      <BecomingHerMotion />
      <main id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />

        {/* ───────── Hero: the name, set large ───────── */}
        <section className="acw-bh-hero">
          <div className="acw-bh-hero-mark">
            <h1 className="acw-bh-title" aria-label="BecomingHER: The Crown Circle">
              <span className="acw-bh-line" data-bh-line="1">
                <span>Becoming</span>
              </span>
              <span className="acw-bh-line acw-bh-line--right" data-bh-line="2">
                <span className="acw-bh-hero-ring-wrap" data-bh-ring>
                  <CrownCircle decorative className="acw-bh-hero-ring" />
                </span>
                <span>
                  <em>HER</em>
                </span>
              </span>
            </h1>
            <p className="acw-bh-subtitle" aria-hidden>
              The Crown Circle
            </p>
          </div>

          <div className="acw-bh-hero-foot">
            <div className="acw-bh-hero-copy">
              <p className="acw-bh-lede">
                Her worth is already hers. Her journey is <em>becoming.</em>
              </p>
              <p className="acw-bh-hero-facts">
                Twenty places for girls and young women aged 14–21 in Freetown,
                January to March 2027. Free to apply, free to take part.
              </p>
            </div>
            <ApplyAction serverNow={serverNow} override={override} withNote />
          </div>
        </section>

        {/* ───────── What it is ───────── */}
        <section id="about" className="acw-bh-intro">
          <Reveal batch stagger={0.08} className="acw-bh-intro-grid">
            <h2 data-reveal className="acw-page-h2 acw-bh-intro-title">
              A circle for
              <br />
              her <em>becoming.</em>
            </h2>
            <div data-reveal className="acw-bh-intro-copy">
              <p>
                BecomingHER is a faith-based mentorship programme from A Certain
                Woman. Over six Saturdays, twenty girls and young women explore
                who they are, practise using their voices, and turn what they
                learn into a project for their community.
              </p>
              <p>
                Growing up brings questions about identity, belonging,
                relationships and the future. Here she can ask them out loud,
                with women who have asked them too.
              </p>
            </div>
            <div data-reveal className="acw-bh-intro-photo">
              <Photo
                src="/media/ACW_launch/KCS_3535.jpg"
                alt="Two girls in purple A Certain Woman T-shirts sit at a table set with white flowers; the younger one hugs a blue plush toy and looks off to the side."
                caption={CAPTIONS.launch}
                ratio="aspect-[4/5]"
                sizes="(min-width: 960px) 36vw, 100vw"
              />
            </div>
          </Reveal>
        </section>

        {/* ───────── The belief: pinned while the words light up ───────── */}
        <section className="acw-bh-field">
          <div className="acw-bh-field-inner">
            <p className="acw-bh-field-note">
              {BELIEF.split(" ").map((word, i) => (
                <span key={i} data-bh-word>
                  {word}{" "}
                </span>
              ))}
            </p>
            <p className="acw-bh-field-phrase" data-bh-phrase>
              <span>
                <span>Her worth</span>
              </span>
              <span>
                <span>
                  <em>comes first.</em>
                </span>
              </span>
            </p>
          </div>
        </section>

        {/* ───────── What she will explore ───────── */}
        <section id="explore" className="acw-bh-themes">
          <div className="acw-bh-wrap acw-bh-themes-grid">
            <Reveal className="acw-bh-themes-side">
              <h2 data-reveal className="acw-page-h2">
                Six Saturdays,
                <br />
                six <em>conversations.</em>
              </h2>
              <p data-reveal className="acw-bh-project">
                Each participant also shapes a <em>Becoming Project</em>, a small
                mentored piece of work that puts her learning into action where
                she lives.
              </p>
            </Reveal>
            <ul className="acw-bh-theme-list">
              {THEMES.map((t) => (
                <li key={t.title}>
                  <span className="acw-bh-theme-title">{t.title}</span>
                  <span className="acw-bh-theme-body">{t.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="acw-bh-diptych"
          aria-label="Photographs from A Certain Woman gatherings"
        >
          <Photo
            className="acw-bh-diptych-wide"
            src="/media/Crown_Table/KCS_2289.jpg"
            alt="A smiling girl holding a single rose stands between three women in bright prints in front of a floral backdrop."
            caption={CAPTIONS.crownTable}
            ratio="aspect-[4/3]"
            sizes="(min-width: 960px) 60vw, 100vw"
            drift={5}
          />
          <Photo
            className="acw-bh-diptych-tall"
            src="/media/ACW_launch/KCS_3661.jpg"
            alt="A woman in a purple A Certain Woman cap and T-shirt sits with her arm around a little girl in a pink sun hat."
            caption={CAPTIONS.launch}
            ratio="aspect-[2/3]"
            sizes="(min-width: 960px) 32vw, 100vw"
            drift={9}
          />
        </section>

        {/* ───────── The journey, worked out from today's date ───────── */}
        <section id="journey" className="acw-bh-journey">
          <Reveal batch stagger={0.1} className="acw-bh-journey-grid">
            <div data-reveal className="acw-bh-journey-copy">
              <h2 className="acw-page-h2">
                Where the circle
                <br />
                is <em>today.</em>
              </h2>
              <JourneyHeadline serverNow={serverNow} />
              <ApplyAction
                serverNow={serverNow}
                override={override}
                className="acw-bh-journey-action"
              />
              <Photo
                className="acw-bh-journey-photo"
                src="/media/Faith_and_Flowers/KCS_9842.jpg"
                alt="Six women in dresses and colourful prints stand side by side, smiling, in front of a wall of pink and white flowers."
                caption={CAPTIONS.faithFlowers}
                ratio="aspect-[3/2]"
                sizes="(min-width: 960px) 40vw, 100vw"
              />
            </div>
            <div data-reveal>
              <JourneySlip serverNow={serverNow} />
            </div>
          </Reveal>
        </section>

        {/* ───────── Questions, every answer open ───────── */}
        <section id="families" className="acw-bh-faq">
          <Reveal batch stagger={0.06} className="acw-bh-wrap">
            <h2 data-reveal className="acw-bh-faq-heading">
              Questions from families.
            </h2>
            <dl className="acw-bh-faq-table">
              {FAQS.map((f) => (
                <div key={f.q} data-reveal className="acw-bh-faq-row">
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ───────── How to apply (the form itself is on /contact) ───────── */}
        <section id="apply" className="acw-bh-apply">
          <div className="acw-bh-apply-grid">
            <div className="acw-bh-apply-copy">
              <h2>
                How to <em>apply.</em>
              </h2>
              <p>
                One application, about ten minutes, one question at a time. It
                opens on {dayMonth(BECOMING_HER.applicationsOpen)} and closes on{" "}
                {dayMonth(BECOMING_HER.applicationsClose)}.
              </p>
              <ApplyAction
                serverNow={serverNow}
                override={override}
                inGuide
                className="acw-bh-guide-action"
              />
            </div>
            <div className="acw-bh-guide">
              <ol className="acw-bh-guide-steps">
                <li>
                  <h3>Read about the programme</h3>
                  <p>Read this page, and share it with your family.</p>
                </li>
                <li>
                  <h3>Fill in the form</h3>
                  <p>
                    Take your time. Your own honest words matter more than
                    polished English.
                  </p>
                </li>
                <li>
                  <h3>Ask if you need help</h3>
                  <p>
                    A paper application or private help is available. The
                    team&rsquo;s email is just below.
                  </p>
                </li>
              </ol>
              <h3 className="acw-bh-guide-ready">Have these ready</h3>
              <ul className="acw-flow-prepare">
                {PREPARE.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── Help and partners, each with a clear action ───────── */}
        <section className="acw-bh-contact" aria-label="Help and partnerships">
          <div className="acw-bh-contact-row">
            <div>
              <p className="acw-bh-contact-big">Need a hand?</p>
              <p className="acw-bh-contact-small">
                For a paper form, help with the questions, or a private
                conversation, write to{" "}
                <a href={mailtoHref}>{contact.email}</a>.
              </p>
            </div>
            <Button asChild variant="editorialOutline" size="pill" className="acw-bh-press">
              <a href={mailtoHref}>Email the team</a>
            </Button>
          </div>
          <div className="acw-bh-contact-row">
            <div>
              <p className="acw-bh-contact-big">Help make it possible.</p>
              <p className="acw-bh-contact-small">
                Schools, organisations and sponsors can share the opportunity
                or support delivery, and keep the pilot free for every
                participant.
              </p>
            </div>
            <Button asChild variant="editorial" size="pill" className="acw-bh-press">
              <Link href={PARTNER_HREF}>
                Partner with us <ArrowRight />
              </Link>
            </Button>
          </div>
          {/* The footer's "A Certain Woman." lockup finishes this sentence. */}
          <p className="acw-bh-contact-close">Not just a woman.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
