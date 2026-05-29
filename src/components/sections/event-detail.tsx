"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ACWEvent, getEventStatus } from "@/lib/data/events";
import { Play } from "@/components/site/icons";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function EventDetail({ event }: { event: ACWEvent }) {
  const [lb, setLb] = useState<number | null>(null);
  const [videoIdx, setVideoIdx] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasProgram = event.program.length > 0;
  const hasSpeakers = event.speakers.length > 0;
  const hasPhotos = event.photos.length > 0;
  const hasVideos = (event.videos?.length ?? 0) > 0;
  const status = getEventStatus(event);

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
          {status !== "PAST" && (
            <span className="rounded-full bg-forest px-3 py-1.5 text-cream-1">
              {status}
            </span>
          )}
          {event.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gold/40 px-3 py-1.5 text-gold"
            >
              {tag}
            </span>
          ))}
          <span>{event.date}</span>
          <span>·</span>
          {event.venue && (
            <>
              <span>{event.venue}</span>
              <span>·</span>
            </>
          )}
          <span>{event.location}</span>
        </div>
        <h2 className="acw-display mt-6">
          {event.title}
          <br />
          <em>{event.subtitle}.</em>
        </h2>
        {event.theme && (
          <p className="mx-auto mt-5 max-w-[680px] font-display text-[18px] italic text-gold md:text-[20px]">
            <span className="not-italic font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Theme:{" "}
            </span>
            {event.theme}
          </p>
        )}
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
          />
        </div>
      </div>

      {(hasProgram || hasSpeakers) && (
        <div className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 gap-12 px-2 md:grid-cols-2">
          {hasProgram && (
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
          )}
          {hasSpeakers && (
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
          )}
        </div>
      )}

      {hasVideos && (
        <div className="mx-auto mt-16 max-w-[1100px]">
          <small className="acw-section-label-mini">
            FILM {event.videos!.length > 1 ? `· ${event.videos!.length} CLIPS` : ""}
          </small>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
            {event.videos!.map((v, i) => (
              <button
                key={i}
                onClick={() => setVideoIdx(i)}
                className={
                  "group relative block w-full overflow-hidden rounded-md border border-border outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 active:brightness-90 transition-[filter] duration-150 " +
                  (i === 0 ? "" : "md:col-start-2")
                }
              >
                <div
                  className={
                    "relative " +
                    (i === 0 ? "aspect-21/9" : "aspect-4/3")
                  }
                >
                  <Image
                    src={v.poster ?? event.cover}
                    alt={v.title ?? `${event.title} film ${i + 1}`}
                    fill
                    sizes="(min-width: 1100px) 1100px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-forest/40 transition-colors group-hover:bg-forest/50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-cream-1">
                    <Play size={i === 0 ? 80 : 56} />
                    <span className="mt-3 text-[11px] uppercase tracking-[0.3em]">
                      {v.title ?? "Recap film"}
                      {v.duration ? ` · ${v.duration}` : ""}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {hasPhotos && (
        <div className="mx-auto mt-16 max-w-[1280px]">
          <small className="acw-section-label-mini">
            THE GALLERY · {event.photos.length} PHOTOS
          </small>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {event.photos.map((p, k) => (
              <button
                key={k}
                onClick={() => setLb(k)}
                className="group relative aspect-4/5 overflow-hidden rounded-md border border-border bg-cream-2 outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 active:brightness-90 transition-[filter] duration-150"
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
      )}

      {!hasPhotos && !hasVideos && status !== "PAST" && (
        <div className="mx-auto mt-12 max-w-[820px] border-t border-border pt-10 text-center">
          <small className="acw-section-label-mini justify-center">
            STILL TO COME
          </small>
          <p className="font-display text-[22px] italic leading-normal text-forest">
            The film and photographs will be added here after the gathering.
          </p>
        </div>
      )}

      <Dialog open={lb !== null} onOpenChange={(o) => !o && setLb(null)}>
        <DialogContent className="max-w-5xl border-border bg-cream-1 p-0">
          <DialogTitle className="sr-only">Photo</DialogTitle>
          {lb !== null && hasPhotos && (
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
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream-1/90 px-3 py-2 text-forest transition-colors hover:bg-gold hover:text-cream-1 active:bg-gold/80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream-1/90 px-3 py-2 text-forest transition-colors hover:bg-gold hover:text-cream-1 active:bg-gold/80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={videoIdx !== null}
        onOpenChange={(o) => {
          if (!o) {
            videoRef.current?.pause();
            setVideoIdx(null);
          }
        }}
      >
        <DialogContent className="max-w-5xl border-border bg-forest p-0 text-cream-1">
          <DialogTitle className="sr-only">
            {videoIdx !== null && event.videos?.[videoIdx]?.title
              ? event.videos[videoIdx].title
              : "Recap film"}
          </DialogTitle>
          {videoIdx !== null && event.videos?.[videoIdx] && (
            <video
              ref={videoRef}
              src={event.videos[videoIdx].src}
              poster={event.videos[videoIdx].poster ?? event.cover}
              controls
              autoPlay
              className="aspect-video w-full bg-forest"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </article>
  );
}
