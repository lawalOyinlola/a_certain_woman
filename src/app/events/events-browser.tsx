"use client";

import { useMemo, useState } from "react";
import { EventDetail } from "@/components/sections/event-detail";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import {
  type ACWEvent,
  getPastEvents,
  getUpcomingEvents,
} from "@/lib/data/events";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import { cn } from "@/lib/utils";

type Tab = "upcoming" | "past" | "all";

// Long past a handful of events, rendering every EventDetail at once (each
// pulls in its own photo grid + lightbox) gets heavy. Page them.
const PAGE_SIZE = 5;

const TABS: { id: Tab; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "all", label: "All" },
];

function matches(e: ACWEvent, q: string): boolean {
  if (!q) return true;
  const haystack = [
    e.title,
    e.subtitle,
    e.location,
    e.blurb,
    e.date,
    e.theme ?? "",
    e.venue ?? "",
    ...(e.tags ?? []),
    ...e.speakers,
    ...e.program.map((p) => p.item),
  ]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function EventsBrowser({
  initialTab = "upcoming" as Tab,
  initialQuery = "",
}: {
  initialTab?: Tab;
  initialQuery?: string;
}) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [query, setQuery] = useState(initialQuery ?? "");
  const debouncedQuery = useDebouncedValue(query, 250);

  const { upcoming, past, all } = useMemo(() => {
    const u = getUpcomingEvents();
    const p = getPastEvents();
    return { upcoming: u, past: p, all: [...u, ...p] };
  }, []);

  const counts = {
    upcoming: upcoming.length,
    past: past.length,
    all: all.length,
  };

  const list = tab === "upcoming" ? upcoming : tab === "past" ? past : all;
  const filtered = useMemo(
    () => list.filter((e) => matches(e, debouncedQuery)),
    [list, debouncedQuery],
  );

  // Reset paging whenever the tab or search narrows/widens the result set,
  // so switching tabs doesn't leave you mid-scroll through a shorter list.
  // Adjusted during render (React's sanctioned pattern for derived state)
  // rather than an effect, so it doesn't cost an extra commit.
  const pageResetKey = `${tab}:${debouncedQuery}`;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [prevPageResetKey, setPrevPageResetKey] = useState(pageResetKey);
  if (pageResetKey !== prevPageResetKey) {
    setPrevPageResetKey(pageResetKey);
    setVisibleCount(PAGE_SIZE);
  }

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <>
      {/* Controls */}
      <div className="sticky top-18 z-30 -mx-6 mb-12 border-y border-border bg-cream-1/85 px-6 py-5 backdrop-blur md:-mx-12 md:px-12">
        <div className="mx-auto flex max-w-275 flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <nav
            className="flex items-center gap-1 self-start rounded-full border border-border p-1"
            aria-label="Filter events"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors outline-none",
                  "focus-visible:ring-2 focus-visible:ring-gold/60",
                  "active:scale-[0.97]",
                  tab === t.id
                    ? "bg-forest text-cream-1 active:bg-[#162b1f]"
                    : "text-muted-foreground hover:bg-cream-2 hover:text-forest active:bg-cream-3",
                )}
              >
                {t.label}
                <span className="ml-2 font-display text-[12px] italic opacity-70">
                  {counts[t.id]}
                </span>
              </button>
            ))}
          </nav>

          <label className="relative flex flex-1 items-center md:max-w-110">
            <SearchGlyph />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, place, or speaker"
              className="w-full border-0 border-b border-border bg-transparent py-2 pl-7 pr-3 font-display text-[16px] italic text-forest placeholder:text-muted-foreground placeholder:opacity-60 focus:border-gold focus:outline-none"
              aria-label="Search events"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-0 text-[12px] uppercase tracking-[0.18em] text-muted-foreground hover:text-gold"
              >
                Clear
              </button>
            )}
          </label>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState query={debouncedQuery} tab={tab} />
      ) : (
        <div>
          {visible.map((e) => (
            <EventDetail key={e.id} event={e} />
          ))}
          {hasMore && (
            <div className="flex justify-center py-16">
              <Button
                variant="editorialOutline"
                size="pill"
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              >
                View More Events <ArrowRight />
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function EmptyState({ query, tab }: { query: string; tab: Tab }) {
  return (
    <div className="mx-auto max-w-160 py-24 text-center md:py-32">
      <small className="acw-section-label-mini justify-center">
        NOTHING TO SHOW
      </small>
      <p className="font-display text-[clamp(28px,3vw,40px)] italic leading-tight text-forest">
        {query ? (
          <>
            No events match <em className="text-gold">&ldquo;{query}&rdquo;</em>
            .
          </>
        ) : tab === "upcoming" ? (
          <>The calendar is quiet, for now.</>
        ) : tab === "past" ? (
          <>The archive is still being written.</>
        ) : (
          <>No events yet.</>
        )}
      </p>
      <p className="mt-4 text-[14px] leading-[1.7] text-muted-foreground">
        Try a different word, or browse all events.
      </p>
    </div>
  );
}

function SearchGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="absolute left-0 text-muted-foreground"
      aria-hidden
    >
      <circle cx="6" cy="6" r="4.5" />
      <path d="M9.5 9.5L13 13" />
    </svg>
  );
}
