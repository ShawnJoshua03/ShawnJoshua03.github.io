// Charts are drawn at build time into static SVG (no client JS). Each chart is
// rendered at two sizes and CSS picks one, so label text never shrinks below
// legibility on a phone.

export interface ChartSize {
  key: 'sm' | 'lg';
  w: number;
  h: number;
  font: number;
}

export const SIZES: ChartSize[] = [
  { key: 'sm', w: 340, h: 250, font: 11 },
  { key: 'lg', w: 640, h: 300, font: 12 },
];

export const pct = (n: number) => `${Math.round(n * 100)}%`;
export const thousands = (n: number) => n.toLocaleString('en-US');
