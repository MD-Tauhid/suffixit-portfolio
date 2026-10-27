# Suffix IT website (Next.js)

Faithful migration of the original static Suffix IT homepage to Next.js 16 (App Router), React 19 and strict TypeScript.

## Commands

```bash
npm install
npm run dev          # development, http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npm run lint
npm run typecheck
```

## Configuration

Copy `.env.example` to `.env.local` (or set the variable in your host) and confirm the production origin:

```
NEXT_PUBLIC_SITE_URL=https://suffixit.com
```

It drives the canonical URL, Open Graph URLs, `sitemap.xml`, `robots.txt` and JSON-LD.

## Deployment

Any Node host works (Vercel, a Node server, Docker). Run `npm run build`, then `npm start`. The page is statically prerendered.

## Structure

- `app/` layout, page, globals.css (original CSS), robots.ts, sitemap.ts, fonts/
- `components/layout/` header, footer, logo, JSON-LD
- `components/sections/` one file per homepage section
- `components/animations/` client-side effects ported from the original main.js
- `lib/` site constants, page copy (`content.ts`), Field Force demo data (`fieldforce.ts`)
- `public/assets/img/` original logo and client logo strips

## To confirm before launch

- Production domain (www or non-www) in `NEXT_PUBLIC_SITE_URL`
- Social links in `lib/content.ts` (still `#`, as in the original)
- A 1200x630 share image (currently the logo)
- Placeholder content flagged in the original README: stats, certifications, memberships, partnerships, tech list, nav/footer links, Field Force sample data
