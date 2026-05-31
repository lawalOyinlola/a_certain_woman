"use client";

import { useEffect, useRef, useState } from "react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

function fmt(s: number) {
  if (!isFinite(s)) return "--:--";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function Anthem() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      setTime(a.currentTime);
      setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    };
    const onLoaded = () => setDuration(a.duration || 0);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    a.currentTime = x * a.duration;
  };

  const sectionRef = useGsapReveal<HTMLElement>({
    stagger: 0.18,
    from: { y: 40 },
    trigger: { start: "top 82%" },
  });

  return (
    <section ref={sectionRef} id="anthem" className="bg-cream-1 px-6 py-32 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 md:grid-cols-[1fr_1.3fr] md:gap-20">
        <div data-reveal>
          <div className="acw-section-label">
            <span className="acw-num">|</span>
            <span>The Anthem</span>
          </div>
          <h2 className="acw-display mt-6">
            A song
            <br />
            for the <em>becoming.</em>
          </h2>
          <p className="mt-7 max-w-[420px] text-[17px] leading-[1.65] text-muted-foreground">
            Every movement has a sound. Ours is a quiet hymn for the woman
            who is healing, rising, and reclaiming her crown.
          </p>
        </div>

        <div data-reveal className="acw-anthem-player-glow relative grid items-center gap-8 overflow-hidden bg-forest p-9 text-cream-1 md:grid-cols-[120px_1fr]">
          <audio
            ref={audioRef}
            src="/assets/ACW_anthem.mp3"
            preload="metadata"
          />
          <div
            className="acw-anthem-disc mx-auto md:mx-0"
            data-playing={playing}
          >
            <div className="acw-anthem-disc-inner">
              <svg
                viewBox="0 0 60 60"
                width="40"
                height="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <circle cx="30" cy="30" r="3" fill="currentColor" />
                <circle cx="30" cy="30" r="14" opacity="0.4" />
                <circle cx="30" cy="30" r="22" opacity="0.2" />
              </svg>
            </div>
          </div>

          <div className="relative z-1 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <small className="text-[10px] uppercase tracking-[0.32em] text-gold-2">
                ACW · TRACK 01
              </small>
              <strong className="font-display text-[28px] font-normal tracking-[-0.01em] text-cream-1">
                A Certain Woman
              </strong>
              <em className="font-display text-[16px] italic text-cream-1/65">
                From the Movement Anthem
              </em>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gold-2 text-forest transition-transform hover:scale-105"
              >
                {playing ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <rect x="4" y="3" width="4" height="14" />
                    <rect x="12" y="3" width="4" height="14" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 2 L18 10 L4 18 Z" />
                  </svg>
                )}
              </button>

              <div
                onClick={seek}
                className="relative h-1 flex-1 cursor-pointer bg-cream-1/20"
              >
                <div
                  className="absolute inset-y-0 left-0 bg-gold-2 transition-[width] duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex gap-1.5 font-mono text-[12px] tracking-wide text-cream-1/70">
                <span>{fmt(time)}</span>
                <em className="text-cream-1/40">/</em>
                <span>{fmt(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
