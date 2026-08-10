"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { contactHref } from "@/config/site";
import {
  useGsapReveal,
  useIsomorphicLayoutEffect,
} from "@/hooks/use-gsap-reveal";
import { cn } from "@/lib/utils";

// Lazy-load the phone field so react-phone-number-input — its libphonenumber
// metadata, flag SVGs, and CSS — stays out of every page's initial bundle. It
// only loads once the visitor switches to the WhatsApp / phone option.
const PhoneField = dynamic(
  () => import("@/components/ui/phone-field").then((m) => m.PhoneField),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="h-11.5 w-full animate-pulse border-b border-border"
      />
    ),
  },
);

type Pathway = {
  kind: string;
  title: string;
  body: string;
  cta: string;
  href: string;
};

/**
 * The pool of onward invitations. Each page picks a contextual subset (see
 * `paths` prop) so this block references *other* pages rather than repeating
 * links to the page you're already on.
 */
const PATHWAY = {
  join: {
    kind: "JOIN",
    title: "I want to join the movement",
    body: "Receive our quiet letters, find a circle near you, and gather with women becoming whole.",
    cta: "Join the Movement",
    href: contactHref({
      reason: "Join the Movement",
      prefill: "I would like to join the movement.",
    }),
  },
  partner: {
    kind: "PARTNER",
    title: "I want to partner with you",
    body: "Churches, companies, NGOs, and government partners. Build restoration alongside ACW.",
    cta: "Become a Partner",
    href: "/partner",
  },
  support: {
    kind: "SUPPORT",
    title: "I want to support the work",
    body: "Sponsor a woman, fund an outreach, support an event, or become a monthly partner.",
    cta: "Give / Support ACW",
    href: "/partner#support",
  },
  programs: {
    kind: "EXPLORE",
    title: "I want to see the work",
    body: "Healing circles, the Identity Academy, Faith & Flowers, and every room we've built for women.",
    cta: "Explore the Programs",
    href: "/programs",
  },
  events: {
    kind: "GATHER",
    title: "I want to be in the room",
    body: "Find the next gathering, and the women becoming whole alongside you.",
    cta: "See Upcoming Events",
    href: "/events",
  },
  story: {
    kind: "HER STORY",
    title: "I want to know why",
    body: "The grief, survival, faith, and grace behind A Certain Woman, in the founder's own words.",
    cta: "Read the Founder's Letter",
    href: "/founder",
  },
} satisfies Record<string, Pathway>;

export type PathwayKey = keyof typeof PATHWAY;

/** Front-door default (home): join, partner, give. */
const DEFAULT_PATHS: PathwayKey[] = ["join", "partner", "support"];

type ContactType = "email" | "phone";
type NewsletterStatus = "idle" | "loading" | "success" | "error";

export function Join({
  withLabel = true,
  paths = DEFAULT_PATHS,
}: {
  withLabel?: boolean;
  /** Which onward pathways to show, in order. Pass `[]` for newsletter only. */
  paths?: PathwayKey[];
}) {
  const pathways = paths.map((k) => PATHWAY[k]);
  const [contactType, setContactType] = useState<ContactType>("phone");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [error, setError] = useState("");
  const revealRef = useGsapReveal<HTMLElement>({ batch: true, stagger: 0.1 });
  // Newsletter panel gets its own softer fade + zoom reveal, distinct from
  // the plain fade-up used for the onward-pathway cards above.
  const newsletterRef = useGsapReveal<HTMLDivElement>({
    targets: "[data-reveal-newsletter]",
    from: { opacity: 0, scale: 0.94, y: 24, duration: 1, ease: "power2.out" },
  });

  // Sliding thumb behind the active toggle button — measured against the
  // button's own box so it works for the two different label widths.
  const phoneBtnRef = useRef<HTMLButtonElement>(null);
  const emailBtnRef = useRef<HTMLButtonElement>(null);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });

  useIsomorphicLayoutEffect(() => {
    const el =
      contactType === "phone" ? phoneBtnRef.current : emailBtnRef.current;
    if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth });
  }, [contactType]);

  // The field + its helper text fade/rise in with a slight stagger whenever
  // the delivery channel switches, instead of popping in as a dead swap.
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-field-anim]");
    if (!targets.length) return;
    gsap.fromTo(
      targets,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.06,
        overwrite: true,
      },
    );
  }, [contactType]);

  const switchType = (type: ContactType) => {
    setContactType(type);
    setError("");
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    let body: Record<string, string>;

    if (contactType === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setError("Please enter a valid email address.");
        return;
      }
      body = { email: email.trim() };
    } else {
      // Loaded on demand — the metadata-heavy validator stays out of the
      // initial bundle. By now PhoneField is mounted, so this resolves instantly.
      let isValidPhoneNumber: (value: string) => boolean;
      try {
        ({ isValidPhoneNumber } = await import("react-phone-number-input"));
      } catch {
        setError("Unable to validate phone number, please try again.");
        return;
      }
      if (!phone || !isValidPhoneNumber(phone)) {
        setError("Please enter a valid phone number.");
        return;
      }
      body = { phone };
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Subscription failed.");
      }
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  };

  return (
    <section
      ref={revealRef}
      id="join"
      className="acw-bg-cream-up relative px-6 py-32 md:px-12 md:py-40"
    >
      {pathways.length > 0 && (
        <>
          <div
            data-reveal
            className="mx-auto mb-20 flex max-w-190 flex-col items-center text-center"
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
            <p className="mt-7 max-w-155 text-[17px] leading-[1.65] text-muted-foreground">
              Whether you are a woman seeking healing, a leader desiring to
              mentor others, a church or organization looking to collaborate, or
              a donor wanting to support transformational work. A Certain Woman
              welcomes you.
            </p>
          </div>

          {/* Onward pathways — a contextual subset chosen per page */}
          <div
            className={cn(
              "mx-auto mb-24 grid max-w-330 gap-6",
              pathways.length > 1 && "md:grid-cols-3",
            )}
          >
            {pathways.map((p) => (
              <article
                key={p.kind}
                data-reveal
                className="relative flex flex-col gap-5 border border-border bg-cream-1 p-10 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_28px_60px_-28px_rgba(31,38,32,0.18)] focus-within:-translate-y-1.5 focus-within:border-gold focus-within:shadow-[0_28px_60px_-28px_rgba(31,38,32,0.18)]"
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
                {/* Stretched link — the visible arrow CTA, but its ::after covers
                the whole card so the entire card is the click target. */}
                <Link
                  href={p.href}
                  className="acw-link-arrow w-fit after:absolute after:inset-0 after:content-['']"
                >
                  <span className="sr-only">{p.title}: </span>
                  {p.cta}
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    aria-hidden
                  >
                    <path d="M0 5h12M8 1l4 4-4 4" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </>
      )}

      {/* Newsletter — its own ref/reveal so it can fade + zoom in softly
          instead of the plain fade-up used for the pathway cards above. */}
      <div ref={newsletterRef}>
        <div
          data-reveal-newsletter
          className="relative mx-auto grid max-w-330 gap-16 border border-border bg-cream-1 p-10 md:grid-cols-2 md:gap-16 md:p-16"
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
              <em className="italic text-gold">letter.</em>
            </h3>
            <p className="mt-6 text-[16px] leading-[1.65] text-muted-foreground">
              Quietly written. Freely sent. Reflections, scripture, and notes on
              the journey of becoming.
            </p>
          </div>

          <div className="relative">
            {status !== "success" ? (
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-3"
                aria-busy={status === "loading"}
                noValidate
              >
                {/* Contact type toggle */}
                <p className="text-[13px] italic text-ink-2 mb-3">
                  How would you like to receive each letter?
                </p>
                <div
                  className="mb-1 flex items-center gap-2"
                  role="group"
                  aria-label="Preferred delivery channel"
                >
                  <span className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground shrink-0">
                    via:
                  </span>
                  <div className="relative flex gap-1 p-1 bg-[#ede8df] rounded-full">
                    {/* Sliding thumb — measured against whichever button is
                      active, so it works for both label widths. */}
                    <span
                      aria-hidden
                      className="absolute inset-y-1 left-0 rounded-full bg-forest shadow-sm transition-[transform,width] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none"
                      style={{
                        transform: `translateX(${thumb.left}px)`,
                        width: thumb.width,
                      }}
                    />
                    <button
                      ref={phoneBtnRef}
                      type="button"
                      aria-pressed={contactType === "phone"}
                      onClick={() => switchType("phone")}
                      disabled={status === "loading"}
                      className={cn(
                        "relative z-10 cursor-pointer px-4 py-1.5 rounded-full text-[10px] tracking-[0.22em] uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
                        contactType === "phone"
                          ? "text-cream-1"
                          : "text-muted-foreground hover:text-ink",
                      )}
                    >
                      WhatsApp / Phone
                    </button>
                    <button
                      ref={emailBtnRef}
                      type="button"
                      aria-pressed={contactType === "email"}
                      onClick={() => switchType("email")}
                      disabled={status === "loading"}
                      className={cn(
                        "relative z-10 cursor-pointer px-4 py-1.5 rounded-full text-[10px] tracking-[0.22em] uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
                        contactType === "email"
                          ? "text-cream-1"
                          : "text-muted-foreground hover:text-ink",
                      )}
                    >
                      Email
                    </button>
                  </div>
                </div>

                {contactType === "email" ? (
                  <div key="email" ref={fieldRef} className="acw-field">
                    <input
                      type="email"
                      placeholder="her@email.com"
                      value={email}
                      disabled={status === "loading"}
                      autoComplete="email"
                      aria-label="Your email address"
                      aria-invalid={Boolean(error)}
                      data-field-anim
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                    />
                    <small
                      data-field-anim
                      className="mt-2 block text-[12px] leading-snug text-muted-foreground"
                    >
                      Each letter arrives quietly in your inbox.
                    </small>
                  </div>
                ) : (
                  <div key="phone" ref={fieldRef} className="block relative">
                    <div data-field-anim>
                      <PhoneField
                        id="newsletter-phone"
                        value={phone}
                        onChange={(v) => {
                          setPhone(v);
                          setError("");
                        }}
                        placeholder="76 123 456"
                        disabled={status === "loading"}
                        aria-label="Your WhatsApp or phone number"
                        aria-invalid={Boolean(error)}
                      />
                    </div>
                    <small
                      data-field-anim
                      className="mt-2 block text-[12px] leading-snug text-muted-foreground"
                    >
                      We&apos;ll send your letters on WhatsApp where possible.
                    </small>
                  </div>
                )}

                {error && (
                  <div role="alert" className="text-[13px] text-destructive">
                    {error}
                  </div>
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
                <h3 className="font-display text-[32px] text-forest">
                  Welcome.
                </h3>
                <p className="text-[14px] text-ink-2">
                  Your first letter will find you soon.
                </p>
                <em className="font-display text-[16px] italic text-gold">
                  Until then, peace.
                </em>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
