'use client';

import { Fragment, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarCheck, Check, X } from 'lucide-react';
import { productLines, type Product, type ProductLine } from '@/data/products';
import { MAX_COMPARE } from '@/lib/compare';
import LineTag from '@/components/product/LineTag';

type Construction = 'Hybrid' | 'Foam';
type SortKey = 'recommended' | 'price-asc' | 'price-desc';

// Curated default order: interleaves the two lines so neither reads as "the other section".
const RECOMMENDED = [
  'dream',
  'studio-hybrid',
  'slumber',
  'studio-12',
  'doze',
  'studio-10',
  'nod',
  'studio-hybrid-firm',
];

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'recommended', label: 'Recommended' },
  { key: 'price-asc', label: 'Price: low to high' },
  { key: 'price-desc', label: 'Price: high to low' },
];

const TYPE_CHIPS: { value: Construction; label: string }[] = [
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'Foam', label: 'All-foam' },
];

const LINE_CHIPS: ProductLine[] = ['artisan', 'studio'];


// "Best for" line — skips the generic "… comfort seekers" entries.
function bestFor(p: Product) {
  return p.bestFor
    .filter((b) => !/comfort seekers/i.test(b))
    .slice(0, 2)
    .join(' · ');
}

function typeLabel(p: Product) {
  return p.type === 'Foam' ? 'All-foam' : p.type;
}

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors ${
        pressed ? 'border-navy bg-navy text-white' : 'border-gray-300 bg-white text-navy hover:border-navy'
      }`}
    >
      {pressed && <Check className="h-4 w-4" aria-hidden="true" />}
      {children}
    </button>
  );
}

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function AllMattressesClient({ products }: { products: Product[] }) {
  const [types, setTypes] = useState<Construction[]>([]);
  const [lines, setLines] = useState<ProductLine[]>([]);
  const [sort, setSort] = useState<SortKey>('recommended');
  const [compare, setCompare] = useState<string[]>([]);

  const visible = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        (types.length === 0 || types.includes(p.type as Construction)) &&
        (lines.length === 0 || lines.includes(p.line)),
    );
    const rank = (p: Product) => {
      const i = RECOMMENDED.indexOf(p.slug);
      return i === -1 ? RECOMMENDED.length : i;
    };
    return [...filtered].sort((a, b) =>
      sort === 'price-asc'
        ? a.price - b.price || rank(a) - rank(b)
        : sort === 'price-desc'
          ? b.price - a.price || rank(a) - rank(b)
          : rank(a) - rank(b),
    );
  }, [products, types, lines, sort]);

  const filtersActive = types.length > 0 || lines.length > 0;
  const compared = products.filter((p) => compare.includes(p.slug));
  // Table shows the picked mattresses once 2+ are checked, otherwise everything in view.
  const tableProducts = compared.length >= 2 ? visible.filter((p) => compare.includes(p.slug)) : visible;
  // Showroom tile sits after the first full row when there's more than one row.
  const tileAfter = visible.length > 4 ? 4 : visible.length;

  const toggleCompare = (slug: string) =>
    setCompare((c) => (c.includes(slug) ? c.filter((s) => s !== slug) : c.length >= MAX_COMPARE ? c : [...c, slug]));

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Type</legend>
            <div className="flex flex-wrap gap-2">
              {TYPE_CHIPS.map((c) => (
                <Chip key={c.value} pressed={types.includes(c.value)} onClick={() => setTypes((t) => toggle(t, c.value))}>
                  {c.label}
                </Chip>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Line</legend>
            <div className="flex flex-wrap gap-2">
              {LINE_CHIPS.map((l) => (
                <Chip key={l} pressed={lines.includes(l)} onClick={() => setLines((s) => toggle(s, l))}>
                  {productLines[l].name}
                </Chip>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="flex items-end justify-between gap-4 lg:justify-end">
          <p aria-live="polite" className="text-sm text-gray-600 pb-3">
            Showing {visible.length} of {products.length}
            {filtersActive && (
              <>
                {' · '}
                <button
                  type="button"
                  onClick={() => {
                    setTypes([]);
                    setLines([]);
                  }}
                  className="font-semibold text-navy underline"
                >
                  Show all
                </button>
              </>
            )}
          </p>
          <div>
            <label htmlFor="sort" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="min-h-11 rounded-full border border-gray-300 bg-white pl-4 pr-10 text-sm font-medium text-navy"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="rounded-2xl bg-white p-10 text-center text-gray-600 ring-1 ring-gray-200">
          No mattresses match those filters.{' '}
          <button
            type="button"
            onClick={() => {
              setTypes([]);
              setLines([]);
            }}
            className="font-semibold text-navy underline"
          >
            Show all
          </button>
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((p, i) => {
            const checked = compare.includes(p.slug);
            const atLimit = !checked && compare.length >= MAX_COMPARE;
            const image = p.images[0];
            return (
              <Fragment key={p.slug}>
                {i === tileAfter && <ShowroomTile />}
                <li className="group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 hover:ring-navy/30 hover:shadow-xl transition-all">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    {image ? (
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-600">
                        Image coming soon
                      </span>
                    )}
                    <div className="absolute top-3 left-3">
                      <LineTag line={p.line} />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold text-navy">
                      {/* Stretched link: the whole card opens the product */}
                      <Link href={`/products/${p.slug}`} className="after:absolute after:inset-0">
                        {p.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">Best for {bestFor(p)}</p>

                    <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-gray-200 text-xs">
                      <div className="bg-gray-50 px-3 py-2">
                        <dt className="text-gray-600">Type</dt>
                        <dd className="font-semibold text-navy">{typeLabel(p)}</dd>
                      </div>
                      <div className="bg-gray-50 px-3 py-2">
                        <dt className="text-gray-600">Layers</dt>
                        <dd className="font-semibold text-navy">{p.components.length}</dd>
                      </div>
                    </dl>

                    <div className="mt-auto pt-5 flex items-end justify-between gap-3">
                      <p className="text-navy">
                        <span className="text-xl font-semibold">${p.price.toLocaleString()}</span>
                        <span className="ml-1 text-xs text-gray-600">Queen</span>
                      </p>
                      {/* Sits above the stretched link so it stays clickable */}
                      <label
                        className={`relative z-10 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm ${
                          atLimit ? 'text-gray-400 cursor-not-allowed' : 'text-navy'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={atLimit}
                          onChange={() => toggleCompare(p.slug)}
                          className="h-4 w-4 accent-navy"
                        />
                        Compare<span className="sr-only"> {p.name}</span>
                      </label>
                    </div>
                  </div>
                </li>
              </Fragment>
            );
          })}
          {tileAfter === visible.length && <ShowroomTile />}
        </ul>
      )}

      {/* Comparison table */}
      <section id="compare-table" aria-labelledby="compare-heading" className="mt-20 scroll-mt-32">
        <div className="text-center mb-8">
          <h2 id="compare-heading" className="text-3xl md:text-4xl font-serif text-navy">
            {compared.length >= 2 ? 'Your comparison' : 'Side by side'}
          </h2>
          <p className="mt-3 text-gray-600">
            {compared.length >= 2
              ? `Comparing ${compared.length} mattresses. Check or uncheck "Compare" on any card to change it.`
              : 'Check "Compare" on up to 4 mattresses to narrow this table.'}
          </p>
        </div>
        {/* Scrolls sideways inside its own box on small screens, never the page */}
        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-gray-200">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">Busby mattress comparison</caption>
            <thead>
              <tr className="border-b border-gray-200">
                <th scope="col" className="w-36 p-4 text-left font-semibold text-gray-600">
                  Mattress
                </th>
                {tableProducts.map((p) => (
                  <th key={p.slug} scope="col" className="p-4 text-left">
                    <Link href={`/products/${p.slug}`} className="font-semibold text-navy hover:underline">
                      {p.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { label: 'Line', value: (p: Product) => <LineTag line={p.line} /> },
                { label: 'Type', value: typeLabel },
                { label: 'Layers', value: (p: Product) => p.components.length },
                { label: 'Queen price', value: (p: Product) => `$${p.price.toLocaleString()}` },
                { label: 'Best for', value: bestFor },
              ].map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="p-4 text-left font-semibold text-gray-600">
                    {row.label}
                  </th>
                  {tableProducts.map((p) => (
                    <td key={p.slug} className="p-4 text-navy">
                      {row.value(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Compare tray — portaled to <body> so it isn't trapped under later z-10 page sections */}
      {compared.length > 0 &&
        createPortal(
        <div
          role="region"
          aria-label="Compare tray"
          data-compare-tray
          className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur shadow-[0_-8px_24px_rgba(0,0,0,0.08)]"
        >
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <p className="flex-1 text-sm font-medium text-navy sm:hidden">{compared.length} selected</p>
            <ul className="hidden flex-1 flex-wrap gap-2 sm:flex">
              {compared.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    onClick={() => toggleCompare(p.slug)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-gray-100 px-3 text-sm font-medium text-navy hover:bg-gray-200"
                  >
                    {p.name}
                    <X className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Remove from compare</span>
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setCompare([])}
              className="min-h-11 px-3 text-sm font-medium text-gray-600 hover:text-navy"
            >
              Clear
            </button>
            <a
              href="#compare-table"
              aria-disabled={compared.length < 2}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold ${
                compared.length < 2 ? 'pointer-events-none bg-gray-200 text-gray-600' : 'bg-navy text-white hover:bg-navy-dark'
              }`}
            >
              {compared.length < 2 ? 'Pick 1 more to compare' : `Compare ${compared.length}`}
              {compared.length >= 2 && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
            </a>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}

function ShowroomTile() {
  return (
    <li className="col-span-full">
      <div className="flex flex-col gap-4 rounded-2xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-gold">Elmhurst showroom</p>
          <p className="mt-1 text-xl font-semibold">Try all eight in person before you decide.</p>
          <p className="mt-1 text-white/80">Private, by-appointment visits. A Sleep Guide meets you at the door.</p>
        </div>
        <Link
          href="/appointment"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-navy hover:bg-gold-light"
        >
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          Book a visit
        </Link>
      </div>
    </li>
  );
}
