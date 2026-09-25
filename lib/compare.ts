// The build-your-own comparison is addressed by URL: /compare?m=dream,studio-hybrid.
// Anything that hands a selection to /compare (Shop by Feel, product pages)
// should build the link with compareHref so the format lives in one place.

import { getProductsByLine, type Product } from '@/data/products';

export const MAX_COMPARE = 4;

/** Every mattress that can be compared, Artisan first then Studio, each by price. */
export const comparableProducts: Product[] = [...getProductsByLine('artisan'), ...getProductsByLine('studio')];

const COMPARABLE = new Set(comparableProducts.map((p) => p.slug));

/** Parse `?m=` into known, de-duplicated slugs, capped at MAX_COMPARE. */
export function parseCompareParam(value: string | null | undefined): string[] {
  if (!value) return [];
  const out: string[] = [];
  for (const slug of value.split(',')) {
    const s = slug.trim();
    if (COMPARABLE.has(s) && !out.includes(s)) out.push(s);
    if (out.length === MAX_COMPARE) break;
  }
  return out;
}

export function compareHref(slugs: string[]): string {
  return slugs.length ? `/compare?m=${slugs.join(',')}` : '/compare';
}
