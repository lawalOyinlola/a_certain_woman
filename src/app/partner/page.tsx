import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Join } from "@/components/sections/join";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Six partnership pathways — sponsor an event, fund the Identity Academy, partner as a church, company, or government to support the restoration of women and girls.",
  alternates: { canonical: "/partner" },
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
          <div className="mx-auto max-w-[1120px]">
            <div className="mb-14 flex flex-col items-center text-center">
              <div className="acw-section-label">
                <span className="acw-num">I.</span>
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
                <div key={o.n} className="acw-value-card">
                  <small className="acw-vc-num">{o.n}</small>
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why partner */}
        <section className="bg-cream-2 px-6 py-24 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1120px]">
            <div className="acw-twoup">
              <div className="acw-twoup-left">
                <div className="acw-section-label">
                  <span className="acw-num">II.</span>
                  <span>Why partner</span>
                </div>
                <h2 className="acw-page-h2 mt-6">
                  Why
                  <br />
                  <em>partner</em> with ACW?
                </h2>
              </div>
              <div className="acw-twoup-body">
                <ul className="acw-checklist">
                  {WHY.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3.5">
                  <Button asChild variant="editorial" size="pill">
                    <Link href="/contact">
                      Become a Partner <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="editorialOutline" size="pill">
                    <Link href="/contact">Request Partnership Brief</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support / give */}
        <section id="support" className="bg-cream-1 px-6 py-24 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1120px]">
            <div className="mb-12 flex flex-col items-center text-center">
              <div className="acw-section-label">
                <span className="acw-num">III.</span>
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
            <ul className="acw-checklist mx-auto max-w-[760px]">
              {GIVING.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <div className="mt-12 flex justify-center">
              <Button asChild variant="editorial" size="pill">
                <Link href="/contact">
                  Give / Support ACW <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Join withLabel={false} />
      </main>
      <Footer />
    </>
  );
}
