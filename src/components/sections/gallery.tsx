"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { EVENTS, type ACWEvent } from "@/lib/data/events";
import { Play, ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { cn } from "@/lib/utils";

type MediaItem =
  | {
      kind: "photo";
      src: string;
      alt: string;
      caption: string;
      eventId?: string;
      eventTitle?: string;
    }
  | {
      kind: "video";
      src: string;
      poster?: string;
      duration?: string;
      title: string;
      eventId: string;
      eventTitle: string;
    };

function buildMedia(): MediaItem[] {
  return EVENTS.flatMap<MediaItem>((e) => {
    const photos: MediaItem[] = e.photos.map((src, idx) => ({
      kind: "photo",
      src,
      alt: `${e.title}, photo ${idx + 1}`,
      caption: `${e.title} · ${e.location}`,
      eventId: e.id,
      eventTitle: e.title,
    }));
    const videos: MediaItem[] = (e.videos ?? []).map((v) => ({
      kind: "video",
      src: v.src,
      poster: v.poster ?? e.cover,
      duration: v.duration,
      title: v.title ?? "Recap film",
      eventId: e.id,
      eventTitle: e.title,
    }));
    return [...videos, ...photos];
  });
}

/** Small seeded PRNG (mulberry32). Same seed yields the same sequence, so the
 *  server and client shuffle identically — no hydration mismatch, and the tiles
 *  mount once in their final order (which keeps native lazy-loading working). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic Fisher-Yates shuffle driven by `seed`. */
function shuffleSeeded<T>(items: T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// How many tiles to render before the "Show more" reveal. Keeps the initial
// DOM (and image requests) light on phones / slower connections, then grows in
// steps the visitor controls.
const GALLERY_STEP = 24;

function spanForIndex(idx: number, kind: MediaItem["kind"]): string {
  if (kind === "video") return "col-span-2 row-span-2";
  const pattern = [
    "",
    "row-span-2",
    "",
    "col-span-2",
    "",
    "row-span-2",
  ] as const;
  return pattern[idx % pattern.length];
}

export function Gallery({
  compact = false,
  seed,
}: {
  compact?: boolean;
  /** When provided, the media order is shuffled deterministically from this
   *  seed (passed by the server so server and client agree). Omit to keep the
   *  source order. */
  seed?: number;
}) {
  const media = useMemo(
    () =>
      seed === undefined ? buildMedia() : shuffleSeeded(buildMedia(), seed),
    [seed],
  );
  const eventsWithMedia = useMemo<ACWEvent[]>(
    () =>
      EVENTS.filter((e) => e.photos.length > 0 || (e.videos?.length ?? 0) > 0),
    [],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    map.set("__all__", media.length);
    for (const m of media) {
      if (m.eventId) map.set(m.eventId, (map.get(m.eventId) ?? 0) + 1);
    }
    return map;
  }, [media]);

  const [filter, setFilter] = useState<string>("__all__");
  const [shown, setShown] = useState(GALLERY_STEP);
  const [lb, setLb] = useState<number | null>(null);
  // One-time reveal of the initial tiles; later filter changes render
  // instantly without re-animating.
  const revealRef = useGsapReveal<HTMLElement>({ batch: true, stagger: 0.05 });

  const visible = useMemo(() => {
    if (filter === "__all__") return media;
    return media.filter((m) => m.eventId === filter);
  }, [media, filter]);

  // Only the first `shown` tiles are rendered; "Show more" grows the window.
  // The lightbox still indexes into the full `visible` list, so opening a tile
  // and navigating beyond what's rendered keeps working.
  const rendered = visible.slice(0, shown);

  const selectFilter = (next: string) => {
    setFilter(next);
    setShown(GALLERY_STEP);
    setLb(null);
  };

  const lightboxItems: LightboxItem[] = visible.map((m) =>
    m.kind === "video"
      ? { kind: "video", src: m.src, poster: m.poster, caption: m.eventTitle }
      : { kind: "photo", src: m.src, alt: m.alt, caption: m.caption },
  );

  return (
    <section
      ref={revealRef}
      id="gallery"
      className="relative px-6 py-24 md:px-12 md:py-36"
    >
      {!compact && (
        <div data-reveal className="mx-auto max-w-7xl text-center">
          <div className="acw-section-label justify-center">
            <span className="acw-num">|</span>
            <span>The gathering, in pictures</span>
          </div>
          <h2 className="acw-display acw-display--center mt-6">
            Moments from
            <br />
            <em>the room.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-160 text-[15px] leading-[1.8] text-muted-foreground">
            Faces, voices, and quiet corners from our gatherings. The
            sisterhood, captured.
          </p>
        </div>
      )}

      {/* Filter chips */}
      {eventsWithMedia.length > 0 && (
        <div className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center gap-2 border-y border-border py-4">
          <FilterChip
            label="All"
            count={counts.get("__all__") ?? 0}
            active={filter === "__all__"}
            onClick={() => selectFilter("__all__")}
          />
          {eventsWithMedia.map((e) => (
            <FilterChip
              key={e.id}
              label={e.title}
              count={counts.get(e.id) ?? 0}
              active={filter === e.id}
              onClick={() => selectFilter(e.id)}
            />
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="mx-auto max-w-150 py-24 text-center">
          <small className="acw-section-label-mini justify-center">EMPTY</small>
          <p className="font-display text-[26px] italic text-forest">
            Nothing here yet.
          </p>
        </div>
      ) : (
        <>
          <div className="mx-auto mt-8 grid max-w-7xl grid-flow-dense auto-rows-[240px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4">
            {rendered.map((m, i) => (
              <button
                key={`${m.kind}-${m.src}-${i}`}
                data-reveal
                onClick={() => setLb(i)}
                className={cn(
                  "group relative overflow-hidden rounded-md border border-border bg-cream-2 outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 active:brightness-90 transition-[filter] duration-150",
                  spanForIndex(i, m.kind),
                )}
              >
                <Image
                  src={m.kind === "video" ? (m.poster ?? m.src) : m.src}
                  alt={m.kind === "photo" ? m.alt : m.title}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  // Preload the first row (the LCP candidate); the rest stay lazy.
                  preload={i < 4}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {m.kind === "video" && (
                  <>
                    <div className="absolute inset-0 bg-forest/30" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-cream-1">
                      <Play size={56} />
                      <small className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cream-1/80">
                        FILM
                      </small>
                      <span className="mt-1 font-display text-[18px] italic">
                        {m.title}
                        {m.duration ? ` · ${m.duration}` : ""}
                      </span>
                    </div>
                  </>
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-forest/80 to-transparent p-4 text-cream-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <small className="font-display text-[14px] italic">
                    {String(i + 1).padStart(2, "0")}
                  </small>
                  <span className="text-right text-[12px] leading-snug">
                    {m.kind === "photo" ? m.caption : m.eventTitle}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {visible.length > shown && (
            <div className="mt-10 flex flex-col items-center gap-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Showing {rendered.length} of {visible.length}
              </p>
              <Button
                variant="editorialOutline"
                size="pill"
                onClick={() => setShown((n) => n + GALLERY_STEP)}
              >
                Show more
              </Button>
            </div>
          )}
        </>
      )}

      <div data-reveal className="mt-12 flex justify-center">
        {!compact ? (
          <Button asChild variant="editorialOutline" size="pill">
            <Link href="/gallery">
              See the full gallery <ArrowRight />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="editorialOutline" size="pill">
            <Link href="/events">Browse all events</Link>
          </Button>
        )}
      </div>

      <Lightbox
        items={lightboxItems}
        index={lb}
        onClose={() => setLb(null)}
        onNavigate={setLb}
      />
    </section>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "cursor-pointer inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-gold/60",
        "active:scale-[0.97]",
        active
          ? "border-forest bg-forest text-cream-1 active:bg-[#162b1f]"
          : "border-border bg-transparent text-muted-foreground hover:border-gold hover:text-forest active:bg-cream-2",
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "font-display text-[12px] italic",
          active ? "text-gold-2" : "text-gold",
        )}
      >
        {count}
      </span>
    </button>
  );
}
