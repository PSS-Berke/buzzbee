import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';

// The two ways to get it, set in the same light numerals as the 01–04 index.
const fulfillment = [
  { label: 'Store pickup', hours: 72, detail: 'Ready at our Elmhurst showroom' },
  { label: 'Free delivery', hours: 96, detail: 'Straight to your door' },
];

// Studio Go sits under the four indexed builds rather than in the 01–04 grid:
// it's the line's online special, and its build isn't published yet. No top
// border, so it joins the hairline grid directly above it.
export default function StudioGoCard({ product }: { product: Product }) {
  const size = product.sizes[0];
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group grid sm:grid-cols-[minmax(0,240px)_1fr] lg:grid-cols-[240px_1fr_minmax(0,400px)] gap-6 lg:gap-10 items-center bg-paper border border-t-0 border-grid p-8 hover:bg-putty/30 transition-colors"
    >
      <div className="aspect-[4/3] overflow-hidden bg-putty/40 border border-grid">
        <Image
          src={product.images[0]}
          alt={`${product.name} mattress`}
          width={480}
          height={360}
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <span className="text-clay-deep text-xs font-medium tracking-[0.2em] uppercase">Online special</span>
        <h3 className="font-sans text-2xl font-semibold text-navy mt-2">{product.name}</h3>
        <p className="text-navy/70 text-sm mt-2 leading-relaxed">{product.tagline}</p>
        <p className="text-navy mt-4">
          <span className="text-xl font-semibold">${size.price.toLocaleString()}</span>
          <span className="ml-1 text-xs text-navy/70">{size.name}</span>
        </p>

        <span className="text-clay-deep flex items-center gap-2 mt-5 text-sm font-medium group-hover:gap-3 transition-all">
          See {product.name} <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </span>
      </div>

      <dl className="grid grid-cols-2 border border-grid divide-x divide-grid sm:col-span-2 lg:col-span-1">
        {fulfillment.map((f) => (
          <div key={f.label} className="p-5">
            <dt className="text-xs tracking-[0.18em] uppercase text-clay-deep">{f.label}</dt>
            <dd className="mt-3">
              <span className="font-sans text-5xl font-light text-clay-deep leading-none tabular-nums">{f.hours}</span>
              <span className="ml-1 text-sm text-navy/70">hrs</span>
            </dd>
            <dd className="mt-2 text-xs text-navy/70 leading-relaxed">{f.detail}</dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}
