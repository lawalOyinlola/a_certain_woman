/**
 * BecomingHER: The Crown Circle. Content, key dates and the live journey
 * state for /becoming-her.
 *
 * The dates come from the founding-pilot application form on KoboToolbox
 * (form version of 5 November 2026). Change them here only: the page, the
 * application window, the API route and llms.txt all read from this file.
 */

export const BECOMING_HER = {
  name: "BecomingHER",
  subtitle: "The Crown Circle",
  tagline: "Her worth is already hers. Her journey is becoming.",
  places: 20,
  ages: "14–21",
  minAge: 14,
  maxAge: 21,
  location: "Freetown",
  season: "January–March 2027",
  path: "/becoming-her",
  /** ISO dates, Freetown time (GMT all year, no daylight saving). */
  applicationsOpen: "2026-11-16",
  applicationsClose: "2026-12-20",
  orientation: "2027-01-23",
  graduation: "2027-03-27",
  /** The six Saturday sessions. */
  sessions: [
    "2027-01-30",
    "2027-02-06",
    "2027-02-13",
    "2027-02-20",
    "2027-02-27",
    "2027-03-06",
  ],
} as const;

/**
 * TEMPORARY, remove before launch. On Vercel preview deployments the
 * application is open and runs as a dry run (validated, never sent), so the
 * founder can try the whole flow on a preview link. Production is unaffected:
 * VERCEL_ENV is "production" there.
 */
export const PREVIEW_TEST_MODE = process.env.VERCEL_ENV === "preview";

/**
 * Server only. The application-window override for this deployment:
 * BECOMING_HER_APPLICATIONS when set, otherwise "open" on preview builds.
 */
export function applicationsOverride(): string | undefined {
  return process.env.BECOMING_HER_APPLICATIONS ?? (PREVIEW_TEST_MODE ? "open" : undefined);
}

/** Server only. True when applications are validated but never sent. */
export function applicationsDryRun(): boolean {
  return (
    PREVIEW_TEST_MODE ||
    (process.env.BECOMING_HER_DRY_RUN === "1" && process.env.NODE_ENV !== "production")
  );
}

export type Theme = { title: string; body: string };

export const THEMES: Theme[] = [
  {
    title: "Identity and self-worth",
    body: "Recognising her strengths, values and aspirations.",
  },
  {
    title: "Emotional wellbeing",
    body: "Understanding feelings and responding to challenges with care.",
  },
  {
    title: "Boundaries and relationships",
    body: "Handling peer pressure, speaking respectfully, asking for support.",
  },
  {
    title: "Digital safety",
    body: "Informed choices about privacy and life online.",
  },
  {
    title: "Menstrual dignity",
    body: "Learning and asking questions without shame.",
  },
  {
    title: "Leadership and purpose",
    body: "Public speaking, service and planning for the future.",
  },
];

/* ───────────────────────── Dates ───────────────────────── */

const DAY_MS = 86_400_000;

// Freetown keeps GMT all year, so UTC day boundaries are the local ones.
const dayStart = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const dayEnd = (iso: string) => dayStart(iso) + DAY_MS - 1;

/** Today's date in Freetown, as YYYY-MM-DD. */
export function freetownToday(now: number): string {
  return new Date(now).toISOString().slice(0, 10);
}

/** Whole days from today (Freetown) to the given date. 0 means today. */
export function daysUntil(iso: string, now: number): number {
  return Math.round(
    (dayStart(iso) - dayStart(freetownToday(now))) / DAY_MS,
  );
}

const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(dayStart(iso)).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    ...opts,
  });

/** "16 November 2026" */
export const longDate = (iso: string) =>
  fmt(iso, { day: "numeric", month: "long", year: "numeric" });
/** "16 November" */
export const dayMonth = (iso: string) =>
  fmt(iso, { day: "numeric", month: "long" });
/** "Sat 30 Jan" */
export const shortDate = (iso: string) =>
  fmt(iso, { weekday: "short", day: "numeric", month: "short" });

/* ──────────────────── Application window ──────────────────── */

export type ApplicationStatus = "upcoming" | "open" | "closed";

/**
 * Where the application window stands. `override` comes from the
 * BECOMING_HER_APPLICATIONS env var ("open" or "closed"), so a preview
 * deployment can test the form before the real opening date.
 */
export function getApplicationStatus(
  now: number,
  override?: string,
): ApplicationStatus {
  if (override === "open" || override === "closed") return override;
  if (now < dayStart(BECOMING_HER.applicationsOpen)) return "upcoming";
  if (now <= dayEnd(BECOMING_HER.applicationsClose)) return "open";
  return "closed";
}

/* ───────────────────────── Journey ───────────────────────── */

const ORDINALS = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];

export type Stop = {
  id: string;
  label: string;
  dateISO: string;
  /** Last day the stop covers (the close date covers the whole day). */
  group: "Applications" | "The circle" | "Celebration";
};

export const STOPS: Stop[] = [
  {
    id: "open",
    label: "Applications open",
    dateISO: BECOMING_HER.applicationsOpen,
    group: "Applications",
  },
  {
    id: "close",
    label: "Applications close",
    dateISO: BECOMING_HER.applicationsClose,
    group: "Applications",
  },
  {
    id: "orientation",
    label: "Orientation",
    dateISO: BECOMING_HER.orientation,
    group: "The circle",
  },
  ...BECOMING_HER.sessions.map((dateISO, i) => ({
    id: `session-${i + 1}`,
    label: `${ORDINALS[i]} Saturday`,
    dateISO,
    group: "The circle" as const,
  })),
  {
    id: "graduation",
    label: "Graduation",
    dateISO: BECOMING_HER.graduation,
    group: "Celebration",
  },
];

export type StopState = "done" | "today" | "next" | "later";

export type Journey = {
  /** One sentence that says where the circle is right now. */
  headline: string;
  states: Record<string, StopState>;
};

const plural = (n: number, word: string) =>
  `${n} ${word}${n === 1 ? "" : "s"}`;

/** Where the circle is today, worked out from the date alone. */
export function getJourney(now: number): Journey {
  const states: Record<string, StopState> = {};
  let nextFound = false;

  for (const stop of STOPS) {
    const d = daysUntil(stop.dateISO, now);
    if (d < 0) states[stop.id] = "done";
    else if (d === 0) states[stop.id] = "today";
    else if (!nextFound) {
      states[stop.id] = "next";
      nextFound = true;
    } else states[stop.id] = "later";
  }

  const toOpen = daysUntil(BECOMING_HER.applicationsOpen, now);
  const toClose = daysUntil(BECOMING_HER.applicationsClose, now);
  const toOrientation = daysUntil(BECOMING_HER.orientation, now);
  const toGraduation = daysUntil(BECOMING_HER.graduation, now);
  const sessionsDone = BECOMING_HER.sessions.filter(
    (s) => daysUntil(s, now) < 0,
  ).length;
  const sessionToday = BECOMING_HER.sessions.findIndex(
    (s) => daysUntil(s, now) === 0,
  );

  let headline: string;
  if (toOpen > 0) {
    headline = `Applications open in ${plural(toOpen, "day")}, on ${dayMonth(BECOMING_HER.applicationsOpen)}.`;
  } else if (toClose > 0) {
    headline = `Applications are open. ${plural(toClose, "day")} left to apply.`;
  } else if (toClose === 0) {
    headline = "Applications close at the end of today.";
  } else if (toOrientation > 0) {
    headline = `Applications have closed. The circle meets for orientation on ${dayMonth(BECOMING_HER.orientation)}.`;
  } else if (toOrientation === 0) {
    headline = "Orientation is today. The circle meets for the first time.";
  } else if (sessionToday >= 0) {
    headline = `Today is the ${ORDINALS[sessionToday].toLowerCase()} Saturday of six.`;
  } else if (sessionsDone < BECOMING_HER.sessions.length) {
    headline =
      sessionsDone === 0
        ? `The first Saturday session is on ${dayMonth(BECOMING_HER.sessions[0])}.`
        : `${plural(sessionsDone, "Saturday")} of six done. The next is on ${dayMonth(BECOMING_HER.sessions[sessionsDone])}.`;
  } else if (toGraduation > 0) {
    headline = `All six Saturdays are done. Graduation is on ${dayMonth(BECOMING_HER.graduation)}.`;
  } else if (toGraduation === 0) {
    headline = "Graduation is today.";
  } else {
    headline = `The founding circle graduated on ${longDate(BECOMING_HER.graduation)}.`;
  }

  return { headline, states };
}

/* ─────────────────────── Age from DOB ─────────────────────── */

/** Age in whole years on the given day. `dob` is YYYY-MM-DD. */
export function ageOn(dob: string, now: number): number {
  const [y, m, d] = dob.split("-").map(Number);
  const [ty, tm, td] = freetownToday(now).split("-").map(Number);
  let age = ty - y;
  if (tm < m || (tm === m && td < d)) age -= 1;
  return age;
}
