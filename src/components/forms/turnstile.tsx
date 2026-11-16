"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cloudflare Turnstile widget. In "interaction-only" mode most people see
 * nothing: the check runs in the background and the box appears only when
 * Cloudflare wants a click. The token goes to `onToken`, and an empty string
 * means there is no valid token (not ready yet, expired or failed).
 *
 * The site key comes from NEXT_PUBLIC_TURNSTILE_SITE_KEY. Without it the
 * widget renders nothing and `onToken` is never called.
 */

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type RenderOptions = {
  sitekey: string;
  action?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "flexible" | "compact";
  appearance?: "always" | "execute" | "interaction-only";
  "refresh-expired"?: "auto" | "manual" | "never";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render: (el: HTMLElement, options: RenderOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error("no api"));
    script.onerror = () => {
      loading = null; // Let a later mount try again.
      script.remove();
      reject(new Error("load failed"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

export function Turnstile({
  action,
  onToken,
  resetSignal = 0,
}: {
  /** Names the form. The server rejects a token made for another action. */
  action: string;
  onToken: (token: string) => void;
  /** Change this number to get a fresh token (tokens are single-use). */
  resetSignal?: number;
}) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const tokenCb = useRef(onToken);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    tokenCb.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled || !box.current) return;
        widget.current = api.render(box.current, {
          sitekey: TURNSTILE_SITE_KEY,
          action,
          theme: "light",
          size: "flexible",
          appearance: "interaction-only",
          "refresh-expired": "auto",
          callback: (token) => {
            setFailed(false);
            tokenCb.current(token);
          },
          "expired-callback": () => tokenCb.current(""),
          "error-callback": () => {
            setFailed(true);
            tokenCb.current("");
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
      // The token belonged to the removed widget; the form must wait for a new one.
      tokenCb.current("");
    };
  }, [action]);

  useEffect(() => {
    if (resetSignal && widget.current) {
      tokenCb.current("");
      window.turnstile?.reset(widget.current);
    }
  }, [resetSignal]);

  if (!TURNSTILE_SITE_KEY) return null;
  return (
    <div className="acw-flow-turnstile">
      <div ref={box} />
      {failed && (
        <p role="alert" className="acw-flow-error">
          The security check could not load. Check your connection, then
          refresh the page. Your answers are saved.
        </p>
      )}
    </div>
  );
}
