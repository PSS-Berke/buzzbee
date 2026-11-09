import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProductBySlug } from '@/data/products';
import { sale } from '@/data/sale';
import WasPrice from '@/components/product/WasPrice';

// One bed from each part of the range, each at its Queen sale price.
const beds = ['nod', 'dream', 'studio-12', 'studio-hybrid'].map((slug) => {
  const product = getProductBySlug(slug)!;
  const queen = product.sizes.find((s) => s.name === 'Queen')!;
  return { product, queen };
});

// The sale, loud: a bright slide right after Studio Go, with the struck prices up front.
// Studio Go isn't on it, so it never appears here. Prices come from the product data, so
// they're the ones checkout charges.
export default function SaleSlide() {
  return (
    <div data-slide="sale" className="relative w-full overflow-hidden bg-coral text-white">
      {/* Decorative light behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/4 -top-1/3 h-[140%] w-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-8 sm:px-6 lg:h-full lg:grid-cols-12 lg:items-center lg:px-8 lg:py-10">
        <div className="lg:col-span-5">
          <p className="inline-block -rotate-2 rounded-sm bg-white px-3 py-1 text-sm font-bold uppercase tracking-[0.2em] text-coral">
            Mattress sale
          </p>
          <h2 className="mt-4 font-sans text-8xl font-black leading-[0.9] tracking-tight xl:text-9xl">
            {sale.percentOff}%
            <span className="block">off</span>
          </h2>
          <p className="mt-5 text-2xl font-semibold leading-snug">Every bed except Studio Go.</p>
          <p className="mt-2 text-lg text-white">The sale price is the price you pay at checkout.</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="group/go inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-lg font-bold text-coral transition-colors hover:bg-paper"
            >
              Shop the sale
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover/go:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
            <a
              href="#quick-book"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white px-7 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Try them in Elmhurst
            </a>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
          {beds.map(({ product, queen }) => (
            <li key={product.slug}>
              <Link
                href={`/products/${product.slug}`}
                className="group/bed flex h-full flex-col overflow-hidden rounded-sm bg-white text-navy shadow-lg transition-transform hover:-translate-y-1 motion-reduce:transition-none"
              >
                <div className="relative aspect-[4/3] bg-white">
                  <Image
                    src={product.images[0]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 280px, 50vw"
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 border-t border-gray-100 p-3 sm:p-4">
                  <span className="font-semibold leading-tight">{product.name}</span>
                  <span className="text-sm text-gray-600">{queen.name}</span>
                  <span className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-1">
                    <span className="text-2xl font-bold text-coral sm:text-3xl">
                      <span className="sr-only">Sale price </span>${queen.price.toLocaleString('en-US')}
                    </span>
                    <WasPrice value={queen.compareAtPrice} className="text-base" badge={false} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
