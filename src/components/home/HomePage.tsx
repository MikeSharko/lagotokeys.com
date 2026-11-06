import Link from "next/link";
import { site } from "@/config/site";
import { alternatesFor, getDictionary, href, type Locale } from "@/i18n";
import { getPosts } from "@/lib/posts";
import { telHref, trialMailto } from "@/lib/contact";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/icons";
import { PianoKeys, coverBg, type CoverColor } from "@/components/PianoKeys";

const container = "mx-auto max-w-[1240px] px-4 sm:px-8";
const h2 = "text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[40px]";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <>
      <Header locale={locale} alternates={alternatesFor("/")} />
      <main className="flex-1">
        <SearchPill locale={locale} />
        <Hero locale={locale} />
        <Lessons locale={locale} />
        <Teacher locale={locale} />
        <Concerts locale={locale} />
        <Studio locale={locale} />
        <BlogTeaser locale={locale} />
        <section id="book" className={`${container} pb-[88px]`}>
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-[32px] bg-ink p-8 text-white sm:p-14">
            <div className="min-w-0 flex-[1_1_420px]">
              <h2 className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[44px]">
                {t.cta.title}
              </h2>
              <p className="mt-3.5 text-lg text-[#c8c8c8]">{t.cta.text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={trialMailto(locale)}
                className="inline-flex min-h-11 items-center rounded-full bg-accent px-7 py-[18px] font-extrabold text-white no-underline hover:brightness-110"
              >
                {t.cta.book}
              </a>
              <a
                href={telHref}
                className="inline-flex min-h-11 items-center rounded-full bg-white px-7 py-[18px] font-extrabold text-ink no-underline hover:bg-sand"
              >
                {t.cta.call}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

function SearchPill({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).pill;
  const items = [
    { label: t.whoLabel, value: t.whoValue },
    { label: t.levelLabel, value: t.levelValue },
    { label: t.lengthLabel, value: t.lengthValue },
  ];
  return (
    <div className="border-b border-line bg-white px-4 pb-7 pt-2 sm:px-8">
      <div className="mx-auto flex max-w-[860px] flex-col gap-1 rounded-[28px] border border-line-strong bg-white p-2 shadow-pill sm:flex-row sm:items-center sm:rounded-full sm:pl-3">
        {items.map((item, i) => (
          <div key={item.label} className="flex min-w-0 flex-1 items-center">
            {i > 0 && <span aria-hidden="true" className="mr-1 hidden h-8 w-px bg-line-strong sm:block" />}
            <div className="min-w-0 flex-1 px-5 py-2.5">
              <span className="block text-xs font-extrabold tracking-[0.02em]">{item.label}</span>
              <span className="block truncate text-[15px] text-muted">{item.value}</span>
            </div>
          </div>
        ))}
        <a
          href="#book"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-[22px] py-3.5 font-bold text-white no-underline hover:brightness-110"
        >
          <Icon name="music" size={18} strokeWidth={2.5} />
          {t.cta}
        </a>
      </div>
    </div>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).hero;
  return (
    <section className={`${container} flex flex-wrap items-center gap-14 pb-[72px] pt-12 sm:pt-16`}>
      <div className="min-w-0 flex-[1_1_440px]">
        <p className="mb-[18px] inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-2 text-sm font-bold text-accent">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
          {t.badge}
        </p>
        <h1 className="text-[clamp(40px,5.4vw,72px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
          {t.title}
        </h1>
        <p className="mt-6 max-w-[500px] text-[19px] text-body">{t.lead}</p>
        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4">
          {t.stats.map((s, i) => (
            <div key={s.label} className="flex gap-7">
              {i > 0 && <div aria-hidden="true" className="w-px bg-line-strong" />}
              <div>
                <p className="text-[28px] font-extrabold tracking-[-0.02em]">{s.value}</p>
                <p className="text-sm font-semibold text-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative min-w-0 flex-[1_1_460px]">
        <div className="aspect-[1/0.92] overflow-hidden rounded-[28px] bg-accent-soft">
          <PianoKeys
            preset="hero"
            transform="rotate(-16 300 300) translate(-120 150)"
            highlight={4}
            label={t.illustration}
            className="block h-full w-full"
          />
        </div>
        <div className="absolute bottom-8 left-2 flex items-center gap-3.5 rounded-[18px] bg-white px-5 py-4 shadow-float sm:-left-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <Icon name="calendar" size={22} strokeWidth={2.2} />
          </span>
          <span>
            <span className="block font-extrabold">{t.trialTitle}</span>
            <span className="block text-sm text-muted">{t.trialText}</span>
          </span>
        </div>
        <div className="absolute right-5 top-6 rounded-full bg-white px-4 py-2.5 text-sm font-bold shadow-[0_10px_30px_rgba(26,26,26,0.12)]">
          {t.fromPrice(site.price.lesson30)}
        </div>
      </div>
    </section>
  );
}

const chipIcons: IconName[] = ["menu", "star", "music", "person", "classical", "film", "ticket", "book"];

const lessonArt: { color: CoverColor; hit: "accent" | "ink"; tf: string }[] = [
  { color: "butter", hit: "accent", tf: "rotate(-14 150 140) translate(-10 90)" },
  { color: "sky", hit: "ink", tf: "rotate(10 150 140) translate(-30 70)" },
  { color: "sage", hit: "accent", tf: "rotate(-6 150 140) translate(-20 110)" },
  { color: "rose", hit: "ink", tf: "rotate(18 150 140) translate(-40 60)" },
];

function Lessons({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).lessons;
  // The advanced card is 60-minute only; the rest start at the 30-minute price
  const prices = [site.price.lesson30, site.price.lesson30, site.price.lesson30, site.price.lesson60];
  return (
    <section id="lessons" className={`${container} scroll-mt-6 pb-20`}>
      <div className="no-scrollbar flex gap-8 overflow-x-auto border-b border-line pb-0.5">
        {t.chips.map((label, i) => (
          <span
            key={label}
            className={`flex flex-none flex-col items-center gap-1.5 border-b-2 px-0.5 pb-3 pt-2 text-[13px] font-bold ${
              i === 0 ? "border-ink text-ink" : "border-transparent text-muted"
            }`}
          >
            <Icon name={chipIcons[i]} strokeWidth={1.8} />
            {label}
          </span>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
        {t.cards.map((card, i) => (
          <a key={card.title} href="#book" className="group flex flex-col gap-2.5 no-underline">
            <span className={`relative block aspect-[1/0.95] overflow-hidden rounded-[18px] ${coverBg[lessonArt[i].color]}`}>
              <PianoKeys
                preset="card"
                transform={lessonArt[i].tf}
                highlight={2}
                highlightColor={lessonArt[i].hit}
                className="block h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
              />
              {card.badge && (
                <span className="absolute left-3.5 top-3.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-extrabold">
                  {card.badge}
                </span>
              )}
              <span
                aria-hidden="true"
                className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90"
              >
                <Icon name="heart" size={18} />
              </span>
            </span>
            <span className="text-[17px] font-extrabold">{card.title}</span>
            <span className="-mt-1.5 text-[15px] text-muted">{card.meta}</span>
            <span className="text-[15px]">
              <span className="font-extrabold">${prices[i]}</span> {t.perLesson}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-[20px] border border-line bg-white px-[22px] py-[18px]">
        <span className="font-extrabold">{t.whichLength}</span>
        <span className="inline-flex items-center gap-2.5 text-body">
          <span className="rounded-full bg-sand px-3 py-1 font-extrabold text-ink">{t.min30}</span>
          {t.short}
        </span>
        <span className="inline-flex items-center gap-2.5 text-body">
          <span className="rounded-full bg-accent px-3 py-1 font-extrabold text-white">{t.min60}</span>
          {t.long}
        </span>
      </div>
    </section>
  );
}

const perkIcons: IconName[] = ["check", "music", "chat"];

function Teacher({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).teacher;
  return (
    <section id="teacher" className="scroll-mt-6 border-y border-line bg-white">
      <div className={`${container} flex flex-wrap items-center gap-14 py-[88px]`}>
        <div className="w-full min-w-0 flex-[0_1_400px]">
          <div className="flex items-center gap-7 rounded-[28px] bg-white p-8 shadow-card">
            <div className="flex-auto text-center">
              <div
                aria-hidden="true"
                className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-accent-soft text-[40px] font-extrabold text-accent"
              >
                {t.name.charAt(0)}
              </div>
              <p className="mt-3.5 text-2xl font-extrabold tracking-[-0.02em]">{t.name}</p>
              <p className="mt-0.5 text-sm font-semibold text-muted">{t.role}</p>
            </div>
            <div className="flex flex-[0_0_150px] flex-col">
              {t.stats.map((s, i) => (
                <div key={s.label} className={`py-2.5 ${i < t.stats.length - 1 ? "border-b border-line" : ""}`}>
                  <p className={`font-extrabold ${i === 2 ? "text-lg leading-[1.3]" : "text-[22px]"}`}>{s.value}</p>
                  <p className="text-xs font-bold text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-[1_1_440px]">
          <h2 className={h2}>{t.title}</h2>
          <p className="mt-5 text-lg text-body">{t.text}</p>
          <div className="mt-7 flex flex-col gap-4">
            {t.perks.map((p, i) => (
              <div key={p.title} className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-sand">
                  <Icon name={perkIcons[i]} size={20} />
                </span>
                <span>
                  <span className="block font-extrabold">{p.title}</span>
                  <span className="block text-[15px] text-muted">{p.text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Concerts({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).concerts;
  return (
    <section id="concerts" className={`${container} pt-[88px]`}>
      <div className="flex flex-wrap overflow-hidden rounded-[32px] bg-ink text-white">
        <div className="min-w-0 flex-[1_1_480px] p-8 sm:p-14">
          <p className="text-[13px] font-extrabold uppercase tracking-[0.06em] text-accent-tint">{t.eyebrow}</p>
          <h2 className="mt-3.5 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[44px]">
            {t.title}
          </h2>
          <p className="mt-[18px] max-w-[480px] text-lg text-[#c8c8c8]">{t.text}</p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {t.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-body px-4 py-2 text-sm font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="relative min-h-80 min-w-0 flex-[1_1_380px] bg-[#232323]">
          <svg
            role="img"
            aria-label={t.illustration}
            viewBox="0 0 420 340"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
          >
            <polygon points="190,0 230,0 340,290 80,290" fill="#FFFFFF" fillOpacity="0.08" />
            <ellipse cx="210" cy="292" rx="140" ry="20" fill="#FFFFFF" fillOpacity="0.12" />
            <g transform="translate(90 190)">
              <rect x="0" y="0" width="240" height="96" rx="10" fill="#FFFFFF" />
              {[34, 68, 103, 137, 171, 206].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="96" stroke="#D9D4CC" strokeWidth="2" />
              ))}
              {[22, 58, 126, 160, 194].map((x) => (
                <rect
                  key={x}
                  x={x}
                  y="0"
                  width="22"
                  height="58"
                  rx="4"
                  fill={x === 126 ? "var(--color-accent)" : "#1A1A1A"}
                />
              ))}
            </g>
            <g fill="#FFFFFF" fillOpacity="0.5">
              <ellipse cx="96" cy="96" rx="8" ry="6" transform="rotate(-20 96 96)" />
              <rect x="102" y="52" width="3" height="44" />
              <ellipse cx="318" cy="70" rx="8" ry="6" transform="rotate(-20 318 70)" />
              <rect x="324" y="26" width="3" height="44" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

function Studio({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).studio;
  const rows: { icon: IconName; title: string; note: string }[] = [
    { icon: "pin", title: t.area, note: t.areaNote },
    { icon: "clock", title: site.hours[locale], note: t.hoursNote },
    { icon: "parking", title: t.parking, note: t.parkingNote },
  ];
  return (
    <section id="studio" className={`${container} flex scroll-mt-6 flex-wrap items-center gap-14 pt-[88px]`}>
      <div className="relative min-w-0 flex-[1_1_460px]">
        {/* TODO: replace with a real photo of the piano room (next/image, file in /public) */}
        <div className="flex aspect-[4/3] items-end rounded-[28px] bg-[#efe9df] p-[22px] text-sm font-bold text-muted">
          {t.photo}
        </div>
        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-extrabold shadow-[0_10px_30px_rgba(26,26,26,0.12)]">
          <span className="text-accent">
            <Icon name="pin" size={16} strokeWidth={2.4} />
          </span>
          {t.inPerson}
        </div>
      </div>

      <div className="min-w-0 flex-[1_1_420px]">
        <h2 className={h2}>{t.title}</h2>
        <p className="mt-4 text-lg text-body">{t.text(site.piano[locale])}</p>
        <div className="mt-7 rounded-[20px] border border-line-strong bg-white">
          {rows.map((r, i) => (
            <div
              key={r.icon}
              className={`flex items-center gap-3.5 px-5 py-[18px] ${i < rows.length - 1 ? "border-b border-line" : ""}`}
            >
              <Icon name={r.icon} size={22} />
              <span>
                <span className="block font-extrabold">{r.title}</span>
                <span className="block text-sm text-muted">{r.note}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="mb-2.5 mt-[22px] text-sm font-extrabold text-muted">{t.nearby}</p>
        <div className="flex flex-wrap gap-2">
          {t.neighborhoods.map((n) => (
            <span key={n} className="rounded-full bg-sand px-3.5 py-1.5 text-sm font-bold">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogTeaser({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.homeBlog;
  const posts = getPosts(locale);
  // Featured post first, then the newest others
  const picks = [...posts.filter((p) => p.featured), ...posts.filter((p) => !p.featured)].slice(0, 3);
  const noteX = ["30%", "55%", "70%"];

  return (
    <section id="blog" className={`${container} py-[88px]`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className={h2}>{t.title}</h2>
          <p className="mt-2 text-[17px] text-muted">{t.text}</p>
        </div>
        <Link
          href={href(locale, "/blog/")}
          className="inline-flex min-h-11 items-center font-bold underline underline-offset-4"
        >
          {t.link}
        </Link>
      </div>
      <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-3">
        {picks.map((p, i) => (
          <Link
            key={p.slug}
            href={href(locale, `/blog/${p.slug}/`)}
            className="flex flex-col overflow-hidden rounded-[22px] border border-line bg-white no-underline transition-shadow hover:shadow-card"
          >
            <span aria-hidden="true" className={`relative block aspect-video overflow-hidden ${coverBg[p.color]}`}>
              {/* Five-line staff with a single note */}
              <span className="absolute inset-x-7 top-1/2 h-0.5 bg-ink/20 shadow-[0_-14px_0_rgba(26,26,26,0.2),0_14px_0_rgba(26,26,26,0.2),0_-28px_0_rgba(26,26,26,0.2),0_28px_0_rgba(26,26,26,0.2)]" />
              <span
                className="absolute top-[36%] h-[26px] w-[34px] -rotate-[20deg] rounded-full bg-ink"
                style={{ left: noteX[i] }}
              />
            </span>
            <span className="flex flex-col gap-2 px-[22px] pb-6 pt-5">
              <span className="text-xs font-extrabold uppercase tracking-[0.04em] text-accent">
                {d.categories[p.category]}
              </span>
              <span className="text-xl font-extrabold leading-[1.25] tracking-[-0.01em]">{p.title}</span>
              <span className="text-sm font-semibold text-muted">{d.blog.minRead(p.readMinutes)}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
