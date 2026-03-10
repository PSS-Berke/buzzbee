import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';
import { homeLineProducts } from '@/data/products';

export const metadata = {
  title: 'Compare | Sleep6',
  description:
    'Compare all Sleep6 mattresses side by side. Five tiers of online-exclusive comfort — find your perfect level.',
};

// Key benefits for each product
const keyBenefits: Record<string, string> = {
  nod: 'Dependable Comfort',
  doze: 'Plush Comfort, Built to Last.',
  slumber: 'Rich, Plush Experience',
  dream: 'Engineered for Luxury Performance.',
};

// Sort home line products by price (ascending), excluding crib
const sortedProducts = [...homeLineProducts]
  .filter((p) => p.type !== 'Crib Mattress')
  .sort((a, b) => a.price - b.price);

export default function ComparePage() {
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
      <section className="pt-20 pb-12 relative overflow-hidden z-10">
        {/* Organic blob shapes */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 blob-shape blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-gold-dark font-medium text-sm mb-4">
            Sleep6 · Online Exclusive
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-navy mb-4">
            Compare Our <span className="wavy-underline">Collection</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            See how each mattress stacks up to find your perfect match.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Scrollable container for mobile */}
          <div className="overflow-x-auto -mx-4 px-4 pb-4">
            <div className="min-w-[880px]">
              {/* Product Headers */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white/80 rounded-3xl p-6 border-2 border-gold/10 text-center shadow-sm"
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                      {product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-300 text-sm">Image coming soon</span>
                      )}
                    </div>
                    <span className="text-xs text-gold-dark font-medium tracking-wider uppercase">
                      {product.type}
                    </span>
                    <h3 className="text-xl font-semibold text-navy mt-1">{product.name}</h3>
                    <p className="text-2xl font-light text-navy mt-3">
                      From ${product.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Comparison Rows */}
              <div className="space-y-4">
                {/* Construction Row */}
                <div className="bg-white/80 rounded-3xl p-6 border-2 border-gold/10 shadow-sm">
                  <h4 className="text-sm text-gold-dark font-medium tracking-[0.15em] uppercase mb-6 text-center">
                    Construction
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {sortedProducts.map((product) => (
                      <div key={product.id} className="text-center">
                        <span className="text-3xl font-light text-navy">
                          {product.components.length}
                        </span>
                        <span className="text-gray-500 text-sm block mt-1">Layers</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Benefit Row */}
                <div className="bg-white/80 rounded-3xl p-6 border-2 border-gold/10 shadow-sm">
                  <h4 className="text-sm text-gold-dark font-medium tracking-[0.15em] uppercase mb-6 text-center">
                    Key Benefit
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {sortedProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                        <span className="text-navy font-medium text-sm">
                          {keyBenefits[product.slug]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best For Row */}
                <div className="bg-white/80 rounded-3xl p-6 border-2 border-gold/10 shadow-sm">
                  <h4 className="text-sm text-gold-dark font-medium tracking-[0.15em] uppercase mb-6 text-center">
                    Best For
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {sortedProducts.map((product) => (
                      <div key={product.id} className="flex flex-wrap gap-2 justify-center">
                        {product.bestFor.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gold/10 text-gold-dark text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Row */}
                <div className="bg-white/80 rounded-3xl p-6 border-2 border-gold/10 shadow-sm">
                  <h4 className="text-sm text-gold-dark font-medium tracking-[0.15em] uppercase mb-6 text-center">
                    Customer Rating
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {sortedProducts.map((product) => (
                      <div key={product.id} className="text-center">
                        <div className="flex justify-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i <= Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-gray-200'}`}
                            />
                          ))}
                        </div>
                        <span className="text-navy font-medium">{product.rating}</span>
                        <span className="text-gray-500 text-sm block">
                          {product.reviewCount.toLocaleString()} reviews
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Row */}
                <div className="bg-white/80 rounded-3xl p-6 border-2 border-gold/10 shadow-sm">
                  <div className="grid grid-cols-4 gap-4">
                    {sortedProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-medium py-3 px-4 rounded-full transition-all duration-300 group"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll hint on mobile */}
          <p className="text-center text-gray-400 text-sm mt-4 lg:hidden">
            ← Scroll to see all mattresses →
          </p>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-serif text-navy mb-6">Still Deciding?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop-by-feel"
              className="inline-flex items-center gap-2 text-navy font-medium hover:text-gold-dark transition-colors"
            >
              Shop by Sleep Style
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-gold/30 hidden sm:inline">|</span>
            <Link
              href="/quiz"
              className="text-gray-500 hover:text-navy transition-colors"
            >
              Take the Sleep Quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
