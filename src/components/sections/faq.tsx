import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

/**
 * Reusable FAQ section: renders an accessible native <details> accordion and
 * emits FAQPage JSON-LD for the same questions. Plain-text answers keep the
 * structured data identical to the visible copy (per Google's guidelines).
 *
 * One <Faq> per page, each describing that page's own questions. Pass the
 * section background via `className` so pages can keep alternating cream tones.
 */
export function Faq({
  label = "Questions",
  heading,
  items,
  className,
}: {
  label?: string;
  heading: React.ReactNode;
  items: FaqItem[];
  className?: string;
}) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className={cn("px-6 py-24 md:px-12 md:py-28", className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Reveal className="mx-auto max-w-280">
        <div className="acw-twoup">
          <div data-reveal className="acw-twoup-left">
            <div className="acw-section-label">
              <span className="acw-num">|</span>
              <span>{label}</span>
            </div>
            <h2 className="acw-page-h2 mt-6">{heading}</h2>
          </div>
          <div data-reveal className="acw-twoup-body">
            <div className="acw-faq">
              {items.map((it) => (
                <details key={it.q} className="acw-faq-item">
                  <summary className="acw-faq-q">
                    <span>{it.q}</span>
                    <span className="acw-faq-icon" aria-hidden />
                  </summary>
                  <div className="acw-faq-a">
                    <p>{it.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
