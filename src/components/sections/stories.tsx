import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORIES = [
  {
    cat: "HEALING",
    title: "She Was Not Forgotten",
    excerpt:
      "The story of a woman who waited in silence for years, and the morning grace finally spoke her name.",
    read: "6 min read",
  },
  {
    cat: "LEADERSHIP",
    title: "The Woman Who Began Again",
    excerpt:
      "After loss, after failure, after the room emptied, she stood up and built the room she had needed.",
    read: "4 min read",
  },
  {
    cat: "FOUNDER REFLECTION",
    title: "Healing Is Holy Work",
    excerpt:
      "A letter to the woman who is tired of pretending she is fine. From Namaari, with love.",
    read: "5 min read",
  },
];

export function StoriesPreview() {
  return (
    <section id="stories" className="bg-cream-2 px-6 py-32 md:px-12 md:py-36">
      <div className="mx-auto mb-14 max-w-[1320px]">
        <div className="acw-section-label">
          <span className="acw-num">|</span>
          <span>Stories of becoming</span>
        </div>
        <div className="mt-6 grid items-end gap-16 md:grid-cols-[1.2fr_1fr]">
          <h2 className="acw-display">
            Every woman
            <br />
            carries a <em>story.</em>
          </h2>
          <p className="text-[16px] leading-[1.65] text-muted-foreground">
            Some stories are still healing. Some are still blooming. Some are
            still finding language. At A Certain Woman, we honor the journey of
            becoming.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1320px] gap-6 md:grid-cols-3">
        {STORIES.map((s) => (
          <article
            key={s.title}
            className="group flex min-h-[320px] flex-col border border-border bg-cream-1 p-10 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_28px_60px_-28px_rgba(31,38,32,0.18)]"
          >
            <small className="text-[10px] uppercase tracking-[0.32em] text-gold">
              {s.cat}
            </small>
            <h3 className="mt-6 font-display text-[30px] leading-[1.05] tracking-[-0.01em] text-forest">
              {s.title}
            </h3>
            <p className="mt-4 flex-1 text-[15px] leading-[1.65] text-muted-foreground">
              {s.excerpt}
            </p>
            <div className="mt-7 flex items-center justify-between border-t border-dashed border-border pt-5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              <span>{s.read}</span>
              <Link
                href="/stories"
                className="text-forest transition-all group-hover:translate-x-1 group-hover:text-gold"
                aria-label={`Read: ${s.title}`}
              >
                <svg
                  width="22"
                  height="14"
                  viewBox="0 0 22 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M1 7h20M16 1l5 6-5 6" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Button asChild variant="editorialOutline" size="pill">
          <Link href="/stories">All stories &amp; the journal</Link>
        </Button>
      </div>
    </section>
  );
}
