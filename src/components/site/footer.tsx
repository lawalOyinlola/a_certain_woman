import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const COLS = [
  {
    h: "Explore",
    items: [
      ["Home", "/"],
      ["About", "/about"],
      ["Our Work", "/our-work"],
      ["Programs", "/programs"],
      ["Events", "/events"],
    ] as const,
  },
  {
    h: "Engage",
    items: [
      ["Partner With Us", "/partner"],
      ["Stories", "/stories"],
      ["Gallery", "/gallery"],
      ["Contact", "/contact"],
    ] as const,
  },
  {
    h: "Connect",
    items: [
      ["Freetown, Sierra Leone", ""],
      ["info@acertainwoman.org", ""],
      ["WhatsApp / Phone", ""],
    ] as const,
  },
  {
    h: "Follow softly",
    items: [
      ["Instagram", ""],
      ["Facebook", ""],
      ["TikTok", ""],
    ] as const,
  },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-forest px-6 pt-24 pb-9 text-cream-1 md:px-12">
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Grand type lockup */}
        <div className="acw-footer-grand">
          <span>A</span>
          <em>Certain</em>
          <span>Woman.</span>
        </div>

        {/* Tagline */}
        <div className="my-8 text-center font-display text-[18px] italic tracking-wider text-gold-2">
          <em> Reclaiming Crowns. Restoring Hearts.</em>
        </div>

        <Separator className="bg-cream-1/15" />

        {/* Nav columns */}
        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          {COLS.map((col) => (
            <div key={col.h}>
              <small className="block text-[11px] uppercase tracking-[0.32em] text-gold-2">
                {col.h}
              </small>
              <ul className="mt-5 space-y-2.5 font-display text-[22px] text-cream-1/85">
                {col.items.map(([label, href]) => (
                  <li
                    key={label}
                    className="transition-all hover:translate-x-1 hover:text-gold-2"
                  >
                    {href ? (
                      <Link href={href}>{label}</Link>
                    ) : (
                      <span>{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mt-14 bg-cream-1/15" />

        {/* Legal bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-cream-1/50 md:flex-row">
          <span>
            A faith-rooted women&apos;s movement restoring identity, healing
            hearts, raising leaders.
          </span>
          <div className="flex-center">
            <span>
              © {new Date().getFullYear()} A Certain Woman. All Rights Reserved.
            </span>
            <Image
              src="/assets/logo.png"
              alt="A Certain Woman"
              width={20}
              height={20}
              className="h-5 w-5 object-contain transition-all"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
