"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Same-page anchor links ("#apply") for the whole site.
 *
 * Browsers only scroll to an anchor when the URL changes. Once the address
 * bar already ends in #apply, a second click on the same link does nothing,
 * and a refresh jumps back to the anchor instead of where the reader was.
 * So this handler:
 *
 * 1. scrolls to the target on every same-page anchor click, smoothly unless
 *    the visitor prefers reduced motion, and never writes the #hash into the
 *    URL;
 * 2. removes a #hash the page arrived with (a shared link), once the browser
 *    has scrolled to it. A refresh then restores the reader's own position,
 *    which browsers do by default.
 *
 * It runs in the capture phase, before Next.js's <Link> handler, which
 * leaves a click alone when it has already been handled.
 */
export function HashLinks() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;

      const url = new URL(link.href, window.location.href);
      const samePage =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search;
      if (!samePage || !url.hash) return;

      const id = decodeURIComponent(url.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

      // Move keyboard focus to the section too, as a native anchor would.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });

      if (window.location.hash) stripHash();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // After arriving with a #hash, give the browser (or Next.js) time to scroll
  // to it, then take it out of the address bar.
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.setTimeout(stripHash, 1200);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}

function stripHash() {
  const { pathname, search } = window.location;
  window.history.replaceState(window.history.state, "", pathname + search);
}
