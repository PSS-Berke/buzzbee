import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { adjustableBaseProducts } from '@/data/products';

interface PairWithBaseProps {
  /** Mattress name, used in the intro line. */
  productName: string;
}

/**
 * "You may also want" cross-sell for the BedTech adjustable bases, shown on
 * mattress product pages. Uses the line CSS variables so it matches Artisan
 * and Studio pages alike.
 */
export default function PairWithBase({ productName }: PairWithBaseProps) {
  if (adjustableBaseProducts.length === 0) return null;

  return (
    <section className="py-20 relative z-10" aria-labelledby="pair-with-base-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-[var(--accent-strong)] font-medium text-sm mb-4">
            Complete Your Setup
          </span>
          <h2
            id="pair-with-base-heading"
            className="text-3xl md:text-4xl text-navy font-[family-name:var(--heading-font)] mb-4"
          >
            You May Also Want
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Pair your {productName} with an adjustable base from our partners at BedTech.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {adjustableBaseProducts.map((base) => (
            <Link
              key={base.id}
              href={`/products/${base.slug}`}
              className="group grid sm:grid-cols-[2fr_3fr] bg-white/80 rounded-3xl overflow-hidden border-2 border-[var(--card-border)]/10 hover:border-[var(--card-border)]/30 hover:shadow-xl hover:shadow-[var(--accent)]/5 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[240px] bg-[var(--surface)] overflow-hidden">
                <Image
                  src={base.images[0]}
                  alt={base.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex flex-col">
                <span className="text-xs font-medium text-[var(--accent-strong)] mb-2">BedTech × Busby</span>
                <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-[var(--accent-strong)] transition-colors duration-300">
                  {base.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{base.tagline}</p>
                <ul className="text-sm text-gray-600 space-y-1.5 mb-5">
                  {base.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full flex-shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-medium text-navy">From ${base.price.toLocaleString()}</span>
                  <ArrowRight
                    className="w-4 h-4 text-gray-600 group-hover:text-[var(--accent-strong)] group-hover:translate-x-1 transition-all duration-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
