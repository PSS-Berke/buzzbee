'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import { productLines, type Product, type ProductLine } from '@/data/products';
import { comparableProducts, compareHref, MAX_COMPARE, parseCompareParam } from '@/lib/compare';
import LineTag from '@/components/product/LineTag';

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

// Shown when someone lands on /compare with nothing picked: each line's flagship.
const DEFAULT_PICKS = ['dream', 'studio-hybrid'];

const LINES: ProductLine[] = ['artisan', 'studio'];

function sizeRange(p: Product) {
  const prices = p.sizes.map((s) => s.price);
  return `$${Math.min(...prices).toLocaleString()}–$${Math.max(...prices).toLocaleString()}`;
}

const ROWS: { label: string; value: (p: Product) => React.ReactNode }[] = [
  { label: 'Line', value: (p) => <LineTag line={p.line} /> },
  { label: 'Type', value: (p) => (p.type === 'Foam' ? 'All-foam' : p.type) },
  {
    label: 'Construction',
    value: (p) => (
      <>
        <span className="text-2xl font-light text-navy">{p.components.length}</span>
        <span className="ml-1 text-sm text-gray-600">layers</span>
      </>
    ),
  },
  { label: 'Key benefit', value: (p) => keyBenefits[p.slug] ?? p.tagline },
  {
    label: 'Best for',
    value: (p) => (
      <span className="flex flex-wrap gap-1.5">
        {p.bestFor.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-navy">
            {tag}
          </span>
        ))}
      </span>
    ),
  },
  { label: 'Queen', value: (p) => <span className="text-lg font-semibold text-navy">${p.price.toLocaleString()}</span> },
  { label: 'Twin to King', value: sizeRange },
];

export default function CompareClient() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const fromUrl = parseCompareParam(params.get('m'));
  const selected = fromUrl.length ? fromUrl : DEFAULT_PICKS;
  const picked = selected
    .map((slug) => comparableProducts.find((p) => p.slug === slug))
    .filter((p): p is Product => !!p);
  const atMax = selected.length >= MAX_COMPARE;

  // The URL is the state, so a comparison can be bookmarked or shared.
  const setSelected = (next: string[]) => {
    router.replace(next.length ? compareHref(next) : pathname, { scroll: false });
  };
  const toggle = (slug: string) =>
    setSelected(selected.includes(slug) ? selected.filter((s) => s !== slug) : atMax ? selected : [...selected, slug]);

  return (
    <div className="min-h-screen relative bg-[#faf8f5] linen-texture">
      {/* Warm ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255, 220, 180, 0.4) 0%, rgba(255, 200, 150, 0.2) 30%, transparent 60%)',
        }}
      />

      {/* Hero Header */}
      <section className="pt-10 pb-8 relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 blob-shape blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-gold-dark font-medium text-sm mb-4">Build your own comparison</span>
          <h1 className="text-3xl md:text-4xl text-navy mb-4 font-serif">
            Compare <span className="wavy-underline">side by side</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Pick up to {MAX_COMPARE} mattresses from either line. Share the link to send someone this exact comparison.
          </p>
        </div>
      </section>

      {/* Picker */}
      <section aria-labelledby="picker-heading" className="relative z-10 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/80 p-5 sm:p-6 ring-1 ring-gold/20">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="picker-heading" className="font-semibold text-navy">
                Choose mattresses
              </h2>
              <p aria-live="polite" className="text-sm text-gray-600">
                {selected.length} of {MAX_COMPARE} picked
                {atMax && ' · remove one to add another'}
              </p>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {LINES.map((line) => (
                <fieldset key={line}>
                  <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                    {productLines[line].name} line
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {comparableProducts
                      .filter((p) => p.line === line)
                      .map((p) => {
                        const on = selected.includes(p.slug);
                        return (
                          <button
                            key={p.slug}
                            type="button"
                            aria-pressed={on}
                            disabled={!on && atMax}
                            onClick={() => toggle(p.slug)}
                            className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                              on ? 'border-navy bg-navy text-white' : 'border-gray-300 bg-white text-navy hover:border-navy'
                            }`}
                          >
                            {on ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                            {p.name.replace(/^Busby /, '')}
                          </button>
                        );
                      })}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section aria-label="Comparison" className="pb-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {picked.length < 2 && (
            <p className="mb-6 rounded-2xl bg-white/80 p-4 text-center text-gray-600 ring-1 ring-gray-200">
              Pick at least one more mattress to compare.
            </p>
          )}
          {picked.length > 0 && (
            // Scrolls sideways inside its own box on small screens, never the page.
            // `relative` makes this the containing block for the sr-only (absolute)
            // labels inside, so they can't escape the scroller and widen the page.
            <div className="relative overflow-x-auto rounded-3xl bg-white ring-1 ring-gray-200">
              <table className="w-full table-fixed border-collapse text-sm" style={{ minWidth: 112 + picked.length * 190 }}>
                <caption className="sr-only">
                  Comparison of {picked.map((p) => p.name).join(', ')}
                </caption>
                <thead>
                  <tr className="border-b border-gray-200">
                    <td className="sticky left-0 z-10 w-28 sm:w-40 bg-white" />
                    {picked.map((p) => (
                      <th key={p.slug} scope="col" className="p-4 align-top text-left font-normal">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                          {p.images[0] ? (
                            <Image src={p.images[0]} alt="" fill sizes="240px" className="object-cover" />
                          ) : (
                            <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-600">
                              Image coming soon
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => toggle(p.slug)}
                            className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-navy shadow hover:bg-white"
                          >
                            <X className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">Remove {p.name}</span>
                          </button>
                        </div>
                        <Link href={`/products/${p.slug}`} className="mt-3 block text-lg font-semibold text-navy hover:underline">
                          {p.name}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ROWS.map((row) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="sticky left-0 z-10 bg-white p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                      >
                        {row.label}
                      </th>
                      {picked.map((p) => (
                        <td key={p.slug} className="p-4 align-middle text-navy">
                          {row.value(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="sticky left-0 z-10 bg-white" />
                    {picked.map((p) => (
                      <td key={p.slug} className="p-4">
                        <Link
                          href={`/products/${p.slug}`}
                          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-navy px-4 font-medium text-white hover:bg-navy-light"
                        >
                          View details<span className="sr-only">: {p.name}</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl text-navy mb-6 font-serif">Not sure what to compare?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop-by-feel"
              className="inline-flex items-center gap-2 text-navy font-medium hover:text-gold-dark transition-colors"
            >
              Find your matches by feel
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <span aria-hidden="true" className="text-gray-300 hidden sm:inline">|</span>
            <Link href="/quiz" className="text-gray-600 hover:text-navy transition-colors">
              Take the Sleep Quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
