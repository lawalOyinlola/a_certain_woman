/**
 * The BecomingHER application: field names, choices and limits.
 *
 * Field names and choice values match the KoboToolbox form
 * (asset avcJ4iqDNcKpTSeXrnfEPh) exactly, because each submission is written
 * into that form. If the form changes in Kobo, change this file to match.
 * The browser form and the API route both read from here.
 */

export type Choice = { value: string; label: string };

export const CURRENT_STATUS: Choice[] = [
  { value: "secondary", label: "Secondary school" },
  { value: "college", label: "College or university" },
  { value: "vocational", label: "Vocational or skills training" },
  { value: "employed", label: "Employed" },
  { value: "seeking", label: "Looking for an opportunity" },
  { value: "other", label: "Other" },
];

export const AFFILIATION: Choice[] = [
  { value: "lds", label: "The Church of Jesus Christ of Latter-day Saints" },
  { value: "christian_other", label: "Another Christian community" },
  { value: "muslim", label: "Muslim community" },
  { value: "faith_other", label: "Another faith community" },
  { value: "none", label: "No affiliation" },
  { value: "prefer_not", label: "Prefer not to say" },
];

export const SAFE_CONTACT: Choice[] = [
  { value: "call", label: "Telephone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "sms", label: "SMS" },
  { value: "guardian", label: "Through my parent or guardian" },
];

export const COMMITMENT: Choice[] = [
  { value: "yes", label: "Yes" },
  { value: "mostly", label: "Mostly. I need to explain" },
  { value: "no", label: "No" },
];

export const PROJECT_WILLING: Choice[] = [
  { value: "yes", label: "Yes" },
  { value: "unsure", label: "I'm not sure yet" },
];

export const REFERRAL: Choice[] = [
  { value: "church", label: "Church leader or group" },
  { value: "school", label: "School or college" },
  { value: "community_org", label: "Community organisation or NGO" },
  { value: "social", label: "Social media" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "friend_family", label: "Friend or family" },
  { value: "other", label: "Other" },
];

/** Length limits, the same as the Kobo form where it sets one. */
export const LIMITS = {
  name: 120,
  short: 120,
  motivation: { min: 30, max: 1500 },
  learning: { min: 20, max: 1000 },
  long: 1000,
};

/** Seconds a person needs, at least, to fill in the whole form. */
export const MIN_FILL_SECONDS = 20;

export type ApplicationData = {
  voluntary: string;
  full_name: string;
  preferred_name: string;
  dob: string;
  location: string;
  current_status: string;
  organisation: string;
  affiliation: string;
  mobile: string;
  whatsapp: string;
  safe_contact: string[];
  guardian_name: string;
  guardian_phone: string;
  motivation: string;
  learning_hope: string;
  commitment: string;
  commitment_explain: string;
  barrier_support: string;
  project_willing: string;
  project_explain: string;
  referral_source: string;
  referral_other: string;
  declaration: string;
};

export const EMPTY_APPLICATION: ApplicationData = {
  voluntary: "",
  full_name: "",
  preferred_name: "",
  dob: "",
  location: "",
  current_status: "",
  organisation: "",
  affiliation: "",
  mobile: "",
  whatsapp: "",
  safe_contact: [],
  guardian_name: "",
  guardian_phone: "",
  motivation: "",
  learning_hope: "",
  commitment: "",
  commitment_explain: "",
  barrier_support: "",
  project_willing: "",
  project_explain: "",
  referral_source: "",
  referral_other: "",
  declaration: "",
};

export const labelOf = (choices: Choice[], value: string) =>
  choices.find((c) => c.value === value)?.label ?? value;
