'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, CalendarCheck, Check, Plus, ShoppingBag, X } from 'lucide-react';
import { productLines, type Product, type ProductLine } from '@/data/products';
import { comparableProducts, compareHref, MAX_COMPARE, parseCompareParam } from '@/lib/compare';
import { useCart } from '@/contexts/CartContext';
import { ROWS, SIZE_ORDER, sizePrice, type RowContext } from './compareRows';

// Shown when someone lands on /compare with nothing picked: each line's flagship.
const DEFAULT_PICKS = ['dream', 'studio-hybrid'];

const LINES: ProductLine[] = ['artisan', 'studio'];

// Name as the booking form lists it ("Busby Dream" -> "Dream").
const shortName = (p: Product) => p.name.replace(/^Busby /, '');

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
  const { addItem, openCartDrawer } = useCart();
  const [size, setSize] = useState('Queen');
  const [diffOnly, setDiffOnly] = useState(false);
  const [video, setVideo] = useState<Product | null>(null);
  const videoDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (video) videoDialog.current?.showModal();
  }, [video]);

  const sizes = SIZE_ORDER.filter((name) => picked.some((p) => sizePrice(p, name)));
  const ctx: RowContext = { size, onWatch: setVideo };
  const rows = ROWS.filter(
    (row) => !diffOnly || !row.key || picked.length < 2 || new Set(picked.map((p) => row.key!(p, ctx))).size > 1,
  );
  const hiddenRows = ROWS.length - rows.length;

  const addToCart = (p: Product) => {
    const s = sizePrice(p, size);
    if (!s) return;
    // Same line item shape as the product page's Add to Cart (ProductInfo).
    addItem({
      productId: p.id,
      productSlug: p.slug,
      productName: p.name,
      productType: p.type,
      size: s.name,
      sizeDimensions: s.dimensions,
      price: s.price,
      originalPrice: p.originalPrice,
      quantity: 1,
      image: p.images[0] || '',
    });
    openCartDrawer();
  };

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
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <fieldset>
                <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-600">Size</legend>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((name) => (
                    <button
                      key={name}
                      type="button"
                      aria-pressed={size === name}
                      onClick={() => setSize(name)}
                      className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
                        size === name ? 'border-navy bg-navy text-white' : 'border-gray-300 bg-white text-navy hover:border-navy'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </fieldset>
              {picked.length > 1 && (
                <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-navy">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={diffOnly}
                    aria-labelledby="diff-label"
                    onClick={() => setDiffOnly((d) => !d)}
                    className={`relative h-7 w-12 flex-shrink-0 rounded-full transition-colors ${diffOnly ? 'bg-navy' : 'bg-gray-400'}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${diffOnly ? 'left-6' : 'left-1'}`}
                    />
                  </button>
                  <span id="diff-label">
                    Show only differences
                    {diffOnly && hiddenRows > 0 && <span className="ml-1 text-gray-600">({hiddenRows} hidden)</span>}
                  </span>
                </label>
              )}
            </div>
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
                  {rows.map((row) => (
                    <tr key={row.label({ ...ctx, size: '' })}>
                      <th
                        scope="row"
                        className="sticky left-0 z-10 bg-white p-4 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-600"
                      >
                        {row.label(ctx)}
                      </th>
                      {picked.map((p) => (
                        <td key={p.slug} className="p-4 align-top text-navy">
                          {row.render(p, ctx)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="sticky left-0 z-10 bg-white" />
                    {picked.map((p) => (
                      <td key={p.slug} className="space-y-2 p-4">
                        {sizePrice(p, size) ? (
                          <button
                            type="button"
                            onClick={() => addToCart(p)}
                            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gold px-4 font-semibold text-navy hover:bg-gold-light"
                          >
                            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                            Add {size}<span className="sr-only"> {p.name} to cart</span>
                          </button>
                        ) : (
                          <p className="py-2.5 text-center text-sm text-gray-600">Not offered in {size}</p>
                        )}
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

          {picked.length > 0 && (
            <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="font-heading text-sm font-semibold uppercase tracking-widest text-gold">Elmhurst showroom</p>
                <p className="mt-1 text-xl font-semibold">Feel the difference in person.</p>
                <p className="mt-1 text-white/80">
                  Try {picked.map(shortName).join(', ')} side by side. Free, private, by appointment.
                </p>
              </div>
              <Link
                href={`/appointment?try=${encodeURIComponent(picked.map(shortName).join(','))}#book`}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-navy hover:bg-gold-light"
              >
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Try these in the showroom
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Explainer video */}
      <dialog
        ref={videoDialog}
        onClose={() => setVideo(null)}
        aria-label={video ? `${video.name} explainer video` : undefined}
        className="m-auto w-[min(92vw,56rem)] rounded-3xl bg-black p-0 backdrop:bg-navy/70"
      >
        {video?.video && (
          <div className="relative">
            <video
              src={video.video.src}
              poster={video.video.poster}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full"
            >
              {/* Same as ShowroomPlayer: no caption files exist for the explainers yet */}
              <track kind="captions" />
            </video>
            <form method="dialog" className="absolute right-3 top-3">
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-navy hover:bg-white">
                <X className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Close video</span>
              </button>
            </form>
          </div>
        )}
      </dialog>

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
