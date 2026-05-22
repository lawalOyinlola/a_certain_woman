import Image from "next/image";

export function Founder({ withLabel = true }: { withLabel?: boolean }) {
  return (
    <section id="founder" className="bg-cream-1 px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1320px] items-start gap-16 md:grid-cols-[1fr_1.4fr] md:gap-20">
        {/* Portrait — sticky on desktop */}
        <div className="md:sticky md:top-[120px]">
          <div className="relative border border-border bg-cream-2 p-4">
            <Image
              src="/assets/namaari_founder.jpg"
              alt="Namaari Inanna Kargbo, Founder of A Certain Woman"
              width={500}
              height={620}
              className="aspect-4/5 w-full object-cover"
            />
            <div className="absolute bottom-4 right-4 flex flex-col items-end bg-cream-1 px-4 py-2.5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <small>FOUNDER</small>
              <span className="font-display text-[18px] italic tracking-normal text-forest">
                Namaari
              </span>
            </div>
          </div>
        </div>

        {/* Letter */}
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

          <blockquote className="acw-founder-quote mt-10">
            &ldquo;She is not forgotten.
            <br />
            She is not finished.
            <br />
            She is not ordinary.&rdquo;
          </blockquote>

          <div className="mt-10 flex flex-col gap-5 text-[16px] leading-[1.7] text-ink-2">
            <p>
              A Certain Woman was born from a deep conviction that women need
              more than motivation — they need spaces of restoration, dignity,
              truth, healing, and becoming.
            </p>
            <p>
              Too many women carry invisible battles while still showing up for
              families, communities, workplaces, ministries, and nations. ACW
              exists to remind every woman that she is not forgotten, not
              finished, and not ordinary.
            </p>
          </div>

          <p className="acw-founder-emph mt-8">
            She is seen. She is becoming. She is crowned for purpose.
          </p>

          <div className="mt-12 border-t border-border pt-6">
            <div className="font-display text-[26px] italic text-forest">
              Namaari Inanna Kargbo
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Founder &amp; Custodian, A Certain Woman
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
