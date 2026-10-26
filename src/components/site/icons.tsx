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
