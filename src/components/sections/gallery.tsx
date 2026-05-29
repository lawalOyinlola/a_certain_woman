"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { EVENTS, type ACWEvent } from "@/lib/data/events";
import { Play, ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const visible = useMemo(() => {
    if (filter === "__all__") return media;
    return media.filter((m) => m.eventId === filter);
  }, [media, filter]);

  const selectFilter = (next: string) => {
    setFilter(next);
    setLb(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lb === null) return;
      if (e.key === "ArrowRight")
        setLb((k) => (k === null ? null : (k + 1) % visible.length));
      if (e.key === "ArrowLeft")
        setLb((k) =>
          k === null ? null : (k - 1 + visible.length) % visible.length,
        );
      if (e.key === "Escape") setLb(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lb, visible.length]);

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

      <Dialog
        open={lb !== null}
        onOpenChange={(o) => {
          if (!o) {
            videoRef.current?.pause();
            setLb(null);
          }
        }}
      >
        <DialogContent className="max-w-5xl border-border bg-cream-1 p-0">
          <DialogTitle className="sr-only">
            {lb !== null && visible[lb]
              ? visible[lb].kind === "photo"
                ? "Photo"
                : "Recap film"
              : "Media"}
          </DialogTitle>
          {lb !== null && visible[lb] && (
            <div className="relative">
              {visible[lb].kind === "video" ? (
                <video
                  ref={videoRef}
                  src={visible[lb].src}
                  poster={visible[lb].poster}
                  controls
                  autoPlay
                  className="aspect-video w-full bg-forest"
                />
              ) : (
                <div className="relative aspect-4/3 w-full bg-cream-2">
                  <Image
                    src={visible[lb].src}
                    alt={visible[lb].alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              )}
              <div className="flex items-center justify-between gap-6 border-t border-border px-6 py-4 text-[12px] text-ink-2">
                <em className="font-display text-[18px] text-forest">
                  {visible[lb].kind === "photo"
                    ? visible[lb].caption
                    : visible[lb].title}
                </em>
                <small className="uppercase tracking-[0.28em] text-muted-foreground">
                  {String(lb + 1).padStart(2, "0")} /{" "}
                  {String(visible.length).padStart(2, "0")}
                </small>
              </div>
              <button
                aria-label="Previous"
                onClick={() =>
                  setLb((p) =>
                    p === null
                      ? null
                      : (p - 1 + visible.length) % visible.length,
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream-1/90 px-3 py-2 text-forest backdrop-blur-sm transition-colors hover:bg-gold hover:text-cream-1 active:bg-gold/80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={() =>
                  setLb((p) =>
                    p === null ? null : (p + 1) % visible.length,
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream-1/90 px-3 py-2 text-forest backdrop-blur-sm transition-colors hover:bg-gold hover:text-cream-1 active:bg-gold/80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                ›
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
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
