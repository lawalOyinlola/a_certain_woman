import * as React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  full?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  hint,
  error,
  htmlFor,
  full,
  className,
  children,
}: FormFieldProps) {
  return (
    <div
      className={cn(
        "acw-field",
        full && "acw-field--full",
        className,
      )}
    >
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <label
          htmlFor={htmlFor}
          className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          {label}
        </label>
        {hint && (
          <span className="font-display text-[11px] italic text-muted-foreground/70">
            {hint}
          </span>
        )}
      </div>
      {children}
      {error && (
        <span role="alert" className="mt-1.5 block font-sans text-[12px] tracking-normal text-destructive lowercase">
          {error}
        </span>
      )}
    </div>
  );
}

interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
}

export function FieldInput({ className, ...props }: FieldInputProps) {
  return (
    <input
      className={cn(
        "w-full border-0 border-b border-border bg-transparent py-3 font-sans text-[16px] text-ink outline-none transition-colors duration-200",
        "placeholder:text-muted-foreground placeholder:opacity-50 placeholder:italic",
        "focus:border-gold",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

interface FieldTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
}

export function FieldTextarea({ className, ...props }: FieldTextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full min-h-[120px] resize-y border-0 border-b border-border bg-transparent py-3 font-sans text-[16px] text-ink outline-none transition-colors duration-200",
        "placeholder:text-muted-foreground placeholder:opacity-50 placeholder:italic",
        "focus:border-gold",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}
