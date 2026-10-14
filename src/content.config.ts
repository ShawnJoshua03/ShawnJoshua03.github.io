import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Order of a project on the home page for each focus (1 = first). The first three
// in a focus are shown as large showcase tiles. `all` is the default view.
const rank = z
  .object({
    all: z.number().int().positive(),
    eng: z.number().int().positive(),
    ai: z.number().int().positive(),
    product: z.number().int().positive(),
  })
  .partial();

const metric = z.object({
  value: z.string(),
  label: z.string(),
  /** Where the number comes from (resume, LinkedIn, README). Shown in the sidebar. */
  source: z.string().optional(),
});

const stories = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/stories' }),
  schema: z.object({
    /** Project name, e.g. "Concert Radar". */
    title: z.string(),
    /** One sentence for cards and the page subtitle. */
    tagline: z.string(),
    /** Which filter chips show this project. */
    areas: z.array(z.enum(['software', 'ai', 'product'])).min(1),
    /** A news-style summary line, used on the project page. */
    headline: z.string(),
    deck: z.string(),
    /** Short category label, e.g. "Health · Machine Learning". */
    kicker: z.string(),
    date: z.coerce.date(),
    dateline: z.string(),
    /** Two or three sentences for front-page cards. */
    excerpt: z.string(),
    /** Paragraphs shown when this story leads a front page. Falls back to the excerpt. */
    lede: z.array(z.string()).optional(),
    stack: z.array(z.string()),
    metrics: z.array(metric).default([]),
    links: z
      .object({ demo: z.string().url(), code: z.string().url(), devpost: z.string().url() })
      .partial()
      .default({}),
    award: z.string().optional(),
    rank,
    /** Key of a chart component in src/components/charts (see Chart.astro). */
    chart: z.string().optional(),
    /** Drafts appear on the front page but get no story page yet. */
    draft: z.boolean().default(false),
  }),
});

const business = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/business' }),
  schema: z.object({
    headline: z.string(),
    deck: z.string(),
    org: z.string(),
    role: z.string(),
    start: z.string(),
    end: z.string(),
    /** Sort key, YYYY-MM of the start date. */
    sort: z.string(),
    dateline: z.string(),
    excerpt: z.string(),
    metrics: z.array(metric).default([]),
    rank,
  }),
});

export const collections = { stories, business };
