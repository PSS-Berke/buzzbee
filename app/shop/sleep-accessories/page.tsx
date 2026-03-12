import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { accessoryProducts } from '@/data/products';

export const metadata = {
  title: 'Shop Sleep Accessories | Busby',
  description:
    'Complete your sleep setup with Busby sleep accessories — certified protectors and more to keep your mattress performing its best.',
  alternates: { canonical: '/shop/sleep-accessories' },
};

const encasement = accessoryProducts.find((p) => p.slug === 'mattress-encasement');

export default function SleepAccessoriesPage() {
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/15 blob-shape blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-gold-dark font-medium text-sm mb-4">
            Sleep Accessories
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy mb-6">
            <span className="wavy-underline">Protect</span> Your Sleep
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every great mattress deserves great protection. Busby accessories are built to the same standard as our mattresses.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
            {[
              'Certified & Lab Tested',
              'Machine Washable',
              'Waterproof Protection',
              'Non-Allergenic',
              'Free Shipping',
            ].map((badge) => (
              <span key={badge} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product — Mattress Encasement */}
      {encasement && (
        <section className="py-16 relative overflow-hidden z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={`/products/${encasement.slug}`}
              className="group block relative bg-white border-2 border-gold/30 rounded-3xl overflow-hidden shadow-xl shadow-gold/5 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500"
            >
              <div className="grid lg:grid-cols-2 min-h-[500px]">
                {/* Image Side */}
                <div className="relative overflow-hidden min-h-[300px] lg:min-h-0 bg-[#f5f2ee]">
                  <Image
                    src={encasement.images[0]}
                    alt={encasement.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>

                {/* Content Side */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <span className="text-gold-dark font-medium text-sm mb-4">
                    Featured Accessory
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-serif text-navy mb-2">
                    {encasement.name}
                  </h2>
                  <p className="text-xl text-gray-500 mb-6 italic">{encasement.tagline}</p>

                  {/* Features list */}
                  <ul className="space-y-2.5 mb-8">
                    {encasement.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-gold/15 rounded-full flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-3 h-3 text-gold-dark" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl text-navy">From ${encasement.sizes[0].price}</span>
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-3 text-gold-dark group-hover:gap-5 transition-all duration-500">
                    <span className="font-medium">Shop the Encasement</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Bottom CTA — link back to mattresses */}
      <section className="py-20 relative overflow-hidden z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/60 rounded-3xl px-8 py-10 border border-gold/20">
            <div>
              <p className="text-xs text-gold-dark font-medium uppercase tracking-wider mb-2">
                Also available
              </p>
              <h3 className="text-2xl font-serif text-navy mb-1">
                Looking for a new mattress?
              </h3>
              <p className="text-gray-500 text-sm">
                Four tiers of premium comfort, built and shipped from the USA.
              </p>
            </div>
            <Link
              href="/shop/mattresses"
              className="shrink-0 inline-flex items-center gap-3 bg-navy hover:bg-navy-light text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 group"
            >
              Shop Mattresses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
