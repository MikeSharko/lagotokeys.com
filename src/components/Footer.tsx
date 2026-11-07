import Link from "next/link";
import { site } from "@/config/site";
import { BrandMark, Wordmark } from "./BrandMark";
import { getDictionary, href, type Locale } from "@/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).footer;
  const home = href(locale, "/");
  const columns = [
    {
      title: t.lessons,
      links: [
        { label: t.kids, href: `${home}#lessons` },
        { label: t.teens, href: `${home}#lessons` },
        { label: t.adults, href: `${home}#lessons` },
      ],
    },
    {
      title: t.studio,
      links: [
        { label: t.about, href: `${home}#teacher` },
        { label: t.blog, href: href(locale, "/blog/") },
        { label: t.contact, href: `${home}#book` },
      ],
    },
  ];

  return (
    <footer className="border-t border-line bg-sand">
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-8 px-4 py-10 text-[15px] sm:px-8">
        <div>
          <p className="flex items-center gap-2.5">
            <BrandMark size={30} />
            <Wordmark className="text-base" />
          </p>
          <p className="mt-1.5 text-muted">{t.tagline}</p>
          {/* Name, area and phone match the Google Business Profile */}
          <p className="mt-3 text-body">{t.area}</p>
          <a href={`tel:${site.phone.tel}`} className="mt-1 inline-block font-bold no-underline hover:underline">
            {site.phone.display}
          </a>
        </div>
        <div className="flex flex-wrap gap-12">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-1.5">
              <span className="font-extrabold">{col.title}</span>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} className="text-body no-underline hover:text-ink">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
