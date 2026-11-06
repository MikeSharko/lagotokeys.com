// Tilted piano-keyboard illustration used for the hero, lesson cards and blog covers.
// Presets reproduce the proportions from the "Studio" mockup.

const presets = {
  hero: { vw: 600, vh: 552, white: 70, gap: 74, whiteH: 320, rx: 8, black: 44, blackH: 190, brx: 6, keys: 11 },
  card: { vw: 300, vh: 285, white: 44, gap: 47, whiteH: 200, rx: 6, black: 28, blackH: 120, brx: 5, keys: 7 },
  thumb: { vw: 320, vh: 220, white: 44, gap: 47, whiteH: 200, rx: 6, black: 28, blackH: 120, brx: 5, keys: 8 },
  featured: { vw: 600, vh: 380, white: 64, gap: 68, whiteH: 300, rx: 8, black: 40, blackH: 175, brx: 6, keys: 10 },
  cover: { vw: 1200, vh: 487, white: 80, gap: 85, whiteH: 360, rx: 10, black: 50, blackH: 210, brx: 7, keys: 16 },
} as const;

// Black keys sit after white keys 1, 2, 4, 5, 6 of every octave (C# D# F# G# A#)
const BLACK_STEPS = new Set([1, 2, 4, 5, 6]);

export type PianoKeysProps = {
  preset: keyof typeof presets;
  /** SVG transform for the key group, e.g. "rotate(-14 150 140) translate(-10 90)" */
  transform: string;
  /** Index of the white key drawn in the highlight color */
  highlight: number;
  highlightColor?: "accent" | "ink";
  label?: string;
  className?: string;
};

export function PianoKeys({
  preset,
  transform,
  highlight,
  highlightColor = "accent",
  label,
  className,
}: PianoKeysProps) {
  const p = presets[preset];
  const whiteKeys = Array.from({ length: p.keys }, (_, i) => i);
  const blackKeys = whiteKeys.filter((i) => i > 0 && BLACK_STEPS.has(i % 7));
  const hit = highlightColor === "accent" ? "var(--color-accent)" : "var(--color-ink)";

  return (
    <svg
      viewBox={`0 0 ${p.vw} ${p.vh}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <g transform={transform}>
        {whiteKeys.map((i) => (
          <rect
            key={`w${i}`}
            x={i * p.gap}
            y={0}
            width={p.white}
            height={p.whiteH}
            rx={p.rx}
            fill={i === highlight ? hit : "#FFFFFF"}
          />
        ))}
        {blackKeys.map((i) => (
          <rect
            key={`b${i}`}
            x={i * p.gap - p.black / 2 - (p.gap - p.white) / 2}
            y={-4}
            width={p.black}
            height={p.blackH}
            rx={p.brx}
            fill="var(--color-ink)"
          />
        ))}
      </g>
    </svg>
  );
}

// Pastel backgrounds used behind illustrations
export const coverBg = {
  butter: "bg-butter",
  sky: "bg-sky",
  sage: "bg-sage",
  rose: "bg-rose",
} as const;

export type CoverColor = keyof typeof coverBg;
