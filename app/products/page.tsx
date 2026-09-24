import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { homeLineProducts, getProductsByLine, productLines, type Product } from '@/data/products';
import { SITE_URL } from '@/lib/site';
import StudioSpecCard from '@/components/studio/StudioSpecCard';
import { studioSpecLines } from '@/components/studio/StudioDesignIndex';

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

// Add key benefits to products
const productsWithBenefits = homeLineProducts.filter((p) => p.line === 'artisan').map((p) => ({
  ...p,
  keyBenefit:
    p.slug === 'dream'
      ? 'Luxury Pillowtop Comfort'
      : p.slug === 'slumber'
        ? 'Natural Latex + Coil'
        : p.slug === 'doze'
          ? 'XPlush Comfort'
          : p.slug === 'nod'
            ? 'Dependable Hybrid'
            : 'Safe Infant Sleep',
  layers:
    p.slug === 'dream' ? 7 : p.slug === 'slumber' ? 6 : p.slug === 'doze' ? 5 : 5,
}));

const flagship = productsWithBenefits.find((p) => p.slug === 'dream')!;
const supportingProducts = productsWithBenefits.filter((p) => p.slug !== 'dream');

const artisanMattresses = getProductsByLine('artisan');
const studioProducts = getProductsByLine('studio');

function priceRange(products: Product[]) {
  const prices = products.map((p) => p.price);
  return `$${Math.min(...prices).toLocaleString()}–$${Math.max(...prices).toLocaleString()}`;
}

const lineCards = [
  {
    ...productLines.artisan,
    href: '#artisan',
    summary: `${artisanMattresses.length} handcrafted hybrids · ${priceRange(artisanMattresses)} Queen`,
  },
  {
    ...productLines.studio,
    href: '#studio',
    summary: `${studioProducts.length} builds, foam & hybrid · ${priceRange(studioProducts)} Queen`,
  },
];

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
            Two lines. <span className="wavy-underline">One Busby promise.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            American-made mattresses for every sleeper, in two design languages. Pick a line, or browse both.
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

          {/* Line chooser — each card previews its line's own design language */}
          <div className="grid md:grid-cols-2 gap-6 mt-14 text-left">
            {lineCards.map((line) =>
              line.slug === 'studio' ? (
                <a
                  key={line.slug}
                  href={line.href}
                  data-line="studio"
                  data-embed
                  className="group relative block overflow-hidden bg-paper border border-grid p-8 hover:border-clay transition-colors"
                >
                  <div className="absolute inset-0 blueprint-grid opacity-[0.25] pointer-events-none" />
                  <div className="relative">
                    <span className="text-clay-deep text-xs font-medium tracking-[0.2em] uppercase">
                      The {line.name} Line
                    </span>
                    <h2 className="font-sans text-2xl md:text-3xl font-semibold text-navy tracking-tight mt-3">
                      {line.tagline}
                    </h2>
                    <p className="text-navy/70 mt-3 leading-relaxed">{line.summary}</p>
                    <span className="text-clay-deep flex items-center gap-2 mt-6 font-medium group-hover:gap-3 transition-all">
                      See the {line.name} line <ArrowRight className="w-4 h-4 rotate-90" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              ) : (
                <a
                  key={line.slug}
                  href={line.href}
                  className="group block bg-white border-2 border-gold/30 rounded-3xl p-8 shadow-xl shadow-gold/5 hover:border-gold/60 transition-colors"
                >
                  <span className="text-gold-dark font-medium text-sm">The {line.name} Line</span>
                  <h2 className="text-2xl md:text-3xl font-serif text-navy mt-3">{line.tagline}</h2>
                  <p className="text-gray-600 mt-3 leading-relaxed">{line.summary}</p>
                  <span className="text-gold-dark flex items-center gap-2 mt-6 font-medium group-hover:gap-3 transition-all">
                    See the {line.name} line <ArrowRight className="w-4 h-4 rotate-90" aria-hidden="true" />
                  </span>
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Sticky line toggle on small screens, where the two sections are a long scroll apart */}
      <nav
        aria-label="Mattress lines"
        className="lg:hidden sticky top-[108px] sm:top-[116px] z-40 bg-white/95 backdrop-blur border-y border-gray-200"
      >
        <div className="flex">
          <a href="#artisan" className="flex-1 py-3 text-center text-sm font-semibold text-navy border-r border-gray-200">
            Artisan
          </a>
          <a href="#studio" className="flex-1 py-3 text-center text-sm font-semibold text-navy">
            Studio
          </a>
        </div>
      </nav>

      {/* Artisan line */}
      <section
        id="artisan"
        aria-labelledby="artisan-heading"
        className="py-24 relative overflow-hidden z-10 scroll-mt-40 sm:scroll-mt-44 lg:scroll-mt-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="inline-block text-gold-dark font-medium text-sm mb-4">The Artisan Line</span>
            <h2 id="artisan-heading" className="text-3xl md:text-4xl font-serif text-navy mb-4">
              Handcrafted for <span className="wavy-underline">Perfect Sleep</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{productLines.artisan.description}</p>
          </div>

          {/* Flagship Hero Card */}
          <div className="mb-12">
            <Link
              href={`/products/${flagship.slug}`}
              className="group block relative bg-white border-2 border-gold/30 rounded-3xl overflow-hidden shadow-xl shadow-gold/5 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500"
            >
              <div className="grid lg:grid-cols-2 lg:min-h-[500px]">
                {/* Image Side */}
                <div className="relative overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-0">
                  {flagship.images[0] ? (
                    <Image
                      src={flagship.images[0]}
                      alt={`${flagship.name} ${flagship.type} mattress`}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">Image Coming Soon</span>
                    </div>
                  )}
                </div>

                {/* Content Side */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <span className="text-gold-dark font-medium text-sm mb-4">
                    Our Best
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-serif text-navy mb-2">
                    Dream <span className="font-semibold">Pillowtop</span>
                  </h3>
                  <p className="text-xl text-gray-600 mb-4">{flagship.tagline}</p>
                  <p className="text-gray-600 leading-relaxed mb-8 max-w-md">{flagship.description}</p>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="px-4 py-2 bg-gold/10 text-gold-dark rounded-full text-sm">
                      {flagship.layers} Layers
                    </span>
                    <span className="px-4 py-2 bg-gold/10 text-gold-dark rounded-full text-sm">
                      {flagship.keyBenefit}
                    </span>
                    <span className="px-4 py-2 bg-gold/10 text-gold-dark rounded-full text-sm">
                      Made in USA
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl text-navy">From ${flagship.price.toLocaleString()}</span>
                    <span className="text-gray-600 text-sm">Queen</span>
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-3 text-gold-dark group-hover:gap-5 transition-all duration-500">
                    <span className="font-medium">Discover the Dream</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Supporting Collection */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportingProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group relative bg-white/80 rounded-3xl overflow-hidden border-2 border-transparent hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={`${product.name} ${product.type} mattress`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">Image Coming Soon</span>
                    </div>
                  )}

                  {/* Type badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white text-gold-dark text-xs font-medium rounded-full shadow-sm">
                      {product.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy mb-2 group-hover:text-gold-dark transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.tagline}
                  </p>

                  {/* Key benefit */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span className="w-2 h-2 bg-gold rounded-full" />
                    <span>{product.keyBenefit}</span>
                  </div>

                  {/* Price and arrow */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-navy">
                      From ${product.price.toLocaleString()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-navy group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop/mattresses" className="inline-flex items-center gap-3 group">
              <span className="text-navy font-medium group-hover:text-gold-dark transition-colors duration-300">
                Explore the Artisan Line
              </span>
              <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gold/30 group-hover:border-gold group-hover:bg-gold transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-gold-dark group-hover:text-navy transition-colors duration-300" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Studio line */}
      <section
        id="studio"
        data-line="studio"
        data-embed
        aria-labelledby="studio-heading"
        className="py-24 relative z-10 bg-paper border-y border-grid scroll-mt-40 sm:scroll-mt-44 lg:scroll-mt-32"
      >
        <div className="absolute inset-0 blueprint-grid opacity-[0.25] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="inline-block text-clay-deep text-sm font-medium tracking-[0.2em] uppercase mb-4">
              The Studio Line
            </span>
            <h2 id="studio-heading" className="font-sans text-3xl md:text-4xl font-semibold text-navy tracking-tight mb-4">
              Sleep, by design.
            </h2>
            <p className="text-navy/70 max-w-2xl mx-auto leading-relaxed">{productLines.studio.description}</p>
          </div>

          {/* Hairline blueprint grid — gap-px over bg-grid draws 1px dividers between cards */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-grid border border-grid">
            {studioProducts.map((p, i) => (
              <li key={p.slug}>
                <StudioSpecCard product={p} index={i + 1} descriptor={studioSpecLines[p.slug] ?? p.tagline} />
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-12">
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
