/**
 * Server-side check of a Cloudflare Turnstile token (siteverify).
 *
 * The widget in the browser only produces a token. A token proves nothing
 * until Cloudflare confirms it here, so every protected route must call this.
 * Tokens are single-use and expire after 300 seconds.
 */

const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Cloudflare's documented maximum token length.
const MAX_TOKEN_LENGTH = 2048;

export type TurnstileResult =
  | { ok: true }
  | { ok: false; reason: "missing" | "rejected" | "unavailable" };

/** True when the server has a secret key and must check every token. */
export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

/**
 * True when the check is required but cannot run: production without a
 * secret key. The route must then refuse, not let requests through unchecked.
 * Production means VERCEL_ENV=production, or NODE_ENV=production off Vercel.
 * Vercel previews are exempt (their builds also run with NODE_ENV=production).
 */
export function turnstileMisconfigured(): boolean {
  const env = process.env.VERCEL_ENV;
  const production = env ? env === "production" : process.env.NODE_ENV === "production";
  return !isTurnstileConfigured() && production;
}

export async function verifyTurnstile(
  token: unknown,
  expectedAction: string,
  remoteIp?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true }; // Not configured: see turnstileMisconfigured().

  if (typeof token !== "string" || !token || token.length > MAX_TOKEN_LENGTH) {
    return { ok: false, reason: "missing" };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  let data: { success?: boolean; action?: string; "error-codes"?: string[] };
  try {
    const res = await fetch(SITEVERIFY, {
      method: "POST",
      body,
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`siteverify answered ${res.status}`);
    data = await res.json();
  } catch (err) {
    console.error(
      "Turnstile: siteverify failed:",
      err instanceof Error ? err.message : "unknown error",
    );
    return { ok: false, reason: "unavailable" };
  }

  if (!data.success) {
    const codes = data["error-codes"] ?? [];
    // Cloudflare's own failure, not a bad token: the applicant can retry.
    if (codes.includes("internal-error")) {
      console.error("Turnstile: siteverify internal-error");
      return { ok: false, reason: "unavailable" };
    }
    console.warn("Turnstile: token rejected:", codes.join(", "));
    return { ok: false, reason: "rejected" };
  }
  // A token made for another form on the site must not be reused here.
  // Cloudflare's test keys return no action, so only a present one is checked.
  if (data.action && data.action !== expectedAction) {
    console.warn(`Turnstile: action "${data.action}" does not match "${expectedAction}"`);
    return { ok: false, reason: "rejected" };
  }
  return { ok: true };
}
