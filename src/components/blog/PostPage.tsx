import Link from "next/link";
import { site } from "@/config/site";
import { alternatesFor, getDictionary, href, type Locale } from "@/i18n";
import { formatDate, getPosts, type Post } from "@/lib/posts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PianoKeys, coverBg } from "@/components/PianoKeys";
import { JsonLd } from "@/components/JsonLd";
import { blogPostingLd, breadcrumbLd, faqLd } from "@/lib/structured-data";
import { MdxContent } from "./MdxContent";
import { TrialCard } from "./TrialCard";

export function PostPage({ locale, post }: { locale: Locale; post: Post }) {
  const d = getDictionary(locale);
  const t = d.blog;
  const related = pickRelated(locale, post);
  const author = d.teacher.name;

  return (
    <>
      <Header
        locale={locale}
        alternates={alternatesFor(`/blog/${post.slug}/`)}
        active="blog"
        bookHref="#trial"
      />
      <main className="flex-1">
        <JsonLd data={blogPostingLd(locale, post)} />
        <JsonLd data={breadcrumbLd(locale, post)} />
        <JsonLd data={faqLd(post)} />
        <section className="mx-auto max-w-[1240px] px-4 pt-10 sm:px-8">
          <nav aria-label={t.breadcrumb} className="text-sm font-bold text-muted">
            <Link href={href(locale, "/blog/")} className="text-muted underline-offset-4 hover:underline">
              {d.nav.blog}
            </Link>{" "}
            <span aria-hidden="true">›</span> {d.categories[post.category]}
          </nav>
          <h1 className="mt-3.5 max-w-[860px] text-[clamp(34px,4.4vw,54px)] font-extrabold leading-[1.08] tracking-[-0.035em]">
            {post.title}
          </h1>
          <div className="mt-[18px] flex flex-wrap items-center gap-x-[18px] gap-y-2.5 text-[15px] leading-[1.4]">
            <span className="flex items-center gap-2.5 font-extrabold">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm text-accent"
              >
                {author.charAt(0)}
              </span>
              {author}
            </span>
            <span className="font-semibold text-muted">
              <time dateTime={post.date}>{formatDate(post.date, locale)}</time> · {t.minRead(post.readMinutes)}
            </span>
          </div>
          <div className={`relative mt-7 aspect-[16/9] overflow-hidden rounded-[28px] sm:aspect-[16/6.5] ${coverBg[post.color]}`}>
            <PianoKeys
              preset="cover"
              transform="rotate(-10 600 240) translate(-80 210)"
              highlight={6}
              highlightColor={post.highlight}
              label={t.coverAlt}
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </section>

        <section className="mx-auto flex max-w-[1240px] flex-col items-start gap-12 px-4 pt-12 sm:px-8 lg:flex-row lg:gap-16">
          <article className="w-full min-w-0 max-w-[700px] lg:flex-[999_1_560px]">
            <div className="article">
              <MdxContent source={post.body} locale={locale} />
              {post.faq.length > 0 && (
                <>
                  <h2>{t.faqTitle}</h2>
                  <div className="divide-y divide-line rounded-[22px] border border-line-strong bg-white">
                    {post.faq.map((f) => (
                      <div key={f.q} className="px-[22px] py-5">
                        <h3 className="text-lg font-extrabold leading-snug text-ink">{f.q}</h3>
                        <p className="mt-2 text-base leading-relaxed text-body">{f.a}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="mt-10 flex items-center gap-4 border-t border-line pt-7 leading-normal">
              <span
                aria-hidden="true"
                className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-accent-soft text-[22px] font-extrabold text-accent"
              >
                {author.charAt(0)}
              </span>
              <span>
                <span className="block text-lg font-extrabold">{t.writtenBy}</span>
                <span className="block text-[15px] text-muted">{t.authorBio}</span>
                <Link
                  href={`${href(locale, "/")}#teacher`}
                  className="mt-1 inline-block text-[15px] font-bold text-accent underline-offset-4 hover:underline"
                >
                  {t.aboutAuthor}
                </Link>
              </span>
            </div>
          </article>

          <TrialCard
            email={site.email}
            phone={site.phone}
            price={site.price.trial}
            labels={{
              label: d.trial.label,
              perTrial: d.trial.perTrial,
              who: d.trial.who,
              whoOptions: d.trial.whoOptions,
              experience: d.trial.experience,
              experienceOptions: d.trial.experienceOptions,
              request: d.trial.request,
              note: d.trial.note,
              where: d.trial.where,
              call: d.trial.callText(site.phone.display),
              subject: d.trial.emailSubject,
              body: d.trial.emailBody("{who}", "{level}"),
            }}
          />
        </section>

        {related.length > 0 && (
          <section className="mx-auto max-w-[1240px] px-4 pb-[88px] pt-[72px] sm:px-8">
            <h2 className="text-[30px] font-extrabold tracking-[-0.02em]">{t.keepReading}</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={href(locale, `/blog/${p.slug}/`)}
                  className="flex items-center gap-4 rounded-[20px] border border-line bg-white p-3 leading-[1.35] no-underline transition-shadow hover:shadow-card"
                >
                  <span aria-hidden="true" className={`relative h-24 w-24 flex-none overflow-hidden rounded-[14px] ${coverBg[p.color]}`}>
                    <span className="absolute inset-x-0 bottom-0 h-[46%] bg-[repeating-linear-gradient(90deg,#fff_0_calc(20%-3px),transparent_calc(20%-3px)_20%)]" />
                  </span>
                  <span>
                    <span className="block text-xs font-extrabold uppercase tracking-[0.04em] text-accent">
                      {d.categories[p.category]}
                    </span>
                    <span className="mt-1 block text-[17px] font-extrabold">{p.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer locale={locale} />
    </>
  );
}

// Up to three other posts: same topic first, then the newest
function pickRelated(locale: Locale, post: Post): Post[] {
  const others = getPosts(locale).filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, 3);
}
