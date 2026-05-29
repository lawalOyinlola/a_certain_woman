"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";

const REASONS = [
  "Join the Movement",
  "Attend an Event",
  "Partner / Sponsor",
  "Media Inquiry",
  "Volunteer",
  "Invite ACW",
  "Share My Story",
  "General Inquiry",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [reason, setReason] = useState(REASONS[0]);

  if (submitted) {
    return (
      <div className="mx-auto max-w-[520px] py-12 text-center">
        <div className="text-gold">
          <svg
            viewBox="0 0 60 60"
            width="80"
            height="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="mx-auto"
          >
            <circle cx="30" cy="30" r="28" />
            <path d="M18 30 L26 38 L42 22" />
          </svg>
        </div>
        <h3 className="mt-6 font-display text-[36px] text-forest">Received.</h3>
        <p className="mt-3 text-[15px] text-ink-2">
          Thank you for writing. Someone from our team will reply soon.
        </p>
        <em className="mt-4 block font-display text-[17px] italic text-gold">
          Until then, peace.
        </em>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="acw-contact-form"
    >
      <label className="acw-field">
        <span>Full Name</span>
        <input type="text" placeholder="Her name" required />
      </label>
      <label className="acw-field">
        <span>Email Address</span>
        <input type="email" placeholder="her@email.com" required />
      </label>
      <label className="acw-field">
        <span>Phone / WhatsApp</span>
        <input type="tel" placeholder="+232 ..." />
      </label>
      <label className="acw-field">
        <span>Organization (optional)</span>
        <input type="text" placeholder="Church, NGO, company..." />
      </label>
      <label className="acw-field acw-field--full">
        <span>Reason for Contact</span>
        <select value={reason} onChange={(e) => setReason(e.target.value)}>
          {REASONS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
      <label className="acw-field acw-field--full">
        <span>Message</span>
        <textarea
          placeholder="Tell us a little about why you're writing..."
          required
        />
      </label>
      <div className="acw-field--full">
        <Button type="submit" variant="editorial" size="pill" className="w-full">
          Send Message <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
