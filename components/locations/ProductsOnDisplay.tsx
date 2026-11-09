import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';
import WasPrice from '@/components/product/WasPrice';
import { livePrices } from '@/data/products';

const models = [
  {
    slug: 'dream',
    name: 'Busby Dream',
    type: 'Hybrid',
    keyBenefit: 'Cooling CoolGel Quilting',
    ...livePrices('dream'),
    image: '/images/products/Dream/dream-bed.webp',
  },
  {
    slug: 'slumber',
    name: 'Busby Slumber',
    type: 'Hybrid',
    keyBenefit: 'Deep Pressure Relief',
    ...livePrices('slumber'),
    image: '/images/products/Slumber/slumber-bed.webp',
  },
  {
    slug: 'nod',
    name: 'Busby Nod',
    type: 'Hybrid',
    keyBenefit: 'Built to Last',
    ...livePrices('nod'),
    image: '/images/products/Nod/nod-bed.webp',
  },
  {
    slug: 'doze',
    name: 'Busby Doze',
    type: 'Hybrid',
    keyBenefit: 'Enhanced Comfort',
    ...livePrices('doze'),
    image: '/images/products/Doze/doze-bed.webp',
  },
];

export default function ProductsOnDisplay() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">What you can try</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Try them on the floor — same online prices, same 100-night home trial.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((m) => (
            <Link
              key={m.slug}
              href={`/products/${m.slug}`}
              className="group bg-[#faf8f5] rounded-2xl overflow-hidden border border-gray-100 hover:border-gold/40 transition-colors"
            >
              <div className="relative aspect-square bg-white">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className="object-contain p-4"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-gold/95 text-navy text-xs font-semibold px-3 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  Try in store
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-gold-dark mb-1">{m.type}</p>
                <p className="text-lg font-semibold text-navy mb-1">{m.name}</p>
                <p className="text-sm text-gray-600 mb-3">{m.keyBenefit}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-navy">
                    From ${m.price.toLocaleString()}
                    <WasPrice value={m.compareAtPrice} />
                  </span>
                  <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
