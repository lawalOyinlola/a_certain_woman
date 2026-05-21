"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const items: Array<[string, string]> = [
  ["About", "/about"],
  ["Our Work", "/our-work"],
  ["Programs", "/programs"],
  // ["Events", "/events"],
  ["Partner", "/partner"],
  // ["Stories", "/stories"],
  ["Contact", "/contact"],
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "py-3 backdrop-blur-md border-b border-border bg-background/85"
          : "py-5 bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 md:px-12">
        <Link href="/" className="flex items-center gap-2 text-forest">
          <Image
            src="/assets/logo.png"
            alt="A Certain Woman"
            width={140}
            height={40}
            className={cn(
              "w-auto object-contain transition-all",
              scrolled ? "h-9" : "h-11",
            )}
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground xl:flex">
          {items.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="transition-colors hover:text-gold"
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="/partner"
          className="hidden whitespace-nowrap rounded-full border border-forest px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-forest transition-colors hover:bg-forest hover:text-cream-1 md:inline-flex"
        >
          Join the Movement
        </Link>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          className="flex flex-col gap-[5px] p-2 xl:hidden"
        >
          <span className="block h-px w-5 bg-forest" />
          <span className="block h-px w-5 bg-forest" />
          <span className="block h-px w-5 bg-forest" />
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-x-0 top-full flex flex-col gap-4 border-t border-border bg-background px-6 py-6 font-display text-[22px] text-forest md:px-12 xl:hidden"
        >
          {items.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="transition-colors hover:text-gold"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/partner"
            className="mt-4 inline-flex w-fit rounded-full border border-forest px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-forest transition-colors hover:bg-forest hover:text-cream-1"
          >
            Join the Movement
          </Link>
        </div>
      )}
    </nav>
  );
}
