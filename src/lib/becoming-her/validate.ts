import { z } from "zod/v4";
import { isValidPhoneNumber } from "libphonenumber-js";
import { BECOMING_HER, ageOn } from "@/lib/data/becoming-her";
import {
  AFFILIATION,
  COMMITMENT,
  CURRENT_STATUS,
  LIMITS,
  PROJECT_WILLING,
  REFERRAL,
  SAFE_CONTACT,
  type ApplicationData,
  type Choice,
} from "./application";

const values = (choices: Choice[]) =>
  choices.map((c) => c.value) as [string, ...string[]];

// Normalises only: control characters out, whitespace trimmed. HTML and XML
// are escaped where the value is written (email, Kobo XML), not here.
const clean = (max: number) =>
  z
    .string()
    .transform((v) => v.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim())
    .pipe(z.string().max(max));

const optionalText = (max: number) => clean(max).optional().default("");

const phone = z
  .string()
  .trim()
  .max(20)
  .refine((v) => isValidPhoneNumber(v), "Enter a valid phone number.");

const optionalPhone = z
  .string()
  .trim()
  .max(20)
  .optional()
  .default("")
  .refine((v) => v === "" || isValidPhoneNumber(v), "Enter a valid phone number.");

/**
 * The request body. `.strict()` rejects any key not listed here, so a client
 * cannot add fields that end up in Kobo or the email.
 */
const schema = z
  .object({
    voluntary: z.literal("yes"),
    full_name: clean(LIMITS.name).pipe(z.string().min(2, "Enter your full name.")),
    preferred_name: optionalText(LIMITS.short),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter your date of birth."),
    location: clean(LIMITS.short).pipe(z.string().min(2, "Enter your community.")),
    current_status: z.enum(values(CURRENT_STATUS)),
    organisation: optionalText(LIMITS.short),
    affiliation: z.enum(values(AFFILIATION)).or(z.literal("")).optional().default(""),
    mobile: phone,
    whatsapp: optionalPhone,
    safe_contact: z
      .array(z.enum(values(SAFE_CONTACT)))
      .min(1, "Choose at least one safe way to contact you.")
      .max(SAFE_CONTACT.length),
    guardian_name: optionalText(LIMITS.name),
    guardian_phone: optionalPhone,
    motivation: clean(LIMITS.motivation.max).pipe(
      z.string().min(LIMITS.motivation.min, "Write at least 30 characters."),
    ),
    learning_hope: clean(LIMITS.learning.max).pipe(
      z.string().min(LIMITS.learning.min, "Write at least 20 characters."),
    ),
    commitment: z.enum(values(COMMITMENT)),
    commitment_explain: optionalText(LIMITS.long),
    barrier_support: optionalText(LIMITS.long),
    project_willing: z.enum(values(PROJECT_WILLING)),
    project_explain: optionalText(LIMITS.long),
    referral_source: z.enum(values(REFERRAL)),
    referral_other: optionalText(LIMITS.short),
    declaration: z.literal("yes"),
    /** When the form was opened, in ms since the epoch. Bot check only. */
    started_at: z.number().int().positive(),
    /** Honeypot. People never see it, so it must stay empty. */
    website: z.string().max(200).optional().default(""),
  })
  .strict();

export type ValidApplication = ApplicationData & {
  age: number;
  started_at: number;
  website: string;
};

export type ValidationResult =
  | { ok: true; data: ValidApplication }
  | { ok: false; error: string };

/** Validates the body, including the rules that depend on other answers. */
export function validateApplication(
  body: unknown,
  now: number,
): ValidationResult {
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    // Messages written in this file are shown as they are. Zod's own (wrong
    // type, unknown key) describe the schema, not the applicant's answer.
    const issue = parsed.error.issues[0];
    const authored = issue && ["too_small", "custom"].includes(issue.code);
    return {
      ok: false,
      error: authored ? issue.message : "Check your answers and try again.",
    };
  }
  const d = parsed.data;

  const dobTime = Date.parse(`${d.dob}T00:00:00Z`);
  if (Number.isNaN(dobTime) || dobTime > now) {
    return { ok: false, error: "Enter a real date of birth." };
  }
  const age = ageOn(d.dob, now);
  if (age < BECOMING_HER.minAge || age > BECOMING_HER.maxAge) {
    return { ok: false, error: "BecomingHER is for ages 14 to 21." };
  }

  if (age < 18) {
    if (d.guardian_name.length < 2) {
      return { ok: false, error: "Enter your parent or guardian's name." };
    }
    if (!d.guardian_phone) {
      return { ok: false, error: "Enter your parent or guardian's phone number." };
    }
  }
  if (d.commitment !== "yes" && !d.commitment_explain) {
    return { ok: false, error: "Tell us about your availability." };
  }
  if (d.project_willing === "unsure" && !d.project_explain) {
    return { ok: false, error: "Tell us what makes you unsure." };
  }
  if (d.referral_source === "other" && !d.referral_other) {
    return { ok: false, error: "Tell us how you heard about BecomingHER." };
  }

  return {
    ok: true,
    data: {
      ...d,
      affiliation: d.affiliation ?? "",
      // Answers that only apply on one branch are dropped on the other, so a
      // stale answer the applicant navigated away from is not submitted.
      guardian_name: age < 18 ? d.guardian_name : "",
      guardian_phone: age < 18 ? d.guardian_phone : "",
      commitment_explain: d.commitment !== "yes" ? d.commitment_explain : "",
      project_explain: d.project_willing === "unsure" ? d.project_explain : "",
      referral_other: d.referral_source === "other" ? d.referral_other : "",
      safe_contact: [...new Set(d.safe_contact)],
      age,
    },
  };
}
