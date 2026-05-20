import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-forest overflow-hidden px-6 pb-12 pt-16 text-cream-1 md:px-12 md:pt-24">
      <div className="mx-auto w-full max-w-[1280px]">
        {/* ── Hero brand block ── */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10">
          {/* Logo */}
          <Image
            src="/assets/logo.png"
            alt="A Certain Woman logo"
            width={320}
            height={320}
            className="h-24 w-24 shrink-0 object-contain sm:h-80 sm:w-80"
            priority
          />

          {/* Wordmark – font size is purely vw-based so it scales with the viewport */}
          <div className="flex flex-col font-display tracking-[-0.02em] leading-[0.92]">
            <div className="flex items-baseline gap-[0.15em]">
              <span className="text-[clamp(40px,9vw,160px)]">A</span>
              <em className="italic text-gold-2 text-[clamp(40px,9vw,160px)]">
                Certain
              </em>
            </div>
            <span className="text-[clamp(40px,9vw,160px)]">Woman.</span>
          </div>
        </div>

        <Separator className="mt-12 bg-cream-1/15" />

        {/* ── Nav columns ── */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              h: "The sisterhood",
              items: ["Our story", "Four pillars", "Founders", "Press"],
            },
            {
              h: "Gather",
              items: [
                "Find a circle",
                "Host a circle",
                "Annual gathering",
                "Volunteer",
              ],
            },
            {
              h: "Receive",
              items: [
                "Weekly letter",
                "The reader",
                "Resources",
                "Prayer journal",
              ],
            },
            {
              h: "Follow softly",
              items: ["TikTok", "Facebook", "Instagram"],
            },
          ].map((col) => (
            <div key={col.h}>
              <small className="text-[10px] uppercase tracking-[0.32em] text-cream-1/50">
                {col.h}
              </small>
              <ul className="mt-4 space-y-2 text-[14px] text-cream-1/85">
                {col.items.map((it) => (
                  <li key={it} className="transition-colors hover:text-gold-2">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mt-12 bg-cream-1/15" />

        {/* ── Legal bar ── */}
        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-[10px] uppercase tracking-[0.28em] text-cream-1/50 sm:flex-row sm:text-[11px]">
          <span>
            © {new Date().getFullYear()} A Certain Woman. All rights reserved.
          </span>
          <span>Made with care, in quiet rooms.</span>
        </div>
      </div>
    </footer>
  );
}
