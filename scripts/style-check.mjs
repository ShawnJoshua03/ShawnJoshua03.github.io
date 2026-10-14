// Editorial style check for site copy. Runs before every build.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['src'];
const CODE = new Set(['.astro', '.ts', '.mjs', '.css', '.json']);
const PROSE = new Set(['.md', '.mdx']);

const PUNCT = /[–—]/;
const BANNED = [
  'passionate', 'leverag', 'delve', 'journey', 'seamless', 'cutting-edge', 'cutting edge',
  'robust', 'synerg', 'game-chang', 'innovative', 'spearhead', 'tapestry', 'testament to',
  'in today’s', "in today's", 'hi, i’m', "hi, i'm", 'unlock', 'empower', 'elevate',
  'world-class', 'best-in-class', 'rockstar', 'ninja', 'whether you',
];
const EMOJI = /\p{Extended_Pictographic}/u;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}

const problems = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const ext = extname(file);
    if (!CODE.has(ext) && !PROSE.has(ext)) continue;
    readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      const where = `${file}:${i + 1}`;
      if (PUNCT.test(line)) problems.push(`${where}  punctuation outside the style guide`);
      if (EMOJI.test(line) && !line.includes('lint-allow-emoji')) problems.push(`${where}  emoji`);
      // Banned phrasing only matters in visible copy; skip code comments and imports.
      const lower = line.toLowerCase();
      if (/^\s*(\/\/|\*|\/\*|import )/.test(line)) return;
      for (const word of BANNED) if (lower.includes(word)) problems.push(`${where}  phrase outside the style guide: "${word}"`);
    });
  }
}

if (problems.length) {
  console.error(`Style check failed (${problems.length}):\n  ` + problems.join('\n  '));
  process.exit(1);
}
console.log('Style check passed.');
