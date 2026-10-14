// Checks every link in the built site (dist/): internal paths and #anchors must
// exist, external URLs must answer. Usage: npm run build && npm run links
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
// LinkedIn blocks automated requests (status 999); it is checked by hand instead.
const SKIP_EXTERNAL = [/linkedin\.com/];

function* html(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) yield* html(p);
    else if (p.endsWith('.html')) yield p;
  }
}
const pageUrl = (file) => '/' + relative(DIST, file).split(sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, '');
const ids = (src) => new Set([...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
function resolveFile(path) {
  const clean = decodeURIComponent(path.split('?')[0]);
  const candidates = [join(DIST, clean), join(DIST, clean, 'index.html'), join(DIST, clean + '.html')];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
}

const pages = [...html(DIST)].filter((f) => !f.includes(`${sep}og-card${sep}`));
const external = new Map();
const problems = [];

for (const file of pages) {
  const src = readFileSync(file, 'utf8');
  const from = pageUrl(file);
  const refs = [...src.matchAll(/\s(?:href|src)="([^"]+)"|property="og:image" content="([^"]+)"/g)].map((m) => m[1] ?? m[2]);
  for (const href of refs) {
    if (href.startsWith('mailto:') || href.startsWith('data:')) continue;
    if (/^https?:\/\//.test(href)) {
      if (!href.startsWith('https://shawnjoshua03.github.io/') || /^https:\/\/shawnjoshua03\.github\.io\/(concert-radar|sepsis-early-warning|shrinkflation-sleuth)\//.test(href)) {
        if (!external.has(href)) external.set(href, from);
        continue;
      }
    }
    const url = new URL(href.replace(/&amp;/g, '&'), 'https://shawnjoshua03.github.io' + from);
    if (url.origin !== 'https://shawnjoshua03.github.io') continue;
    const target = resolveFile(url.pathname);
    if (!target) { problems.push(`${from} -> ${href}  (missing page)`); continue; }
    if (url.hash && target.endsWith('.html') && !ids(readFileSync(target, 'utf8')).has(decodeURIComponent(url.hash.slice(1)))) {
      problems.push(`${from} -> ${href}  (missing #${url.hash.slice(1)})`);
    }
  }
}

console.log(`Checked ${pages.length} pages. Fetching ${external.size} external URLs...`);
await Promise.all([...external].map(async ([url, from]) => {
  if (SKIP_EXTERNAL.some((r) => r.test(url))) return console.log(`skip ${url} (blocks bots; verify by hand)`);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'Mozilla/5.0 link-check' } });
    if (!res.ok) problems.push(`${from} -> ${url}  (HTTP ${res.status})`);
    else console.log(`ok   ${res.status} ${url}`);
  } catch (e) {
    problems.push(`${from} -> ${url}  (${e.name}: ${e.message})`);
  }
}));

if (problems.length) {
  console.error(`\n${problems.length} broken link(s):\n  ` + problems.join('\n  '));
  process.exit(1);
}
console.log('All links OK.');
