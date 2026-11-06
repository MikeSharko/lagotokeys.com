// Blog posts live in content/blog/<locale>/<slug>.mdx and are read at build time.
// The same slug in both language folders makes the EN/RU switch land on the same article.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { CoverColor } from "@/components/PianoKeys";
import type { Locale } from "@/i18n";

export const categoryKeys = ["practice", "parents", "adults", "repertoire", "gear"] as const;
export type CategoryKey = (typeof categoryKeys)[number];

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategoryKey;
  readMinutes: number;
  date: string; // YYYY-MM-DD
  color: CoverColor;
  /** SVG transform for the thumbnail keys */
  tilt: string;
  highlight: "accent" | "ink";
  featured: boolean;
};

export type Post = PostMeta & { body: string };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// ~200 words per minute, ignoring MDX tags
function readingTime(body: string): number {
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function readPost(locale: Locale, file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, locale, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx$/, "");
  if (!categoryKeys.includes(data.category)) {
    throw new Error(`Unknown category "${data.category}" in content/blog/${locale}/${file}`);
  }
  return {
    slug,
    title: String(data.title),
    excerpt: String(data.excerpt),
    category: data.category,
    readMinutes: readingTime(content),
    // gray-matter turns unquoted dates into Date objects
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    color: data.color ?? "butter",
    tilt: data.tilt ?? "rotate(-10 160 110) translate(-20 60)",
    highlight: data.highlight === "ink" ? "ink" : "accent",
    featured: Boolean(data.featured),
    body: content,
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
  const { body, ...meta } = post;
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
