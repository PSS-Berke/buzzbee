import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:py-24">
      {/* Organic blob shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/15 blob-shape blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 text-sm text-navy">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span>Proudly Made in the USA</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-navy">
              Built for How You{' '}
              <span className="wavy-underline">Actually Sleep.</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
              We believe better sleep changes everything — your energy, your health, your
              focus, your life. 25+ years of expertise, handcrafted in America, delivered
              directly to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/home-line"
                className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
              >
                Shop Mattresses
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-navy/20 hover:border-gold text-navy font-semibold px-8 py-4 rounded-full transition-all"
              >
                Take the Sleep Quiz
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square bg-white/80 border-2 border-gold/20 rounded-3xl p-8 flex items-center justify-center shadow-xl shadow-gold/5">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <video
                  src="/Videos/Untitled design (4).mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg shadow-gold/10 p-4 hidden md:block border border-gold/10">
              <p className="text-sm font-semibold text-navy">Financing Available</p>
              <p className="text-xs text-gray-500">Flexible payment options</p>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg shadow-gold/10 p-4 hidden md:block border border-gold/10">
              <p className="text-sm font-semibold text-navy">10 Year Warranty</p>
              <p className="text-xs text-gray-500">Built to last</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
