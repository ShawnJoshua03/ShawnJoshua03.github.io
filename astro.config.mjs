// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// To move to a custom domain later: change `site`, and add public/CNAME.
export default defineConfig({
  site: 'https://shawnjoshua03.github.io',
  trailingSlash: 'ignore',
  // Inline the (small) stylesheet so nothing blocks first paint.
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.includes('/og-card/') && !page.includes('/404') }),
  ],
});
