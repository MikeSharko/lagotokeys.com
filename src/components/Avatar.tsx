// Katerina's round portrait, pre-sized in /public/photos/katerina-avatar-<width>.webp
const widths = [96, 192, 384];

type Props = {
  /** Rendered size in CSS pixels */
  size: number;
  /** Empty when the name is already shown next to the photo */
  alt?: string;
  className?: string;
};

export function Avatar({ size, alt = "", className }: Props) {
  const src = (w: number) => `/photos/katerina-avatar-${w}.webp`;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export: pre-sized WebP via srcSet
    <img
      src={src(192)}
      srcSet={widths.map((w) => `${src(w)} ${w}w`).join(", ")}
      sizes={`${size}px`}
      width={size}
      height={size}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      decoding="async"
      loading="lazy"
      className={`flex-none rounded-full object-cover ${className ?? ""}`}
      style={{ width: size, height: size }}
    />
  );
}
