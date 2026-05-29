import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Founder } from "@/components/sections/founder";
import { Join } from "@/components/sections/join";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, vision, and values behind A Certain Woman. Founded by Namaari Inanna Kargbo in Freetown, Sierra Leone, ACW is a faith-rooted women's movement built on identity, healing, leadership, and purpose.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About A Certain Woman",
    description:
      "The story, vision, and values behind A Certain Woman. A faith-rooted women's movement founded in Freetown, Sierra Leone, restoring identity, healing hearts, and raising women into the calling God placed on their lives.",
    url: "/about",
  },
  twitter: {
    title: "About A Certain Woman",
    description:
      "Founded by Namaari Inanna Kargbo in Freetown, Sierra Leone. A faith-rooted women's movement restoring identity, healing hearts, and raising leaders.",
  },
};

const VALUES = [
  {
    n: "01",
    title: "Faith",
    body: "We believe restoration is deeply connected to God, grace, prayer, scripture, and purpose.",
  },
  {
    n: "02",
    title: "Dignity",
    body: "Every woman deserves to be seen, heard, respected, and treated with honor.",
  },
  {
    n: "03",
    title: "Healing",
    body: "We create spaces where women can process pain, release shame, and begin again.",
  },
  {
    n: "04",
    title: "Fellowship",
    body: "Women rise stronger when they are surrounded, supported, and loved.",
  },
  {
    n: "05",
    title: "Leadership",
    body: "We equip women to lead with wisdom, courage, compassion, excellence, and integrity.",
  },
  {
    n: "06",
    title: "Service",
    body: "We are committed to communities, families, girls, mothers, and vulnerable women.",
  },
  {
    n: "07",
    title: "Excellence",
    body: "We build with beauty, structure, professionalism, and sacred intention.",
  },
];

const MANDATE = [
  "Community gatherings",
  "Healing and wellness experiences",
  "Leadership development",
  "Mentorship and discipleship",
  "Advocacy and outreach",
  "Identity-based training",
  "Partnerships with institutions, churches, and development partners",
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <PageHero
          eyebrow="ABOUT  ·  WHO WE ARE"
          title={
            <>
              A faith-rooted
              <br />
              <em>movement.</em>
            </>
          }
          sub="A Certain Woman is a faith-rooted women's movement and institutional platform dedicated to restoring identity, nurturing healing, raising purpose-driven women, and building safe, beautiful, transformational spaces for women and girls."
        />

        {/* Why the name */}
        <section className="bg-cream-1 px-6 py-24 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1120px]">
            <div className="acw-twoup">
              <div className="acw-twoup-left">
                <div className="acw-section-label">
                  <span className="acw-num">|</span>
                  <span>Why the name</span>
                </div>
                <h2 className="acw-page-h2 mt-6">
                  Why
                  <br />
                  <em>&ldquo;A Certain Woman?&rdquo;</em>
                </h2>
              </div>
              <div className="acw-twoup-body">
                <p>
                  In scripture and in life, many unnamed women carried stories
                  of pain, faith, courage, encounter, restoration, and
                  transformation. Though the world may not always name her, God
                  sees her.
                </p>
                <p>
                  A Certain Woman represents every woman whose story matters.
                  The woman who has survived silently, served faithfully, loved
                  deeply, fallen, risen, waited, prayed, rebuilt, and continued.
                </p>
                <p className="acw-founder-emph">
                  She is not just a woman. She is a certain woman. Seen. Called.
                  Restored. Crowned.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="bg-cream-2 px-6 py-24 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1120px]">
            <div className="acw-twoup">
              <div className="acw-twoup-left">
                <div className="acw-section-label">
                  <span className="acw-num">|</span>
                  <span>Vision &amp; Mission</span>
                </div>
                <h2 className="acw-page-h2 mt-6">
                  Where we
                  <br />
                  are <em>going.</em>
                </h2>
              </div>
              <div className="acw-twoup-body">
                <small className="acw-section-label-mini">VISION</small>
                <p>
                  To see women restored in identity, healed in heart,
                  strengthened in faith, empowered in leadership, and crowned to
                  live purposefully in their homes, communities, nations, and
                  generations.
                </p>
                <small className="acw-section-label-mini mt-6">MISSION</small>
                <p>
                  To create safe, faith-rooted, and transformational spaces
                  where women and girls can heal, rediscover identity, build
                  confidence, develop leadership, access support, and rise into
                  purposeful impact.
                </p>
                <small className="acw-section-label-mini mt-6">
                  OUR MANDATE
                </small>
                <p>
                  A Certain Woman carries a mandate to restore hearts, reclaim
                  crowns, and raise women who are whole, wise, healed,
                  dignified, and purpose-driven.
                </p>
                <ul className="acw-checklist">
                  {MANDATE.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-cream-1 px-6 py-24 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1120px]">
            <div className="flex flex-col items-center text-center">
              <div className="acw-section-label">
                <span className="acw-num">|</span>
                <span>Our values</span>
              </div>
              <h2 className="acw-page-h2 mt-6">
                The <em>seven</em> we live by.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {VALUES.map((v) => (
                <div key={v.n} className="acw-value-card">
                  <small className="acw-vc-num">{v.n}</small>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Founder withLabel={false} />

        {/* Closing */}
        <section className="bg-cream-2 px-6 py-24 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1120px] text-center">
            <h2 className="acw-page-h2">
              <em>A Certain Woman</em>
              <br />
              is not only a platform.
            </h2>
            <p className="mx-auto mt-8 max-w-[600px] font-display text-[18px] italic leading-[1.65] text-muted-foreground">
              It is a table. It is a covering. It is a mirror. It is a movement.
              <br />
              It is a call to every woman becoming whole.
            </p>
          </div>
        </section>

        <Join />
      </main>
      <Footer />
    </>
  );
}
