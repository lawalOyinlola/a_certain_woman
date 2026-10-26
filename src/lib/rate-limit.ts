/**
 * Sliding-window rate limiter held in process memory.
 *
 * Best effort, by design: each serverless instance keeps its own counters, so
 * the real ceiling is the limit times the number of warm instances, and a
 * cold start resets them. It stops a single client or script that hammers the
 * form. It does not stop a distributed attack. For a hard limit, move the
 * store to Redis or Vercel KV and keep this interface.
 */

type Hits = number[];

const stores = new Map<string, Map<string, Hits>>();

// Cap on tracked keys per limiter, so the Map cannot grow without bound.
const MAX_KEYS = 5_000;

export type Limit = { name: string; max: number; windowMs: number };

export type Result = { ok: true } | { ok: false; retryAfterSeconds: number };

export function rateLimit(limit: Limit, key: string, now = Date.now()): Result {
  let store = stores.get(limit.name);
  if (!store) {
    store = new Map();
    stores.set(limit.name, store);
  }

  const recent = (store.get(key) ?? []).filter((t) => now - t < limit.windowMs);

  if (recent.length >= limit.max) {
    store.set(key, recent);
    const retryAfterMs = limit.windowMs - (now - recent[0]);
    return { ok: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  }

  recent.push(now);
  // Re-insert so the Map's order stays oldest-touched first.
  store.delete(key);
  store.set(key, recent);

  if (store.size > MAX_KEYS) {
    const oldest = store.keys().next().value;
    if (oldest !== undefined) store.delete(oldest);
  }
  return { ok: true };
}

/**
 * Client address for the limiter key. Vercel sets x-real-ip and overwrites
 * x-forwarded-for, so both are trustworthy there. Behind another proxy,
 * confirm it does the same, or a client can pick its own key.
 */
export function clientKey(req: Request): string {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export function tooManyRequests(retryAfterSeconds: number): Response {
  return Response.json(
    { error: "Too many requests. Please try again in a few minutes." },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
  );
}
