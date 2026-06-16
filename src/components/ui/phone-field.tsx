"use client";

import { type ComponentType } from "react";
import PhoneInputBase, { type Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { Select as BaseSelect } from "@base-ui/react/select";
import { getCountryCallingCode } from "libphonenumber-js";
import { ChevronDownIcon } from "lucide-react";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PhoneFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  defaultCountry?: Country;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

type CountryOption = {
  value?: Country;
  label: string;
  divider?: boolean;
};

// react-phone-number-input renders the current flag through this component.
type CountryIconComponent = ComponentType<{
  country?: Country;
  label?: string;
  aspectRatio?: number;
  "aria-hidden"?: boolean;
}>;

interface CountrySelectProps {
  value?: Country;
  onChange: (value: Country | undefined) => void;
  options: CountryOption[];
  disabled?: boolean;
  readOnly?: boolean;
  iconComponent?: CountryIconComponent;
  "aria-label"?: string;
}

/**
 * Custom country selector passed to react-phone-number-input as its
 * `countrySelectComponent`. That prop replaces the library's ENTIRE country UI
 * (wrapper + flag + arrow + native <select>), so we render all of it here: a
 * visible trigger showing the library's flag icon + a chevron, plus a base-ui
 * dropdown whose portaled menu is height-capped and scrollable (the native
 * <select> popup the browser renders cannot be capped). The phone number input
 * is a separate sibling, so typing is unaffected.
 */
function CountrySelectMenu({
  value,
  onChange,
  options,
  disabled,
  readOnly,
  iconComponent: Icon,
  "aria-label": ariaLabel,
}: CountrySelectProps) {
  const items = options.filter((o) => !o.divider);
  const selected = items.find((o) => o.value === value);
  return (
    <div className="PhoneInputCountry">
      <BaseSelect.Root
        value={value ?? "ZZ"}
        onValueChange={(v) => {
          if (v === null) return;
          onChange(v === "ZZ" ? undefined : (v as Country));
        }}
        disabled={disabled || readOnly}
      >
        <BaseSelect.Trigger
          aria-label={ariaLabel ?? "Select country"}
          disabled={disabled || readOnly}
          className="flex cursor-pointer items-center gap-1.5 rounded-sm border-0 bg-transparent p-0 text-ink outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-gold/40 disabled:cursor-default disabled:opacity-60"
        >
          {Icon ? (
            <Icon aria-hidden country={value} label={selected?.label ?? ""} />
          ) : null}
          <ChevronDownIcon className="size-3.5 shrink-0 opacity-50" />
        </BaseSelect.Trigger>
        <SelectContent
          align="start"
          alignItemWithTrigger={false}
          className="min-w-68 max-h-[min(20rem,var(--available-height))]"
        >
          {items.map((o) => {
            const code = o.value ?? "ZZ";
            const Flag = o.value ? flags[o.value] : undefined;
            return (
              <SelectItem key={code} value={code}>
                <span className="flex w-full items-center gap-2.5">
                  <span className="flex h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] bg-black/5">
                    {Flag ? <Flag title={o.label} /> : null}
                  </span>
                  <span className="flex-1 truncate">{o.label}</span>
                  {o.value ? (
                    <span className="shrink-0 text-[12px] text-muted-foreground">
                      +{getCountryCallingCode(o.value)}
                    </span>
                  ) : null}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </BaseSelect.Root>
    </div>
  );
}

/**
 * Phone input styled to the ACW editorial look (underline field). Wraps
 * react-phone-number-input, which bundles libphonenumber metadata for every
 * country: flags, calling codes, live formatting, and real validation.
 * Emits an E.164 string (e.g. "+23276123456") via onChange.
 */
export function PhoneField({
  id,
  value,
  onChange,
  disabled,
  defaultCountry = "SL",
  placeholder = "xxx xxx xxxx",
  className,
  ...aria
}: PhoneFieldProps) {
  return (
    <PhoneInputBase
      id={id}
      international
      defaultCountry={defaultCountry}
      countryCallingCodeEditable={false}
      value={value}
      onChange={(v) => onChange(v ?? "")}
      disabled={disabled}
      flags={flags}
      countrySelectComponent={CountrySelectMenu}
      placeholder={placeholder}
      className={cn("acw-phone", className)}
      numberInputProps={aria}
    />
  );
}
