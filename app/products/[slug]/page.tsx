import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getProductBySlug, getAllProductSlugs, products, homeLineProducts } from '@/data/products';
import ImageGallery from '@/components/product/ImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import FitsAnyBed from '@/components/product/FitsAnyBed';
import FitsAnyCrib from '@/components/product/FitsAnyCrib';
import FAKMission from '@/components/product/FAKMission';
import LayerSwitcher from '@/components/home/LayerSwitcher';
import { Check } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Sleep6',
    };
  }

  return {
    title: `${product.name} | American-Made ${product.type} Mattress | Sleep6`,
    description: product.description,
    keywords: [
      product.name,
      `${product.type} mattress`,
      'American made mattress',
      'USA mattress',
      ...product.bestFor,
    ],
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products from the same line (excluding current product)
  const productPool = product.brand === 'sleep6-home' ? homeLineProducts : products;
  const relatedProducts = productPool
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      ...p,
      keyBenefit:
        p.slug === 'cosmos-hybrid'
          ? 'Zero Motion Transfer'
          : p.slug === 'fak-cosmos'
            ? 'Temperature Regulation'
            : p.slug === 'mystic'
              ? 'Motion Isolation'
              : 'Essential Comfort',
    }));

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

      {/* Main product section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20">
          {/* Image gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Tabs section */}
        <ProductTabs product={product} />

        {/* Fits any bed / crib section */}
        {slug === 'nest' ? <FitsAnyCrib /> : <FitsAnyBed />}
      </section>

      {/* FAK Cosmos charity mission */}
      {slug === 'fak-cosmos' && <FAKMission />}

      <LayerSwitcher slug={slug} />

      {/* Customer Satisfaction Guarantee */}
      <section className="py-16 bg-[#faf8f5] relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gold/10 rounded-3xl p-8 border-2 border-gold/20">
            <h4 className="font-semibold text-navy text-center text-xl mb-4">
              Customer Satisfaction Guarantee
            </h4>
            <p className="text-gray-600 text-center mb-6 max-w-xl mx-auto">
              We stand behind our products. If you&apos;re not completely satisfied, we&apos;ll help you find the right solution.
            </p>
            <ul className="max-w-md mx-auto space-y-3">
              {[
                '100% fiberglass-free construction',
                '10-year warranty',
                'Ships to all 50 states',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 bg-gold/20 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-gold" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related products section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Editorial header */}
          <div className="text-center mb-16">
            <span className="inline-block text-gold-dark font-medium text-sm mb-4">
              Complete Your Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-navy">
              You May Also <span className="wavy-underline">Appreciate</span>
            </h2>
          </div>

          {/* Related product cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.slug}`}
                className="group relative bg-white/80 rounded-3xl overflow-hidden border-2 border-transparent hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {relatedProduct.images[0] ? (
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <span className="text-gray-300 text-sm">Image Coming Soon</span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />

                  {/* Type badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white text-gold-dark text-xs font-medium rounded-full shadow-sm">
                      {relatedProduct.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy mb-2 group-hover:text-gold-dark transition-colors duration-300">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {relatedProduct.tagline}
                  </p>

                  {/* Key benefit */}
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                    <span>{relatedProduct.keyBenefit}</span>
                  </div>

                  {/* Price and arrow */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-navy">
                      From ${relatedProduct.price.toLocaleString()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
