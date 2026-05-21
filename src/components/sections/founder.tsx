function FounderPlaceholder() {
  return (
    <svg
      viewBox="0 0 500 620"
      preserveAspectRatio="xMidYMid slice"
      className="block aspect-4/5 w-full"
    >
      <defs>
        <linearGradient id="acw-founder-fg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--acw-cream-2)" />
          <stop offset="1" stopColor="var(--acw-cream-3)" />
        </linearGradient>
      </defs>
      <rect width="500" height="620" fill="url(#acw-founder-fg)" />
      <g opacity="0.6">
        <ellipse cx="250" cy="230" rx="78" ry="92" fill="var(--acw-green)" />
        <path
          d="M110 620 Q110 420 250 380 Q390 420 390 620 Z"
          fill="var(--acw-green)"
        />
      </g>
      <g
        transform="translate(250 230)"
        fill="none"
        stroke="var(--acw-gold)"
        strokeWidth="1"
      >
        <circle r="118" opacity="0.5" />
        <circle r="132" opacity="0.3" />
      </g>
      <g transform="translate(250,120)" fill="var(--acw-gold)" opacity="0.7">
        <path d="M-30 20 L-22 -6 L-10 8 L0 -18 L10 8 L22 -6 L30 20 Z" />
      </g>
    </svg>
  );
}

export function Founder({ withLabel = true }: { withLabel?: boolean }) {
  return (
    <section id="founder" className="bg-cream-1 px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1320px] items-center gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
        <div className="relative border border-border bg-cream-2 p-4">
          <FounderPlaceholder />
          <div className="absolute bottom-4 right-4 flex flex-col items-end bg-cream-1 px-4 py-2.5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <small>FOUNDER</small>
            <span className="font-display text-[18px] italic tracking-normal text-forest">
              Namaari
            </span>
          </div>
        </div>

        <div>
          {withLabel && (
            <div className="acw-section-label">
              <span className="acw-num">V.</span>
              <span>From the Founder</span>
            </div>
          )}
          <h2 className="acw-display mt-6">
            A letter
            <br />
            <em>from her hand.</em>
          </h2>

          <div className="mt-9 flex flex-col gap-5 text-[16px] leading-[1.7] text-ink-2">
            <p className="acw-founder-lead">
              &ldquo;A Certain Woman was born from a deep conviction that women
              need more than motivation — they need spaces of restoration,
              dignity, truth, healing, and becoming.&rdquo;
            </p>
            <p>
              Too many women carry invisible battles while still showing up for
              families, communities, workplaces, ministries, and nations. ACW
              exists to remind every woman that she is not forgotten, not
              finished, and not ordinary.
            </p>
            <p className="acw-founder-emph">
              She is seen. She is becoming. She is crowned for purpose.
            </p>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <div className="font-display text-[24px] italic text-forest">
              Namaari Inanna Kargbo
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Founder &amp; Custodian, A Certain Woman
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
