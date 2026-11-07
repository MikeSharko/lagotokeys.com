// 404 for any URL that matches no route (the site has two root layouts, so there's no shared one)
import "@fontsource-variable/manrope";
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/i18n";
import { BrandMark, Wordmark } from "@/components/BrandMark";

const en = getDictionary("en");
const ru = getDictionary("ru");

export const metadata: Metadata = {
  title: `${en.meta.notFoundTitle} | LegatoKeys`,
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className="antialiased">
      <body className="flex min-h-screen flex-col items-center justify-center gap-10 px-4 py-16 text-center">
        <span className="flex items-center gap-2.5">
          <BrandMark size={36} />
          <Wordmark className="text-[19px] tracking-[0.12em]" />
        </span>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em]">{en.notFound.title}</h1>
          <p className="text-lg text-body">{en.notFound.text}</p>
          <Link href="/" className="mx-auto mt-2 inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 font-bold text-white no-underline">
            {en.notFound.home}
          </Link>
        </div>
        <div lang="ru" className="flex flex-col gap-2 border-t border-line pt-8">
          <p className="text-lg font-extrabold">{ru.notFound.title}</p>
          <p className="text-body">
            {ru.notFound.text}{" "}
            <Link href="/ru/" className="font-bold text-accent">
              {ru.notFound.home}
            </Link>
          </p>
        </div>
      </body>
    </html>
  );
}
