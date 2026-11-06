import type { Metadata } from "next";
import { site } from "@/config/site";
import { alternatesFor, href, type Locale } from "@/i18n";

type PageSeo = {
  locale: Locale;
  /** Locale-neutral path, e.g. "/" or "/blog/my-post/" */
  path: string;
  title: string;
  description: string;
  /** Use the title as-is instead of the "%s | LegatoKeys" template */
  absoluteTitle?: boolean;
  type?: "website" | "article";
};

// Canonical URL + hreflang links so Google treats EN and RU as translations of each other
export function pageMetadata({ locale, path, title, description, absoluteTitle, type = "website" }: PageSeo): Metadata {
  const alt = alternatesFor(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: href(locale, path),
      languages: { en: alt.en, ru: alt.ru, "x-default": alt.en },
    },
    openGraph: {
      type,
      url: href(locale, path),
      siteName: site.name,
      title,
      description,
      locale: locale === "ru" ? "ru_RU" : "en_US",
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
};
