import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-forest px-6 pb-12 pt-24 text-cream-1 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-baseline justify-center gap-3 font-display tracking-[-0.02em]">
          <span className="text-[clamp(64px,10vw,160px)]">A</span>
          <em className="text-[clamp(64px,10vw,160px)] italic text-gold-2">
            Certain
          </em>
          <span className="text-[clamp(64px,10vw,160px)]">Woman.</span>
        </div>

        <Separator className="mt-16 bg-cream-1/15" />

        <div className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4">
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

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-[11px] uppercase tracking-[0.28em] text-cream-1/50 md:flex-row">
          <span>© MMXXVI A Certain Woman. All rights reserved.</span>
          <span>Made with care, in quiet rooms.</span>
        </div>
      </div>
    </footer>
  );
}