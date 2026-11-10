import type { Metadata } from "next";
import { site } from "@/config/site";
import { alternatesFor, href, type Locale } from "@/i18n";
import { ogImage } from "./structured-data";

type PageSeo = {
  locale: Locale;
  /** Locale-neutral path, e.g. "/" or "/blog/my-post/" */
  path: string;
  title: string;
  description: string;
  /** Use the title as-is instead of the "%s | LegatoKeys" template */
  absoluteTitle?: boolean;
  article?: { publishedTime: string; modifiedTime: string; author: string };
  /** 1200x630 share image; defaults to the site-wide card */
  image?: { url: string; alt: string };
};

// Canonical URL + hreflang links so Google treats EN and RU as translations of each other,
// plus Open Graph / Twitter cards for link previews in messengers and social apps
export function pageMetadata({ locale, path, title, description, absoluteTitle, article, image: custom }: PageSeo): Metadata {
  const alt = alternatesFor(path);
  const image = { url: custom?.url ?? ogImage(locale), width: 1200, height: 630, alt: custom?.alt ?? site.name };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: href(locale, path),
      languages: { en: alt.en, ru: alt.ru, "x-default": alt.en },
    },
    openGraph: {
      url: href(locale, path),
      siteName: site.name,
      title,
      description,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: locale === "ru" ? "en_US" : "ru_RU",
      images: [image],
      ...(article
        ? {
            type: "article",
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: [article.author],
          }
        : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
};
