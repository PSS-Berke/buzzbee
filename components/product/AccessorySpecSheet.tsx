import Image from 'next/image';
import { Check } from 'lucide-react';
import type { Product } from '@/data/products';

interface AccessorySpecSheetProps {
  product: Product;
}

/**
 * Detail section for sleep accessories that aren't mattresses (BedTech
 * adjustable bases, the Busby topper). Replaces the mattress tabs, which talk
 * about layers, firmness, and roll-pack delivery.
 */
export default function AccessorySpecSheet({ product }: AccessorySpecSheetProps) {
  const hasSpecs = !!product.specs && product.specs.length > 0;
  return (
    <div className="mt-20 max-w-5xl mx-auto space-y-16">
      {/* Overview */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-[family-name:var(--heading-font)] text-navy mb-4">
          About the <span className="font-semibold">{product.name}</span>
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          {product.description}
        </p>
      </div>

      <div className={`grid gap-8 ${hasSpecs ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'}`}>
        {/* Specs */}
        {hasSpecs && product.specs && (
          <div className="bg-white/80 rounded-3xl p-8 border-2 border-[var(--card-border)]/10">
            <h3 className="text-sm text-[var(--accent-strong)] font-medium mb-6">Specifications</h3>
            <dl className="divide-y divide-[var(--card-border)]/15">
              {product.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm">
                  <dt className="text-gray-600">{spec.label}</dt>
                  <dd className="text-navy font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Features */}
        <div className="bg-white/80 rounded-3xl p-8 border-2 border-[var(--card-border)]/10">
          <h3 className="text-sm text-[var(--accent-strong)] font-medium mb-6">Features</h3>
          <ul className={`grid sm:grid-cols-2 gap-x-6 gap-y-3 ${hasSpecs ? 'lg:grid-cols-1 xl:grid-cols-2' : ''}`}>
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="flex-shrink-0 w-5 h-5 bg-[var(--accent)]/20 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-[var(--accent-strong)]" aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Best for */}
      <div>
        <h3 className="text-sm text-[var(--accent-strong)] font-medium text-center mb-6">Best For</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {product.bestFor.map((tag) => (
            <span
              key={tag}
              className="bg-[var(--accent)]/10 text-[var(--accent-strong)] px-4 py-2 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Partnership note — BedTech products only */}
      {product.brand === 'bedtech' && (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left bg-white/60 rounded-3xl px-8 py-6 border border-[var(--card-border)]/20">
        <Image
          src="/images/partners/bedtech-logo.png"
          alt="BedTech"
          width={640}
          height={120}
          className="h-7 w-auto"
        />
        <p className="text-sm text-gray-600 max-w-xl">
          Busby partners with BedTech to pair our mattresses with adjustable bases we trust. Your base is
          covered by BedTech&apos;s 20-year limited warranty.
        </p>
      </div>
      )}
    </div>
  );
}
