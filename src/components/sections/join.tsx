"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const ROLES = ["Letter", "Circle", "Volunteer", "Prayer"] as const;

export function Join() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: React.ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section
      id="join"
      className="acw-bg-cream-up relative px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <div className="acw-section-label">
            <span className="acw-num">VII.</span>
            <span>An invitation</span>
          </div>
          <h2 className="acw-display mt-6">
            Join the
            <br />
            <em>sisterhood.</em>
          </h2>
          <p className="mt-8 max-w-[460px] text-[15px] leading-[1.85] text-ink-2">
            We gather monthly — for Scripture, for stillness, for the slow work
            of becoming together. Volunteer, attend a circle, or simply receive
            our weekly letter.
          </p>

          <ul className="mt-10 space-y-4 text-[14px] text-ink-2">
            {[
              "Weekly letter, every Sunday morning",
              "Local circles in 47 cities",
              "Volunteer roles: writers, hosts, prayer partners",
              "Annual gathering — Spring 2026",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="font-display text-gold">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="rounded-md border-border bg-cream-1 shadow-[0_30px_60px_-30px_rgba(31,61,43,0.18)]">
          <CardContent className="p-8 md:p-10">
            {!submitted ? (
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <small className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                    FORM 01 / NEWSLETTER
                  </small>
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                </div>
                <div>
                  <h3 className="font-display text-[36px] leading-[1.05] text-forest">
                    Receive the
                    <br /> weekly letter.
                  </h3>
                  <p className="mt-3 text-[14px] text-muted-foreground">
                    Sundays. Quietly written. Freely sent.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="join-name"
                      className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
                    >
                      Name
                    </Label>
                    <Input
                      id="join-name"
                      placeholder="Her name"
                      className="h-11 rounded-md border-border bg-cream-1 text-[14px] placeholder:text-muted-foreground/60 focus-visible:border-gold focus-visible:ring-gold/30"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="join-email"
                      className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
                    >
                      Email
                    </Label>
                    <Input
                      id="join-email"
                      type="email"
                      placeholder="her@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="h-11 rounded-md border-border bg-cream-1 text-[14px] placeholder:text-muted-foreground/60 focus-visible:border-gold focus-visible:ring-gold/30"
                    />
                    {error && (
                      <small className="text-[12px] text-destructive">
                        {error}
                      </small>
                    )}
                  </div>
                </div>

                <fieldset>
                  <legend className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    I&apos;m interested in
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ROLES.map((r) => (
                      <Label
                        key={r}
                        htmlFor={`role-${r}`}
                        className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-[12px] tracking-wider text-ink-2 transition-colors hover:border-gold has-[input:checked]:border-gold has-[input:checked]:bg-gold/10 has-[input:checked]:text-forest"
                      >
                        <Checkbox
                          id={`role-${r}`}
                          defaultChecked={r === "Letter"}
                          className="border-border data-[state=checked]:border-gold data-[state=checked]:bg-gold"
                        />
                        {r}
                      </Label>
                    ))}
                  </div>
                </fieldset>

                <Button
                  type="submit"
                  variant="editorial"
                  size="pill"
                  className="w-full"
                >
                  Begin <ArrowRight />
                </Button>
                <small className="block text-[11px] leading-snug text-muted-foreground">
                  By beginning you agree to our gentle, infrequent letters.
                  Unsubscribe anytime.
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
                  Welcome, sister.
                </h3>
                <p className="text-[14px] text-ink-2">
                  Your first letter arrives this Sunday.
                </p>
                <em className="font-display text-[16px] italic text-gold">
                  Until then — peace.
                </em>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}