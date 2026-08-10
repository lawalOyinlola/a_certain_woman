"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ACWEvent, getEventStatus } from "@/lib/data/events";
import { Play, ArrowRight } from "@/components/site/icons";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { Button } from "@/components/ui/button";
import { contactHref, whatsappHref } from "@/config/site";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { cn } from "@/lib/utils";

// How many photos to show before the "view all" reveal, so long galleries
// don't stretch the page. A clean 2 rows on desktop (4-up), 4 rows on mobile.
const PHOTO_PREVIEW_COUNT = 8;

export function EventDetail({ event }: { event: ACWEvent }) {
  const [lb, setLb] = useState<number | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const ref = useGsapReveal<HTMLElement>({ batch: true, stagger: 0.08 });

  const hasProgram = event.program.length > 0;
  const hasSpeakers = event.speakers.length > 0;
  const hasPhotos = event.photos.length > 0;
  const hasVideos = (event.videos?.length ?? 0) > 0;
  const status = getEventStatus(event);

  // Videos first so they appear before photos in the lightbox sequence
  const lightboxItems: LightboxItem[] = useMemo(() => {
    const videos: LightboxItem[] = (event.videos ?? []).map((v) => ({
      kind: "video",
      src: v.src,
      poster: v.poster ?? event.cover,
      caption: v.title ?? "Recap film",
    }));
    const photos: LightboxItem[] = event.photos.map((src, i) => ({
      kind: "photo",
      src,
      alt: `${event.title} photo ${i + 1}`,
      caption: event.title,
    }));
    return [...videos, ...photos];
  }, [event]);

  // Photo grid starts at offset after videos
  const videoCount = event.videos?.length ?? 0;

  return (
    <article
      ref={ref}
      id={event.id}
      className="scroll-mt-32 border-b border-border py-20 last:border-none md:py-28"
    >
      <header data-reveal className="mx-auto max-w-275 text-center">
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
          <p className="mx-auto mt-5 max-w-170 font-display text-[18px] italic text-gold md:text-[20px]">
            <span className="not-italic font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Theme:{" "}
            </span>
            {event.theme}
          </p>
        )}
        <p className="mx-auto mt-6 max-w-160 text-[15px] leading-[1.85] text-ink-2">
          {event.blurb}
        </p>

        {/* Attend CTA — only on gatherings still ahead. Past events stay
            archival. The form link arrives prefilled with this event so the
            visitor doesn't have to retype it; WhatsApp is the fast path. */}
        {status !== "PAST" && (
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="editorial" size="pillSm">
              <Link
                href={contactHref({
                  reason: "Attend an Event",
                  prefill: `I would like to attend ${event.title} (${event.date}).`,
                })}
              >
                Tell us you&apos;re coming <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="editorialOutline" size="pillSm">
              <a
                href={whatsappHref(
                  `Hello A Certain Woman, I would like to attend ${event.title} on ${event.date}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask on WhatsApp
              </a>
            </Button>
          </div>
        )}
      </header>

      <div data-reveal className="mx-auto mt-12 max-w-7xl">
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
        <div
          data-reveal
          className="mx-auto mt-16 grid max-w-275 grid-cols-1 gap-12 px-2 md:grid-cols-2"
        >
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
        <div data-reveal className="mx-auto mt-16 max-w-275">
          <small className="acw-section-label-mini">
            FILM{" "}
            {event.videos!.length > 1 ? `· ${event.videos!.length} CLIPS` : ""}
          </small>
          {/* Up to 3 clips per row: a lone video keeps its wide hero ratio at
              half width, two split the row evenly, three or more fill the
              row and wrap. Always one column on mobile. */}
          <div
            className={cn(
              "mt-3 grid grid-cols-1 gap-4",
              videoCount === 2 && "sm:grid-cols-2",
              videoCount >= 3 && "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {event.videos!.map((v, i) => (
              <button
                key={i}
                onClick={() => setLb(i)}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-md border border-border outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 active:brightness-90 transition-[filter] duration-150",
                  videoCount === 1 && "md:w-1/2",
                )}
              >
                <div
                  className={cn(
                    "relative",
                    videoCount === 1 ? "aspect-21/9" : "aspect-4/3",
                  )}
                >
                  <Image
                    src={v.poster ?? event.cover}
                    alt={v.title ?? `${event.title} film ${i + 1}`}
                    fill
                    sizes={
                      videoCount === 1
                        ? "(min-width: 768px) 550px, 100vw"
                        : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-forest/40 transition-colors group-hover:bg-forest/50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-cream-1">
                    <Play size={videoCount === 1 ? 80 : 56} />
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
        <div data-reveal className="mx-auto mt-16 max-w-7xl">
          <small className="acw-section-label-mini">
            THE GALLERY · {event.photos.length} PHOTOS
          </small>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {(showAllPhotos
              ? event.photos
              : event.photos.slice(0, PHOTO_PREVIEW_COUNT)
            ).map((p, k) => (
              <button
                key={k}
                onClick={() => setLb(videoCount + k)}
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

          {event.photos.length > PHOTO_PREVIEW_COUNT && (
            <div className="mt-8 flex justify-center">
              <Button
                variant="editorialOutline"
                size="pill"
                onClick={() => setShowAllPhotos((v) => !v)}
                aria-expanded={showAllPhotos}
              >
                {showAllPhotos
                  ? "Show fewer photos"
                  : `View all ${event.photos.length} photos`}
              </Button>
            </div>
          )}
        </div>
      )}

      {!hasPhotos && !hasVideos && status !== "PAST" && (
        <div
          data-reveal
          className="mx-auto mt-12 max-w-205 border-t border-border pt-10 text-center"
        >
          <small className="acw-section-label-mini justify-center">
            STILL TO COME
          </small>
          <p className="font-display text-[22px] italic leading-normal text-forest">
            The film and photographs will be added here after the gathering.
          </p>
        </div>
      )}

      <Lightbox
        items={lightboxItems}
        index={lb}
        onClose={() => setLb(null)}
        onNavigate={setLb}
      />
    </article>
  );
}
