import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { adjustableBaseProducts, mattressTopper, type Product } from '@/data/products';

interface CompleteYourSetupProps {
  /** Mattress name, used in the intro line. */
  productName: string;
}

/**
 * "You may also want" cross-sell shown on mattress product pages: the Busby
 * topper plus the BedTech adjustable bases. Uses the line CSS variables so it
 * matches Artisan and Studio pages alike.
 */
export default function CompleteYourSetup({ productName }: CompleteYourSetupProps) {
  const items: Product[] = [...(mattressTopper ? [mattressTopper] : []), ...adjustableBaseProducts];
  if (items.length === 0) return null;

  return (
    <section className="py-20 relative z-10" aria-labelledby="complete-your-setup-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-[var(--accent-strong)] font-medium text-sm mb-4">
            Complete Your Setup
          </span>
          <h2
            id="complete-your-setup-heading"
            className="text-3xl md:text-4xl text-navy font-[family-name:var(--heading-font)] mb-4"
          >
            You May Also Want
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Top your {productName} with a plush Busby topper, or raise it on an adjustable base from our
            partners at BedTech.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 ${items.length >= 3 ? 'lg:grid-cols-3' : 'max-w-5xl mx-auto'}`}>
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.slug}`}
              className="group flex flex-col bg-white/80 rounded-3xl overflow-hidden border-2 border-[var(--card-border)]/10 hover:border-[var(--card-border)]/30 hover:shadow-xl hover:shadow-[var(--accent)]/5 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] bg-[var(--surface)] overflow-hidden">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-medium text-[var(--accent-strong)] mb-2">
                  {item.brand === 'bedtech' ? 'BedTech × Busby' : item.type}
                </span>
                <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-[var(--accent-strong)] transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.tagline}</p>
                <ul className="text-sm text-gray-600 space-y-1.5 mb-5">
                  {item.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full flex-shrink-0 mt-2" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-medium text-navy">
                    {new Set(item.sizes.map((s) => s.price)).size === 1 ? '' : 'From '}$
                    {item.price.toLocaleString()}
                  </span>
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
