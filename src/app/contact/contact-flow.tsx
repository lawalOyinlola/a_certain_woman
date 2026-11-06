"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ApplicationForm } from "@/components/becoming-her/application-form";
import { useApplicationStatus } from "@/components/becoming-her/live";
import {
  Check,
  Choices,
  Long,
  SelectField,
  Text,
} from "@/components/forms/step-fields";
import { CrownCircle } from "@/components/site/crown-circle";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { contact, mailtoHref } from "@/config/site";
import {
  BECOMING_HER,
  dayMonth,
  longDate,
} from "@/lib/data/becoming-her";
import {
  BECOMING_HER_SLUG,
  DEFAULT_COPY,
  DEFAULT_REASON,
  PRIMARY_REASONS,
  REASONS,
  findReason,
  type ReasonCopy,
} from "@/lib/contact/reasons";
import { clearDraft, readDraft, writeDraft } from "@/lib/draft";

const PhoneField = dynamic(
  () => import("@/components/ui/phone-field").then((m) => m.PhoneField),
  {
    ssr: false,
    loading: () => <div aria-hidden className="acw-flow-q-input" />,
  },
);

/** The fields of an event the page needs, passed in from the server. */
export type EventSummary = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  place: string;
  cover: string;
};

type Props = {
  initialReason: string | null;
  initialEvent: string | null;
  prefill: string;
  events: EventSummary[];
  serverNow: number;
  override?: string;
  /** Applications are validated but not sent (preview builds, local tests). */
  testMode?: boolean;
};

const FLOW_KEY = "acw:contact-flow";
type FlowDraft = { reason: string | null; event: string | null; picking: boolean };

const noopSubscribe = () => () => {};

/**
 * The contact page's heading and form. The reason decides both: the heading
 * takes that reason's identity (or the event's, or BecomingHER's), and the
 * form below asks one question at a time, starting with the reason itself.
 */
export function ContactFlow(props: Props) {
  // The form's first state comes from sessionStorage, which the server cannot
  // see, so the form renders only after hydration. The heading does not
  // depend on storage and renders on the server.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  return hydrated ? <Flow {...props} /> : <Shell {...props} />;
}

function Shell({ initialReason, initialEvent, events, serverNow, override }: Props) {
  const reason = findReason(initialReason) ?? findReason(DEFAULT_REASON);
  const event = events.find((e) => e.id === initialEvent) ?? null;
  return (
    <>
      <Heading reason={reason} event={event} serverNow={serverNow} override={override} />
      <Body>
        <div className="acw-flow-panel acw-flow-panel--loading" aria-hidden />
      </Body>
    </>
  );
}

function Flow({
  initialReason,
  initialEvent,
  prefill,
  events,
  serverNow,
  override,
  testMode,
}: Props) {
  // The link wins over a saved draft: someone who opens a new link wants that
  // form. A saved draft resumes only when nothing in the link contradicts it
  // (a refresh). An event id that is not an open event counts as absent.
  const [saved] = useState(() => readDraft<FlowDraft>(FLOW_KEY));
  const isOpenEvent = (id: string | null) => events.some((e) => e.id === id);
  const linkReason = findReason(initialReason)?.slug ?? null;
  const linkEvent = isOpenEvent(initialEvent) ? initialEvent : null;
  const resume =
    saved &&
    (linkReason === null || saved.reason === linkReason) &&
    (linkEvent === null || saved.event === linkEvent);

  const [reasonSlug, setReasonSlug] = useState<string>(
    (resume ? saved.reason : linkReason) ?? DEFAULT_REASON,
  );
  const [eventId, setEventId] = useState<string | null>(
    linkEvent ?? (resume && isOpenEvent(saved.event) ? saved.event : null),
  );
  const [picking, setPicking] = useState(resume ? saved.picking : true);
  // Nothing is saved until the reason has been confirmed once.
  const [confirmed, setConfirmed] = useState(Boolean(resume));

  const reason = findReason(reasonSlug) ?? findReason(DEFAULT_REASON)!;
  const event = events.find((e) => e.id === eventId) ?? null;

  useEffect(() => {
    if (confirmed) {
      writeDraft<FlowDraft>(FLOW_KEY, { reason: reasonSlug, event: eventId, picking });
    }
    // Keep the address shareable: it always names the current reason.
    const params = new URLSearchParams();
    params.set("reason", reasonSlug);
    if (reasonSlug === "attend" && eventId) params.set("event", eventId);
    const url = `/contact?${params}`;
    if (url !== window.location.pathname + window.location.search) {
      window.history.replaceState(window.history.state, "", url);
    }
  }, [reasonSlug, eventId, picking, confirmed]);

  const choose = (slug: string) => {
    setReasonSlug(slug);
    if (slug !== "attend") setEventId(null);
  };

  /** Jump straight into another reason's form (from the no-events screen). */
  const switchTo = (slug: string) => {
    choose(slug);
    setPicking(false);
  };

  return (
    <>
      <Heading reason={reason} event={event} serverNow={serverNow} override={override} />
      <Body>
        {picking ? (
          <ReasonStep
            value={reasonSlug}
            linked={linkReason}
            onChange={choose}
            onContinue={() => {
              setConfirmed(true);
              setPicking(false);
            }}
          />
        ) : reason.slug === BECOMING_HER_SLUG ? (
          <BecomingHerStep
            serverNow={serverNow}
            override={override}
            testMode={testMode}
            onExit={() => setPicking(true)}
          />
        ) : (
          <GeneralFlow
            key={reason.slug}
            reason={reason}
            events={events}
            eventId={eventId}
            setEventId={setEventId}
            prefill={reason.slug === linkReason ? prefill : ""}
            linkEvent={linkEvent}
            onExit={() => setPicking(true)}
            onSwitch={switchTo}
          />
        )}
      </Body>
    </>
  );
}

/* ───────────────────────── Heading ───────────────────────── */

function Heading({
  reason,
  event,
  serverNow,
  override,
}: {
  reason: ReasonCopy | null;
  event: EventSummary | null;
  serverNow: number;
  override?: string;
}) {
  if (reason?.slug === BECOMING_HER_SLUG) {
    return <BecomingHerHeading serverNow={serverNow} override={override} />;
  }

  if (reason?.slug === "attend" && event) {
    return (
      <header className="acw-cf-head acw-cf-head--media">
        <div className="acw-cf-head-copy">
          <h1 className="acw-cf-title">
            {event.title}
            {event.subtitle && (
              <>
                <br />
                <em>{event.subtitle}</em>
              </>
            )}
          </h1>
          <p className="acw-cf-meta">
            {event.date} · {event.place}
          </p>
          <p className="acw-cf-desc">{reason.description}</p>
        </div>
        <div className="acw-cf-head-media">
          <Image
            src={event.cover}
            alt=""
            fill
            sizes="(min-width: 960px) 38vw, 100vw"
            preload
          />
        </div>
      </header>
    );
  }

  const [plain, em] = reason?.title ?? DEFAULT_COPY.title;
  return (
    <header className="acw-cf-head">
      <div className="acw-cf-head-copy">
        <h1 className="acw-cf-title">
          {plain} <em>{em}</em>
        </h1>
        <p className="acw-cf-desc">{reason?.description ?? DEFAULT_COPY.description}</p>
      </div>
    </header>
  );
}

function BecomingHerHeading({
  serverNow,
  override,
}: {
  serverNow: number;
  override?: string;
}) {
  const status = useApplicationStatus(serverNow, override);
  const when = {
    upcoming: `Applications open ${longDate(BECOMING_HER.applicationsOpen)}.`,
    open: `Applications close ${longDate(BECOMING_HER.applicationsClose)}.`,
    closed: "Applications for the founding circle have closed.",
  }[status];
  return (
    <header className="acw-cf-head acw-cf-head--bh">
      <div className="acw-cf-head-copy">
        <h1 className="acw-cf-title" aria-label="Apply to BecomingHER: The Crown Circle">
          Becoming<em>HER</em>
        </h1>
        <p className="acw-cf-subtitle">The Crown Circle · Application</p>
        <p className="acw-cf-desc">
          Twenty places for girls and young women aged 14 to 21 in Freetown,
          January to March 2027. Free to apply, free to take part. {when}
        </p>
        <Link href={BECOMING_HER.path} className="acw-cf-link">
          About the programme <ArrowRight />
        </Link>
      </div>
      <CrownCircle decorative className="acw-cf-ring" />
    </header>
  );
}

/* ───────────────────────── Layout ───────────────────────── */

function Body({ children }: { children: React.ReactNode }) {
  return (
    <section id="write" className="acw-cf-body">
      <div className="acw-cf-grid">
        <div className="acw-cf-main">{children}</div>
        <aside className="acw-cf-aside" aria-label="Other ways to reach us">
          <h2>Prefer to talk?</h2>
          <dl>
            <div>
              <dt>WhatsApp or call</dt>
              <dd>
                <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={mailtoHref}>{contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>Where we are</dt>
              <dd>{contact.location}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

/* ───────────────────────── Steps ───────────────────────── */

const SOMETHING_ELSE = "__other";

/**
 * "What brings you here?": a few common reasons as radio buttons, and the rest
 * in a dropdown under "Something else". A reason that arrived in the link is
 * added to the radios, so the visitor sees it selected straight away.
 */
function ReasonStep({
  value,
  linked,
  onChange,
  onContinue,
}: {
  value: string;
  linked: string | null;
  onChange: (slug: string) => void;
  onContinue: () => void;
}) {
  const [error, setError] = useState("");
  const radios = useMemo(() => {
    const slugs = [...PRIMARY_REASONS];
    if (linked && !slugs.includes(linked)) slugs.unshift(linked);
    return slugs;
  }, [linked]);
  const others = REASONS.filter((r) => !radios.includes(r.slug));
  const inOthers = others.some((r) => r.slug === value);
  const [otherOpen, setOtherOpen] = useState(inOthers);
  const radioValue = otherOpen || inOthers ? SOMETHING_ELSE : value;

  return (
    <div className="acw-flow-panel">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (radioValue === SOMETHING_ELSE && !inOthers) {
            return setError("Choose a reason from the list.");
          }
          onContinue();
        }}
      >
        <div className="acw-flow-step">
          <Choices
            question="What brings you here?"
            choices={[
              ...radios.map((slug) => ({
                value: slug,
                label: findReason(slug)?.choice ?? slug,
              })),
              { value: SOMETHING_ELSE, label: "Something else" },
            ]}
            value={radioValue}
            onChange={(v) => {
              setError("");
              if (v === SOMETHING_ELSE) {
                setOtherOpen(true);
              } else {
                setOtherOpen(false);
                onChange(v);
              }
            }}
          />
          {radioValue === SOMETHING_ELSE && (
            <SelectField
              id="cf-other-reason"
              label="Which one?"
              placeholder="Choose a reason"
              value={inOthers ? value : ""}
              onChange={(v) => {
                setError("");
                onChange(v);
              }}
              options={others.map((r) => ({ value: r.slug, label: r.choice }))}
            />
          )}
        </div>
        {error && (
          <p role="alert" className="acw-flow-error">
            {error}
          </p>
        )}
        <div className="acw-flow-panel-foot">
          <Button type="submit" variant="editorial" size="pill" className="acw-bh-press">
            Continue <ArrowRight />
          </Button>
        </div>
      </form>
    </div>
  );
}

const PREPARE = [
  "Your date of birth and the area you live in",
  "A phone number that is safe for us to use",
  "If you are under 18, your parent or guardian's name and number",
  "Two short answers in your own words: why you want to join, and what you hope to learn",
  "Whether you can come on every date",
];

function BecomingHerStep({
  serverNow,
  override,
  testMode,
  onExit,
}: {
  serverNow: number;
  override?: string;
  testMode?: boolean;
  onExit: () => void;
}) {
  const status = useApplicationStatus(serverNow, override);
  if (status === "open") {
    return (
      <>
        {testMode && (
          <p className="acw-cf-test" role="note">
            <strong>Test mode.</strong> This is a preview: the form is open early
            so you can try it, and nothing you send here is saved or emailed.
          </p>
        )}
        <ApplicationForm onExit={onExit} />
      </>
    );
  }

  return (
    <div className="acw-flow-panel">
      <div className="acw-flow-panel-head">
        <button type="button" className="acw-flow-back" onClick={onExit}>
          Back
        </button>
      </div>
      {status === "upcoming" ? (
        <>
          <h2 className="acw-flow-q">
            The application opens on {longDate(BECOMING_HER.applicationsOpen)}.
          </h2>
          <p className="acw-flow-q-hint">
            Come back to this page then. It takes about ten minutes and closes
            on {dayMonth(BECOMING_HER.applicationsClose)}. To be ready, have
            these to hand:
          </p>
          <ul className="acw-flow-prepare">
            {PREPARE.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className="acw-flow-q">Applications for the founding circle have closed.</h2>
          <p className="acw-flow-q-hint">
            Thank you to every young woman who applied. To hear about future
            circles, write to <a href={mailtoHref}>{contact.email}</a>.
          </p>
        </>
      )}
    </div>
  );
}

/* ───────────────────────── General contact ───────────────────────── */

type GeneralData = {
  event: string;
  name: string;
  organisation: string;
  email: string;
  phone: string;
  message: string;
  consent: string;
};

type GeneralStep = "event" | "name" | "organisation" | "contact" | "message" | "review";

const OTHER_EVENT = "other";

function GeneralFlow({
  reason,
  events,
  eventId,
  setEventId,
  prefill,
  linkEvent,
  onExit,
  onSwitch,
}: {
  reason: ReasonCopy;
  events: EventSummary[];
  eventId: string | null;
  setEventId: (id: string | null) => void;
  prefill: string;
  /** A valid event from the link. It replaces the event in a saved draft. */
  linkEvent: string | null;
  onExit: () => void;
  onSwitch: (slug: string) => void;
}) {
  const key = `acw:contact:${reason.slug}`;
  const [draft] = useState(() =>
    readDraft<{ data: GeneralData; step: GeneralStep }>(key),
  );
  const [data, setData] = useState<GeneralData>(() => {
    if (!draft) {
      return {
        event: eventId ?? "",
        name: "",
        organisation: "",
        email: "",
        phone: "",
        message: prefill,
        consent: "",
      };
    }
    // Keep the saved answers, but take the event from the link, and drop a
    // saved event that is no longer open.
    const savedEvent = draft.data.event;
    const event =
      linkEvent ??
      (savedEvent === OTHER_EVENT || events.some((e) => e.id === savedEvent)
        ? savedEvent
        : "");
    return { ...draft.data, event };
  });
  const [current, setCurrent] = useState<GeneralStep>(
    draft?.step ?? (reason.slug === "attend" ? "event" : "name"),
  );
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"editing" | "sending" | "sent">("editing");
  const panelRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const steps = useMemo<GeneralStep[]>(
    () => [
      ...(reason.slug === "attend" ? (["event"] as const) : []),
      "name",
      ...(reason.askOrganisation ? (["organisation"] as const) : []),
      "contact",
      "message",
      "review",
    ],
    [reason],
  );
  const step = steps.includes(current) ? current : steps[0];
  const position = steps.indexOf(step);
  const event = events.find((e) => e.id === data.event) ?? null;

  const set = <K extends keyof GeneralData>(k: K, v: GeneralData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setError("");
  };

  useEffect(() => {
    if (status === "sent") return;
    // Nothing is kept until a name has been typed.
    if (!data.name.trim()) return;
    writeDraft(key, { data, step });
  }, [key, data, step, status]);

  useEffect(() => {
    if (!moved.current) return;
    const panel = panelRef.current;
    if (!panel) return;
    panel
      .querySelector<HTMLElement>("[data-autofocus], input:not([tabindex='-1']), textarea")
      ?.focus({ preventScroll: true });
    const top = panel.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.4) panel.scrollIntoView({ block: "start" });
  }, [step, status]);

  const go = (i: number) => {
    moved.current = true;
    setError("");
    if (i < 0) return onExit();
    setCurrent(steps[Math.min(i, steps.length - 1)]);
  };

  async function check(): Promise<string | null> {
    switch (step) {
      case "event":
        if (!events.length) return null;
        return data.event ? null : "Choose the gathering you'd like to come to.";
      case "name":
        return data.name.trim().length >= 2 ? null : "Enter your name.";
      case "contact": {
        const email = data.email.trim();
        if (!email && !data.phone) return "Give us an email address or a phone number.";
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          return "Check the email address.";
        if (data.phone) {
          const { isValidPhoneNumber } = await import("react-phone-number-input");
          if (!isValidPhoneNumber(data.phone)) return "Check the phone number.";
        }
        return null;
      }
      case "message":
        return data.message.trim().length >= 10
          ? null
          : "A little more, please: at least 10 characters.";
      case "review":
        return data.consent === "yes" ? null : "Tick the box to send.";
      default:
        return null;
    }
  }

  const next = async () => {
    const message = await check();
    if (message) return setError(message);
    if (step === "event") {
      if (!events.length) {
        set("event", OTHER_EVENT);
        if (!data.message.trim()) {
          set("message", "Please let me know when the next gathering is announced.");
        }
      }
      setEventId(data.event && data.event !== OTHER_EVENT ? data.event : null);
    }
    if (step === "review") return send();
    go(position + 1);
  };

  async function send() {
    setStatus("sending");
    const eventLabel =
      reason.slug === "attend"
        ? event
          ? `${event.title}${event.subtitle ? `: ${event.subtitle}` : ""} (${event.date})`
          : "another gathering"
        : "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim() || undefined,
          phone: data.phone || undefined,
          organization: data.organisation.trim() || undefined,
          reason: eventLabel ? `${reason.label}: ${eventLabel}` : reason.label,
          message: data.message.trim(),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "We could not send your message.");
      }
      clearDraft(key);
      moved.current = true;
      setStatus("sent");
    } catch (err) {
      setError(
        `${err instanceof Error ? err.message : "We could not send your message."} If it keeps failing, email ${contact.email}.`,
      );
      setStatus("editing");
    }
  }

  if (status === "sent") {
    return (
      <div ref={panelRef} className="acw-flow-panel">
        <div className="acw-flow-step">
          <CrownCircle decorative className="acw-flow-panel-ring acw-flow-panel-ring--done" />
          <h2 className="acw-flow-q" data-autofocus tabIndex={-1}>
            Thank you, {data.name.trim().split(/\s+/)[0]}. It&rsquo;s with us.
          </h2>
          <p className="acw-flow-q-hint">
            {reason.thanks}{" "}
            {data.email.trim()
              ? "A confirmation is on its way to your email."
              : ""}
          </p>
        </div>
      </div>
    );
  }

  const eventChoices = [
    ...events.map((e) => ({
      value: e.id,
      label: `${e.title}${e.subtitle ? `: ${e.subtitle}` : ""}, ${e.date}`,
    })),
    { value: OTHER_EVENT, label: "Another gathering, or I'm not sure yet" },
  ];

  return (
    <div ref={panelRef} className="acw-flow-panel">
      <div className="acw-flow-panel-head">
        <p aria-live="polite">
          {step === "review" ? "" : `Step ${position + 1} of ${steps.length - 1}`}
        </p>
        <button type="button" className="acw-flow-back" onClick={() => go(position - 1)}>
          Back
        </button>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void next();
        }}
      >
        <div key={step} className="acw-flow-step">
          {step === "event" &&
            (events.length ? (
              <Choices
                question="Which gathering would you like to come to?"
                choices={eventChoices}
                value={data.event}
                onChange={(v) => set("event", v)}
              />
            ) : (
              <>
                <h2 className="acw-flow-q">
                  There is no gathering open for sign-up right now.
                </h2>
                <p className="acw-flow-q-hint">
                  Continue and we will tell you when the next one is announced,
                  or choose another reason for writing.
                </p>
                <SelectField
                  id="cf-switch"
                  label="Choose another reason"
                  placeholder="Choose a reason"
                  value=""
                  onChange={onSwitch}
                  options={REASONS.filter((r) => r.slug !== "attend").map((r) => ({
                    value: r.slug,
                    label: r.choice,
                  }))}
                />
              </>
            ))}
          {step === "name" && (
            <Text
              id="cf-name"
              question="What's your name?"
              value={data.name}
              onChange={(v) => set("name", v)}
              autoComplete="name"
              max={120}
            />
          )}
          {step === "organisation" && (
            <Text
              id="cf-org"
              question="Which organisation are you with?"
              hint="A church, school, company, NGO or outlet."
              optional
              value={data.organisation}
              onChange={(v) => set("organisation", v)}
              autoComplete="organization"
              max={120}
            />
          )}
          {step === "contact" && (
            <>
              <h2 className="acw-flow-q">How can we reach you?</h2>
              <p className="acw-flow-q-hint">An email address, a phone number, or both.</p>
              <label htmlFor="cf-email" className="acw-flow-q-label">
                Email
              </label>
              <input
                id="cf-email"
                type="email"
                className="acw-flow-q-input"
                value={data.email}
                autoComplete="email"
                maxLength={200}
                onChange={(e) => set("email", e.target.value)}
              />
              <label htmlFor="cf-phone" className="acw-flow-q-label">
                Phone or WhatsApp
              </label>
              <PhoneField
                id="cf-phone"
                value={data.phone}
                onChange={(v) => set("phone", v)}
                className="acw-flow-phone"
              />
            </>
          )}
          {step === "message" && (
            <Long
              id="cf-message"
              question={reason.messageQuestion}
              hint={reason.messageHint}
              value={data.message}
              onChange={(v) => set("message", v)}
              min={10}
              max={2000}
            />
          )}
          {step === "review" && (
            <>
              <h2 className="acw-flow-q">Check and send.</h2>
              <dl className="acw-flow-review">
                {(
                  [
                    ["Writing about", reason.choice, null],
                    ...(reason.slug === "attend"
                      ? ([["Gathering", event ? `${event.title}, ${event.date}` : "Another gathering", "event"]] as const)
                      : []),
                    ["Name", data.name, "name"],
                    ...(reason.askOrganisation
                      ? ([["Organisation", data.organisation, "organisation"]] as const)
                      : []),
                    ["Email", data.email, "contact"],
                    ["Phone", data.phone, "contact"],
                    ["Message", data.message, "message"],
                  ] as Array<readonly [string, string, GeneralStep | null]>
                )
                  .filter(([, v]) => v)
                  .map(([label, value, target]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                      <button
                        type="button"
                        onClick={() => (target ? go(steps.indexOf(target)) : onExit())}
                      >
                        Change<span className="sr-only"> {label.toLowerCase()}</span>
                      </button>
                    </div>
                  ))}
              </dl>
              <Check
                checked={data.consent === "yes"}
                onChange={(v) => set("consent", v ? "yes" : "")}
                label="A Certain Woman may use these details to reply to me."
              />
            </>
          )}
        </div>

        {error && (
          <p role="alert" className="acw-flow-error">
            {error}
          </p>
        )}

        <div className="acw-flow-panel-foot">
          <Button
            type="submit"
            variant="editorial"
            size="pill"
            className="acw-bh-press"
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "Sending…"
              : step === "review"
                ? reason.submit
                : step === "event" && !events.length
                  ? "Tell me about the next one"
                  : step === "organisation" && !data.organisation.trim()
                    ? "Skip"
                    : "Continue"}
            {status !== "sending" && <ArrowRight />}
          </Button>
        </div>
      </form>
    </div>
  );
}
