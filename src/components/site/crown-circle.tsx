import { cn } from "@/lib/utils";

const SEATS = 20;
const CENTER = 100;
const RADIUS = 82;

// One point per place in the founding cohort, starting at twelve o'clock.
// Rounded so the server and the client print identical attribute strings.
const seats = Array.from({ length: SEATS }, (_, i) => {
  const angle = (i / SEATS) * Math.PI * 2 - Math.PI / 2;
  return {
    cx: Math.round((CENTER + RADIUS * Math.cos(angle)) * 100) / 100,
    cy: Math.round((CENTER + RADIUS * Math.sin(angle)) * 100) / 100,
  };
});

/**
 * The BecomingHER mark: twenty seats in a ring around a crown, one for each
 * place in the founding cohort. Each seat carries `data-seat`, so a parent
 * <Reveal targets="[data-seat]"> can light them one after another.
 *
 * `filled` (0–20) dims the seats past that count, which the application form
 * uses as its progress indicator.
 */
export function CrownCircle({
  className,
  decorative = false,
  filled = SEATS,
  withCrown = true,
}: {
  className?: string;
  /** Hide from assistive technology, e.g. inside a link that names itself. */
  decorative?: boolean;
  filled?: number;
  withCrown?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      {...(decorative
        ? { "aria-hidden": true }
        : {
            role: "img",
            "aria-label": "Twenty places in a circle around a crown",
          })}
      className={cn("text-gold", className)}
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="0.6"
      />
      {seats.map((s, i) => (
        <circle
          key={i}
          data-seat
          cx={s.cx}
          cy={s.cy}
          r={i === 0 ? 5 : 4}
          fill="currentColor"
          className="acw-bh-seat"
          data-on={i < filled ? "" : undefined}
        />
      ))}
      {withCrown && (
        <g
          transform="translate(70 80) scale(2.5)"
          stroke="currentColor"
          strokeWidth="0.55"
          strokeLinejoin="round"
        >
          <path d="M2 14 L4 4 L8 9 L12 2 L16 9 L20 4 L22 14 Z" />
          <line x1="2" y1="14" x2="22" y2="14" />
          <circle cx="4" cy="4" r="0.7" fill="currentColor" />
          <circle cx="12" cy="2" r="0.7" fill="currentColor" />
          <circle cx="20" cy="4" r="0.7" fill="currentColor" />
        </g>
      )}
    </svg>
  );
}
