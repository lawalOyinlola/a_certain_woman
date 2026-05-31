"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// SSR-safe layout effect: useLayoutEffect in the browser, useEffect on the
// server. "use client" components still SSR in Next.js, so we fall back to
// useEffect there to avoid the "useLayoutEffect does nothing on the server"
// warning while still hiding elements before paint in the browser.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Options = {
  /** CSS selector for children to animate — defaults to direct [data-reveal] children. */
  targets?: string;
  /** Overrides for the initial gsap.from state. */
  from?: gsap.TweenVars;
  /** Stagger between children in seconds (default 0.12). */
  stagger?: number;
  /** ScrollTrigger overrides. */
  trigger?: Partial<ScrollTrigger.Vars>;
  /**
   * Reveal each target individually as it enters the viewport (via
   * ScrollTrigger.batch). Ideal for grids and tall stacked lists so items
   * animate progressively instead of all at once. `stagger` groups items
   * that enter together.
   */
  batch?: boolean;
};

/**
 * Attach `ref` to a section container, mark animatable children with
 * `data-reveal` (or pass a custom `targets` selector). Elements fade and
 * rise into view as the section crosses the viewport — fires once,
 * respects `prefers-reduced-motion`.
 *
 * Options are intentionally excluded from the dependency array: this is a
 * one-time setup hook whose config is fixed at call-site (static options
 * pattern). If reactive re-setup is needed, pass a dependency via the
 * component's own key or remount the container.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>(
  options: Options = {},
) {
  const ref = useRef<T>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const sel = options.targets ?? "[data-reveal]";
      const targets = el.querySelectorAll<HTMLElement>(sel);
      if (!targets.length) return;

      const from = { y: 36, ...options.from };

      // Per-element reveal — each target animates as it scrolls into view.
      if (options.batch) {
        // Set initial hidden state synchronously before paint to prevent FOUC.
        gsap.set(targets, { opacity: 0, ...from });
        ScrollTrigger.batch(targets, {
          start: options.trigger?.start ?? "top 88%",
          once: true,
          onEnter: (group) =>
            gsap.to(group, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: options.stagger ?? 0.1,
              overwrite: true,
            }),
        });
        return;
      }

      // Single batched reveal — all targets stagger when the section enters.
      gsap.from(targets, {
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: options.stagger ?? 0.12,
        clearProps: "opacity,transform",
        ...from,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
          ...options.trigger,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}
