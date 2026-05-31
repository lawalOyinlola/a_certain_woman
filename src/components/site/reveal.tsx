"use client";

import type { ReactNode } from "react";
import type gsap from "gsap";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

/**
 * Client wrapper that scroll-reveals its `[data-reveal]` descendants (or a
 * custom `targets` selector) without forcing the parent to be a client
 * component. Lets server-rendered sections keep their SSR/SEO while still
 * animating on scroll. Honors prefers-reduced-motion and fires once.
 */
export function Reveal({
  children,
  className,
  stagger,
  from,
  targets,
  start,
  batch,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  from?: gsap.TweenVars;
  targets?: string;
  start?: string;
  batch?: boolean;
}) {
  const ref = useGsapReveal<HTMLDivElement>({
    stagger,
    from,
    targets,
    batch,
    trigger: start ? { start } : undefined,
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
