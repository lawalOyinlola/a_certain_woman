"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Options = {
  /** CSS selector for children to animate — defaults to direct [data-reveal] children. */
  targets?: string;
  /** Overrides for the initial gsap.from state. */
  from?: gsap.TweenVars;
  /** Stagger between children in seconds (default 0.12). */
  stagger?: number;
  /** ScrollTrigger overrides. */
  trigger?: Partial<ScrollTrigger.Vars>;
};

/**
 * Attach `ref` to a section container, mark animatable children with
 * `data-reveal` (or pass a custom `targets` selector). Elements fade and
 * rise into view as the section crosses the viewport — fires once,
 * respects `prefers-reduced-motion`.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>(
  options: Options = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const sel = options.targets ?? "[data-reveal]";
      const targets = el.querySelectorAll<HTMLElement>(sel);
      if (!targets.length) return;

      gsap.from(targets, {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        stagger: options.stagger ?? 0.12,
        clearProps: "opacity,transform",
        ...options.from,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
          ...options.trigger,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
