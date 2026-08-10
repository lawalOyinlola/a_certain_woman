export function Crown({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 16"
      width="22"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M2 14 L4 4 L8 9 L12 2 L16 9 L20 4 L22 14 Z" />
      <line x1="2" y1="14" x2="22" y2="14" />
      <circle cx="4" cy="4" r="0.8" fill="currentColor" />
      <circle cx="12" cy="2" r="0.8" fill="currentColor" />
      <circle cx="20" cy="4" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function Diamond({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="currentColor"
      className={`acw-diamond-spacer ${className ?? ""}`}
    >
      <path d="M3 0 L6 3 L3 6 L0 3 Z" />
    </svg>
  );
}

export function Star() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M8 1 L9.5 6 L14.5 6 L10.5 9 L12 14 L8 11 L4 14 L5.5 9 L1.5 6 L6.5 6 Z" />
    </svg>
  );
}

export function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

export function ArrowRightThin() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M0 5h12M8 1l4 4-4 4" />
    </svg>
  );
}

export function Sprig() {
  return (
    <svg
      viewBox="0 0 200 300"
      width="100%"
      height="100%"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
    >
      <path d="M100 290 Q100 200 100 10" />
      {Array.from({ length: 14 }).map((_, i) => {
        const y = 30 + i * 18;
        const side = i % 2 === 0 ? 1 : -1;
        const len = 32 + (i % 3) * 10;
        return (
          <g key={i}>
            <path
              d={`M100 ${y} Q${100 + (side * len) / 2} ${y - 8} ${
                100 + side * len
              } ${y - 4}`}
            />
            <ellipse
              cx={100 + side * len * 0.7}
              cy={y - 6}
              rx={len * 0.35}
              ry="6"
              transform={`rotate(${side * 18}, ${100 + side * len * 0.7}, ${
                y - 6
              })`}
              fill="currentColor"
              opacity="0.18"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function PillarIcon({
  kind,
}: {
  kind: "tree" | "crown" | "heart" | "house";
}) {
  switch (kind) {
    case "tree":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M24 44 V20" />
          <path d="M24 28 Q14 24 12 14" />
          <path d="M24 28 Q34 24 36 14" />
          <path d="M24 22 Q18 16 18 8" />
          <path d="M24 22 Q30 16 30 8" />
          <ellipse
            cx="13"
            cy="13"
            rx="5"
            ry="6"
            transform="rotate(-25 13 13)"
            fill="currentColor"
            opacity="0.2"
          />
          <ellipse
            cx="35"
            cy="13"
            rx="5"
            ry="6"
            transform="rotate(25 35 13)"
            fill="currentColor"
            opacity="0.2"
          />
          <ellipse
            cx="18"
            cy="7"
            rx="3.5"
            ry="4.5"
            fill="currentColor"
            opacity="0.3"
          />
          <ellipse
            cx="30"
            cy="7"
            rx="3.5"
            ry="4.5"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      );
    case "crown":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M6 36 L10 14 L18 24 L24 8 L30 24 L38 14 L42 36 Z" />
          <line x1="6" y1="36" x2="42" y2="36" />
          <line x1="6" y1="40" x2="42" y2="40" />
          <circle cx="10" cy="14" r="1.6" fill="currentColor" />
          <circle cx="24" cy="8" r="1.6" fill="currentColor" />
          <circle cx="38" cy="14" r="1.6" fill="currentColor" />
          <circle cx="24" cy="28" r="1.2" fill="currentColor" />
        </svg>
      );
    case "heart":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M24 40 C8 28 8 14 16 12 C20 11 23 14 24 17 C25 14 28 11 32 12 C40 14 40 28 24 40 Z" />
          <path d="M24 22 V32" strokeWidth="0.8" />
          <path d="M20 26 L24 24 L28 26" strokeWidth="0.8" />
        </svg>
      );
    case "house":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M8 24 L24 10 L40 24 V40 H8 Z" />
          <path d="M20 40 V28 H28 V40" />
          <path d="M16 22 V14 H20 V18" />
          <line x1="6" y1="26" x2="42" y2="26" strokeWidth="0.6" />
        </svg>
      );
  }
}

export function Play({ size = 60 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="30" cy="30" r="29" />
      <path d="M24 20 L42 30 L24 40 Z" fill="currentColor" />
    </svg>
  );
}
