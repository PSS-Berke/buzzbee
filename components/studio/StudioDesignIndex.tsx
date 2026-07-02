import type { Product } from '@/data/products';
import StudioSpecCard from './StudioSpecCard';

// One-line spec descriptor per Studio build (parallel to keyBenefits on compare).
const studioSpecLines: Record<string, string> = {
  'studio-10': 'A three-layer foam build, from cooling gel comfort to a high-density core. The clean, accessible entry — everything you need, nothing you don’t.',
  'studio-14': 'A balanced foam build with a motion-isolating core, so you and your partner sleep undisturbed.',
  'studio-hybrid': 'Seven layers of premium foam over a pocketed-coil core — balanced, medium feel with zero motion transfer.',
  'studio-hybrid-firm':
    'The same pocketed-coil build as the Studio Hybrid, with a firmer comfort top for a flatter, more supportive surface.',
};

export default function StudioDesignIndex({ products }: { products: Product[] }) {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 blueprint-grid opacity-[0.25] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="inline-block text-clay-deep text-xs font-medium tracking-[0.2em] uppercase mb-3">
            The Collection
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-semibold text-navy tracking-tight">
            Four builds, indexed.
          </h2>
          <p className="text-navy/70 mt-4 max-w-xl mx-auto">
            Every Studio bed reads the same way — a number, a profile, and a spec you can trust.
          </p>
        </div>

        {/* Hairline blueprint grid — gap-px over bg-grid draws 1px dividers between cards */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-grid border border-grid">
          {products.map((p, i) => (
            <li key={p.slug}>
              <StudioSpecCard
                product={p}
                index={i + 1}
                descriptor={studioSpecLines[p.slug] ?? p.tagline}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
