"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PHOTOS } from "@/lib/data/events";
import { Play, ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type LightboxState = number | "video" | null;

export function Gallery({ compact = false }: { compact?: boolean }) {
  const [lb, setLb] = useState<LightboxState>(null);

  const close = () => setLb(null);

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
            Faces, voices, and quiet corners from our gatherings — the
            sisterhood, captured.
          </p>
        </div>
      )}

      <div
        className={cn(
          "mx-auto mt-16 grid max-w-[1280px] auto-rows-[240px] grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[260px]"
        )}
      >
        {/* Video tile */}
        <button
          onClick={() => setLb("video")}
          className="group relative col-span-2 row-span-2 overflow-hidden rounded-md border border-border bg-cream-2"
        >
          <Image
            src={PHOTOS[0].src}
            alt="Play recap video"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-forest/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-cream-1">
            <div className="text-cream-1">
              <Play size={72} />
            </div>
            <div className="mt-5 text-center">
              <small className="block text-[10px] uppercase tracking-[0.3em] text-cream-1/70">
                FILM
              </small>
              <span className="mt-1 block font-display text-[18px] italic">
                Recap · 02:14
              </span>
            </div>
          </div>
        </button>

        {PHOTOS.map((p, i) => (
          <button
            key={i}
            onClick={() => setLb(i)}
            className={cn(
              "group relative overflow-hidden rounded-md border border-border bg-cream-2",
              p.span === "wide" && "col-span-2",
              p.span === "tall" && "row-span-2"
            )}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-forest/80 to-transparent p-4 text-cream-1 opacity-0 transition-opacity group-hover:opacity-100">
              <small className="font-display text-[14px] italic">
                {String(i + 1).padStart(2, "0")}
              </small>
              <span className="text-[12px] leading-snug">{p.caption}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        {!compact ? (
          <Button asChild variant="editorialOutline" size="pill">
            <Link href="/gallery">
              See the full gallery <ArrowRight />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="editorialOutline" size="pill">
            <Link href="/#story">Back to the story</Link>
          </Button>
        )}
      </div>

      <Dialog open={lb !== null} onOpenChange={(o) => !o && close()}>
        <DialogContent className="max-w-5xl border-border bg-cream-1 p-0">
          <DialogTitle className="sr-only">
            {lb === "video" ? "Recap film" : "Photo"}
          </DialogTitle>
          {lb === "video" ? (
            <div className="flex aspect-video flex-col items-center justify-center bg-forest p-12 text-cream-1">
              <Play size={72} />
              <p className="mt-6 max-w-md text-center text-[14px] leading-snug text-cream-1/80">
                Drop your recap video file at{" "}
                <code className="font-mono text-gold-2">/public/video.mp4</code>{" "}
                — it will play here.
              </p>
            </div>
          ) : typeof lb === "number" ? (
            <div className="relative">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={PHOTOS[lb].src}
                  alt={PHOTOS[lb].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <div className="flex items-center justify-between gap-6 border-t border-border px-6 py-4 text-[12px] text-ink-2">
                <em className="font-display text-[18px] text-forest">
                  {PHOTOS[lb].caption}
                </em>
                <small className="uppercase tracking-[0.28em] text-muted-foreground">
                  {String(lb + 1).padStart(2, "0")} /{" "}
                  {String(PHOTOS.length).padStart(2, "0")}
                </small>
              </div>
              <button
                aria-label="Previous"
                onClick={() =>
                  setLb((p) =>
                    typeof p === "number"
                      ? (p - 1 + PHOTOS.length) % PHOTOS.length
                      : p
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream-1/90 px-3 py-2 text-forest backdrop-blur-sm transition-colors hover:bg-gold hover:text-cream-1"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={() =>
                  setLb((p) =>
                    typeof p === "number" ? (p + 1) % PHOTOS.length : p
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream-1/90 px-3 py-2 text-forest backdrop-blur-sm transition-colors hover:bg-gold hover:text-cream-1"
              >
                ›
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}