import type { ValidApplication } from "./validate";

/**
 * Writes an application into the KoboToolbox form over the OpenRosa
 * submission API: the same endpoint KoboCollect uses on a phone.
 *
 * Kobo's REST API v1 was retired in 2026 and API v2 cannot create
 * submissions, so this is the supported way to add one from a server.
 * OpenRosa endpoints live on the KoboCAT domain (kc.), not the KPI one (kf.).
 */

/** The form's asset uid, also the root element of every submission. */
const FORM_ID = "avcJ4iqDNcKpTSeXrnfEPh";
/** `version` attribute and `__version__` of the deployed form (5 Nov 2026). */
const FORM_VERSION = "2 (2026-11-05 22:32:21)";
const FORM_VERSION_ID = "vv3npbvLwbBzCvyKeNWT3D";
const FORMHUB_UUID = "dd7adca99f3f4a3ba801590a951b69d2";

const DEFAULT_URL = "https://kc.kobotoolbox.org/submission";

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Every element name below is a fixed string; only values come from input. */
export function buildSubmissionXml(
  a: ValidApplication,
  instanceId: string,
  endedAt: Date,
): string {
  // Start time on the server's clock: submission time minus the duration the
  // browser measured. The device's own clock may be wrong.
  const startedAt = new Date(endedAt.getTime() - a.elapsed_ms);
  const el = (name: string, value = "") =>
    value ? `<${name}>${xmlEscape(value)}</${name}>` : `<${name}/>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<${FORM_ID} xmlns:jr="http://openrosa.org/javarosa" xmlns:orx="http://openrosa.org/xforms" id="${FORM_ID}" version="${xmlEscape(FORM_VERSION)}">
<formhub>${el("uuid", FORMHUB_UUID)}</formhub>
${el("start", startedAt.toISOString())}
${el("end", endedAt.toISOString())}
${el("deviceid", "acertainwoman.org")}
${el("intro")}
${el("voluntary", "yes")}
${el("full_name", a.full_name)}
${el("preferred_name", a.preferred_name)}
${el("age", String(a.age))}
${el("dob", a.dob)}
${el("location", a.location)}
${el("current_status", a.current_status)}
${el("organisation", a.organisation)}
${el("affiliation", a.affiliation)}
${el("mobile", a.mobile)}
${el("whatsapp", a.whatsapp)}
${el("safe_contact", a.safe_contact.join(" "))}
${el("guardian_name", a.guardian_name)}
${el("guardian_phone", a.guardian_phone)}
${el("motivation", a.motivation)}
${el("learning_hope", a.learning_hope)}
${el("commitment", a.commitment)}
${el("commitment_explain", a.commitment_explain)}
${el("barrier_support", a.barrier_support)}
${el("project_willing", a.project_willing)}
${el("project_explain", a.project_explain)}
${el("referral_source", a.referral_source)}
${el("referral_other", a.referral_other)}
${el("declaration", "yes")}
${el("support")}
${el("__version__", FORM_VERSION_ID)}
<meta>${el("instanceID", instanceId)}${el("instanceName", `${a.full_name} — ${a.age}`)}</meta>
</${FORM_ID}>`;
}

export function isKoboConfigured(): boolean {
  return Boolean(process.env.KOBO_API_TOKEN);
}

/** Sends one submission. Throws with Kobo's status line on failure. */
export async function submitToKobo(xml: string): Promise<void> {
  const token = process.env.KOBO_API_TOKEN;
  if (!token) throw new Error("KOBO_API_TOKEN is not set");

  const body = new FormData();
  body.append(
    "xml_submission_file",
    new Blob([xml], { type: "text/xml" }),
    "submission.xml",
  );

  const res = await fetch(process.env.KOBO_SUBMISSION_URL || DEFAULT_URL, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "X-OpenRosa-Version": "1.0",
    },
    body,
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });

  // OpenRosa answers 201 Created (202 when the submission is a duplicate).
  if (res.status !== 201 && res.status !== 202) {
    throw new Error(`Kobo answered ${res.status} ${res.statusText}`);
  }
}
