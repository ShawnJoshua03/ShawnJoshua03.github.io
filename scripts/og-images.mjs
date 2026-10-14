// Renders every /og-card/<id>/ page to public/og/<id>.png at 1200x630.
// Usage: npm run build && npx astro preview   (in one terminal)
//        npm run og && npm run build          (in another; rebuild to ship the PNGs)
import { chromium } from 'playwright-core';
import { mkdirSync, readdirSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const ids = readdirSync('dist/og-card', { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
mkdirSync('public/og', { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const id of ids) {
  await page.goto(`${BASE}/og-card/${id}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/${id}.png` });
  console.log(`public/og/${id}.png`);
}
await browser.close();
