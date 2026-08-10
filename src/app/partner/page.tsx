import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Join } from "@/components/sections/join";
import { Faq } from "@/components/sections/faq";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import {
  contact,
  contactHref,
  mailtoHref,
  mobileMoney,
  whatsappHref,
} from "@/config/site";

const FAQS = [
  {
    q: "How can I partner with A Certain Woman?",
    a: "There are six main ways to partner: sponsor an event, support community outreach, fund the Identity Academy, build a CSR partnership, collaborate as a church or faith partner, or work with us as a government or development partner. Reach out through the Contact page and we will share a partnership brief.",
  },
  {
    q: "Who can partner with A Certain Woman?",
    a: "We welcome partnerships with individuals, churches, companies, government institutions, NGOs, development partners, foundations, and community leaders who believe in the restoration, dignity, wellbeing, and empowerment of women and girls.",
  },
  {
    q: "How can I give or donate to support the work?",
    a: "Your support helps create healing spaces, host empowerment programmes, support vulnerable women and girls, and provide outreach care. You can sponsor one woman, support an outreach, sponsor an event, fund training materials, support girls' mentorship, become a monthly partner, or give through corporate sponsorship. Contact us to arrange your gift.",
  },
  {
    q: "Can my company partner through corporate social responsibility (CSR)?",
    a: "Yes. Companies can deliver women's empowerment, wellness, leadership, and family wellbeing programmes as part of their CSR commitments. We will help shape a partnership that fits your goals and the communities we serve.",
  },
  {
    q: "How do I request a partnership brief?",
    a: "Visit the Contact page and let us know you would like a partnership brief, or use the Request Partnership Brief option on this page. We will follow up with details on how we can work together.",
  },
  {
    q: "What makes A Certain Woman a credible partner?",
    a: "A Certain Woman brings a clear women-focused mission, strong faith and community trust, an elegant and credible public presence, both grassroots and institutional reach, programme models ready for scaling, and strong storytelling, visibility, and documentation.",
  },
];

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Partner with A Certain Woman to support women and girls in Sierra Leone. Sponsor an event, fund the Identity Academy, or collaborate as a church, company, NGO, or government partner.",
  alternates: { canonical: "/partner" },
  openGraph: {
    title: "Partner With Us | A Certain Woman",
    description:
      "Sponsor an event, fund the Identity Academy, or partner as a church, company, or government. Build restoration for women and girls in Sierra Leone alongside ACW.",
    url: "/partner",
  },
  twitter: {
    title: "Partner With Us | A Certain Woman",
    description:
      "Sponsor an event, fund the Identity Academy, or partner as a church, company, or government.",
  },
};

const OPPS = [
  {
    n: "01",
    title: "Sponsor an Event",
    body: "Faith & Flowers, Crown Table Spotlight, Mother's Day outreach, leadership gatherings, or wellness events.",
  },
  {
    n: "02",
    title: "Support Community Outreach",
    body: "Provide funding, supplies, transport, food packs, dignity items, educational materials, counselling support, or care packages.",
  },
  {
    n: "03",
    title: "Fund the Identity Academy",
    body: "Help women and girls access structured training in identity, confidence, leadership, values, emotional resilience, and purpose.",
  },
  {
    n: "04",
    title: "CSR Partnership",
    body: "Deliver women's empowerment, wellness, leadership, and family wellbeing programs as part of corporate social responsibility.",
  },
  {
    n: "05",
    title: "Church & Faith Partnership",
    body: "Collaborate through women's ministry support, healing gatherings, prayer events, mentorship, and discipleship-based restoration.",
  },
  {
    n: "06",
    title: "Government & Development",
    body: "Work with ACW on women's wellbeing, child protection, family strengthening, gender inclusion, and psychosocial support.",
  },
];

const WHY = [
  "A clear women-focused mission",
  "Strong faith and community trust",
  "Elegant and credible public presentation",
  "Grassroots and institutional reach",
  "Program models ready for scaling",
  "A growing movement of women and supporters",
  "Strong storytelling, visibility, and documentation",
  "Alignment with wellbeing, inclusion, healing, leadership",
];

const GIVING = [
  "Sponsor one woman",
  "Support an outreach",
  "Sponsor an event",
  "Fund training materials",
  "Support girls' mentorship",
  "Become a monthly partner",
  "Corporate sponsorship",
];

export default function PartnerPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <PageHero
          eyebrow="PARTNER WITH US"
          title={
            <>
              Build restoration
              <br />
              <em>together.</em>
            </>
          }
          sub="A Certain Woman welcomes partnerships with individuals, churches, companies, government institutions, NGOs, development partners, foundations, and community leaders who believe in the restoration, dignity, wellbeing, and empowerment of women and girls."
        />

        {/* Pathways + why partner, merged into one section so the page
            doesn't repeat "here's why, here's how" across two full-height
            blocks. */}
        <section className="bg-cream-1 px-6 py-24 md:px-12 md:py-28">
          <Reveal batch stagger={0.08} className="mx-auto max-w-280">
            <div
              data-reveal
              className="mb-14 flex flex-col items-center text-center"
            >
              <div className="acw-section-label">
                <span className="acw-num">|</span>
                <span>Partnership pathways</span>
              </div>
              <h2 className="acw-page-h2 mt-6">
                <em>Six ways</em>
                <br />
                to walk with us.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {OPPS.map((o) => (
                <div key={o.n} data-reveal className="acw-value-card">
                  <small className="acw-vc-num">{o.n}</small>
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 border-t border-border pt-14 text-center">
              <small
                data-reveal
                className="acw-section-label-mini justify-center"
              >
                WHY PARTNER WITH ACW
              </small>
              <div className="mx-auto mt-5 flex max-w-190 flex-wrap justify-center gap-2.5">
                {WHY.map((w) => (
                  <span
                    key={w}
                    data-reveal
                    className="rounded-full border border-gold/30 bg-cream-2 px-4 py-2 text-[13px] leading-[1.4] text-forest"
                  >
                    {w}
                  </span>
                ))}
              </div>
              <div
                data-reveal
                className="mt-9 flex flex-wrap justify-center gap-3.5"
              >
                <Button asChild variant="editorial" size="pill">
                  <Link
                    href={contactHref({
                      reason: "Partner / Sponsor",
                      prefill:
                        "I would like to become a partner with A Certain Woman.",
                    })}
                  >
                    Become a Partner <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="editorialOutline" size="pill">
                  <Link
                    href={contactHref({
                      reason: "Partner / Sponsor",
                      prefill: "Please send me a partnership brief.",
                    })}
                  >
                    Request Partnership Brief
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Support / give */}
        <section
          id="support"
          className="acw-bg-cream-down px-6 py-24 md:px-12 md:py-28"
        >
          {/* batch: individual targets reveal as they scroll into view, so
              the mobile money cards and note still animate even though
              they sit well below the section's own top edge. */}
          <Reveal batch stagger={0.1} className="mx-auto max-w-280">
            <div
              data-reveal
              className="mb-12 flex flex-col items-center text-center"
            >
              <div className="acw-section-label">
                <span className="acw-num">|</span>
                <span>Support our work</span>
              </div>
              <h2 className="acw-page-h2 mt-6">
                Support the work
                <br />
                of <em>restoration.</em>
              </h2>
              <p className="mx-auto mt-6 max-w-155 text-[17px] leading-[1.65] text-muted-foreground">
                Your support helps A Certain Woman create healing spaces, host
                empowerment programs, support vulnerable women and girls,
                provide outreach care, and build a movement of restoration.
                Every gift helps restore a heart, strengthen a woman, support a
                family, and reclaim a crown.
              </p>
            </div>
            <ul data-reveal className="acw-checklist mx-auto max-w-190">
              {GIVING.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>

            {/* Mobile money: the fastest way to give while secure online
                giving is on the way. Cast in the dark/gold treatment so it
                reads as the trustworthy, "official" payment detail on the
                page rather than another line item. */}
            <div className="mx-auto mt-16 max-w-190">
              <small
                data-reveal
                className="acw-section-label-mini block text-center"
              >
                GIVE BY MOBILE MONEY
              </small>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {mobileMoney.map((m) => (
                  <div
                    key={m.provider}
                    data-reveal
                    className="relative overflow-hidden rounded-md border border-gold/25 bg-forest px-7 py-8 text-center"
                  >
                    <span className="block text-[11px] uppercase tracking-[0.3em] text-gold-2">
                      {m.provider}
                    </span>
                    <span className="mt-4 block font-display text-[30px] tracking-[0.03em] text-cream-1 tabular-nums md:text-[34px]">
                      {m.number}
                    </span>
                    <span className="mt-3 block text-[11px] uppercase tracking-[0.2em] text-cream-1/50">
                      Mobile Money &middot; Sierra Leone
                    </span>
                    <div className="pointer-events-none absolute inset-3 border border-cream-1/10" />
                  </div>
                ))}
              </div>

              <p
                data-reveal
                className="mx-auto mt-7 max-w-130 text-center text-[13px] leading-[1.7] text-muted-foreground"
              >
                Text or email us before or after sending a gift, so we can
                confirm receipt and follow up with a proper acknowledgment
                &mdash;{" "}
                <a
                  href={whatsappHref(
                    "Hello A Certain Woman, I have a question about giving.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold"
                >
                  WhatsApp
                </a>{" "}
                or{" "}
                <a
                  href={mailtoHref}
                  className="text-forest underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold"
                >
                  {contact.email}
                </a>
                .
              </p>

              {/* Informational, not another "give" CTA — the account details
                  above already give visitors what they need to act. */}
              <div data-reveal className="mt-7 flex justify-center">
                <Button asChild variant="editorialOutline" size="pillSm">
                  <a
                    href={whatsappHref(
                      "Hello A Certain Woman, I have a question about giving.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ask about giving <ArrowRight />
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </section>

        <Faq
          className="acw-bg-cream-down"
          label="Questions"
          heading={
            <>
              Partnership,
              <br />
              <em>answered.</em>
            </>
          }
          items={FAQS}
        />

        <Join paths={[]} />
      </main>
      <Footer />
    </>
  );
}
