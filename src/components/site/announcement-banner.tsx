"use client";

import Link from "next/link";
import { useSyncExternalStore, useCallback, useState } from "react";
import { getUpcomingEvents } from "@/lib/data/events";
import { Diamond } from "@/components/site/icons";

const STORAGE_KEY = "acw-banner-dismissed-v1";

function formatBannerDate(dateISO: string, endDateISO?: string): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  const start = new Date(y, (m ?? 1) - 1, d ?? 1);
  const month = start.toLocaleString("en-US", { month: "long" });
  if (endDateISO && endDateISO !== dateISO) {
    const [, , ed] = endDateISO.split("-").map(Number);
    return `${month} ${d}–${ed}`;
  }
  return `${month} ${d}`;
}

// Read dismissed state from localStorage — useSyncExternalStore avoids
// calling setState inside useEffect which triggers a lint rule.
function useBannerVisible(eventId: string): [boolean, () => void] {
  const key = `${STORAGE_KEY}-${eventId}`;

  const clientSnapshot = useCallback(
    () => localStorage.getItem(key) !== "1",
    [key],
  );
  const serverSnapshot = useCallback(() => false, []);
  // No external subscription needed; banner is write-once per session.
  const subscribe = useCallback(() => () => {}, []);

  const visible = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [localDismissed, setLocalDismissed] = useState(false);

  const dismiss = useCallback(() => {
    localStorage.setItem(key, "1");
    setLocalDismissed(true);
  }, [key]);

  return [visible && !localDismissed, dismiss];
}

export function AnnouncementBanner() {
  const upcoming = getUpcomingEvents();
  const event = upcoming[0] ?? null;

  const [visible, dismiss] = useBannerVisible(event?.id ?? "__none__");

  if (!visible || !event) return null;

  const dateLabel = formatBannerDate(event.dateISO, event.endDateISO);

  return (
    <div
      role="complementary"
      aria-label="Upcoming event announcement"
      className="fixed inset-x-0 top-[56px] z-40 bg-forest text-cream-1 md:top-[64px]"
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-2 md:px-6">
        {/* Content — clicks through to event and dismisses */}
        <Link
          href={`/events#${event.id}`}
          onClick={dismiss}
          className="flex min-w-0 flex-1 items-center justify-center gap-2 md:gap-3"
        >
          <span className="hidden text-gold-2 md:inline-flex">
            <Diamond className="opacity-80" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-cream-1/60 hidden sm:inline">
            Coming up
          </span>
          <span className="text-gold-2 hidden sm:inline">·</span>
          <span className="font-display text-[14px] italic text-gold-2">
            {event.title}
          </span>
          {event.subtitle && (
            <>
              <span className="text-cream-1/30 hidden md:inline">·</span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-cream-1/60 hidden md:inline">
                {event.subtitle}
              </span>
            </>
          )}
          <span className="text-gold-2/50">·</span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-cream-1">
            {dateLabel}
          </span>
          <span className="hidden text-gold-2 md:inline-flex">
            <Diamond className="opacity-80" />
          </span>
        </Link>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-cream-1/20 text-cream-1/70 transition-all hover:border-cream-1/50 hover:bg-cream-1/10 hover:text-cream-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-2/60 active:bg-cream-1/20"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
      </div>
    </div>
  );
}
