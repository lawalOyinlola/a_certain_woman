"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check as CheckIcon, ChevronDown } from "lucide-react";
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

/**
 * A dropdown in the form's own style. Base UI handles the keyboard
 * (arrows, typeahead, Escape), focus and the listbox roles. An empty
 * `value` shows the placeholder.
 */
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
      <SelectPrimitive.Root
        id={id}
        items={options}
        value={value || null}
        onValueChange={(v) => {
          if (typeof v === "string" && v) onChange(v);
        }}
      >
        <SelectPrimitive.Label className="acw-flow-q-label">{label}</SelectPrimitive.Label>
        <SelectPrimitive.Trigger className="acw-flow-select-trigger">
          <SelectPrimitive.Value placeholder={placeholder} className="acw-flow-select-value" />
          <SelectPrimitive.Icon className="acw-flow-select-icon">
            <ChevronDown aria-hidden />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Positioner
            className="acw-flow-select-positioner"
            align="start"
            sideOffset={6}
            alignItemWithTrigger={false}
          >
            <SelectPrimitive.Popup className="acw-flow-select-popup">
              <SelectPrimitive.List>
                {options.map((o) => (
                  <SelectPrimitive.Item key={o.value} value={o.value} className="acw-flow-select-item">
                    <SelectPrimitive.ItemText>{o.label}</SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="acw-flow-select-check">
                      <CheckIcon aria-hidden />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.List>
            </SelectPrimitive.Popup>
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}
