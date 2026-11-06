import { escapeHtml as esc } from "./escape";
import { emailDocument, emailFooterText, emailStyle, linkStyle } from "./layout";
import {
  AFFILIATION,
  COMMITMENT,
  CURRENT_STATUS,
  PROJECT_WILLING,
  REFERRAL,
  SAFE_CONTACT,
  labelOf,
} from "@/lib/becoming-her/application";
import type { ValidApplication } from "@/lib/becoming-her/validate";

/**
 * The team's notice of a BecomingHER application.
 *
 * Most applicants are under 18, so the email says as little as it can: the
 * name she wants to be called, her age and her area, and a link to the full
 * answers in KoboToolbox. Kobo is the record; the inbox is only the alert.
 *
 * The one exception: when the Kobo save failed, the email carries the whole
 * application, because otherwise it would be lost. It then asks the team to
 * enter it in Kobo and delete the email.
 */

/** The form's submissions table in KoboToolbox (sign-in required). */
export const KOBO_DATA_URL =
  "https://kf.kobotoolbox.org/#/forms/avcJ4iqDNcKpTSeXrnfEPh/data/table";

const calledName = (a: ValidApplication) =>
  a.preferred_name || a.full_name.split(/\s+/)[0];

type Row = [label: string, value: string];

function summary(a: ValidApplication): Row[] {
  return [
    ["Called", calledName(a)],
    ["Age", String(a.age)],
    ["Community", a.location],
  ];
}

/** Everything, for the case where Kobo did not receive it. */
function fullRecord(a: ValidApplication): Row[] {
  return [
    ["Full name", a.full_name],
    ["Preferred name", a.preferred_name],
    ["Date of birth", a.dob],
    ["Community", a.location],
    ["Education or work", labelOf(CURRENT_STATUS, a.current_status)],
    ["School, training or employer", a.organisation],
    ["Faith or community", a.affiliation ? labelOf(AFFILIATION, a.affiliation) : ""],
    ["Mobile", a.mobile],
    ["WhatsApp", a.whatsapp],
    ["Safe contact", a.safe_contact.map((v) => labelOf(SAFE_CONTACT, v)).join(", ")],
    ["Parent or guardian", a.guardian_name],
    ["Guardian phone", a.guardian_phone],
    ["Why she wants to join", a.motivation],
    ["What she hopes to learn", a.learning_hope],
    ["Can attend every date", labelOf(COMMITMENT, a.commitment)],
    ["Availability notes", a.commitment_explain],
    ["Practical support", a.barrier_support],
    ["Becoming Project", labelOf(PROJECT_WILLING, a.project_willing)],
    ["Why unsure", a.project_explain],
    ["Heard about it from", labelOf(REFERRAL, a.referral_source)],
    ["Other source", a.referral_other],
  ].filter(([, v]) => v) as Row[];
}

export function becomingHerSubject(a: ValidApplication, savedToKobo: boolean): string {
  // nodemailer encodes the subject, and control characters (CR, LF) were
  // removed from the name during validation, so no header can be injected.
  return savedToKobo
    ? `[BecomingHER] New application: ${calledName(a)}, ${a.age}`
    : `[BecomingHER] ACTION NEEDED: application not saved to Kobo (${calledName(a)}, ${a.age})`;
}

export function becomingHerHtml(
  a: ValidApplication,
  reference: string,
  savedToKobo: boolean,
): string {
  const rows = (savedToKobo ? summary(a) : fullRecord(a))
    .map(
      ([k, v]) =>
        `<p style="${emailStyle.label}">${esc(k)}</p><p style="${emailStyle.value};white-space:pre-wrap">${esc(v)}</p>`,
    )
    .join("");

  const lead = savedToKobo
    ? `A new application has arrived and is saved in KoboToolbox. Read her full answers there: <a href="${KOBO_DATA_URL}" style="${linkStyle}">open the BecomingHER submissions</a>.`
    : `<strong>This application did not reach KoboToolbox.</strong> Please enter it in the Kobo form by hand, then delete this email. Everything she sent is below.`;

  return emailDocument(
    `<div style="${emailStyle.alert}">
    <div><span style="${emailStyle.reasonBadge}">BecomingHER application</span></div>
    <p style="margin:0 0 8px;font-size:16px;line-height:1.7;color:#3A4138">${lead}</p>
    ${rows}
    <p style="${emailStyle.note}">Reference ${esc(reference)}. This is a young person's application: please keep it within the review team.</p>
  </div>`,
    "New application",
  );
}

export function becomingHerText(
  a: ValidApplication,
  reference: string,
  savedToKobo: boolean,
): string {
  const lines = [
    "A CERTAIN WOMAN: BecomingHER application",
    "=".repeat(42),
    savedToKobo
      ? `A new application is saved in KoboToolbox. Full answers: ${KOBO_DATA_URL}`
      : "This application did NOT reach KoboToolbox. Please enter it in the Kobo form by hand, then delete this email.",
    "",
  ];
  for (const [k, v] of savedToKobo ? summary(a) : fullRecord(a)) {
    lines.push(`${k}: ${v}`);
  }
  lines.push(
    "",
    `Reference ${reference}. This is a young person's application: please keep it within the review team.`,
    "",
    emailFooterText,
  );
  return lines.join("\n");
}
