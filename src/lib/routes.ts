/**
 * The site's public routes, and the nearest-match logic the 404 page uses to
 * rescue a mistyped URL.
 *
 * Deliberately a suggestion rather than an automatic redirect: a wrong guess
 * sent silently would drop someone on a page they never asked for, and every
 * unknown URL answering 200 turns real dead links into soft 404s that search
 * engines penalise and that hide broken links from us. Genuinely predictable
 * variants ("/contacts") are handled as real redirects in next.config.ts, where
 * each one is written down and reviewable.
 */

export type SiteRoute = { path: string; label: string };

export const SITE_ROUTES: SiteRoute[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/founder", label: "Founder's Letter" },
  { path: "/programs", label: "Programs" },
  { path: "/events", label: "Events" },
  { path: "/gallery", label: "Gallery" },
  { path: "/stories", label: "Stories" },
  { path: "/partner", label: "Partner With Us" },
  { path: "/contact", label: "Contact" },
];

/**
 * Cap on how much of the path we compare. The matcher runs over attacker
 * controllable input, and edit distance is O(n * m), so an enormous URL should
 * not be able to buy meaningful CPU time.
 */
const MAX_COMPARE_LENGTH = 64;

/** Levenshtein distance, iterative with a single row of state. */
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      const substitution = prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1);
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, substitution);
    }
    prev = row;
  }

  return prev[b.length];
}

/** Strip casing, slashes, and separators so "/Our-Programs/" ~ "programs". */
function normalise(path: string): string {
  return path
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, MAX_COMPARE_LENGTH);
}

/**
 * Best route for a path that didn't match anything, or null when nothing is
 * close enough to be worth offering. Returning null is the common case for
 * genuine junk, and the 404 simply shows the full nav instead.
 */
export function findNearestRoute(pathname: string): SiteRoute | null {
  const target = normalise(pathname);
  if (!target) return null;

  let best: SiteRoute | null = null;
  let bestDistance = Infinity;

  for (const route of SITE_ROUTES) {
    const candidate = normalise(route.path);
    if (!candidate) continue;

    // A path that contains the route name (or vice versa) is a strong signal:
    // "/eventspage" or "/event" both clearly mean /events.
    if (candidate.includes(target) || target.includes(candidate)) {
      const distance = Math.abs(candidate.length - target.length) * 0.5;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = route;
      }
      continue;
    }

    const distance = editDistance(target, candidate);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = route;
    }
  }

  // Roughly "no more than a third of the word is wrong", so close typos are
  // offered and unrelated words are not.
  const tolerance = Math.max(1, Math.floor(target.length / 3));
  return best && bestDistance <= tolerance ? best : null;
}
