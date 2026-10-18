# Lucas Borges — Portfolio

Personal portfolio in Portuguese and English: projects, impact numbers and career journey. Live at https://lunger.com.br.

**Stack:** Next.js 16 · React 19 · next-intl · Tailwind CSS 4 · Motion

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Languages

[next-intl](https://next-intl.dev) with `localePrefix: "never"`: URLs carry no locale. `src/proxy.ts` picks it from the `NEXT_LOCALE` cookie (set by the PT/EN switch), falling back to the browser's `Accept-Language`, and rewrites to the statically rendered `/[locale]` page.

- UI copy: `messages/pt.json` and `messages/en.json` (typed via `src/global.d.ts`)
- Content: `src/content/site.ts` (stats, impact, journey, skills) and `src/content/projects.ts`, each string with `pt` and `en`

`node src/content/site.check.ts` checks the journey duration math.

## Deploy (VPS)

The Dockerfile builds a standalone Next.js server on port 3000:

```bash
docker build -t lucas-portfolio .
docker run -d --name portfolio --restart unless-stopped -p 127.0.0.1:8090:3000 lucas-portfolio
```

On the VPS the repo lives in `/root/www/portfolio` and nginx (`/etc/nginx/sites-available/lunger.com.br`) proxies `lunger.com.br` to `127.0.0.1:8090`. Paths the portfolio answers 404 for are redirected to `hades.lunger.com.br`.
