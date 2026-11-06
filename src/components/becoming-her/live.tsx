"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { contactHref } from "@/config/site";
import {
  BECOMING_HER,
  STOPS,
  dayMonth,
  getApplicationStatus,
  getJourney,
  shortDate,
  type ApplicationStatus,
} from "@/lib/data/becoming-her";

/*
 * Everything on this page that depends on today's date renders here. The
 * server renders it with its own time (the page revalidates hourly), and the
 * browser takes over with the visitor's clock after hydration and re-checks
 * every minute and whenever the tab comes back into view. Nobody has to
 * update the page when a date passes.
 */

const MINUTE = 60_000;
const minuteNow = () => Math.floor(Date.now() / MINUTE) * MINUTE;

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, MINUTE);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(id);
    document.removeEventListener("visibilitychange", onChange);
  };
}

/** The current time, to the minute. `serverNow` is used until hydration. */
export function useNow(serverNow: number): number {
  return useSyncExternalStore(subscribe, minuteNow, () => serverNow);
}

export function useApplicationStatus(
  serverNow: number,
  override?: string,
): ApplicationStatus {
  return getApplicationStatus(useNow(serverNow), override);
}

/* ───────────── The apply action, wherever it appears ───────────── */

/** The application form lives on the contact page, so the link can be shared. */
export const APPLY_HREF = contactHref({ reason: "Apply to BecomingHER" });

/**
 * One button whose label and target follow the application window:
 * - before it opens: "How to apply", scrolling to the how-to section;
 * - while it is open: "Apply now", to the form on the contact page;
 * - after it closes: a disabled "Applications closed".
 *
 * `withNote` adds the dated status line above it (used in the hero).
 * `inGuide` is the version inside the how-to section itself, where scrolling
 * to the section makes no sense: before opening it says when the form opens.
 */
export function ApplyAction({
  serverNow,
  override,
  withNote = false,
  inGuide = false,
  className,
}: {
  serverNow: number;
  override?: string;
  withNote?: boolean;
  inGuide?: boolean;
  className?: string;
}) {
  const status = useApplicationStatus(serverNow, override);

  const note = {
    upcoming: `Applications open ${dayMonth(BECOMING_HER.applicationsOpen)}`,
    open: `Applications close ${dayMonth(BECOMING_HER.applicationsClose)}`,
    closed: "The founding circle is full",
  }[status];

  let action: React.ReactNode;
  if (status === "closed") {
    action = (
      <Button variant="editorialOutline" size="pill" disabled className="acw-bh-closed">
        Applications closed
      </Button>
    );
  } else if (status === "open") {
    action = (
      <Button
        asChild
        variant={inGuide ? "editorialOnDark" : "editorial"}
        size="pill"
        className="acw-bh-press"
      >
        <Link href={APPLY_HREF}>
          {inGuide ? "Start your application" : "Apply now"} <ArrowRight />
        </Link>
      </Button>
    );
  } else if (inGuide) {
    action = (
      <p className="acw-bh-guide-opens">
        The form opens on {dayMonth(BECOMING_HER.applicationsOpen)}. Come back
        to this page then, or bookmark the link to it.
      </p>
    );
  } else {
    action = (
      <Button asChild variant="editorial" size="pill" className="acw-bh-press">
        <Link href="#apply">
          How to apply <ArrowRight />
        </Link>
      </Button>
    );
  }

  return (
    <div className={className ?? "acw-bh-hero-action"}>
      {withNote && (
        <p className="acw-bh-status" data-status={status}>
          <span className="acw-bh-status-dot" aria-hidden />
          {note}
        </p>
      )}
      {action}
    </div>
  );
}

/* ───────────── The journey, as a dated slip ───────────── */

const GROUPS = ["Applications", "The circle"] as const;

/** One sentence: where the circle is right now. */
export function JourneyHeadline({ serverNow }: { serverNow: number }) {
  const { headline } = getJourney(useNow(serverNow));
  return (
    <p className="acw-bh-journey-now" aria-live="polite">
      {headline}
    </p>
  );
}

export function JourneySlip({ serverNow }: { serverNow: number }) {
  const { states } = getJourney(useNow(serverNow));
  const graduation = STOPS[STOPS.length - 1];

  return (
    <>
      <div className="acw-bh-slip">
        {GROUPS.map((group) => (
          <div key={group} className="acw-bh-slip-group">
            <h3>{group}</h3>
            <ol>
              {STOPS.filter((s) => s.group === group).map((s) => {
                const state = states[s.id];
                return (
                  <li key={s.id} data-state={state}>
                    <span className="acw-bh-slip-label">
                      {s.label}
                      {(state === "today" || state === "next") && (
                        <em>{state === "today" ? "Today" : "Next"}</em>
                      )}
                    </span>
                    <span className="acw-bh-slip-dots" aria-hidden />
                    <time dateTime={s.dateISO}>{shortDate(s.dateISO)}</time>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
        <p className="acw-bh-slip-final" data-state={states[graduation.id]}>
          <span>Graduation, and every Becoming Project shared</span>
          <time dateTime={graduation.dateISO}>
            {shortDate(graduation.dateISO)}
          </time>
        </p>
      </div>
    </>
  );
}
