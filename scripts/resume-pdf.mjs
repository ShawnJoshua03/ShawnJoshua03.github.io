// Prints the HTML resume (/resume/, print stylesheet) to the downloadable PDF,
// so the PDF always matches the site. Fails if it runs past one page or if a
// phone number ever appears.
// Usage: npm run build && npx astro preview   (in one terminal)
//        npm run resume && npm run build      (in another)
//
// To serve your own hand-made PDF instead, run scripts/redact-resume.py.
import { chromium } from 'playwright-core';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const OUT = 'public/Shawn_Lasrado_Resume_2026.pdf';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ colorScheme: 'light' });
await page.goto(`${BASE}/resume/`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: 'print' });
const text = await page.evaluate(() => document.querySelector('.resume-doc')?.innerText ?? '');
if (/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(text)) throw new Error('Phone number found in resume text');
await page.pdf({ path: OUT, format: 'Letter', printBackground: false });
await browser.close();

// Count pages from the PDF itself.
const { readFileSync } = await import('node:fs');
const n = (readFileSync(OUT, 'latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
console.log(`Wrote ${OUT} (${n} page${n === 1 ? '' : 's'})`);
if (n !== 1) process.exit(1);
