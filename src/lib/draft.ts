/**
 * Unsent form answers, kept so a refresh does not lose them.
 *
 * sessionStorage, not localStorage: a draft lives only in the tab it was
 * typed in and disappears when that tab closes. Many people here share a
 * phone, so a draft must not wait on the device for the next person. It also
 * expires after two hours, and every form clears it once it is sent.
 */

const TTL_MS = 2 * 60 * 60 * 1000;

type Stored<T> = { savedAt: number; value: T };

export function readDraft<T>(key: string): T | null {
  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Stored<T>;
    if (!stored || Date.now() - stored.savedAt > TTL_MS) {
      window.sessionStorage.removeItem(key);
      return null;
    }
    return stored.value;
  } catch {
    return null;
  }
}

export function writeDraft<T>(key: string, value: T): void {
  try {
    const stored: Stored<T> = { savedAt: Date.now(), value };
    window.sessionStorage.setItem(key, JSON.stringify(stored));
  } catch {
    // Storage can be full or blocked (private windows). The form still works;
    // only the refresh safety net is lost.
  }
}

export function clearDraft(key: string): void {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Nothing to clear.
  }
}
