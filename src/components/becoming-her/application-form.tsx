"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { CrownCircle } from "@/components/site/crown-circle";
import { ArrowRight } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { contact, mailtoHref } from "@/config/site";
import {
  AFFILIATION,
  COMMITMENT,
  CURRENT_STATUS,
  EMPTY_APPLICATION,
  LIMITS,
  PROJECT_WILLING,
  REFERRAL,
  SAFE_CONTACT,
  labelOf,
  type ApplicationData,
} from "@/lib/becoming-her/application";
import { BECOMING_HER, ageOn, freetownToday } from "@/lib/data/becoming-her";
import { Check, Choices, Long, OptionalTag, Text } from "@/components/forms/step-fields";
import { clearDraft, readDraft, writeDraft } from "@/lib/draft";

// Same lazy split as the contact form: the phone library (libphonenumber
// metadata, flags) loads only when a phone question is on screen.
const PhoneField = dynamic(
  () => import("@/components/ui/phone-field").then((m) => m.PhoneField),
  {
    ssr: false,
    loading: () => <div aria-hidden className="acw-flow-q-input" />,
  },
);

type Data = ApplicationData;
type Key = keyof Data;

type StepId =
  | "intro"
  | "full_name"
  | "preferred_name"
  | "dob"
  | "location"
  | "current_status"
  | "organisation"
  | "affiliation"
  | "mobile"
  | "whatsapp"
  | "safe_contact"
  | "guardian"
  | "motivation"
  | "learning_hope"
  | "commitment"
  | "barrier_support"
  | "project"
  | "referral"
  | "review";

const ALL_STEPS: StepId[] = [
  "intro",
  "full_name",
  "preferred_name",
  "dob",
  "location",
  "current_status",
  "organisation",
  "affiliation",
  "mobile",
  "whatsapp",
  "safe_contact",
  "guardian",
  "motivation",
  "learning_hope",
  "commitment",
  "barrier_support",
  "project",
  "referral",
  "review",
];

const nowMs = () => Date.now();
const today = () => freetownToday(nowMs());

function ageFrom(dob: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  if (Number.isNaN(Date.parse(`${dob}T00:00:00Z`))) return null;
  return ageOn(dob, nowMs());
}

async function phoneValid(value: string): Promise<boolean> {
  const { isValidPhoneNumber } = await import("react-phone-number-input");
  return isValidPhoneNumber(value);
}

/** Returns an error message for the step, or null when it may move on. */
async function check(step: StepId, d: Data): Promise<string | null> {
  const age = ageFrom(d.dob);
  switch (step) {
    case "intro":
      return d.voluntary === "yes" ? null : "Tick the box to continue.";
    case "full_name":
      return d.full_name.trim().length >= 2 ? null : "Enter your full name.";
    case "dob":
      if (age === null || d.dob > today()) return "Enter your date of birth.";
      if (age < BECOMING_HER.minAge || age > BECOMING_HER.maxAge)
        return `BecomingHER is for ages 14 to 21. Your date of birth makes you ${age}.`;
      return null;
    case "location":
      return d.location.trim().length >= 2 ? null : "Enter your area or community.";
    case "current_status":
      return d.current_status ? null : "Choose one.";
    case "mobile":
      return d.mobile && (await phoneValid(d.mobile))
        ? null
        : "Enter a phone number we can reach you on.";
    case "whatsapp":
      return !d.whatsapp || (await phoneValid(d.whatsapp))
        ? null
        : "Check the WhatsApp number, or leave it empty.";
    case "safe_contact":
      return d.safe_contact.length ? null : "Choose at least one.";
    case "guardian":
      if (d.guardian_name.trim().length < 2) return "Enter their full name.";
      return d.guardian_phone && (await phoneValid(d.guardian_phone))
        ? null
        : "Enter their phone number.";
    case "motivation": {
      const n = d.motivation.trim().length;
      return n >= LIMITS.motivation.min
        ? null
        : `A little more, please: at least ${LIMITS.motivation.min} characters.`;
    }
    case "learning_hope": {
      const n = d.learning_hope.trim().length;
      return n >= LIMITS.learning.min
        ? null
        : `A little more, please: at least ${LIMITS.learning.min} characters.`;
    }
    case "commitment":
      if (!d.commitment) return "Choose one.";
      return d.commitment !== "yes" && !d.commitment_explain.trim()
        ? "Tell us a little about your availability."
        : null;
    case "project":
      if (!d.project_willing) return "Choose one.";
      return d.project_willing === "unsure" && !d.project_explain.trim()
        ? "Tell us what makes you unsure."
        : null;
    case "referral":
      if (!d.referral_source) return "Choose one.";
      return d.referral_source === "other" && !d.referral_other.trim()
        ? "Tell us where you heard about it."
        : null;
    case "review":
      return d.declaration === "yes" ? null : "Tick the box to send your application.";
    default:
      return null;
  }
}

type Status = "editing" | "sending" | "sent";

const DRAFT_KEY = "acw:becoming-her-application";
type Draft = {
  data: Data;
  step: StepId;
  startedAt: number | null;
  returnToReview: boolean;
};

/**
 * Renders only in the browser (the contact page gates it on hydration),
 * because its first state comes from sessionStorage. `onExit` is called by
 * Back on the first screen, to return to the reason picker.
 */
export function ApplicationForm({ onExit }: { onExit?: () => void }) {
  const [draft] = useState(() => readDraft<Draft>(DRAFT_KEY));
  const [data, setData] = useState<Data>(
    draft ? { ...EMPTY_APPLICATION, ...draft.data } : EMPTY_APPLICATION,
  );
  const [current, setCurrent] = useState<StepId>(draft?.step ?? "intro");
  const [error, setError] = useState("");
  const [sendError, setSendError] = useState("");
  const [status, setStatus] = useState<Status>("editing");
  const [reference, setReference] = useState("");
  const [returnToReview, setReturnToReview] = useState(
    draft?.returnToReview ?? false,
  );
  const startedAt = useRef<number | null>(draft?.startedAt ?? null);
  const honeypot = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const age = ageFrom(data.dob);
  const steps = useMemo(
    () =>
      ALL_STEPS.filter((s) => s !== "guardian" || age === null || age < 18),
    [age],
  );
  // A saved step can drop out (the guardian step, if the age changed).
  const step = steps.includes(current) ? current : "dob";
  const position = steps.indexOf(step);
  const questionCount = steps.length - 2; // intro and review are not questions
  const filled = Math.round((position / (steps.length - 1)) * 20);

  const set = <K extends Key>(key: K, value: Data[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setError("");
  };

  // Keep the answers through a refresh (see src/lib/draft.ts for why this is
  // sessionStorage with a two-hour limit).
  useEffect(() => {
    if (status === "sent") return;
    // Nothing is kept until she has typed her name.
    if (!data.full_name.trim()) return;
    writeDraft<Draft>(DRAFT_KEY, {
      data,
      step,
      startedAt: startedAt.current,
      returnToReview,
    });
  }, [data, step, returnToReview, status]);

  const startOver = () => {
    clearDraft(DRAFT_KEY);
    startedAt.current = null;
    setData(EMPTY_APPLICATION);
    setReturnToReview(false);
    setError("");
    setSendError("");
    go(0);
  };

  // After a move between questions, put focus on the new question's first
  // field (not on first load, which would pull the page down to the form),
  // and bring the panel's top into view on small screens.
  useEffect(() => {
    if (!moved.current) return;
    const panel = panelRef.current;
    if (!panel) return;
    const field = panel.querySelector<HTMLElement>(
      "[data-autofocus], input:not([type=hidden]):not([tabindex='-1']), textarea, button[role=radio]",
    );
    field?.focus({ preventScroll: true });
    const top = panel.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.4) {
      panel.scrollIntoView({ block: "start" });
    }
  }, [step, status]);

  const go = (target: number) => {
    moved.current = true;
    setError("");
    setCurrent(steps[Math.max(0, Math.min(target, steps.length - 1))]);
  };

  const next = async () => {
    if (startedAt.current === null) startedAt.current = nowMs();
    const message = await check(step, data);
    if (message) {
      setError(message);
      return;
    }
    if (step === "review") return send();
    if (returnToReview) {
      setReturnToReview(false);
      return go(steps.indexOf("review"));
    }
    go(position + 1);
  };

  const edit = (target: StepId) => {
    setReturnToReview(true);
    go(steps.indexOf(target));
  };

  async function send() {
    setStatus("sending");
    setSendError("");
    try {
      const res = await fetch("/api/becoming-her/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          started_at: startedAt.current ?? nowMs(),
          website: honeypot.current?.value ?? "",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setReference(json.reference ?? "");
      clearDraft(DRAFT_KEY);
      moved.current = true;
      setStatus("sent");
    } catch (err) {
      setSendError(
        err instanceof Error && err.message
          ? err.message
          : "We could not send your application. Please try again.",
      );
      setStatus("editing");
    }
  }

  if (status === "sent") {
    const name = data.preferred_name.trim() || data.full_name.trim().split(/\s+/)[0];
    return (
      <div ref={panelRef} className="acw-flow-panel" tabIndex={-1}>
        <div className="acw-flow-step">
          <CrownCircle decorative className="acw-flow-panel-ring" />
          <h3 className="acw-flow-q" data-autofocus tabIndex={-1}>
            Thank you, {name}. Your application is in.
          </h3>
          <p className="acw-flow-q-hint">
            Your reference is <strong>{reference}</strong>. The A Certain Woman
            team reads every application and will contact you using the safe
            way you chose. If you need to add or change something, write to{" "}
            <a href={mailtoHref}>{contact.email}</a> and quote your reference.
          </p>
        </div>
      </div>
    );
  }

  const questionNumber = position; // intro is 0, first question is 1

  // An optional question left empty: the button says so.
  const skippable =
    (step === "preferred_name" && !data.preferred_name.trim()) ||
    (step === "organisation" && !data.organisation.trim()) ||
    (step === "affiliation" && !data.affiliation) ||
    (step === "whatsapp" && !data.whatsapp) ||
    (step === "barrier_support" && !data.barrier_support.trim());

  return (
    <div ref={panelRef} className="acw-flow-panel">
      <div className="acw-flow-panel-head">
        {position > 0 && (
          <CrownCircle decorative filled={filled} withCrown={false} className="acw-flow-panel-ring" />
        )}
        <p aria-live="polite">
          {step !== "intro" && step !== "review"
            ? `Question ${questionNumber} of ${questionCount}`
            : null}
        </p>
        {(position > 0 || onExit) && (
          <button
            type="button"
            className="acw-flow-back"
            onClick={() => (position > 0 ? go(position - 1) : onExit?.())}
          >
            Back
          </button>
        )}
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void next();
        }}
      >
        {/* Honeypot: hidden from people and assistive technology. */}
        <input
          ref={honeypot}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="acw-flow-hp"
        />

        <div key={step} className="acw-flow-step">
          <Step step={step} data={data} set={set} age={age} edit={edit} />
        </div>

        {error && (
          <p role="alert" className="acw-flow-error">
            {error}
          </p>
        )}
        {sendError && (
          <p role="alert" className="acw-flow-error">
            {sendError} If it keeps failing, email{" "}
            <a href={mailtoHref}>{contact.email}</a>.
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
              : step === "intro"
                ? "Begin"
                : step === "review"
                  ? "Send my application"
                  : skippable
                    ? "Skip"
                    : returnToReview
                      ? "Save and review"
                      : "Continue"}
            {status !== "sending" && <ArrowRight />}
          </Button>
          {step !== "intro" && step !== "review" && (
            <span className="acw-flow-enter-hint">or press Enter</span>
          )}
          {position > 0 && (
            <button type="button" className="acw-flow-start-over" onClick={startOver}>
              Start over
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

/* ───────────────────────── Steps ───────────────────────── */

type StepProps = {
  step: StepId;
  data: Data;
  set: <K extends Key>(key: K, value: Data[K]) => void;
  age: number | null;
  edit: (step: StepId) => void;
};

function Step({ step, data, set, age, edit }: StepProps) {
  switch (step) {
    case "intro":
      return (
        <>
          <h3 className="acw-flow-q">Ten minutes, one question at a time.</h3>
          <div className="acw-flow-q-hint acw-flow-prose">
            <p>
              Answer in your own words. Honest answers matter more than polished
              English. Every girl and young woman is welcome to apply, including
              those with disabilities. Near the end, you can tell us about any
              support that would help you take part.
            </p>
            <p>
              Authorised members of the A Certain Woman team will use your
              answers to review applications, contact you and plan support.
              Please do not include abuse experiences, medical history or other
              private matters here.
            </p>
            <p>
              If you are 14 to 17, a parent or guardian will be asked for
              permission before enrolment. If the page reloads, your answers
              are kept in this tab for up to two hours; closing the tab clears
              them.
            </p>
          </div>
          <Check
            checked={data.voluntary === "yes"}
            onChange={(v) => set("voluntary", v ? "yes" : "")}
            label="I have read this and I want to apply."
          />
        </>
      );

    case "full_name":
      return (
        <Text
          id="full_name"
          question="What is your full name?"
          hint="As you would like it recorded."
          value={data.full_name}
          onChange={(v) => set("full_name", v)}
          autoComplete="name"
          max={LIMITS.name}
        />
      );

    case "preferred_name":
      return (
        <Text
          id="preferred_name"
          question="What should we call you?"
          hint="Leave it empty and we will use your first name."
          optional
          value={data.preferred_name}
          onChange={(v) => set("preferred_name", v)}
          autoComplete="nickname"
          max={LIMITS.short}
        />
      );

    case "dob":
      return (
        <>
          <label htmlFor="dob" className="acw-flow-q">
            When were you born?
          </label>
          <p className="acw-flow-q-hint">BecomingHER is for ages 14 to 21.</p>
          <input
            id="dob"
            type="date"
            className="acw-flow-q-input"
            value={data.dob}
            max={today()}
            min="1990-01-01"
            autoComplete="bday"
            onChange={(e) => set("dob", e.target.value)}
          />
          {age !== null && age >= 0 && (
            <p className="acw-flow-q-note">That makes you {age}.</p>
          )}
        </>
      );

    case "location":
      return (
        <Text
          id="location"
          question="Which area or community do you live in?"
          hint="The neighbourhood is enough. Please do not give a street address."
          value={data.location}
          onChange={(v) => set("location", v)}
          max={LIMITS.short}
        />
      );

    case "current_status":
      return (
        <Choices
          question="What are you doing at the moment?"
          choices={CURRENT_STATUS}
          value={data.current_status}
          onChange={(v) => set("current_status", v)}
        />
      );

    case "organisation":
      return (
        <Text
          id="organisation"
          question="Which school, training centre or employer?"
          optional
          value={data.organisation}
          onChange={(v) => set("organisation", v)}
          autoComplete="organization"
          max={LIMITS.short}
        />
      );

    case "affiliation":
      return (
        <Choices
          question="Do you belong to a faith or community group?"
          hint="Everyone is welcome, whatever the answer."
          optional
          choices={AFFILIATION}
          value={data.affiliation}
          onChange={(v) => set("affiliation", v)}
        />
      );

    case "mobile":
      return (
        <>
          <label htmlFor="mobile" className="acw-flow-q">
            Which phone number can we reach you on?
          </label>
          <p className="acw-flow-q-hint">Use a number that is safe for us to call.</p>
          <PhoneField
            id="mobile"
            value={data.mobile}
            onChange={(v) => set("mobile", v)}
            className="acw-flow-phone"
          />
        </>
      );

    case "whatsapp":
      return (
        <>
          <label htmlFor="whatsapp" className="acw-flow-q">
            Is your WhatsApp on a different number?
            <OptionalTag />
          </label>
          <p className="acw-flow-q-hint">Leave it empty if it is the same number.</p>
          <PhoneField
            id="whatsapp"
            value={data.whatsapp}
            onChange={(v) => set("whatsapp", v)}
            className="acw-flow-phone"
          />
        </>
      );

    case "safe_contact":
      return (
        <fieldset className="acw-flow-fieldset">
          <legend className="acw-flow-q">How is it safe for us to contact you?</legend>
          <p className="acw-flow-q-hint">Choose all that apply.</p>
          <div className="acw-flow-choices">
            {SAFE_CONTACT.map((c) => (
              <Check
                key={c.value}
                checked={data.safe_contact.includes(c.value)}
                onChange={(on) =>
                  set(
                    "safe_contact",
                    on
                      ? [...data.safe_contact, c.value]
                      : data.safe_contact.filter((v) => v !== c.value),
                  )
                }
                label={c.label}
              />
            ))}
          </div>
        </fieldset>
      );

    case "guardian":
      return (
        <>
          <h3 className="acw-flow-q">Who is your parent or guardian?</h3>
          <p className="acw-flow-q-hint">
            Because you are under 18, we will ask for their permission before
            enrolment.
          </p>
          <label htmlFor="guardian_name" className="acw-flow-q-label">
            Their full name
          </label>
          <input
            id="guardian_name"
            className="acw-flow-q-input"
            value={data.guardian_name}
            maxLength={LIMITS.name}
            onChange={(e) => set("guardian_name", e.target.value)}
          />
          <label htmlFor="guardian_phone" className="acw-flow-q-label">
            Their phone number
          </label>
          <PhoneField
            id="guardian_phone"
            value={data.guardian_phone}
            onChange={(v) => set("guardian_phone", v)}
            className="acw-flow-phone"
          />
        </>
      );

    case "motivation":
      return (
        <Long
          id="motivation"
          question="Why do you want to join BecomingHER?"
          hint="Your own honest words matter more than polished English."
          value={data.motivation}
          onChange={(v) => set("motivation", v)}
          min={LIMITS.motivation.min}
          max={LIMITS.motivation.max}
        />
      );

    case "learning_hope":
      return (
        <Long
          id="learning_hope"
          question="What do you hope to learn, strengthen or change?"
          value={data.learning_hope}
          onChange={(v) => set("learning_hope", v)}
          min={LIMITS.learning.min}
          max={LIMITS.learning.max}
        />
      );

    case "commitment":
      return (
        <>
          <Choices
            question="Can you come to orientation, all six Saturdays and graduation?"
            hint="Orientation is on 23 January. Graduation is on 27 March."
            choices={COMMITMENT}
            value={data.commitment}
            onChange={(v) => set("commitment", v)}
          />
          {data.commitment && data.commitment !== "yes" && (
            <Long
              id="commitment_explain"
              question="Tell us about your availability."
              small
              value={data.commitment_explain}
              onChange={(v) => set("commitment_explain", v)}
              max={LIMITS.long}
            />
          )}
        </>
      );

    case "barrier_support":
      return (
        <Long
          id="barrier_support"
          question="Is there anything that would help you apply, attend or take part?"
          optional
          hint="For example step-free access, large print or audio, breaks, help with this form, or transport and timing. You do not need to share a diagnosis. If you would rather talk privately, write: Please contact me privately."
          value={data.barrier_support}
          onChange={(v) => set("barrier_support", v)}
          max={LIMITS.long}
        />
      );

    case "project":
      return (
        <>
          <Choices
            question="Will you do weekly activities and a small, mentored Becoming Project?"
            choices={PROJECT_WILLING}
            value={data.project_willing}
            onChange={(v) => set("project_willing", v)}
          />
          {data.project_willing === "unsure" && (
            <Long
              id="project_explain"
              question="What makes you unsure?"
              small
              value={data.project_explain}
              onChange={(v) => set("project_explain", v)}
              max={LIMITS.long}
            />
          )}
        </>
      );

    case "referral":
      return (
        <>
          <Choices
            question="How did you hear about BecomingHER?"
            choices={REFERRAL}
            value={data.referral_source}
            onChange={(v) => set("referral_source", v)}
          />
          {data.referral_source === "other" && (
            <Text
              id="referral_other"
              question="Where did you hear about it?"
              small
              value={data.referral_other}
              onChange={(v) => set("referral_other", v)}
              max={LIMITS.short}
            />
          )}
        </>
      );

    case "review":
      return <Review data={data} age={age} edit={edit} set={set} />;
  }
}

/* ─────────────────────── Review ─────────────────────── */

function Review({
  data,
  age,
  edit,
  set,
}: {
  data: Data;
  age: number | null;
  edit: (s: StepId) => void;
  set: StepProps["set"];
}) {
  const rows: Array<[string, string, StepId]> = [
    ["Full name", data.full_name, "full_name"],
    ["Called", data.preferred_name, "preferred_name"],
    ["Date of birth", age !== null ? `${data.dob} (age ${age})` : data.dob, "dob"],
    ["Community", data.location, "location"],
    ["Doing now", labelOf(CURRENT_STATUS, data.current_status), "current_status"],
    ["School or work", data.organisation, "organisation"],
    ["Faith or community", data.affiliation ? labelOf(AFFILIATION, data.affiliation) : "", "affiliation"],
    ["Phone", data.mobile, "mobile"],
    ["WhatsApp", data.whatsapp, "whatsapp"],
    ["Safe contact", data.safe_contact.map((v) => labelOf(SAFE_CONTACT, v)).join(", "), "safe_contact"],
    ...(age !== null && age < 18
      ? ([["Parent or guardian", `${data.guardian_name}, ${data.guardian_phone}`, "guardian"]] as Array<[string, string, StepId]>)
      : []),
    ["Why join", data.motivation, "motivation"],
    ["Hopes to learn", data.learning_hope, "learning_hope"],
    ["Can attend", labelOf(COMMITMENT, data.commitment), "commitment"],
    ["Support", data.barrier_support, "barrier_support"],
    ["Becoming Project", labelOf(PROJECT_WILLING, data.project_willing), "project"],
    ["Heard from", data.referral_source === "other" ? data.referral_other : labelOf(REFERRAL, data.referral_source), "referral"],
  ];

  return (
    <>
      <h3 className="acw-flow-q">Check your answers.</h3>
      <dl className="acw-flow-review">
        {rows
          .filter(([, v]) => v)
          .map(([label, value, target]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
              <button type="button" onClick={() => edit(target)}>
                Change<span className="sr-only"> {label.toLowerCase()}</span>
              </button>
            </div>
          ))}
      </dl>
      <Check
        checked={data.declaration === "yes"}
        onChange={(v) => set("declaration", v ? "yes" : "")}
        label="This information is true, and I understand that applying does not guarantee a place."
      />
    </>
  );
}
