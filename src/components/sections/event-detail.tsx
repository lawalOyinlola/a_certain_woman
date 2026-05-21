"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ACWEvent } from "@/lib/data/events";
import { Play } from "@/components/site/icons";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function EventDetail({ event }: { event: ACWEvent }) {
  const [lb, setLb] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lb === null) return;
      if (e.key === "ArrowRight")
        setLb((k) => (k === null ? null : (k + 1) % event.photos.length));
      if (e.key === "ArrowLeft")
        setLb((k) =>
          k === null
            ? null
            : (k - 1 + event.photos.length) % event.photos.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lb, event.photos.length]);

  return (
    <article
      id={event.id}
      className="scroll-mt-32 border-b border-border py-20 last:border-none md:py-28"
    >
      <header className="mx-auto max-w-[1100px] text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          <span className="rounded-full bg-cream-2 px-3 py-1.5 text-forest">
            {event.status}
          </span>
          <span>{event.date}</span>
          <span>·</span>
          <span>{event.location}</span>
        </div>
        <h2 className="acw-display mt-6">
          {event.title}
          <br />
          <em>{event.subtitle}.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[1.85] text-ink-2">
          {event.blurb}
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-[1280px]">
        <div className="relative aspect-video overflow-hidden rounded-md border border-border">
          <Image
            src={event.cover}
            alt={event.title}
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 gap-12 px-2 md:grid-cols-2">
        <div>
          <small className="acw-section-label-mini">PROGRAM</small>
          <ul className="mt-3 space-y-3 border-t border-border">
            {event.program.map((p, i) => (
              <li
                key={i}
                className="grid grid-cols-[100px_1fr] items-start gap-4 border-b border-border py-3"
              >
                <span className="font-display text-[18px] italic text-gold">
                  {p.time}
                </span>
                <span className="text-[14px] text-ink-2">{p.item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <small className="acw-section-label-mini">VOICES</small>
          <ul className="mt-3 space-y-2 border-t border-border">
            {event.speakers.map((s, i) => (
              <li
                key={i}
                className="border-b border-border py-3 font-display text-[20px] italic text-forest"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {event.hasVideo && (
        <div className="mx-auto mt-16 max-w-[1100px]">
          <small className="acw-section-label-mini">FILM</small>
          <button
            onClick={() => setVideoOpen(true)}
            className="group relative mt-3 block w-full overflow-hidden rounded-md border border-border"
          >
            <div className="relative aspect-21/9">
              <Image
                src={event.cover}
                alt="Play recap"
                fill
                sizes="(min-width: 1100px) 1100px, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-forest/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-cream-1">
                <Play size={80} />
                <span className="mt-4 text-[11px] uppercase tracking-[0.3em]">
                  Recap film · 02:14
                </span>
              </div>
            </div>
          </button>
        </div>
      )}

      <div className="mx-auto mt-16 max-w-[1280px]">
        <small className="acw-section-label-mini">
          THE GALLERY · {event.photos.length} PHOTOS
        </small>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {event.photos.map((p, k) => (
            <button
              key={k}
              onClick={() => setLb(k)}
              className="group relative aspect-4/5 overflow-hidden rounded-md border border-border bg-cream-2"
            >
              <Image
                src={p}
                alt={`${event.title} photo ${k + 1}`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute right-3 top-3 rounded-full bg-cream-1/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-forest">
                {String(k + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={lb !== null} onOpenChange={(o) => !o && setLb(null)}>
        <DialogContent className="max-w-5xl border-border bg-cream-1 p-0">
          <DialogTitle className="sr-only">Photo</DialogTitle>
          {lb !== null && (
            <div className="relative">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={event.photos[lb]}
                  alt={`${event.title} photo ${lb + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <div className="flex items-center justify-between gap-6 border-t border-border px-6 py-4">
                <em className="font-display text-[18px] text-forest">
                  {event.title}
                </em>
                <small className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  {String(lb + 1).padStart(2, "0")} /{" "}
                  {String(event.photos.length).padStart(2, "0")}
                </small>
              </div>
              <button
                onClick={() =>
                  setLb((k) =>
                    k === null
                      ? null
                      : (k - 1 + event.photos.length) % event.photos.length,
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream-1/90 px-3 py-2 text-forest hover:bg-gold hover:text-cream-1"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={() =>
                  setLb((k) =>
                    k === null ? null : (k + 1) % event.photos.length,
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream-1/90 px-3 py-2 text-forest hover:bg-gold hover:text-cream-1"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-5xl border-border bg-forest p-0 text-cream-1">
          <DialogTitle className="sr-only">Recap film</DialogTitle>
          <div className="flex aspect-video flex-col items-center justify-center p-12 text-center">
            <Play size={80} />
            <p className="mt-6 max-w-md text-[14px] leading-snug text-cream-1/80">
              Drop the event film at{" "}
              <code className="font-mono text-gold-2">
                /public/events/{event.id}.mp4
              </code>{" "}
              — it will play here.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
