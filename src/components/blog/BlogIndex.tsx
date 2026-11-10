"use client";

// Blog listing: topic tabs + search filter run in the browser over posts rendered at build time
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/icons";
import { PianoKeys, coverBg } from "@/components/PianoKeys";
import { PostImage } from "./PostImage";
import { Avatar } from "@/components/Avatar";
import type { CategoryKey, PostMeta } from "@/lib/posts";

type Labels = {
  title: string;
  lead: string;
  search: string;
  filter: string;
  all: string;
  featured: string;
  empty: string;
  minRead: string; // template with {n}
  author: string;
};

type Props = {
  posts: PostMeta[];
  basePath: string; // "/blog/" or "/ru/blog/"
  labels: Labels;
  categories: Record<CategoryKey, string>;
};

const tabIcons: Record<"all" | CategoryKey, IconName> = {
  all: "menu",
  practice: "clock",
  parents: "people",
  adults: "person",
  repertoire: "music",
  gear: "keyboard",
};

export function BlogIndex({ posts, basePath, labels, categories }: Props) {
  const [cat, setCat] = useState<"all" | CategoryKey>("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      posts.filter(
        (p) =>
          (cat === "all" || p.category === cat) &&
          (!q || `${p.title} ${p.excerpt}`.toLowerCase().includes(q)),
      ),
    [posts, cat, q],
  );

  // Featured card shows only when it passes the current filters
  const featured = matches.find((p) => p.featured);
  const grid = matches.filter((p) => p !== featured);
  const minRead = (n: number) => labels.minRead.replace("{n}", String(n));

  const tabs: ("all" | CategoryKey)[] = ["all", ...(Object.keys(categories) as CategoryKey[])];

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1240px] px-4 pt-14 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0 flex-[1_1_520px]">
              <h1 className="text-[clamp(40px,5vw,60px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
                {labels.title}
              </h1>
              <p className="mt-3.5 max-w-[560px] text-[19px] text-body">{labels.lead}</p>
            </div>
            <label className="flex w-full flex-[0_1_360px] items-center gap-2.5 rounded-full border border-line-strong bg-white py-1.5 pl-5 pr-1.5 shadow-pill">
              <span className="sr-only">{labels.search}</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={labels.search}
                className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] outline-none"
              />
              <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white">
                <Icon name="search" size={18} strokeWidth={2.6} />
              </span>
            </label>
          </div>

          <div role="group" aria-label={labels.filter} className="no-scrollbar mt-9 flex gap-7 overflow-x-auto">
            {tabs.map((key) => {
              const active = key === cat;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCat(key)}
                  className={`flex min-h-11 flex-none cursor-pointer flex-col items-center gap-1.5 border-b-2 px-0.5 pb-3.5 pt-2 text-[13px] font-bold transition-colors ${
                    active ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  <Icon name={tabIcons[key]} strokeWidth={1.8} />
                  {key === "all" ? labels.all : categories[key]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-8">
          <Link
            href={`${basePath}${featured.slug}/`}
            className="group flex flex-wrap overflow-hidden rounded-[28px] border border-line bg-white no-underline"
          >
            <span className={`relative block min-h-[260px] min-w-0 flex-[1_1_480px] overflow-hidden sm:min-h-80 ${coverBg[featured.color]}`}>
              {featured.image ? (
                <PostImage
                  image={featured.image}
                  alt={featured.imageAlt}
                  position={featured.imagePosition}
                  sizes="(min-width: 1240px) 640px, (min-width: 900px) 55vw, 100vw"
                  priority
                  className="absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <PianoKeys
                  preset="featured"
                  transform="rotate(-14 300 190) translate(-60 140)"
                  highlight={2}
                  className="absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-[1.02]"
                />
              )}
              <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1.5 text-[13px] font-extrabold">
                {labels.featured}
              </span>
            </span>
            <span className="flex min-w-0 flex-[1_1_380px] flex-col justify-center gap-3.5 p-7 sm:p-10">
              <span className="text-xs font-extrabold uppercase tracking-[0.04em] text-accent">
                {categories[featured.category]} · {minRead(featured.readMinutes)}
              </span>
              <span className="text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[34px]">
                {featured.title}
              </span>
              <span className="text-[17px] text-body">{featured.excerpt}</span>
              <span className="mt-1.5 flex items-center gap-2.5 text-sm font-bold">
                <Avatar size={32} />
                {labels.author}
              </span>
            </span>
          </Link>
        </section>
      )}

      <section className="mx-auto max-w-[1240px] px-4 pb-20 pt-12 sm:px-8">
        {grid.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((p) => (
              <Link key={p.slug} href={`${basePath}${p.slug}/`} className="group flex flex-col gap-3 no-underline">
                <span className={`relative block aspect-[16/11] overflow-hidden rounded-[20px] ${coverBg[p.color]}`}>
                  {p.image ? (
                    <PostImage
                      image={p.image}
                      alt={p.imageAlt}
                      position={p.imagePosition}
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <PianoKeys
                      preset="thumb"
                      transform={p.tilt}
                      highlight={2}
                      highlightColor={p.highlight}
                      className="absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  )}
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.04em] text-accent">
                  {categories[p.category]} · {minRead(p.readMinutes)}
                </span>
                <span className="text-[21px] font-extrabold leading-[1.22] tracking-[-0.015em]">{p.title}</span>
                <span className="text-[15px] text-muted">{p.excerpt}</span>
              </Link>
            ))}
          </div>
        ) : (
          !featured && <p className="text-muted">{labels.empty}</p>
        )}
      </section>
    </>
  );
}
