import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { accessoryProducts, adjustableBaseProducts, mattressTopper } from '@/data/products';

export const metadata = {
  title: 'Shop Sleep Accessories | Busby',
  description:
    'Complete your sleep setup with Busby sleep accessories — a plush mattress topper, certified mattress protection, and BedTech adjustable bases, chosen to keep your mattress performing its best.',
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
      <section className="pt-12 pb-16 relative overflow-hidden z-10">
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
            Every great mattress deserves great protection and the right foundation. Busby accessories are held to the same standard as our mattresses.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-600">
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
              <div className="grid lg:grid-cols-2 lg:min-h-[500px]">
                {/* Image Side */}
                <div className="relative overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-0 bg-[#f5f2ee]">
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
                  <p className="text-xl text-gray-600 mb-6 italic">{encasement.tagline}</p>

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

      {/* Mattress Topper */}
      {mattressTopper && (
        <section className="py-16 relative overflow-hidden z-10" aria-labelledby="topper-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={`/products/${mattressTopper.slug}`}
              className="group block relative bg-white border-2 border-gold/30 rounded-3xl overflow-hidden shadow-xl shadow-gold/5 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500"
            >
              <div className="grid lg:grid-cols-2 lg:min-h-[500px]">
                {/* Image Side (right on desktop, mirrors the encasement card) */}
                <div className="relative overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-0 bg-[#f5f2ee] lg:order-2">
                  <Image
                    src={mattressTopper.images[0]}
                    alt={mattressTopper.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content Side */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <span className="text-gold-dark font-medium text-sm mb-4">New Accessory</span>
                  <h2 id="topper-heading" className="text-3xl lg:text-4xl font-serif text-navy mb-2">
                    {mattressTopper.name}
                  </h2>
                  <p className="text-xl text-gray-600 mb-6 italic">{mattressTopper.tagline}</p>

                  <ul className="space-y-2.5 mb-8">
                    {mattressTopper.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-gold/15 rounded-full flex items-center justify-center shrink-0">
                          <Sparkles className="w-3 h-3 text-gold-dark" aria-hidden="true" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl text-navy">${mattressTopper.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-600">any size</span>
                  </div>

                  <div className="inline-flex items-center gap-3 text-gold-dark group-hover:gap-5 transition-all duration-500">
                    <span className="font-medium">Shop the Topper</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Adjustable Bases — BedTech partnership */}
      {adjustableBaseProducts.length > 0 && (
        <section className="py-16 relative z-10" aria-labelledby="adjustable-bases-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-gold-dark font-medium text-sm">Adjustable Bases</span>
                <span className="w-1 h-1 bg-gold rounded-full" aria-hidden="true" />
                <span className="text-sm text-gray-600">In partnership with</span>
                <Image
                  src="/images/partners/bedtech-logo.png"
                  alt="BedTech"
                  width={640}
                  height={120}
                  className="h-5 w-auto"
                />
              </div>
              <h2 id="adjustable-bases-heading" className="text-3xl md:text-4xl font-serif text-navy mb-4">
                Raise Your <span className="wavy-underline">Comfort</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Lift your head to read, raise your feet to unwind, and find your perfect position. We&apos;ve
                partnered with BedTech to bring two of their adjustable bases to Busby.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {adjustableBaseProducts.map((base) => (
                <Link
                  key={base.id}
                  href={`/products/${base.slug}`}
                  className="group flex flex-col bg-white border-2 border-gold/20 rounded-3xl overflow-hidden shadow-lg shadow-gold/5 hover:border-gold/40 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f2ee]">
                    <Image
                      src={base.images[0]}
                      alt={base.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-8 md:p-10">
                    <h3 className="text-2xl lg:text-3xl font-serif text-navy mb-2">{base.name}</h3>
                    <p className="text-gray-600 mb-6 italic">{base.tagline}</p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                      {base.features.slice(0, 6).map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 shrink-0" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center justify-between gap-4">
                      <span className="text-2xl text-navy">From ${base.price.toLocaleString()}</span>
                      <span className="inline-flex items-center gap-3 text-gold-dark group-hover:gap-5 transition-all duration-500">
                        <span className="font-medium">Shop the {base.name.replace('BedTech ', '').replace(' Adjustable Base', '')}</span>
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
              <p className="text-gray-600 text-sm">
                Two lines of premium comfort, built and shipped from the USA.
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
