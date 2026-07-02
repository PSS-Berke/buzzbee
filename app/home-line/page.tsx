import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { homeLineProducts } from '@/data/products';

export const metadata = {
  title: 'The Artisan Collection | Busby',
  description:
    'Four tiers of premium comfort. From dependable to absolutely premium — find your perfect level.',
};

const tierDescriptions: Record<string, string> = {
  nod: 'Dependable comfort',
  doze: 'Plush comfort, built to last.',
  slumber: 'Rich, plush experience',
  dream: 'Engineered for luxury performance.',
};

const adultProducts = homeLineProducts.filter((p) => p.line === 'artisan' && p.type !== 'Crib Mattress');
const cribProducts = homeLineProducts.filter((p) => p.type === 'Crib Mattress');

const productsWithTiers = adultProducts.map((p) => ({
  ...p,
  tierDescription: tierDescriptions[p.slug] || '',
}));

const flagship = productsWithTiers.find((p) => p.slug === 'dream');
const supportingProducts = productsWithTiers.filter((p) => p.slug !== 'dream');

export default function HomeLinePage() {
  return (
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/15 blob-shape blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-gold-dark font-medium text-sm mb-4">
            Handcrafted in America
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy mb-6">
            The <span className="wavy-underline">Artisan</span> Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            Four tiers of comfort. One for every sleeper.
          </p>

          {/* Tier ladder — visual teaser */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 text-sm">
            {['Nod', 'Doze', 'Slumber', 'Dream'].map((tier, i, arr) => (
              <span key={tier} className="flex items-center gap-2">
                <span className="text-gray-600">{tier}</span>
                {i < arr.length - 1 && <span aria-hidden="true" className="text-gold/40">›</span>}
              </span>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Free Delivery
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Free Returns
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              100 Night Guarantee
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Financing Available
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Up to 10 Year Warranty
            </span>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* Flagship — Dream */}
          {flagship && (
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
                        alt=""
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
                      The Pinnacle
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-serif text-navy mb-2">
                      {flagship.name}
                    </h2>
                    <p className="text-xl text-gray-600 mb-4 italic">{flagship.tierDescription}</p>
                    <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
                      {flagship.description}
                    </p>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      <span className="px-4 py-2 bg-gold/10 text-gold-dark rounded-full text-sm">
                        {flagship.type}
                      </span>
                      <span className="px-4 py-2 bg-gold/10 text-gold-dark rounded-full text-sm">
                        {flagship.features[0]}
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
          )}

          {/* Supporting Tiers */}
          {supportingProducts.length > 0 && (
            <div className="grid sm:grid-cols-3 gap-6">
              <h2 className="sr-only">More Artisan mattresses</h2>
              {supportingProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group relative rounded-3xl overflow-hidden border-2 border-transparent hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 min-h-[500px]"
                >
                  {/* Full-fill image */}
                  <div className="absolute inset-0">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt=""
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                        <span className="text-gray-600 text-sm">Image Coming Soon</span>
                      </div>
                    )}
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 bg-white text-gold-dark text-xs font-medium rounded-full shadow-sm">
                      {product.type}
                    </span>
                  </div>

                  {/* Content overlay — gradient fade at bottom */}
                  <div className="absolute bottom-0 inset-x-0 z-10 p-6 bg-gradient-to-t from-navy/95 via-navy/75 to-transparent">
                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gold-light text-xs font-medium italic mb-2">{product.tierDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-white">
                        From ${product.price.toLocaleString()}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* The Nest — Crib Line */}
      {cribProducts.length > 0 && (
        <section className="py-24 relative overflow-hidden z-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="inline-block text-gold-dark font-medium text-sm mb-4">
                Busby
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
                The <span className="wavy-underline">Nest</span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
                Safe, supportive sleep designed for the littlest sleepers in your home.
              </p>
            </div>

            {/* Crib Product Cards */}
            <div className="max-w-2xl mx-auto">
              {cribProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group block bg-white border-2 border-gold/30 rounded-3xl overflow-hidden shadow-xl shadow-gold/5 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500"
                >
                  <div className="grid sm:grid-cols-2 min-h-[320px]">
                    {/* Image Side */}
                    <div className="relative overflow-hidden min-h-[220px] sm:min-h-0">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt=""
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 text-sm">Image Coming Soon</span>
                        </div>
                      )}
                    </div>

                    {/* Content Side */}
                    <div className="flex flex-col justify-center p-8">
                      <span className="text-gold-dark font-medium text-sm mb-3">
                        Crib Collection
                      </span>
                      <h3 className="text-2xl font-serif text-navy mb-2">
                        The <span className="font-semibold">{product.name}</span>
                      </h3>
                      <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                        {product.tagline}
                      </p>

                      {/* Key features */}
                      <ul className="space-y-1.5 mb-6">
                        {product.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-medium text-navy">
                          From ${product.price.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-2 text-gold-dark group-hover:gap-4 transition-all duration-500">
                          <span className="font-medium text-sm">Shop Now</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Help Me Choose CTA */}
      <section className="py-20 relative overflow-hidden z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-gold-dark font-medium text-sm mb-4">
            Find Your Match
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
            Find Your <span className="wavy-underline">Perfect Mattress</span>
          </h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
            Answer a few questions and we&apos;ll match you to the right mattress for your sleep style.
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

      {/* abt Exclusive Callout */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/60 rounded-3xl px-8 py-10 border border-gold/20">
            <div>
              <p className="text-xs text-gold-dark font-medium uppercase tracking-wider mb-2">Also available</p>
              <h3 className="text-2xl font-serif text-navy mb-1">Looking for more to help you sleep?</h3>
              <p className="text-gray-600 text-sm">Pillows, protectors, and more to complete your sleep setup.</p>
            </div>
            <Link
              href="/shop/sleep-accessories"
              className="shrink-0 inline-flex items-center gap-3 bg-navy hover:bg-navy-light text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 group"
            >
              Shop Sleep Accessories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
