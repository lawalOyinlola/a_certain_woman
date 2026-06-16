import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  siteTagline,
  contact,
  socials,
  mailtoHref,
  telHref,
} from "@/config/site";

const NAV_COLS = [
  {
    h: "Explore",
    items: [
      ["Home", "/"],
      ["About", "/about"],
      ["Founder's Letter", "/founder"],
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
];

// External / protocol links (mailto, tel, wa.me, social) rendered as <a>.
const CONNECT = [
  { label: contact.location, href: null },
  { label: contact.email, href: mailtoHref },
  { label: contact.phoneDisplay, href: telHref },
  { label: "WhatsApp", href: contact.whatsappUrl, external: true },
];

const FOLLOW = [socials.instagram, socials.tiktok, socials.facebook].filter(
  (s): s is NonNullable<typeof s> => s !== null,
);

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
          <em>{siteTagline}</em>
        </div>

        <Separator className="bg-cream-1/15" />

        {/* Nav + contact columns */}
        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          {NAV_COLS.map((col) => (
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
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect */}
          <div>
            <small className="block text-[11px] uppercase tracking-[0.32em] text-gold-2">
              Connect
            </small>
            <ul className="mt-5 space-y-2.5 font-display text-[22px] text-cream-1/85">
              {CONNECT.map(({ label, href, external }) => (
                <li
                  key={label}
                  className="transition-all hover:translate-x-1 hover:text-gold-2"
                >
                  {href ? (
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div className="sm:col-span-2 md:col-span-1">
            <small className="block text-[11px] uppercase tracking-[0.32em] text-gold-2">
              Follow softly
            </small>
            <ul className="mt-5 space-y-2.5 font-display text-[22px] text-cream-1/85">
              {FOLLOW.map((s) => (
                <li
                  key={s.label}
                  className="transition-all hover:translate-x-1 hover:text-gold-2"
                >
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={`${s.label} — ${s.handle} (opens in a new tab)`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mt-14 bg-cream-1/15" />

        {/* Legal bar */}
        <div className="mt-8 flex flex-col items-center gap-4 text-center text-[11px] uppercase leading-relaxed tracking-[0.12em] text-cream-1/70">
          <span className="max-w-4xl">
            A faith-rooted women&apos;s movement restoring identity, healing
            hearts, raising leaders, and reclaiming crowns.
          </span>
          <div className="flex items-center gap-2.5">
            <Image
              src="/assets/logo.png"
              alt="A Certain Woman"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
            <span>
              © {new Date().getFullYear()} A Certain Woman. All Rights Reserved.
            </span>
          </div>
        </div>

        {/* Builder credit */}
        <div className="mt-6 text-center text-[10px] uppercase tracking-[0.24em] text-cream-1/60">
          <span>Site by </span>
          <a
            href="https://www.lawaloyinlola.com/"
            target="_blank"
            rel="noopener noreferrer me"
            className="transition-colors hover:text-gold-2 focus-visible:text-gold-2"
            aria-label="LAWAL Oyinlola, portfolio (opens in a new tab)"
          >
            LAWAL
          </a>
        </div>
      </div>
    </footer>
  );
}
