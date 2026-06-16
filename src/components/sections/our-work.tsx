import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { ArrowRightThin } from "@/components/site/icons";

const AREAS = [
  {
    n: "01",
    title: "Women's Identity & Healing",
    blurb:
      "Rediscovering identity, releasing shame, rebuilding confidence, and finding language for the healing journey.",
  },
  {
    n: "02",
    title: "Leadership & Empowerment",
    blurb:
      "Preparing women to lead in their homes, workplaces, churches, businesses, communities, and public spaces.",
  },
  {
    n: "03",
    title: "Girls & Young Women",
    blurb:
      "Identity, self-worth, values, confidence, education, safety, and direction for the next generation.",
  },
  {
    n: "04",
    title: "Family & Community Wellbeing",
    blurb:
      "When women heal, families are strengthened. We walk with mothers, caregivers, widows, and whole communities.",
  },
  {
    n: "05",
    title: "Advocacy & Partnership",
    blurb:
      "Partnering with institutions, churches, ministries, and community leaders for dignity, protection, and inclusion.",
  },
];

/**
 * Condensed "Our Work" section for the About page. Names the five areas ACW
 * works across; the concrete programmes and gatherings live on /programs and
 * /events, so we link out rather than restate them.
 */
export function OurWork() {
  return (
    <section className="bg-cream-2 px-6 py-24 md:px-12 md:py-28">
      <Reveal batch stagger={0.08} className="mx-auto max-w-[1120px]">
        <div data-reveal className="flex flex-col items-center text-center">
          <div className="acw-section-label">
            <span className="acw-num">|</span>
            <span>Our work</span>
          </div>
          <h2 className="acw-page-h2 mt-6">
            How we <em>serve.</em>
          </h2>
          <p className="mt-6 max-w-[620px] text-[16px] leading-[1.7] text-ink-2">
            A Certain Woman works at the intersection of faith, healing,
            identity, leadership, and community across five connected areas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {AREAS.map((a) => (
            <div key={a.n} data-reveal className="acw-value-card">
              <small className="acw-vc-num">{a.n}</small>
              <h3>{a.title}</h3>
              <p>{a.blurb}</p>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-10 flex justify-center">
          <Link href="/programs" className="acw-link-arrow w-fit">
            See the programmes behind the work
            <ArrowRightThin />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
