import { alternatesFor, getDictionary, href, type Locale } from "@/i18n";
import { getPosts, toMeta } from "@/lib/posts";
import { trialMailto } from "@/lib/contact";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogIndex } from "./BlogIndex";

export function BlogPage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const posts = getPosts(locale).map(toMeta);

  return (
    <>
      <Header locale={locale} alternates={alternatesFor("/blog/")} active="blog" />
      <main className="flex-1">
        <BlogIndex
          posts={posts}
          basePath={href(locale, "/blog/")}
          categories={d.categories}
          labels={{
            title: d.blog.title,
            lead: d.blog.lead,
            search: d.blog.search,
            filter: d.blog.filter,
            all: d.blog.all,
            featured: d.blog.featured,
            empty: d.blog.empty,
            // Functions can't cross into a client component, so pass a template
            minRead: d.blog.minRead(0).replace("0", "{n}"),
            author: d.teacher.name,
          }}
        />

        <section className="mx-auto max-w-[1240px] px-4 pb-[88px] sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[32px] bg-ink px-8 py-10 text-white sm:px-14 sm:py-12">
            <div className="min-w-0 flex-[1_1_420px]">
              <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl">{d.blog.ctaTitle}</h2>
              <p className="mt-2.5 text-[17px] text-[#c8c8c8]">{d.blog.ctaText}</p>
            </div>
            <a
              href={trialMailto(locale)}
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-7 py-[18px] font-extrabold text-white no-underline hover:brightness-110"
            >
              {d.cta.book}
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
