// Row definitions for the build-your-own comparison table. Each row renders one
// cell per mattress; `key` is what "Show only differences" compares (a row whose
// keys all match is hidden). Rows without a key are always shown.

import { Play } from 'lucide-react';
import type { Product } from '@/data/products';
import LineTag from '@/components/product/LineTag';

export const SIZE_ORDER = ['Twin', 'Twin XL', 'Full', 'Queen', 'King'];

export interface RowContext {
  size: string;
  onWatch: (p: Product) => void;
}

export interface CompareRow {
  label: (ctx: RowContext) => string;
  render: (p: Product, ctx: RowContext) => React.ReactNode;
  key?: (p: Product, ctx: RowContext) => string;
}

// Key benefits for each product (both lines).
const keyBenefits: Record<string, string> = {
  nod: 'Dependable Comfort',
  doze: 'Plush Comfort, Built to Last.',
  slumber: 'Rich, Plush Experience',
  dream: 'Engineered for Luxury Performance.',
  'studio-10': 'Essential Comfort',
  'studio-12': 'Motion Isolation',
  'studio-hybrid': 'Balanced Hybrid Feel',
  'studio-hybrid-firm': 'Same Build, Firmer Feel',
};

export function sizePrice(p: Product, size: string) {
  return p.sizes.find((s) => s.name === size);
}

/** Components top (cover) to bottom. Some products list them bottom-up. */
function layersTopDown(p: Product) {
  const bottomUp = /base|support core/i.test(p.components[0]?.name ?? '');
  return bottomUp ? [...p.components].reverse() : p.components;
}

type Band = 'cover' | 'comfort' | 'coil' | 'support';

function bandOf(name: string): Band {
  if (/coil/i.test(name)) return 'coil';
  if (/cover|fabric|knit|surface/i.test(name)) return 'cover';
  if (/base|core/i.test(name)) return 'support';
  return 'comfort';
}

const BAND_STYLE: Record<Band, string> = {
  cover: 'bg-gray-50 text-navy border-gray-200',
  comfort: 'bg-[#f3ead9] text-navy border-[#e6d6b8]',
  coil: 'bg-navy text-white border-navy',
  support: 'bg-gray-200 text-navy border-gray-300',
};

function LayerStack({ p }: { p: Product }) {
  const layers = layersTopDown(p);
  return (
    <div>
      <p className="mb-2">
        <span className="text-2xl font-light text-navy">{layers.length}</span>
        <span className="ml-1 text-sm text-gray-600">layers, top to bottom</span>
      </p>
      <ol className="overflow-hidden rounded-xl border border-gray-200">
        {layers.map((c) => (
          <li
            key={c.name}
            title={c.description}
            className={`border-b px-3 py-1.5 text-xs leading-snug last:border-b-0 ${BAND_STYLE[bandOf(c.name)]}`}
          >
            {c.name}
          </li>
        ))}
      </ol>
    </div>
  );
}

function unique<T>(xs: T[]) {
  return [...new Set(xs)];
}

function madeIn(p: Product) {
  const places = unique(p.materials.map((m) => m.source.replace(/,\s*USA$/, '')).filter((s) => s !== 'USA'));
  return places.length ? `${places.join(', ')}, USA` : 'USA';
}

function certifications(p: Product) {
  // "Breathable" / "Made in USA" sit in the certification field but aren't certifications.
  return unique(p.materials.map((m) => m.certification)).filter((c) => !/^(breathable|made in usa)$/i.test(c));
}

// Highlights are each product's own feature list, minus items another row
// already covers (layers, origin, foam certification) and the store-wide warranty.
function highlights(p: Product) {
  return p.features.filter((f) => !/layer construction|^made in|certified foams|warranty/i.test(f));
}

function Chips({ items }: { items: string[] }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span key={t} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-navy">
          {t}
        </span>
      ))}
    </span>
  );
}

export const ROWS: CompareRow[] = [
  { label: () => 'Line', render: (p) => <LineTag line={p.line} />, key: (p) => p.line },
  { label: () => 'Type', render: (p) => (p.type === 'Foam' ? 'All-foam' : p.type), key: (p) => p.type },
  {
    label: ({ size }) => `${size} price`,
    render: (p, { size }) => {
      const s = sizePrice(p, size);
      return s ? (
        <span className="text-lg font-semibold text-navy">${s.price.toLocaleString()}</span>
      ) : (
        <span className="text-gray-600">Not offered in {size}</span>
      );
    },
    key: (p, { size }) => String(sizePrice(p, size)?.price ?? 'none'),
  },
  {
    label: () => 'Construction',
    render: (p) => <LayerStack p={p} />,
    key: (p) => p.components.map((c) => c.name).join('|'),
  },
  { label: () => 'Key benefit', render: (p) => keyBenefits[p.slug] ?? p.tagline, key: (p) => keyBenefits[p.slug] ?? p.tagline },
  { label: () => 'Best for', render: (p) => <Chips items={p.bestFor.slice(0, 3)} />, key: (p) => p.bestFor.slice(0, 3).join('|') },
  {
    label: () => 'Highlights',
    render: (p) => (
      <ul className="space-y-1 text-sm">
        {highlights(p).map((f) => (
          <li key={f} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
            {f}
          </li>
        ))}
      </ul>
    ),
    key: (p) => highlights(p).join('|'),
  },
  { label: () => 'Made in', render: madeIn, key: madeIn },
  { label: () => 'Certifications', render: (p) => <Chips items={certifications(p)} />, key: (p) => certifications(p).join('|') },
  {
    label: () => 'Video',
    render: (p, { onWatch }) =>
      p.video ? (
        <button
          type="button"
          onClick={() => onWatch(p)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-navy/20 px-4 text-sm font-medium text-navy hover:border-navy"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          Watch<span className="sr-only"> the {p.name} explainer</span>
        </button>
      ) : (
        <span className="text-gray-600">Coming soon</span>
      ),
  },
];
