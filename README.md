# Shawn Lasrado — portfolio

Personal portfolio site, live at https://shawnjoshua03.github.io/.

Built with [Astro](https://astro.build) (MDX content, sitemap), with d3-scale and d3-shape for charts. Deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Run it

```sh
npm install
npm run dev       # local dev server
npm run build     # style check + production build
npm run preview   # serve the production build
```

Other scripts: `npm run check` (Astro type check), `npm test` (style check and focus test), `npm run links` (link check), `npm run shots` (screenshots), `npm run og` (Open Graph images), `npm run resume` (resume PDF).

## Structure

| Path | Contents |
| --- | --- |
| `src/pages/` | Routes |
| `src/components/`, `src/layouts/` | UI building blocks |
| `src/content/`, `src/data/` | Project write-ups and site data |
| `src/config.ts` | Site-wide settings |
| `src/styles/` | Stylesheets |
| `public/` | Static assets: resume PDF, favicon, OG images |
| `scripts/` | Build and QA scripts |
| `.github/workflows/deploy.yml` | GitHub Pages deployment |

To move to a custom domain, change `site` in `astro.config.mjs` and add `public/CNAME`.
