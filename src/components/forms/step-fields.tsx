"use client";

import type { Choice } from "@/lib/becoming-her/application";
import { cn } from "@/lib/utils";

/*
 * The inputs of a one-question-at-a-time form, shared by the BecomingHER
 * application and the contact form. Styles: the acw-flow-* classes in
 * globals.css.
 */


export function Text({
  id,
  question,
  hint,
  value,
  onChange,
  autoComplete,
  max,
  small,
  type = "text",
  optional,
}: {
  id: string;
  question: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  max: number;
  small?: boolean;
  type?: "text" | "email";
  optional?: boolean;
}) {
  return (
    <>
      <label htmlFor={id} className={small ? "acw-flow-q-label" : "acw-flow-q"}>
        {question}
        {optional && <OptionalTag />}
      </label>
      {hint && <p className="acw-flow-q-hint">{hint}</p>}
      <input
        id={id}
        type={type}
        className="acw-flow-q-input"
        value={value}
        maxLength={max}
        autoComplete={autoComplete ?? "off"}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}

export function Long({
  id,
  question,
  hint,
  value,
  onChange,
  min,
  max,
  small,
  optional,
}: {
  id: string;
  question: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  min?: number;
  max: number;
  small?: boolean;
  optional?: boolean;
}) {
  const n = value.trim().length;
  return (
    <>
      <label htmlFor={id} className={small ? "acw-flow-q-label" : "acw-flow-q"}>
        {question}
        {optional && <OptionalTag />}
      </label>
      {hint && <p className="acw-flow-q-hint">{hint}</p>}
      <textarea
        id={id}
        className="acw-flow-q-input acw-flow-q-textarea"
        value={value}
        maxLength={max}
        rows={5}
        onChange={(e) => onChange(e.target.value)}
        // Enter makes a new line here; the button moves on.
      />
      <p className="acw-flow-q-count" aria-live="off">
        {min && n < min ? `${n} of at least ${min} characters` : `${n} of ${max}`}
      </p>
    </>
  );
}

export function Choices({
  question,
  hint,
  choices,
  value,
  onChange,
  optional,
}: {
  question: string;
  hint?: string;
  choices: Choice[];
  value: string;
  onChange: (v: string) => void;
  optional?: boolean;
}) {
  return (
    <fieldset className="acw-flow-fieldset">
      <legend className="acw-flow-q">
        {question}
        {optional && <OptionalTag />}
      </legend>
      {hint && <p className="acw-flow-q-hint">{hint}</p>}
      <div className="acw-flow-choices">
        {choices.map((c) => (
          <label key={c.value} className="acw-flow-choice" data-on={value === c.value || undefined}>
            <input
              type="radio"
              name={question}
              value={c.value}
              checked={value === c.value}
              onChange={() => onChange(c.value)}
            />
            <span className="acw-flow-choice-mark" aria-hidden />
            {c.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Check({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className={cn("acw-flow-choice acw-flow-choice--check")} data-on={checked || undefined}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="acw-flow-choice-mark" aria-hidden />
      {label}
    </label>
  );
}

/** Shown beside a question that can be skipped. */
export function OptionalTag() {
  return <span className="acw-flow-optional">Optional</span>;
}

/** A styled native select: the phone's own picker on mobile, typeahead on desktop. */
export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Choice[];
  placeholder: string;
}) {
  return (
    <div className="acw-flow-select">
      <label htmlFor={id} className="acw-flow-q-label">
        {label}
      </label>
      <div className="acw-flow-select-box">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg aria-hidden viewBox="0 0 12 8" width="12" height="8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 1.5l5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}
