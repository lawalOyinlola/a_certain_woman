"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { EVENTS, type ACWEvent } from "@/lib/data/events";
import { Play, ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
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

function spanForIndex(idx: number, kind: MediaItem["kind"]): string {
  if (kind === "video") return "col-span-2 row-span-2";
  const pattern = ["", "row-span-2", "", "col-span-2", "", "row-span-2"] as const;
  return pattern[idx % pattern.length];
}

export function Gallery({ compact = false }: { compact?: boolean }) {
  const media = useMemo(() => buildMedia(), []);
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
  const [lb, setLb] = useState<number | null>(null);

  const visible = useMemo(() => {
    if (filter === "__all__") return media;
    return media.filter((m) => m.eventId === filter);
  }, [media, filter]);

  const selectFilter = (next: string) => {
    setFilter(next);
    setLb(null);
  };

  const lightboxItems: LightboxItem[] = visible.map((m) =>
    m.kind === "video"
      ? { kind: "video", src: m.src, poster: m.poster, caption: m.eventTitle }
      : { kind: "photo", src: m.src, alt: m.alt, caption: m.caption },
  );

  return (
    <section id="gallery" className="relative px-6 py-24 md:px-12 md:py-36">
      {!compact && (
        <div className="mx-auto max-w-[1280px] text-center">
          <div className="acw-section-label justify-center">
            <span className="acw-num">VI.</span>
            <span>The gathering, in pictures</span>
          </div>
          <h2 className="acw-display acw-display--center mt-6">
            Moments from
            <br />
            <em>the room.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[1.8] text-muted-foreground">
            Faces, voices, and quiet corners from our gatherings. The
            sisterhood, captured.
          </p>
        </div>
      )}

      {/* Filter chips */}
      {eventsWithMedia.length > 0 && (
        <div className="mx-auto mt-12 flex max-w-[1280px] flex-wrap items-center gap-2 border-y border-border py-4">
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
        <div className="mx-auto max-w-[600px] py-24 text-center">
          <small className="acw-section-label-mini justify-center">EMPTY</small>
          <p className="font-display text-[26px] italic text-forest">
            Nothing here yet.
          </p>
        </div>
      ) : (
        <div className="mx-auto mt-8 grid max-w-[1280px] grid-flow-dense auto-rows-[240px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4">
          {visible.map((m, i) => (
            <button
              key={`${m.kind}-${m.src}-${i}`}
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
      )}

      <div className="mt-12 flex justify-center">
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
