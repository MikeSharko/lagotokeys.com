// LegatoKeys mark: two rising notes joined by a slur, on a plum tile.
// "small" uses heavier strokes so the notes stay readable at favicon sizes.

const shapes = {
  regular: {
    stems: "M20.3 31V11.5M35.3 26V9.5",
    slur: "M11.5 38Q22 44.5 33 33.5",
    stroke: 2.6,
    rx: 5,
    ry: 3.8,
  },
  small: {
    stems: "M21 31V10.5M36 26V8.5",
    slur: "M11 39Q22 45.5 33.5 34",
    stroke: 3.8,
    rx: 6,
    ry: 4.6,
  },
} as const;

type Props = {
  size?: number;
  variant?: keyof typeof shapes;
  className?: string;
  label?: string;
};

export function BrandMark({ size = 36, variant = "regular", className, label }: Props) {
  const s = shapes[variant];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <rect width="48" height="48" rx="11" fill="var(--color-accent)" />
      <path d={s.stems} stroke="#FFFFFF" strokeWidth={s.stroke} strokeLinecap="round" />
      <ellipse cx="16" cy="32" rx={s.rx} ry={s.ry} transform="rotate(-22 16 32)" fill="#FFFFFF" />
      <ellipse cx="31" cy="27" rx={s.rx} ry={s.ry} transform="rotate(-22 31 27)" fill="#FFFFFF" />
      <path d={s.slur} fill="none" stroke="#FFFFFF" strokeWidth={s.stroke} strokeLinecap="round" />
    </svg>
  );
}

// Wordmark: spaced capitals, "KEYS" in the accent color.
// Size and letter-spacing come from className (e.g. "text-base tracking-[0.12em]").
export function Wordmark({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={`font-bold uppercase ${dark ? "text-white" : "text-ink"} ${className ?? ""}`}>
      Legato<span className={dark ? "text-accent-tint" : "text-accent"}>Keys</span>
    </span>
  );
}
