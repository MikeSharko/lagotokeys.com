// Responsive photo from /public/photos/<name>-<width>.webp.
// The site is a static export, so the Next image optimizer can't run; sizes are pre-generated instead.

export const photos = {
  "hero-lesson": { widths: [480, 800, 1200], w: 1448, h: 1086 },
  "lesson-kids": { widths: [480, 800, 1200], w: 1448, h: 1086 },
  "lesson-teens": { widths: [480, 800, 1200], w: 1448, h: 1086 },
  "lesson-adults": { widths: [480, 800, 1200], w: 1448, h: 1086 },
  "lesson-advanced": { widths: [480, 800], w: 1122, h: 1402 },
  "studio-room": { widths: [480, 800, 1200], w: 1448, h: 1086 },
  "first-student": { widths: [480, 800], w: 2560, h: 1791 },
} as const;

export type PhotoName = keyof typeof photos;

type Props = {
  name: PhotoName;
  alt: string;
  /** Rendered width hint for the browser, e.g. "(min-width: 1024px) 560px, 100vw" */
  sizes: string;
  className?: string;
  /** Focal point when the photo is cropped by object-cover, e.g. "65% 50%" */
  position?: string;
  /** Above-the-fold image: load immediately */
  priority?: boolean;
};

export function Photo({ name, alt, sizes, className, position, priority }: Props) {
  const p = photos[name];
  const src = (w: number) => `/photos/${name}-${w}.webp`;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export: pre-sized WebP via srcSet
    <img
      src={src(p.widths[1])}
      srcSet={p.widths.map((w) => `${src(w)} ${w}w`).join(", ")}
      sizes={sizes}
      width={p.w}
      height={p.h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`object-cover ${className ?? ""}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
