import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProductsByLine, productLines } from '@/data/products';
import { SITE_URL } from '@/lib/site';
import AllMattressesClient from './AllMattressesClient';

export const metadata = {
  title: 'All Busby Mattresses | Artisan & Studio Lines',
  description:
    'Shop every Busby mattress. The handcrafted Artisan hybrids and the design-led Studio line, side by side. American-made.',
  alternates: { canonical: '/products' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Mattresses', item: `${SITE_URL}/products` },
  ],
};

const mattresses = [...getProductsByLine('artisan'), ...getProductsByLine('studio')];

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div className="min-h-screen bg-[#faf8f5] linen-texture relative">
      {/* Warm ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255, 220, 180, 0.4) 0%, rgba(255, 200, 150, 0.2) 30%, transparent 60%)',
        }}
      />

      {/* Hero Header */}
      <section className="pt-12 pb-16 relative overflow-hidden z-10">
        {/* Organic blob shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/15 blob-shape blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-gold-dark font-medium text-sm mb-4">
            All Mattresses
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy mb-6">
            Every Busby, <span className="wavy-underline">side by side.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Eight American-made mattresses across our handcrafted Artisan and design-led Studio lines. Filter,
            sort, and compare to find yours.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Made in USA
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Free Delivery
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Free Returns
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              100 Night Guarantee
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Financing Available
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              10 Year Warranty
            </span>
          </div>

        </div>
      </section>

      {/* All mattresses */}
      <section aria-label="All mattresses" className="pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AllMattressesClient products={mattresses} />
        </div>
      </section>

      {/* Two lines, explained */}
      <section aria-labelledby="lines-heading" className="py-20 relative z-10 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="lines-heading" className="text-center text-3xl md:text-4xl font-serif text-navy mb-10">
            Two lines, one Busby promise
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 ring-1 ring-gold/30">
              <p className="text-sm font-medium text-gold-dark">The Artisan Line</p>
              <h3 className="mt-2 text-2xl font-serif text-navy">{productLines.artisan.tagline}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{productLines.artisan.description}</p>
              <Link href="/shop/mattresses" className="mt-6 inline-flex items-center gap-2 font-medium text-gold-dark hover:gap-3 transition-all">
                Explore the Artisan Line <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div data-line="studio" data-embed className="relative overflow-hidden bg-paper border border-grid p-8">
              <div className="absolute inset-0 blueprint-grid opacity-[0.25] pointer-events-none" />
              <div className="relative">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-clay-deep">The Studio Line</p>
                <h3 className="mt-2 font-sans text-2xl font-semibold tracking-tight text-navy">{productLines.studio.tagline}</h3>
                <p className="mt-3 text-navy/70 leading-relaxed">{productLines.studio.description}</p>
                <Link href="/studio" className="mt-6 inline-flex items-center gap-2 font-medium text-clay-deep hover:gap-3 transition-all">
                  Explore the Studio Line <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Me Choose CTA */}
      <section className="py-20 relative overflow-hidden z-10">
        {/* Organic blob shapes */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold/10 blob-shape blur-3xl -translate-y-1/2 -translate-x-1/3" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/2 translate-x-1/3" />

        {/* Soft border */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-gold-dark font-medium text-sm mb-4">
            Not Sure Which to Choose?
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
            Find Your <span className="wavy-underline">Perfect Match</span>
          </h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
            Answer a few questions and we&apos;ll recommend the ideal mattress for your sleep style.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 bg-navy hover:bg-navy-light text-white font-medium px-8 py-4 rounded-full transition-all duration-500 hover:shadow-xl group"
          >
            Take the Sleep Quiz
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
