"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const items: Array<[string, string]> = [
  ["Story", "/#story"],
  ["Pillars", "/#pillars"],
  ["Events", "/events"],
  ["Gallery", "/gallery"],
  ["Sisterhood", "/#join"],
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

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
          : "py-5 bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 md:px-12">
        <Link href="/" className="flex items-center gap-2 text-forest">
          <Image
            src="/assets/logo.png"
            alt="A Certain Woman"
            width={140}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden items-center gap-9 text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:flex">
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
          href="/#join"
          className="rounded-full border border-forest px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-forest transition-colors hover:bg-forest hover:text-cream-1"
        >
          Join
        </Link>
      </div>
    </nav>
  );
}