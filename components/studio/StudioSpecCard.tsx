import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';

export default function StudioSpecCard({
  product,
  index,
  descriptor,
}: {
  product: Product;
  index: number;
  descriptor: string;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-paper p-8 relative hover:bg-putty/30 transition-colors"
    >
      {/* Ghost index number — the 01–04 spec motif */}
      <span aria-hidden="true" className="font-sans text-6xl font-light text-clay/30 leading-none block mb-4">
        {String(index).padStart(2, '0')}
      </span>

      <div className="aspect-[4/5] mb-5 overflow-hidden bg-putty/40 border border-grid flex items-center justify-center">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={`${product.name} mattress`}
            width={320}
            height={400}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-navy/70 text-xs tracking-wide">Macro shot coming soon</span>
        )}
      </div>

      <h3 className="font-sans text-xl font-semibold text-navy">{product.name}</h3>
      <p className="text-navy/70 text-sm mt-2 leading-relaxed">{descriptor}</p>

      <div className="flex gap-4 text-xs text-navy/70 mt-4">
        <span>
          <span className="text-navy font-medium">{product.components.length}</span> layers
        </span>
        <span>From ${product.price.toLocaleString()}</span>
      </div>

      <span className="text-clay-deep flex items-center gap-2 mt-5 text-sm font-medium group-hover:gap-3 transition-all">
        Read the spec <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
