// Screenshots every page at phone and desktop widths, in light and dark themes,
// and fails if any page scrolls horizontally.
// Usage: npm run build && npx astro preview   (in one terminal)
//        npm run shots [-- path1 path2 ...]   (in another)
import { chromium } from 'playwright-core';
import { mkdirSync, readdirSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const OUT = 'screenshots';
// Default: every built page except the social-card renders, plus the three focus URLs.
function builtPages(dir = 'dist', prefix = '/') {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    if (d.isDirectory()) return d.name === 'og-card' ? [] : builtPages(`${dir}/${d.name}`, `${prefix}${d.name}/`);
    return d.name === 'index.html' ? [prefix] : [];
  });
}
const paths = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [...builtPages(), '/?focus=software', '/?focus=ai', '/?focus=product', '/404.html'];
const widths = [375, 1440];
const themes = ['light', 'dark'];

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
let overflow = 0;

for (const path of paths) {
  for (const width of widths) {
    for (const theme of themes) {
      // Reduced motion so scroll-in animations do not hide sections below the fold in full-page shots.
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: theme, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      await page.goto(BASE + path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      if (sw > width) {
        overflow++;
        console.error(`OVERFLOW ${path} @${width}: scrollWidth ${sw}`);
      }
      const name = `${path.replace(/[/?=]+/g, '_').replace(/^_|_$/g, '') || 'front'}-${width}-${theme}.png`;
      await page.screenshot({ path: `${OUT}/${name}`, fullPage: true });
      console.log(`saved ${OUT}/${name}`);
      await page.close();
    }
  }
}
await browser.close();
if (overflow) process.exit(1);
