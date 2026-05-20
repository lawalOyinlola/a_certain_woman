"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const QUOTES = [
  {
    n: "01",
    word: "becoming",
    body: "Every day a little more herself. Every day a little less the world's.",
  },
  {
    n: "02",
    word: "Healing",
    body: "Slowly, honestly, without apology. Healing is the hardest holy work.",
  },
  {
    n: "03",
    word: "Discerning",
    body: "Every yes is weighed. Every no is sacred. She does not rush her knowing.",
  },
  {
    n: "04",
    word: "Walking in dignity",
    body: "She carries herself with quiet authority. Not loud. Not fragile. Simply whole.",
  },
  {
    n: "05",
    word: "Led by grace",
    body: "Not by hustle. Not by hunger. Grace, soft and steady, is her guide.",
  },
  {
    n: "06",
    word: "Rebuilding with wisdom",
    body: "She honors what was broken, learns from it, and builds again — not in haste, but with intention.",
  },
  {
    n: "07",
    word: "A certain woman",
    body: "Set apart. Set free. Set on a foundation that no season can shake.",
  },
];

export function Quotes() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % QUOTES.length), 5200);
    return () => clearInterval(id);
  }, [paused]);

  const q = QUOTES[i];

  return (
    <section
      id="quotes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden bg-forest px-6 py-28 text-cream-1 md:px-12 md:py-40"
    >
      <div className="acw-bg-quote-glow pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1100px]">
        <div className="acw-section-label acw-section-label--light">
          <span className="acw-num">III.</span>
          <span>Seven affirmations</span>
        </div>

        <div className="mt-12 grid grid-cols-1 items-end gap-8 lg:grid-cols-[auto_1fr_auto]">
          <div className="flex items-baseline gap-3 font-display italic">
            <span className="text-[64px] leading-none text-gold-2">{q.n}</span>
            <span className="h-px w-12 bg-cream-1/30" />
            <span className="text-[14px] text-cream-1/60">
              of {String(QUOTES.length).padStart(2, "0")}
            </span>
          </div>

          <div key={i} className="acw-fade">
            <p className="text-[12px] uppercase tracking-[0.32em] text-cream-1/60">
              She is
            </p>
            <h2 className="mt-3 font-display text-[clamp(48px,7vw,108px)] leading-[1.02] tracking-[-0.015em]">
              <em className="text-gold-2">{q.word}.</em>
            </h2>
            <p className="mt-6 max-w-[620px] font-display text-[20px] italic leading-[1.55] text-cream-1/85">
              {q.body}
            </p>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-5">
          <button
            onClick={() => setI((p) => (p - 1 + QUOTES.length) % QUOTES.length)}
            aria-label="Previous"
            className="text-cream-1/70 transition-colors hover:text-gold-2"
          >
            <svg
              width="22"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M19 7H1M6 1L1 7l5 6" />
            </svg>
          </button>
          <div className="flex flex-1 items-center gap-2">
            {QUOTES.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Quote ${k + 1}`}
                className={cn(
                  "h-px flex-1 transition-all",
                  k === i ? "bg-gold-2" : "bg-cream-1/20 hover:bg-cream-1/40",
                )}
              />
            ))}
          </div>
          <button
            onClick={() => setI((p) => (p + 1) % QUOTES.length)}
            aria-label="Next"
            className="text-cream-1/70 transition-colors hover:text-gold-2"
          >
            <svg
              width="22"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M1 7h18M14 1l5 6-5 6" />
            </svg>
          </button>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-1.5 md:grid-cols-4 lg:grid-cols-7">
          {QUOTES.map((qq, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-md border border-cream-1/15 p-4 text-left transition-all",
                k === i
                  ? "border-gold-2/60 bg-cream-1/5"
                  : "hover:border-cream-1/30 hover:bg-cream-1/3",
              )}
            >
              <span className="text-[11px] uppercase tracking-[0.28em] text-cream-1/50">
                {qq.n}
              </span>
              <span className="font-display text-[18px] italic text-cream-1">
                {qq.word}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
