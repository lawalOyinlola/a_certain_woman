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
import { contact, contactHref, mailtoHref, whatsappHref } from "@/config/site";

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

        {/* Pathways */}
        <section className="bg-cream-1 px-6 py-24 md:px-12 md:py-28">
          <Reveal batch stagger={0.08} className="mx-auto max-w-[1120px]">
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
          </Reveal>
        </section>

        {/* Why partner */}
        <section className="bg-cream-2 px-6 py-24 md:px-12 md:py-28">
          <Reveal className="mx-auto max-w-[1120px]">
            <div className="acw-twoup">
              <div data-reveal className="acw-twoup-left">
                <div className="acw-section-label">
                  <span className="acw-num">|</span>
                  <span>Why partner</span>
                </div>
                <h2 className="acw-page-h2 mt-6">
                  Why
                  <br />
                  <em>partner</em> with ACW?
                </h2>
              </div>
              <div data-reveal className="acw-twoup-body">
                <ul className="acw-checklist">
                  {WHY.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3.5">
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
            </div>
          </Reveal>
        </section>

        {/* Support / give */}
        <section
          id="support"
          className="bg-cream-1 px-6 py-24 md:px-12 md:py-28"
        >
          <Reveal className="mx-auto max-w-[1120px]">
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
              <p className="mx-auto mt-6 max-w-[620px] text-[17px] leading-[1.65] text-muted-foreground">
                Your support helps A Certain Woman create healing spaces, host
                empowerment programs, support vulnerable women and girls,
                provide outreach care, and build a movement of restoration.
                Every gift helps restore a heart, strengthen a woman, support a
                family, and reclaim a crown.
              </p>
            </div>
            <ul data-reveal className="acw-checklist mx-auto max-w-[760px]">
              {GIVING.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <div data-reveal className="mt-12 flex flex-col items-center gap-5">
              <Button asChild variant="editorial" size="pill">
                <Link
                  href={contactHref({
                    reason: "Partner / Sponsor",
                    prefill:
                      "I would like to support the work of A Certain Woman. Here is how I would like to give: ",
                  })}
                >
                  Give / Support ACW <ArrowRight />
                </Link>
              </Button>
              {/* Interim: secure online giving is on the way. Until then we
                  arrange gifts personally, and offer a direct human channel so
                  giving isn't gated behind a form alone. */}
              <p className="max-w-[520px] text-center text-[13px] leading-[1.7] text-muted-foreground">
                Secure online giving is coming soon. For now, tell us how you
                would like to give and we will arrange it with you personally,
                or reach us directly on{" "}
                <a
                  href={whatsappHref(
                    "Hello A Certain Woman, I would like to support your work.",
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
            </div>
          </Reveal>
        </section>

        <Faq
          className="bg-cream-2"
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

        <Join paths={["join", "programs", "events"]} />
      </main>
      <Footer />
    </>
  );
}
