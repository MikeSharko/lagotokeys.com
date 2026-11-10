// Blog posts live in content/blog/<locale>/<slug>.mdx and are read at build time.
// The same slug in both language folders makes the EN/RU switch land on the same article.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { CoverColor } from "@/components/PianoKeys";
import type { Locale } from "@/i18n";

export const categoryKeys = ["practice", "parents", "adults", "repertoire", "gear"] as const;
export type CategoryKey = (typeof categoryKeys)[number];

export type FaqItem = { q: string; a: string };

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  /** <title> tag; falls back to title. Keep under ~50 chars, " | LegatoKeys" is appended */
  seoTitle: string;
  /** Meta description for Google; falls back to excerpt. Aim for 140–160 chars */
  description: string;
  category: CategoryKey;
  readMinutes: number;
  date: string; // YYYY-MM-DD
  updated: string; // YYYY-MM-DD, defaults to date
  color: CoverColor;
  /** SVG transform for the thumbnail keys */
  tilt: string;
  highlight: "accent" | "ink";
  featured: boolean;
  /** Cover photo base name in /public/blog (<image>-<width>.webp); null = illustrated keys */
  image: string | null;
  /** object-position for the photo crop, e.g. "50% 40%" */
  imagePosition: string;
  imageAlt: string;
};

export type Post = PostMeta & { body: string; faq: FaqItem[] };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// ~200 words per minute, ignoring MDX tags
function readingTime(text: string): number {
  const words = text.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// gray-matter turns unquoted dates into Date objects
function toDateString(value: unknown): string {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
}

function readPost(locale: Locale, file: string): Post {
  const where = `content/blog/${locale}/${file}`;
  const raw = fs.readFileSync(path.join(BLOG_DIR, locale, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx$/, "");
  if (!categoryKeys.includes(data.category)) {
    throw new Error(`Unknown category "${data.category}" in ${where}`);
  }
  const faq: FaqItem[] = Array.isArray(data.faq)
    ? data.faq.map((item: { q?: unknown; a?: unknown }) => {
        if (!item.q || !item.a) throw new Error(`Every faq item needs "q" and "a" in ${where}`);
        return { q: String(item.q), a: String(item.a) };
      })
    : [];
  const date = toDateString(data.date);

  return {
    slug,
    title: String(data.title),
    excerpt: String(data.excerpt),
    seoTitle: String(data.seoTitle ?? data.title),
    description: String(data.description ?? data.excerpt),
    category: data.category,
    readMinutes: readingTime(content + faq.map((f) => ` ${f.q} ${f.a}`).join("")),
    date,
    updated: data.updated ? toDateString(data.updated) : date,
    color: data.color ?? "butter",
    tilt: data.tilt ?? "rotate(-10 160 110) translate(-20 60)",
    highlight: data.highlight === "ink" ? "ink" : "accent",
    featured: Boolean(data.featured),
    image: data.image ? String(data.image) : null,
    imagePosition: String(data.imagePosition ?? "50% 50%"),
    imageAlt: String(data.imageAlt ?? ""),
    body: content,
    faq,
  };
}

/** All posts for a locale, newest first */
export function getPosts(locale: Locale): Post[] {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readPost(locale, f))
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  return getPosts(locale).find((p) => p.slug === slug);
}

/** Strip the body so only serializable metadata is sent to client components */
export function toMeta(post: Post): PostMeta {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { body, faq, ...meta } = post;
  return meta;
}

/** Slugs that exist in the given locale (used for generateStaticParams) */
export function getSlugs(locale: Locale): string[] {
  return getPosts(locale).map((p) => p.slug);
}

export function formatDate(date: string, locale: Locale): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
