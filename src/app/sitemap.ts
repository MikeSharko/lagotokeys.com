import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { alternatesFor, locales } from "@/i18n";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

// Every page in both languages, each listing its translation for Google
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/blog/", ...getPosts("en").map((p) => `/blog/${p.slug}/`)];
  const abs = (p: string) => `${site.url}${p}`;

  return paths.flatMap((path) => {
    const alt = alternatesFor(path);
    return locales.map((locale) => ({
      url: abs(alt[locale]),
      alternates: { languages: { en: abs(alt.en), ru: abs(alt.ru) } },
    }));
  });
}
