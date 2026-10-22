// Project filter and page checks against a running preview (npx astro preview).
// Usage: node scripts/test-focus.mjs
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';

const B = process.env.BASE_URL ?? 'http://localhost:4321';
// First (showcase) project for each focus, and how many projects it shows.
const EXPECT = {
  all: { first: 'sepsis-early-warning', count: 12 },
  software: { first: 'concert-radar', count: 10 },
  ai: { first: 'sepsis-early-warning', count: 5 },
  product: { first: 'rentradar', count: 5 },
};
const visible = (p) =>
  p.evaluate(() =>
    [...document.querySelectorAll('.project')]
      .filter((e) => getComputedStyle(e).display !== 'none')
      .sort((a, b) => Number(getComputedStyle(a).order) - Number(getComputedStyle(b).order))
      .map((e) => e.id),
  );

const browser = await chromium.launch({ channel: 'chrome' });
let failures = 0;
async function check(name, fn) {
  try { await fn(); console.log(`ok   ${name}`); }
  catch (e) { failures++; console.error(`FAIL ${name}\n     ${e.message}`); }
}

await check('each ?focus= URL shows the right projects, in order', async () => {
  const p = await browser.newPage();
  for (const [f, exp] of Object.entries(EXPECT)) {
    await p.goto(f === 'all' ? `${B}/` : `${B}/?focus=${f}`);
    const ids = await visible(p);
    assert.equal(ids[0], exp.first, `${f}: first project`);
    assert.equal(ids.length, exp.count, `${f}: project count`);
  }
  await p.close();
});

await check('chips filter, update the URL and aria-pressed, and back works', async () => {
  const p = await browser.newPage();
  await p.goto(`${B}/`);
  await p.click('.chip[data-focus="ai"]');
  assert.equal((await visible(p)).length, EXPECT.ai.count);
  assert.ok(p.url().endsWith('/?focus=ai'));
  assert.equal(await p.getAttribute('.chip[data-focus="ai"]', 'aria-pressed'), 'true');
  assert.equal(await p.getAttribute('.chip[data-focus="all"]', 'aria-pressed'), 'false');
  await p.click('.chip[data-focus="product"]');
  assert.equal((await visible(p))[0], EXPECT.product.first);
  await p.goBack();
  assert.equal((await visible(p)).length, EXPECT.ai.count, 'back restores the previous filter');
  await p.click('.chip[data-focus="all"]');
  assert.ok(!p.url().includes('focus='), 'All uses the clean URL');
  await p.close();
});

await check('keyboard: Tab to a chip and press Enter', async () => {
  const p = await browser.newPage();
  await p.goto(`${B}/`);
  let found = false;
  for (let i = 0; i < 60 && !found; i++) {
    await p.keyboard.press('Tab');
    found = (await p.evaluate(() => document.activeElement?.getAttribute('data-focus'))) === 'software';
  }
  assert.ok(found, 'Software chip is reachable by keyboard');
  await p.keyboard.press('Enter');
  assert.equal((await visible(p))[0], EXPECT.software.first);
  await p.close();
});

await check('full write-ups expand in place', async () => {
  const p = await browser.newPage();
  await p.goto(`${B}/`);
  await p.click('#concert-radar .more summary');
  assert.ok(await p.isVisible('#concert-radar .more .story-body h2'));
  await p.close();
});

await check('without JavaScript every project is visible', async () => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto(`${B}/?focus=ai`);
  assert.equal((await visible(p)).length, EXPECT.all.count);
  await ctx.close();
});

await check('reduced motion: no scroll or entrance animations', async () => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(`${B}/`);
  assert.equal(await p.evaluate(() => document.getAnimations().length), 0);
  await ctx.close();
});

await check('no TODO notes on the built site', async () => {
  const p = await browser.newPage();
  await p.goto(`${B}/`);
  const shown = await p.evaluate(() => [...document.querySelectorAll('.todo')].filter((e) => e.offsetParent).length);
  assert.equal(shown, 0);
  await p.close();
});

await browser.close();
if (failures) process.exit(1);
