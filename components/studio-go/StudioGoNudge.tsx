import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { studioGoProduct } from '@/data/products';

// The quiz and Shop by Feel match on feel, and Studio Go's build isn't
// published yet, so they offer it beside their matches on speed and price.
export default function StudioGoNudge({ className = '' }: { className?: string }) {
  const product = studioGoProduct;
  const size = product.sizes[0];
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group flex items-center gap-4 rounded-3xl bg-white p-4 text-left ring-1 ring-gray-200 hover:ring-navy/30 hover:shadow-md transition-all ${className}`}
    >
      <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
        <Image src={product.images[0]} alt="" fill sizes="96px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">Online special</p>
        <p className="mt-1 font-semibold text-navy">
          {product.name} · ${size.price} {size.name}
        </p>
        <p className="text-sm text-gray-600">
          Pick it up in Elmhurst in 72 hours, or get free delivery in 96.
        </p>
      </div>
      <ArrowRight
        className="h-5 w-5 flex-shrink-0 text-navy transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
