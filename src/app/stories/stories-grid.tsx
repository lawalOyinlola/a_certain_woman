"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const CATS = [
  "All",
  "Healing",
  "Leadership",
  "Community",
  "Founder Reflections",
  "Journal",
] as const;

const ALL_STORIES = [
  {
    cat: "Healing",
    title: "She Was Not Forgotten",
    excerpt:
      "A woman who waited in silence for years, and the morning grace finally spoke her name.",
    read: "6 min",
    img: "/media/Faith_and_Flowers/KCS_9573.jpg",
  },
  {
    cat: "Leadership",
    title: "The Woman Who Began Again",
    excerpt: "After loss, after failure, she built the room she had needed.",
    read: "4 min",
    img: "/media/ACW_launch/KCS_3653.jpg",
  },
  {
    cat: "Founder Reflections",
    title: "Healing Is Holy Work",
    excerpt: "A letter to the woman who is tired of pretending she is fine.",
    read: "5 min",
    img: "/media/Crown_Table/KCS_2051.jpg",
  },
  {
    cat: "Healing",
    title: "When a Woman Reclaims Her Crown",
    excerpt: "On the slow, sacred work of remembering what you were named.",
    read: "7 min",
    img: "/media/Faith_and_Flowers/KCS_9605.jpg",
  },
  {
    cat: "Community",
    title: "The Table That Held Her",
    excerpt: "How an ordinary Saturday brunch became a doorway to restoration.",
    read: "5 min",
    img: "/media/Crown_Table/KCS_2197.jpg",
  },
  {
    cat: "Journal",
    title: "Becoming Is Still Beautiful",
    excerpt: "A meditation on the in-between seasons no one applauds.",
    read: "3 min",
    img: "/media/ACW_launch/KCS_3558.jpg",
  },
  {
    cat: "Leadership",
    title: "Seen by God, Seen Again",
    excerpt: "On stepping into rooms you once thought were not for you.",
    read: "6 min",
    img: "/media/Faith_and_Flowers/KCS_9594.jpg",
  },
];

export function StoriesGrid() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const filtered =
    cat === "All" ? ALL_STORIES : ALL_STORIES.filter((s) => s.cat === cat);
  const ref = useGsapReveal<HTMLDivElement>({ batch: true, stagger: 0.08 });

  return (
    <div className="mx-auto max-w-330">
      <div className="mb-16 flex flex-wrap justify-center gap-2 border-b border-border pb-6">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border border-border px-4 py-2.5 text-[11px] uppercase tracking-[0.22em] transition-all",
              cat === c
                ? "border-forest bg-forest text-cream-1"
                : "text-muted-foreground hover:border-forest/40",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* key={cat} remounts the grid on filter change so useGsapReveal
          re-queries the new articles and re-initialises ScrollTrigger.batch. */}
      <div
        ref={ref}
        key={cat}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((s) => (
          <article
            key={s.title}
            data-reveal
            className="group flex flex-col overflow-hidden border border-border bg-cream-1 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_28px_60px_-28px_rgba(31,38,32,0.18)]"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src={s.img}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <small className="text-[10px] uppercase tracking-[0.32em] text-gold">
                {s.cat.toUpperCase()}
              </small>
              <h3 className="mt-4 font-display text-[28px] leading-[1.05] tracking-[-0.01em] text-forest">
                {s.title}
              </h3>
              <p className="mt-4 flex-1 text-[15px] leading-[1.65] text-muted-foreground">
                {s.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-dashed border-border pt-5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                <span>{s.read} read</span>
                <Link
                  href="#"
                  className="text-forest transition-all group-hover:translate-x-1 group-hover:text-gold"
                  aria-label={`Read: ${s.title}`}
                >
                  <svg
                    width="22"
                    height="14"
                    viewBox="0 0 22 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <path d="M1 7h20M16 1l5 6-5 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
