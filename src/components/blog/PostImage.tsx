// Blog cover photo from /public/blog/<image>-<width>.webp (pre-sized: the static export has no image optimizer)
const widths = [480, 800, 1200];

type Props = {
  image: string;
  alt: string;
  /** Rendered width hint, e.g. "(min-width: 1024px) 380px, 100vw" */
  sizes: string;
  /** object-position focal point, e.g. "50% 40%" */
  position?: string;
  className?: string;
  priority?: boolean;
};

export function PostImage({ image, alt, sizes, position, className, priority }: Props) {
  const src = (w: number) => `/blog/${image}-${w}.webp`;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export: pre-sized WebP via srcSet
    <img
      src={src(800)}
      srcSet={widths.map((w) => `${src(w)} ${w}w`).join(", ")}
      sizes={sizes}
      width={1448}
      height={1086}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`object-cover ${className ?? ""}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

/** Absolute URLs of a post's share/schema images, or null when the post has no photo */
export function postImageUrls(image: string | null, siteUrl: string) {
  if (!image) return null;
  return { og: `${siteUrl}/og/blog/${image}.jpg`, large: `${siteUrl}/blog/${image}-1200.webp` };
}
