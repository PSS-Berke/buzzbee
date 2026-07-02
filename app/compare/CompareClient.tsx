'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';
import { homeLineProducts, productLines, type ProductLine } from '@/data/products';

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

const LINES: ProductLine[] = ['artisan', 'studio'];

export default function CompareClient() {
  const [activeLine, setActiveLine] = useState<ProductLine>('artisan');
  const isStudio = activeLine === 'studio';

  // Each line yields exactly 4 adult mattresses, so the grid-cols-4 layout is preserved.
  const products = homeLineProducts
    .filter((p) => p.line === activeLine && p.type !== 'Crib Mattress')
    .sort((a, b) => a.price - b.price || a.id.localeCompare(b.id));

  return (
    <div
      data-line={activeLine}
      className={`min-h-screen relative bg-[var(--surface)] ${isStudio ? '' : 'linen-texture'}`}
    >
      {/* Warm ambient glow — Artisan only */}
      {!isStudio && (
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255, 220, 180, 0.4) 0%, rgba(255, 200, 150, 0.2) 30%, transparent 60%)',
          }}
        />
      )}

      {/* Hero Header */}
      <section className="pt-10 pb-8 relative overflow-hidden z-10">
        {/* Organic blob shapes — Artisan only */}
        {!isStudio && (
          <>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 blob-shape blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/2 -translate-x-1/3" />
          </>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-[var(--accent-strong)] font-medium text-sm mb-4">
            Busby · {productLines[activeLine].name}
          </span>
          <h1 className="text-3xl md:text-4xl text-navy mb-4 font-[family-name:var(--heading-font)]">
            Compare Our{' '}
            {isStudio ? (
              <span className="font-semibold">Collection</span>
            ) : (
              <span className="wavy-underline">Collection</span>
            )}
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            See how each mattress stacks up to find your perfect match.
          </p>
        </div>
      </section>

      {/* Line toggle */}
      <div className="flex justify-center mb-10 relative z-10">
        <div className="inline-flex rounded-full border-2 border-[var(--card-border)]/40 p-1 bg-white/70 backdrop-blur-sm">
          {LINES.map((line) => (
            <button
              key={line}
              type="button"
              onClick={() => setActiveLine(line)}
              aria-pressed={activeLine === line}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeLine === line ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
              }`}
            >
              {productLines[line].name}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <section className="pb-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: four product tiles */}
          <div className="grid grid-cols-2 gap-4 lg:hidden">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white/80 rounded-3xl border-2 border-[var(--card-border)]/15 shadow-sm overflow-hidden flex flex-col"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  {product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={`${product.name} ${product.type} mattress`}
                      width={200}
                      height={200}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-600 text-xs">Image coming soon</span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1 gap-3">
                  <div>
                    <span className="text-xs text-[var(--accent-strong)] font-medium tracking-wider uppercase">
                      {product.type}
                    </span>
                    <h2 className="text-base font-semibold text-navy mt-0.5">{product.name}</h2>
                    <p className="text-lg font-light text-navy mt-1">
                      From ${product.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <span className="font-medium text-navy">{product.components.length}</span> layers
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full flex-shrink-0" />
                      <span className="text-navy text-xs">{keyBenefits[product.slug]}</span>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i <= Math.floor(product.rating) ? 'text-[var(--accent)] fill-[var(--accent)]' : 'text-gray-200'}`}
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {product.bestFor.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent-strong)] text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    aria-label={`View details: ${product.name}`}
                    className="mt-auto flex items-center justify-center gap-1 bg-navy hover:bg-navy-light text-white text-sm font-medium py-2.5 px-4 rounded-full transition-all group"
                  >
                    View
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: full comparison table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table
                className="w-full min-w-[880px] border-separate"
                style={{ borderSpacing: '0 1rem' }}
              >
                <caption className="sr-only">
                  Compare Busby {productLines[activeLine].name} mattresses by construction, key
                  benefit, best for, and customer rating
                </caption>
                <thead>
                  <tr>
                    <td className="w-44" />
                    {products.map((product) => (
                      <th key={product.id} scope="col" className="p-2 align-top font-normal">
                        <div className="bg-white/80 rounded-3xl p-6 border-2 border-[var(--card-border)]/15 text-center shadow-sm">
                          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                            {product.images.length > 0 ? (
                              <Image
                                src={product.images[0]}
                                alt={`${product.name} ${product.type} mattress`}
                                width={200}
                                height={200}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span className="text-gray-600 text-sm">Image coming soon</span>
                            )}
                          </div>
                          <span className="block text-xs text-[var(--accent-strong)] font-medium tracking-wider uppercase">
                            {product.type}
                          </span>
                          <span className="block text-xl font-semibold text-navy mt-1">
                            {product.name}
                          </span>
                          <span className="block text-2xl font-light text-navy mt-3">
                            From ${product.price.toLocaleString()}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="bg-white/80 rounded-l-3xl border-2 border-r-0 border-[var(--card-border)]/15 p-6 text-left align-middle text-sm text-[var(--accent-strong)] font-medium tracking-[0.15em] uppercase"
                    >
                      Construction
                    </th>
                    {products.map((product) => (
                      <td
                        key={product.id}
                        className="bg-white/80 border-y-2 border-[var(--card-border)]/15 p-6 text-center align-middle last:rounded-r-3xl last:border-r-2"
                      >
                        <span className="text-3xl font-light text-navy">
                          {product.components.length}
                        </span>
                        <span className="text-gray-600 text-sm block mt-1">Layers</span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      className="bg-white/80 rounded-l-3xl border-2 border-r-0 border-[var(--card-border)]/15 p-6 text-left align-middle text-sm text-[var(--accent-strong)] font-medium tracking-[0.15em] uppercase"
                    >
                      Key Benefit
                    </th>
                    {products.map((product) => (
                      <td
                        key={product.id}
                        className="bg-white/80 border-y-2 border-[var(--card-border)]/15 p-6 align-middle last:rounded-r-3xl last:border-r-2"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span
                            aria-hidden="true"
                            className="w-2 h-2 bg-[var(--accent)] rounded-full flex-shrink-0"
                          />
                          <span className="text-navy font-medium text-sm">
                            {keyBenefits[product.slug]}
                          </span>
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      className="bg-white/80 rounded-l-3xl border-2 border-r-0 border-[var(--card-border)]/15 p-6 text-left align-middle text-sm text-[var(--accent-strong)] font-medium tracking-[0.15em] uppercase"
                    >
                      Best For
                    </th>
                    {products.map((product) => (
                      <td
                        key={product.id}
                        className="bg-white/80 border-y-2 border-[var(--card-border)]/15 p-6 align-middle last:rounded-r-3xl last:border-r-2"
                      >
                        <span className="flex flex-wrap gap-2 justify-center">
                          {product.bestFor.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent-strong)] text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      className="bg-white/80 rounded-l-3xl border-2 border-r-0 border-[var(--card-border)]/15 p-6 text-left align-middle text-sm text-[var(--accent-strong)] font-medium tracking-[0.15em] uppercase"
                    >
                      Customer Rating
                    </th>
                    {products.map((product) => (
                      <td
                        key={product.id}
                        className="bg-white/80 border-y-2 border-[var(--card-border)]/15 p-6 text-center align-middle last:rounded-r-3xl last:border-r-2"
                      >
                        <span className="flex justify-center gap-1 mb-2" aria-hidden="true">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i <= Math.floor(product.rating) ? 'text-[var(--accent)] fill-[var(--accent)]' : 'text-gray-200'}`}
                            />
                          ))}
                        </span>
                        <span className="text-navy font-medium">{product.rating}</span>
                        <span className="text-gray-600 text-sm block">
                          {product.reviewCount.toLocaleString()} reviews
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      className="bg-white/80 rounded-l-3xl border-2 border-r-0 border-[var(--card-border)]/15 p-6 text-left align-middle"
                    >
                      <span className="sr-only">View product</span>
                    </th>
                    {products.map((product) => (
                      <td
                        key={product.id}
                        className="bg-white/80 border-y-2 border-[var(--card-border)]/15 p-6 align-middle last:rounded-r-3xl last:border-r-2"
                      >
                        <Link
                          href={`/products/${product.slug}`}
                          aria-label={`View details: ${product.name}`}
                          className="flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-medium py-3 px-4 rounded-full transition-all duration-300 group"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl text-navy mb-6 font-[family-name:var(--heading-font)]">Still Deciding?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop-by-feel"
              className="inline-flex items-center gap-2 text-navy font-medium hover:text-[var(--accent-strong)] transition-colors"
            >
              Shop by Sleep Style
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span aria-hidden="true" className="text-[var(--card-border)]/40 hidden sm:inline">|</span>
            <Link href="/quiz" className="text-gray-600 hover:text-navy transition-colors">
              Take the Sleep Quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
