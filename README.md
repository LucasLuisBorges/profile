# Lucas Borges — Portfolio

Personal portfolio in Portuguese and English: projects, impact numbers and career journey.

**Stack:** Next.js 16 (static export) · React 19 · Tailwind CSS 4 · Motion

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — `/` redirects to `/pt/` or `/en/` based on the browser language.

## Editing content

All copy lives in two typed files, each string in `pt` and `en`:

- `src/content/i18n.ts` — UI text, stats, impact numbers, principles, skills, journey
- `src/content/projects.ts` — projects (featured ones get the big cards; projects without `images` show their `flow`)

Screenshots go in `public/images/` as WebP (~1600px wide).

## Deploy (VPS)

`npm run build` writes plain static files to `out/`. The Dockerfile builds them and serves them with nginx:

```bash
docker build -t lucas-portfolio .
docker run -d --name portfolio --restart unless-stopped -p 8080:80 lucas-portfolio
```

Put your reverse proxy (Caddy, Traefik, nginx, Coolify…) in front of port 8080 for the domain and HTTPS. Without Docker, copy `out/` to any static web server using the rules in `nginx.conf`.
