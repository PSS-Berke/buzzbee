'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarCheck, ChevronDown } from 'lucide-react';
import HeroVideo from './HeroVideo';
import QuickBook from './QuickBook';

export default function Hero() {
  const [open, setOpen] = useState(false);
  // QuickBook mounts on first open (that's when it fetches availability) and then
  // stays mounted, so closing animates the real content instead of an empty box.
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (!next) return;
    setMounted(true);
    // Let the panel start expanding and move focus to it. Only scroll on stacked
    // (below lg) layouts, where the hero video pushes the panel off-screen; on
    // desktop it opens in place with no page jump.
    requestAnimationFrame(() => {
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        panelRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }
      document.getElementById('quick-book-heading')?.focus({ preventScroll: true });
    });
  };

  return (
    <section className="relative overflow-clip pt-4 pb-20 md:pt-8 md:pb-24">
      {/* Organic blob shapes */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-gold/15 blob-shape blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 text-sm text-navy">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span>Proudly Made in the USA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-navy">
              Built for How You{' '}
              <span className="wavy-underline">Actually Sleep.</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
              We believe better sleep changes everything — your energy, your health, your
              focus, your life. 25+ years of expertise, handcrafted in America, delivered
              directly to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls="quick-book"
                className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all hover:scale-105"
              >
                <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                Quick Appointment
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-navy/20 hover:border-gold text-navy font-semibold px-8 py-4 rounded-full transition-all"
              >
                Shop Mattresses
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square bg-white/80 border-2 border-gold/20 rounded-3xl p-8 flex items-center justify-center shadow-xl shadow-gold/5">
              <HeroVideo />
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg shadow-gold/10 p-4 hidden md:block border border-gold/10">
              <p className="text-sm font-semibold text-navy">Financing Available</p>
              <p className="text-xs text-gray-600">Flexible payment options</p>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg shadow-gold/10 p-4 hidden md:block border border-gold/10">
              <p className="text-sm font-semibold text-navy">10 Year Warranty</p>
              <p className="text-xs text-gray-600">Built to last</p>
            </div>
          </div>
        </div>

        {/* Quick-book drawer: grid-rows 0fr -> 1fr animates to the content's real
            height, pushing the trust bar down. inert keeps it out of the tab
            order while closed. */}
        <div
          id="quick-book"
          ref={panelRef}
          inert={!open}
          // The wrapper's top edge never moves (spacing lives inside the animated
          // box), so scrollIntoView targets a stable position mid-animation.
          // scroll-mt = sticky header height + a little air - the pt-12 below.
          className={`grid scroll-mt-20 lg:scroll-mt-24 transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-12">{mounted && <QuickBook />}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
