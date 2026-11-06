# legatokeys.com

Website for LegatoKeys — private one-on-one piano lessons in Rancho Peñasquitos, San Diego.
Next.js (App Router) + TypeScript + Tailwind CSS, built as a fully static, bilingual (EN/RU) site for S3.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000  (Russian: /ru/)
```

## Build

```bash
npm run build      # static site is written to ./out
```

`next.config.ts` uses `output: "export"` and `trailingSlash: true`, so every route becomes
`<route>/index.html` and S3 can serve it without rewrites. Set the S3 error document to `404.html`.

## Before going live

Fill in the placeholders in `src/config/site.ts`: phone, prices, lesson hours, piano type,
and confirm the contact email. Replace the studio photo placeholder in
`src/components/home/HomePage.tsx` (search for `TODO`).

## Structure

```
content/blog/en/*.mdx      English posts
content/blog/ru/*.mdx      Russian posts (same file name = same article in both languages)
src/config/site.ts         contact details, prices, hours
src/i18n/en.ts, ru.ts      all interface text
src/app/(en)/...           English routes, served from /
src/app/(ru)/ru/...        Russian routes, served from /ru/
src/components/            Header, Footer, home page sections, blog
```

EN and RU each have their own root layout, so `<html lang>` is correct on every page and the
language switch goes to the same page in the other language. `hreflang` tags and `sitemap.xml`
link the two versions for search engines.

## Writing a blog post

Create `content/blog/en/my-post.mdx` and `content/blog/ru/my-post.mdx`:

```mdx
---
title: "Post title"
excerpt: "One sentence for cards and search results."
category: practice        # practice | parents | adults | repertoire | gear
date: 2026-11-10
color: butter             # butter | sky | sage | rose
tilt: "rotate(-10 160 110) translate(-20 60)"   # optional, angle of the keys on the card
highlight: accent         # accent | ink
featured: false           # one post can be true: shown big at the top of the blog
---

First paragraph is shown larger, as the lead.

## A heading

<Tip>A highlighted teacher's tip.</Tip>

<Routine>
  <Step min={5} title="Warm up" color="butter">What to do.</Step>
</Routine>
```

Reading time is calculated automatically.
