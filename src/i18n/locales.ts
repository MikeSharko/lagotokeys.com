export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// English lives at the root, Russian under /ru
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

// Build a site path for a locale, e.g. href("ru", "/blog/") -> "/ru/blog/"
export function href(locale: Locale, path = "/"): string {
  const prefix = localePrefix(locale);
  if (path === "/") return `${prefix}/`;
  return `${prefix}${path}`;
}

// The same page in every language, used by the switcher and hreflang tags
export function alternatesFor(path = "/"): Record<Locale, string> {
  return { en: href("en", path), ru: href("ru", path) };
}
