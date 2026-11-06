import Link from "next/link";
import { site } from "@/config/site";
import { getDictionary, href, type Locale } from "@/i18n";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

type Props = {
  locale: Locale;
  /** The current page in each language, for the EN/RU switch */
  alternates: Record<Locale, string>;
  active?: "blog";
  /** Where "Book a trial" points; defaults to the home page booking section */
  bookHref?: string;
};

export function Header({ locale, alternates, active, bookHref }: Props) {
  const t = getDictionary(locale);
  const home = href(locale, "/");
  const navItems = [
    { label: t.nav.lessons, href: `${home}#lessons` },
    { label: t.nav.teacher, href: `${home}#teacher` },
    { label: t.nav.location, href: `${home}#studio` },
    { label: t.nav.blog, href: href(locale, "/blog/"), current: active === "blog" },
  ];

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3.5 sm:px-8 sm:py-[18px]">
        <Logo homeHref={home} />

        <nav
          aria-label={t.nav.main}
          className="no-scrollbar order-last -mx-4 flex w-[calc(100%+2rem)] gap-1 overflow-x-auto px-3 text-[15px] font-semibold sm:-mx-8 sm:w-[calc(100%+4rem)] sm:px-7 lg:order-none lg:mx-0 lg:w-auto lg:gap-2 lg:px-0"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={`shrink-0 rounded-full px-4 py-2.5 lg:px-3 xl:px-4 no-underline transition-colors hover:bg-sand ${
                item.current ? "bg-sand" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch locale={locale} alternates={alternates} label={t.nav.language} />
          {/* Phone: full number where the header has room, icon button where it is tight (phones and 1024–1280px) */}
          <a
            href={`tel:${site.phone.tel}`}
            aria-label={site.phone.display}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong no-underline hover:bg-sand sm:hidden lg:flex xl:hidden"
          >
            <Icon name="phone" size={18} />
          </a>
          <a
            href={`tel:${site.phone.tel}`}
            className="hidden items-center gap-2 whitespace-nowrap text-[15px] font-semibold no-underline hover:underline sm:inline-flex lg:hidden xl:inline-flex"
          >
            <Icon name="phone" size={16} />
            {site.phone.display}
          </a>
          <Link
            href={bookHref ?? `${home}#book`}
            className="hidden min-h-11 items-center rounded-full bg-ink px-5 py-3 text-[15px] font-bold text-white no-underline transition-colors hover:bg-black sm:inline-flex"
          >
            {t.nav.bookTrial}
          </Link>
        </div>
      </div>
    </header>
  );
}

function LanguageSwitch({
  locale,
  alternates,
  label,
}: {
  locale: Locale;
  alternates: Record<Locale, string>;
  label: string;
}) {
  const options: { code: Locale; text: string }[] = [
    { code: "en", text: "EN" },
    { code: "ru", text: "RU" },
  ];
  return (
    <span
      role="group"
      aria-label={label}
      className="inline-flex rounded-full border border-line-strong p-[3px] text-[13px] font-extrabold"
    >
      {options.map((o) => {
        const isCurrent = o.code === locale;
        return (
          // Plain <a>: switching language changes the root layout, so it is a full page load anyway
          <a
            key={o.code}
            href={alternates[o.code]}
            hrefLang={o.code}
            lang={o.code}
            aria-current={isCurrent ? "true" : undefined}
            className={`rounded-full px-[11px] py-[7px] no-underline ${
              isCurrent ? "bg-ink text-white" : "text-muted hover:text-ink"
            }`}
          >
            {o.text}
          </a>
        );
      })}
    </span>
  );
}
