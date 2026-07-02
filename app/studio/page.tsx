import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProductsByLine } from '@/data/products';
import { SITE_URL } from '@/lib/site';
import StudioHero from '@/components/studio/StudioHero';
import StudioDesignIndex from '@/components/studio/StudioDesignIndex';

export const metadata = {
  title: 'Studio by Busby | Engineered Comfort',
  description:
    'The Studio line — comfort designed by the numbers. Four builds, from essential foam to a pocketed-coil hybrid. American-made by Busby.',
  alternates: { canonical: '/studio' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Studio', item: `${SITE_URL}/studio` },
  ],
};

const studioProducts = getProductsByLine('studio');

export default function StudioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div data-line="studio" className="min-h-screen bg-paper relative">
        <StudioHero />

        {/* Manifesto */}
        <section className="py-20 relative">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-clay-deep text-xs font-medium tracking-[0.2em] uppercase">
              Design Principle
            </span>
            <blockquote className="border-l-2 border-clay pl-6 mt-5">
              <p className="font-sans text-2xl md:text-3xl font-semibold text-navy leading-snug">
                “We don’t decorate a mattress. We resolve it.”
              </p>
            </blockquote>
            <div className="mt-8 space-y-4 text-navy/70 leading-relaxed">
              <p>
                Every Studio bed begins as a spec sheet, not a mood board. We choose each layer for a
                measurable reason — height, density, response — and we publish the numbers right on the
                label. What you feel is exactly what we drew.
              </p>
              <p>
                No pillow-top theater. No mystery foam. Just a precise stack of materials, squared off
                and built to last — the quiet confidence of something engineered, not styled.
              </p>
            </div>
          </div>
        </section>

        <StudioDesignIndex products={studioProducts} />

        {/* Artisan bridge */}
        <section className="py-20 relative border-t border-grid">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-paper border border-grid p-10 text-center">
              <span className="text-clay-deep text-xs font-medium tracking-[0.2em] uppercase">
                Prefer something handcrafted?
              </span>
              <h2 className="font-sans text-2xl md:text-3xl font-semibold text-navy tracking-tight mt-3">
                Meet the Artisan line.
              </h2>
              <p className="text-navy/70 mt-4 max-w-xl mx-auto leading-relaxed">
                Studio is engineered minimalism. Artisan is the warm, layered original — handcrafted
                hybrids built on decades of know-how. Same Busby promise, two design languages.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link
                  href="/home-line"
                  className="inline-flex items-center gap-3 bg-navy hover:bg-navy-dark text-white font-medium px-7 py-3.5 rounded-sm transition-colors"
                >
                  Explore Artisan <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/compare" className="text-navy/70 hover:text-clay-deep transition-colors">
                  Compare both lines
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative">
          <div className="absolute inset-0 blueprint-grid opacity-[0.25] pointer-events-none" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <span className="text-clay-deep text-xs font-medium tracking-[0.2em] uppercase">
              Find your build
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-semibold text-navy tracking-tight mt-3">
              Sleep, by design.
            </h2>
            <p className="text-navy/70 mt-4 max-w-xl mx-auto leading-relaxed">
              Not sure which Studio is yours? Take the 90-second sleep quiz, or browse the full spec on
              each build.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                href="/compare"
                className="inline-flex items-center gap-3 bg-navy hover:bg-navy-dark text-white font-medium px-8 py-4 rounded-sm transition-colors"
              >
                Compare the Studio builds <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/quiz" className="text-navy/70 hover:text-clay-deep transition-colors">
                Take the sleep quiz
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
