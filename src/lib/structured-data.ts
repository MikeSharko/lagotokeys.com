// schema.org JSON-LD for blog pages: helps Google show the author, dates and breadcrumbs
import { site } from "@/config/site";
import { getDictionary, href, type Locale } from "@/i18n";
import type { Post } from "./posts";

const abs = (path: string) => `${site.url}${path}`;

export function ogImage(locale: Locale): string {
  return abs(`/og/og-${locale}.png`);
}

function author(locale: Locale) {
  const t = getDictionary(locale).teacher;
  return {
    "@type": "Person",
    name: t.name,
    jobTitle: t.role,
    url: abs(`${href(locale, "/")}#teacher`),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: locale === "ru" ? "Санкт-Петербургская консерватория" : "St. Petersburg Conservatory",
    },
  };
}

function publisher() {
  return {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: { "@type": "ImageObject", url: abs("/og/logo.png") },
  };
}

export function blogPostingLd(locale: Locale, post: Post) {
  const url = abs(href(locale, `/blog/${post.slug}/`));
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: ogImage(locale),
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: locale,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: author(locale),
    publisher: publisher(),
  };
}

export function breadcrumbLd(locale: Locale, post: Post) {
  const d = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.name, item: abs(href(locale, "/")) },
      { "@type": "ListItem", position: 2, name: d.nav.blog, item: abs(href(locale, "/blog/")) },
      { "@type": "ListItem", position: 3, name: post.title, item: abs(href(locale, `/blog/${post.slug}/`)) },
    ],
  };
}

// The studio as a local business, for the home pages. Mirrors the Google Business Profile
// (same name, area and phone) so Google can connect the site and the Maps listing.
export function localBusinessLd(locale: Locale) {
  const d = getDictionary(locale);
  const { address } = site;
  const sameAs = [site.googleBusinessUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MusicSchool"],
    "@id": `${site.url}/#business`,
    name: site.name,
    description: d.meta.homeDescription,
    url: abs(href(locale, "/")),
    telephone: site.phone.tel,
    image: ogImage(locale),
    logo: abs("/og/logo.png"),
    address: {
      "@type": "PostalAddress",
      ...(address.streetAddress ? { streetAddress: address.streetAddress } : {}),
      addressLocality: address.city,
      addressRegion: address.region,
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
      addressCountry: address.country,
    },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name: `${name}, ${address.region}` })),
    knowsLanguage: ["en", "ru"],
    founder: author(locale),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

// Google shows FAQ rich results only for a few authoritative sites now,
// but the markup still helps search engines and AI answers match questions to the page
export function faqLd(post: Post) {
  if (post.faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
