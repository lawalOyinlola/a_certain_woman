"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const PATHS = [
  {
    kind: "JOIN",
    title: "Join the Movement",
    body: "Receive our quiet letters, find a circle near you, and gather with women becoming whole.",
    cta: "Join the Movement",
    href: "/contact",
  },
  {
    kind: "PARTNER",
    title: "Partner With Us",
    body: "Churches, companies, NGOs, and government partners. Build restoration alongside ACW.",
    cta: "Become a Partner",
    href: "/partner",
  },
  {
    kind: "SUPPORT",
    title: "Support Our Work",
    body: "Sponsor a woman, fund an outreach, support an event, or become a monthly partner.",
    cta: "Give / Support ACW",
    href: "/partner#support",
  },
];

type NewsletterStatus = "idle" | "loading" | "success" | "error";

export function Join({ withLabel = true }: { withLabel?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [error, setError] = useState("");
  const revealRef = useGsapReveal<HTMLElement>({ batch: true, stagger: 0.1 });

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Subscription failed.");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section
      ref={revealRef}
      id="join"
      className="acw-bg-cream-up relative px-6 py-32 md:px-12 md:py-40"
    >
      <div
        data-reveal
        className="mx-auto mb-20 flex max-w-[760px] flex-col items-center text-center"
      >
        {withLabel && (
          <div className="acw-section-label">
            <span className="acw-num">|</span>
            <span>An invitation</span>
          </div>
        )}
        <h2 className="acw-display acw-display--center mt-6">
          There is a place for you
          <br />
          <em>in this movement.</em>
        </h2>
        <p className="mt-7 max-w-[620px] text-[17px] leading-[1.65] text-muted-foreground">
          Whether you are a woman seeking healing, a leader desiring to mentor
          others, a church or organization looking to collaborate, or a donor
          wanting to support transformational work. A Certain Woman welcomes
          you.
        </p>
      </div>

      {/* 3 pathways */}
      <div className="mx-auto mb-24 grid max-w-[1320px] gap-6 md:grid-cols-3">
        {PATHS.map((p) => (
          <article
            key={p.kind}
            data-reveal
            className="flex flex-col gap-5 border border-border bg-cream-1 p-10 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_28px_60px_-28px_rgba(31,38,32,0.18)]"
          >
            <small className="text-[10px] uppercase tracking-[0.32em] text-gold">
              {p.kind}
            </small>
            <h3 className="font-display text-[34px] leading-[1.05] tracking-[-0.01em] text-forest">
              {p.title}
            </h3>
            <p className="flex-1 text-[15px] leading-[1.65] text-muted-foreground">
              {p.body}
            </p>
            <Link href={p.href} className="acw-link-arrow w-fit">
              {p.cta}
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M0 5h12M8 1l4 4-4 4" />
              </svg>
            </Link>
          </article>
        ))}
      </div>

      {/* Newsletter */}
      <div
        data-reveal
        className="relative mx-auto grid max-w-[1320px] gap-16 border border-border bg-cream-1 p-10 md:grid-cols-2 md:gap-16 md:p-16"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-3 border border-border"
        />
        <div className="relative">
          <small className="acw-section-label-mini">QUIET LETTER</small>
          <h3 className="mt-3 font-display text-[clamp(40px,4.5vw,64px)] font-normal leading-[0.95] tracking-[-0.015em] text-forest">
            Receive the
            <br />
            <em className="italic text-gold">weekly letter.</em>
          </h3>
          <p className="mt-6 text-[16px] leading-[1.65] text-muted-foreground">
            Sundays. Quietly written. Freely sent. Reflections, scripture, and
            notes on the journey of becoming.
          </p>
        </div>

        <div className="relative">
          {status !== "success" ? (
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-3"
              aria-busy={status === "loading"}
            >
              <label className="acw-field">
                <span>Your email</span>
                <input
                  type="email"
                  placeholder="her@email.com"
                  value={email}
                  disabled={status === "loading"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </label>
              {error && (
                <div className="text-[13px] text-destructive">{error}</div>
              )}
              <Button
                type="submit"
                variant="editorial"
                size="pill"
                className="mt-3 w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending…" : "Subscribe"}
                {status !== "loading" && <ArrowRight />}
              </Button>
              <small className="mt-3 block text-[11px] leading-snug text-muted-foreground">
                Unsubscribe anytime. We write gently and infrequently.
              </small>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <div className="text-gold">
                <svg
                  viewBox="0 0 60 60"
                  width="60"
                  height="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <circle cx="30" cy="30" r="28" />
                  <path d="M18 30 L26 38 L42 22" />
                </svg>
              </div>
              <h3 className="font-display text-[32px] text-forest">Welcome.</h3>
              <p className="text-[14px] text-ink-2">
                Your first letter arrives this Sunday.
              </p>
              <em className="font-display text-[16px] italic text-gold">
                Until then, peace.
              </em>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
