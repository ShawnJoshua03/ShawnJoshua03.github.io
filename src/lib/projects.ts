import { getCollection, type CollectionEntry } from 'astro:content';
import { FOCUSES } from '../config';

export type Project = CollectionEntry<'stories'>;

/** All projects in default ("All") order. */
export async function projects(): Promise<Project[]> {
  return (await getCollection('stories')).sort((a, b) => (a.data.rank.all ?? 99) - (b.data.rank.all ?? 99));
}

/**
 * Per-project CSS hooks for the filter: its position in each focus (--o-*),
 * which focuses it appears in (a-*), and where it is a showcase tile (f-*).
 */
export function focusHooks(p: Project, all: Project[]) {
  const style: string[] = [];
  const classes: string[] = [];
  for (const f of FOCUSES) {
    const inFocus = f.id === 'all' || p.data.areas.includes(f.id as 'software' | 'ai' | 'product');
    if (!inFocus) continue;
    classes.push(`a-${f.id}`);
    const ranked = all
      .filter((q) => f.id === 'all' || q.data.areas.includes(f.id as 'software' | 'ai' | 'product'))
      .sort((a, b) => (a.data.rank[f.rankKey] ?? 99) - (b.data.rank[f.rankKey] ?? 99));
    const pos = ranked.indexOf(p);
    style.push(`--o-${f.id}:${pos + 1}`);
    if (pos < 3) classes.push(`f-${f.id}`);
  }
  return { style: style.join(';'), classes };
}

export const monthYear = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
