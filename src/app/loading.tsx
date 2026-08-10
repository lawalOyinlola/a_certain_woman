/**
 * Route-level loading fallback. Deliberately quiet: a single breathing mark
 * rather than skeleton blocks, since page shapes differ enough across the site
 * that a generic skeleton would mostly mislead about what is arriving.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-cream-1 px-6"
    >
      <span className="acw-float text-gold" aria-hidden>
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M12 2 L14.6 9.4 L22 12 L14.6 14.6 L12 22 L9.4 14.6 L2 12 L9.4 9.4 Z" />
        </svg>
      </span>
      <span className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
        Loading
      </span>
    </div>
  );
}
