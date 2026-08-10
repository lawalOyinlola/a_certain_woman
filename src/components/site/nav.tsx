"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { contactHref } from "@/config/site";

// The header "Join the Movement" pills arrive at the contact form pre-selected
// and pre-messaged, matching the hero and the invitation block.
const JOIN_HREF = contactHref({
  reason: "Join the Movement",
  prefill: "I would like to join the movement.",
});

// Shared top-level link styling: colour shift + a gold underline that wipes in
// from the left on hover, and a faint press. The active page keeps the
// underline drawn and the text darkened.
const NAV_LINK =
  "relative inline-flex items-center transition-colors duration-200 hover:text-forest active:translate-y-px " +
  "after:pointer-events-none after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100";
const NAV_LINK_ACTIVE = "text-forest after:scale-x-100";

type NavLink = { label: string; href: string };
type NavGroup = { label: string; children: NavLink[] };
type NavItem = NavLink | NavGroup;

const items: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Our Story",
    children: [
      { label: "Founder's Letter", href: "/founder" },
      { label: "Stories", href: "/stories" },
    ],
  },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Partner", href: "/partner" },
  { label: "Contact", href: "/contact" },
];

const isGroup = (item: NavItem): item is NavGroup => "children" in item;

/** Double chevron used as the hover/active marker on dropdown menu items. */
function ChevronsRight({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M1.5 1l4 4-4 4" />
      <path d="M6.5 1l4 4-4 4" />
    </svg>
  );
}

/** Desktop disclosure for a grouped nav item. Opens on hover and on keyboard
 *  focus, closes on Escape or when focus/pointer leaves, so it works for mouse
 *  and keyboard alike. */
function NavDropdown({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const groupActive = group.children.some((c) => pathname === c.href);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => firstLinkRef.current?.focus());
          }
        }}
        className={cn(
          NAV_LINK,
          "gap-1.5 uppercase tracking-[0.18em] aria-expanded:after:scale-x-100",
          groupActive && NAV_LINK_ACTIVE,
        )}
      >
        {group.label}
        <svg
          width="9"
          height="6"
          viewBox="0 0 9 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          aria-hidden
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          <path d="M1 1l3.5 3.5L8 1" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label={group.label}
          className="absolute left-1/2 top-full z-10 min-w-52.5 -translate-x-1/2 pt-3"
        >
          <div className="flex flex-col gap-1 border border-border bg-background p-2 shadow-[0_18px_44px_-22px_rgba(31,38,32,0.3)]">
            {group.children.map((child, i) => {
              const childActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={child.href}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group/item flex items-center justify-between gap-4 whitespace-nowrap px-3 py-2 text-left transition-colors hover:text-forest",
                    childActive && "text-forest",
                  )}
                >
                  <span>{child.label}</span>
                  <ChevronsRight
                    className={cn(
                      "size-3 shrink-0 text-gold transition-all duration-200",
                      childActive
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100",
                    )}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
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
      <div className="mx-auto grid max-w-360 grid-cols-2 items-center gap-8 px-6 md:px-12 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="flex items-center gap-2 justify-self-start text-forest"
        >
          <Image
            src="/assets/logo.png"
            alt="A Certain Woman"
            width={48}
            height={48}
            className={cn(
              "w-auto object-contain transition-all",
              scrolled ? "h-9" : "h-11",
            )}
            preload
          />
        </Link>

        <div className="hidden items-center justify-self-center gap-7 text-[11px] uppercase tracking-[0.18em] text-muted-foreground lg:flex">
          {items.map((item) =>
            isGroup(item) ? (
              <NavDropdown key={item.label} group={item} pathname={pathname} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  NAV_LINK,
                  pathname === item.href && NAV_LINK_ACTIVE,
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center justify-end gap-2 justify-self-end lg:col-start-3">
          <Link
            href={JOIN_HREF}
            className="hidden whitespace-nowrap rounded-full border border-forest px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-forest transition-colors hover:bg-forest hover:text-cream-1 active:translate-y-px md:inline-flex"
          >
            Join the Movement
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex flex-col gap-1.25 p-2 lg:hidden"
          >
            <span className="block h-px w-5 bg-forest" />
            <span className="block h-px w-5 bg-forest" />
            <span className="block h-px w-5 bg-forest" />
          </button>
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-x-0 top-full flex flex-col gap-4 border-t border-border bg-background px-6 py-6 font-display text-[22px] text-forest md:px-12 lg:hidden"
        >
          {items.map((item) =>
            isGroup(item) ? (
              <div key={item.label} className="flex flex-col gap-3">
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {item.label}
                </span>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    aria-current={pathname === child.href ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 pl-4 transition-colors hover:text-gold",
                      pathname === child.href && "text-gold",
                    )}
                  >
                    {pathname === child.href && (
                      <ChevronsRight className="size-3.5 shrink-0" />
                    )}
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "transition-colors hover:text-gold",
                  pathname === item.href && "text-gold",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            href={JOIN_HREF}
            className="mt-4 inline-flex w-fit rounded-full border border-forest px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-forest transition-colors hover:bg-forest hover:text-cream-1 active:translate-y-px"
          >
            Join the Movement
          </Link>
        </div>
      )}
    </nav>
  );
}
