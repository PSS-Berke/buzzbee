import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProductsByLine } from '@/data/products';
import StudioSpecCard from '@/components/studio/StudioSpecCard';
import { studioSpecLines } from '@/components/studio/StudioDesignIndex';

const studioProducts = getProductsByLine('studio');

// Home page counterpart to FeaturedProducts (Artisan): same header → cards → CTA
// rhythm, but rendered in the Studio design language so the two lines read as
// siblings. data-embed keeps the page's quilted overlay (see globals.css).
export default function StudioShowcase() {
  return (
    <section
      data-line="studio"
      data-embed
      aria-labelledby="studio-showcase-heading"
      className="py-24 relative bg-paper border-y border-grid"
    >
      <div className="absolute inset-0 blueprint-grid opacity-[0.25] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="inline-block text-clay-deep text-sm font-medium tracking-[0.2em] uppercase mb-4">
            The Studio Line
          </span>
          <h2
            id="studio-showcase-heading"
            className="font-sans text-4xl md:text-5xl font-semibold text-navy tracking-tight mb-6"
          >
            Sleep, by design.
          </h2>
          <p className="text-lg text-navy/70 max-w-xl mx-auto leading-relaxed">
            Four builds, engineered by the numbers. Same Busby promise, a different design language.
          </p>
        </div>

        {/* Hairline blueprint grid — gap-px over bg-grid draws 1px dividers between cards */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-grid border border-grid mb-16">
          {studioProducts.map((p, i) => (
            <li key={p.slug}>
              <StudioSpecCard product={p} index={i + 1} descriptor={studioSpecLines[p.slug] ?? p.tagline} />
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <Link
            href="/studio"
            className="inline-flex items-center gap-3 bg-navy hover:bg-navy-dark text-white font-medium px-8 py-4 rounded-sm transition-colors"
          >
            Explore the Studio Line <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
          <Link href="/compare" className="text-navy/70 hover:text-clay-deep font-medium transition-colors">
            Compare both lines
          </Link>
        </div>
      </div>
    </section>
  );
}
