"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { findNearestRoute } from "@/lib/routes";

/** Never changes after mount, so the subscribe callback has nothing to do. */
const noopSubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Offers the closest real page when the URL looks like a near miss.
 *
 * The 404 is prerendered at build time as `/_not-found`, so the mistyped path
 * only exists in the browser. Rendering the suggestion during the server pass
 * would therefore produce markup the client immediately disagrees with, which
 * is a hydration error. `useSyncExternalStore` lets the first client render
 * match the server exactly (nothing), and the suggestion appears on the pass
 * straight after.
 *
 * Renders nothing when no route is close enough, so a genuinely wrong URL is
 * never pointed somewhere arbitrary.
 */
export function NotFoundSuggestion() {
  const isClient = useSyncExternalStore(
    noopSubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const pathname = usePathname();
  const suggestion = isClient ? findNearestRoute(pathname ?? "") : null;

  if (!suggestion) return null;

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <p className="text-[15px] leading-[1.7] text-muted-foreground">
        Did you mean{" "}
        <span className="font-display text-[18px] italic text-forest">
          {suggestion.label}
        </span>
        ?
      </p>
      <Button asChild variant="editorial" size="pill">
        <Link href={suggestion.path}>
          Go to {suggestion.label} <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
