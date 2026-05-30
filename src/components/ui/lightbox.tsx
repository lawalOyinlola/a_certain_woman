"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Dialog } from "@base-ui/react/dialog";

export type LightboxItem =
  | { kind: "photo"; src: string; alt: string; caption?: string }
  | { kind: "video"; src: string; poster?: string; caption?: string };

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = index !== null ? items[index] : null;
  const total = items.length;
  const hasPrev = index !== null && total > 1;
  const hasNext = index !== null && total > 1;

  useEffect(() => {
    if (index === null) return;
    // Escape, focus trap, and scroll-lock are handled by the modal Dialog below.
    const onKey = (e: KeyboardEvent) => {
      // Let a focused video player keep its native arrow-key seeking.
      const inVideo = e
        .composedPath()
        .some((el) => el instanceof HTMLVideoElement);
      if (inVideo) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate((index + 1) % total);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate((index - 1 + total) % total);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, total, onNavigate]);

  // Pause video when navigating away
  useEffect(() => {
    if (current?.kind !== "video") videoRef.current?.pause();
  }, [current]);

  return (
    <Dialog.Root
      open={index !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Popup
          aria-label={
            current?.caption ??
            (current?.kind === "video" ? "Video" : "Photo")
          }
          className="fixed inset-0 z-[9999] flex flex-col bg-ink/95 backdrop-blur-sm outline-none"
        >
          {index !== null && current && (
            <>
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between px-4 py-4 md:px-8">
        <span className="font-display text-[13px] italic text-cream-1/50">
          {String(index + 1).padStart(2, "0")}
          <span className="mx-1.5 text-cream-1/30">/</span>
          {String(total).padStart(2, "0")}
        </span>
        <button
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-cream-1/60 transition-colors hover:bg-cream-1/10 hover:text-cream-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:bg-cream-1/20"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M4 4l12 12M16 4L4 16" />
          </svg>
        </button>
      </div>

      {/* Media area */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        {/* Prev */}
        {hasPrev && (
          <button
            onClick={() => onNavigate((index - 1 + total) % total)}
            aria-label="Previous"
            className="group absolute left-0 top-0 z-10 flex h-full w-16 cursor-pointer items-center justify-center text-cream-1/40 transition-colors hover:text-cream-1 focus-visible:outline-none md:w-24"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-1/0 transition-all group-hover:bg-cream-1/10 group-active:bg-cream-1/20">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </span>
          </button>
        )}

        {/* Content */}
        <div className="flex h-full max-h-full w-full items-center justify-center px-16 md:px-24">
          {current.kind === "video" ? (
            <video
              ref={videoRef}
              key={current.src}
              src={current.src}
              poster={current.poster}
              controls
              autoPlay
              className="max-h-full max-w-full rounded-sm"
            />
          ) : (
            <div className="relative h-full w-full">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          )}
        </div>

        {/* Next */}
        {hasNext && (
          <button
            onClick={() => onNavigate((index + 1) % total)}
            aria-label="Next"
            className="group absolute right-0 top-0 z-10 flex h-full w-16 cursor-pointer items-center justify-center text-cream-1/40 transition-colors hover:text-cream-1 focus-visible:outline-none md:w-24"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-1/0 transition-all group-hover:bg-cream-1/10 group-active:bg-cream-1/20">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* Caption bar */}
      {current.caption && (
        <div className="shrink-0 px-16 py-4 text-center md:px-24">
          <p className="font-display text-[16px] italic text-cream-1/70">
            {current.caption}
          </p>
        </div>
      )}
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}