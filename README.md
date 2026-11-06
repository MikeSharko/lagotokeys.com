# legatokeys.com

Website for LegatoKeys — private one-on-one piano lessons in Rancho Peñasquitos, San Diego.

Next.js (App Router) + TypeScript + Tailwind CSS, built as a fully static site for S3.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # static site is written to ./out
```

`next.config.ts` uses `output: "export"` and `trailingSlash: true`, so every route becomes
`<route>/index.html` and S3 can serve it without rewrites. No server, no database.

The Manrope font is self-hosted via `@fontsource-variable/manrope` (Latin + Cyrillic for the RU version).
