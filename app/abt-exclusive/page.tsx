import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { products, homeLineProducts } from '@/data/products';

export const metadata = {
  title: 'Abt Exclusive Mattresses | Sleep6',
  description:
    'Sleep6 mattresses available exclusively through Abt. American-made comfort — from essential foam to luxury hybrid.',
};

// abt Exclusive products only
const abtProducts = products.filter((p) => p.brand === 'abt');

// Add key benefits to products
const productsWithBenefits = abtProducts.map((p) => ({
  ...p,
  keyBenefit:
    p.slug === 'insatiable'
      ? 'Natural Latex Comfort'
      : p.slug === 'cosmos-hybrid'
        ? 'Zero Motion Transfer'
        : p.slug === 'fak-cosmos'
          ? 'Temperature Regulation'
          : p.slug === 'mystic'
            ? 'Motion Isolation'
            : 'Essential Comfort',
  layers:
    p.slug === 'insatiable' ? 6 : p.slug === 'cosmos-hybrid' ? 7 : p.slug === 'fak-cosmos' ? 4 : p.slug === 'mystic' ? 3 : 3,
}));

const flagship = productsWithBenefits.find((p) => p.slug === 'insatiable')!;
const supportingProducts = productsWithBenefits.filter((p) => p.slug !== 'insatiable');

export default function AbtExclusivePage() {
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
      <section className="pt-24 pb-16 relative overflow-hidden z-10">
        {/* Organic blob shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/15 blob-shape blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-gold-dark font-medium text-sm mb-4">
            Abt Exclusive
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy mb-6">
            Abt <span className="wavy-underline">Exclusive</span> Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Handcrafted in America. Available exclusively through our Abt partnership.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Made in USA
            </span>
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
              10 Year Warranty
            </span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Flagship Hero Card */}
          <div className="mb-12">
            <Link
              href={`/products/${flagship.slug}`}
              className="group block relative bg-white border-2 border-gold/30 rounded-3xl overflow-hidden shadow-xl shadow-gold/5 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500"
            >
              <div className="grid lg:grid-cols-2 min-h-[500px]">
                {/* Image Side */}
                <div className="relative overflow-hidden min-h-[300px] lg:min-h-0">
                  {flagship.images[0] ? (
                    <Image
                      src={flagship.images[0]}
                      alt={flagship.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Image Coming Soon</span>
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
                  <p className="text-xl text-gray-500 mb-4">{flagship.tagline}</p>
                  <p className="text-gray-400 leading-relaxed mb-8 max-w-md">{flagship.description}</p>

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
                    <span className="text-gray-400 text-sm">Queen</span>
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-3 text-gold-dark group-hover:gap-5 transition-all duration-500">
                    <span className="font-medium">Discover the {flagship.name}</span>
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
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <span className="text-gray-300 text-sm">Image Coming Soon</span>
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
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {product.tagline}
                  </p>

                  {/* Key benefit */}
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                    <span>{product.keyBenefit}</span>
                  </div>

                  {/* Price and arrow */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-navy">
                      From ${product.price.toLocaleString()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Also Available — Sleep6 Home Line */}
      <section className="py-24 relative overflow-hidden z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-gold-dark font-medium text-sm mb-4">
              Also Available
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
              The Sleep6 <span className="wavy-underline">Home Line</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
              Can&apos;t visit Abt? Shop our online-exclusive collection — the same American-made craftsmanship, delivered direct to your door.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeLineProducts.filter((p) => p.type !== 'Crib Mattress').map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group relative bg-white/80 rounded-3xl overflow-hidden border-2 border-transparent hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <span className="text-gray-300 text-sm">Image Coming Soon</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white text-gold-dark text-xs font-medium rounded-full shadow-sm">
                      Online Exclusive
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy mb-2 group-hover:text-gold-dark transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.tagline}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-navy">
                      From ${product.price.toLocaleString()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/home-line"
              className="inline-flex items-center gap-3 border border-navy/20 hover:border-navy text-navy font-medium px-8 py-4 rounded-full transition-all duration-500 hover:shadow-lg group"
            >
              View All Sleep6 Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
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
  );
}
