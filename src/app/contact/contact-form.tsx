"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "@/components/site/icons";
import { CONTACT_REASONS } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FieldInput,
  FieldTextarea,
} from "@/components/ui/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Same lazy split as the newsletter: react-phone-number-input (libphonenumber
// metadata + flag SVGs + CSS) stays out of the initial bundle and only loads
// when the form mounts in the browser.
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

const REASONS = CONTACT_REASONS;

// The submit button speaks to the chosen reason so the action feels specific.
const SUBMIT_LABELS: Record<string, string> = {
  "Join the Movement": "Send My Request to Join",
  "Attend an Event": "Send Registration Request",
  "Partner / Sponsor": "Send Partnership Inquiry",
  "Media Inquiry": "Send Media Inquiry",
  Volunteer: "Send Volunteer Interest",
  "Invite ACW": "Send Invitation Request",
  "Share My Story": "Share My Story",
};
const DEFAULT_SUBMIT_LABEL = "Send Message";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const searchParams = useSearchParams();
  // A CTA elsewhere on the site can deep-link here with ?reason= and ?prefill=
  // so the form arrives pre-contextualised. An unknown reason falls back to the
  // first option; the message prefill is dropped straight into the textarea.
  const reasonParam = searchParams.get("reason");
  const initialReason: (typeof REASONS)[number] = (
    REASONS as readonly string[]
  ).includes(reasonParam ?? "")
    ? (reasonParam as (typeof REASONS)[number])
    : REASONS[0];
  const initialMessage = searchParams.get("prefill") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [reason, setReason] = useState<string>(initialReason);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setReason(initialReason);
  }, [initialReason]);

  const validate = (fd: FormData, phoneValue: string) => {
    const errs: Record<string, string> = {};
    const name = (fd.get("name") as string).trim();
    const email = (fd.get("email") as string).trim();
    const phone = phoneValue.trim();
    const message = (fd.get("message") as string).trim();

    if (name.length < 2) errs.name = "Please enter your name.";
    if (!email && !phone)
      errs.email = "Please provide an email or phone number.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Invalid email address.";
    if (message.length < 10)
      errs.message = "Message must be at least 10 characters.";
    return errs;
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setServerError("");

    const fd = new FormData(e.currentTarget);
    const errs = validate(fd, phone);
    // Phone is optional, so only check its format when one was entered. The
    // metadata-heavy validator loads on demand (PhoneField is already mounted).
    if (phone.trim()) {
      let isValidPhoneNumber: (value: string) => boolean;
      try {
        ({ isValidPhoneNumber } = await import("react-phone-number-input"));
      } catch {
        setFieldErrors({
          phone: "Unable to validate phone number, please try again.",
        });
        return;
      }
      if (!isValidPhoneNumber(phone)) {
        errs.phone = "Please enter a valid phone number.";
      }
    }
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: (fd.get("name") as string).trim(),
          email: (fd.get("email") as string).trim() || undefined,
          phone: phone.trim() || undefined,
          organization: (fd.get("organization") as string).trim() || undefined,
          reason,
          message: (fd.get("message") as string).trim(),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Submission failed.");
      }
      setStatus("success");
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-130 py-12 text-center">
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

  const isLoading = status === "loading";
  const submitLabel = SUBMIT_LABELS[reason] ?? DEFAULT_SUBMIT_LABEL;

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={isLoading}>
      {/* The fieldset is the grid AND disables every field while sending. */}
      <fieldset disabled={isLoading} className="acw-contact-form">
        <FormField
          label="Full Name"
          htmlFor="contact-name"
          error={fieldErrors.name}
        >
          <FieldInput
            id="contact-name"
            name="name"
            type="text"
            placeholder="Her name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={
              fieldErrors.name ? "contact-name-error" : undefined
            }
          />
        </FormField>

        <FormField label="Organization (optional)">
          <FieldInput
            name="organization"
            type="text"
            placeholder="Church, NGO, company..."
          />
        </FormField>

        <FormField label="Phone / WhatsApp" error={fieldErrors.phone}>
          <PhoneField
            id="contact-phone"
            value={phone}
            onChange={(v) => {
              setPhone(v);
              setFieldErrors((prev) => ({ ...prev, phone: "" }));
            }}
            placeholder="76 123 456"
            disabled={isLoading}
            aria-label="Phone or WhatsApp number"
            aria-invalid={Boolean(fieldErrors.phone)}
          />
        </FormField>

        <FormField
          label="Email Address"
          error={fieldErrors.email}
          hint="Email or phone required."
        >
          <FieldInput name="email" type="email" placeholder="her@email.com" />
        </FormField>

        {/* Reason — underline-styled Select */}
        <FormField label="Reason for Contact" full>
          <Select
            value={reason}
            onValueChange={(v) => v !== null && setReason(v)}
            disabled={isLoading}
          >
            <SelectTrigger
              aria-label="Reason for Contact"
              className="w-full rounded-none border-0 border-b border-border bg-transparent h-12 text-[16px] font-sans text-ink shadow-none ring-0 focus-visible:ring-0 focus-visible:border-gold hover:border-gold/60 transition-colors duration-200 data-placeholder:text-muted-foreground data-placeholder:opacity-50 data-placeholder:italic [&>svg]:text-muted-foreground"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-cream-1 border-border shadow-[0_8px_32px_-8px_rgba(31,38,32,0.18)]">
              {REASONS.map((r) => (
                <SelectItem
                  key={r}
                  value={r}
                  className="font-sans text-[14px] text-ink cursor-pointer focus:bg-cream-2 focus:text-forest"
                >
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Message" error={fieldErrors.message} full>
          <FieldTextarea
            key={initialMessage}
            name="message"
            defaultValue={initialMessage}
            placeholder="Tell us a little about why you're writing..."
          />
        </FormField>

        {serverError && (
          <p className="acw-field--full font-sans text-[13px] text-destructive">
            {serverError}
          </p>
        )}

        <div className="acw-field--full">
          <Button
            type="submit"
            variant="editorial"
            size="pill"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Sending…" : submitLabel}
            {!isLoading && <ArrowRight />}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
