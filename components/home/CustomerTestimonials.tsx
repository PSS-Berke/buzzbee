'use client';

import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { homeTestimonials } from '@/data/testimonials';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CustomerTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-testimonial-position]'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const position = entry.target.getAttribute('data-testimonial-position');
            window.gtag?.('event', 'home_testimonial_view', { position });
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: [0.5] }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-24 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest text-gold-dark mb-3">
            WHAT BUSBY OWNERS SAY
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">Real sleep, real reviews.</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            No paid placements, no edited highlights. Just verified Busby owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeTestimonials.map((t, i) => (
            <article
              key={i}
              data-testimonial-position={i}
              className="bg-white rounded-2xl p-7 border-2 border-gold/15 shadow-sm flex flex-col"
            >
              <Quote className="w-7 h-7 text-gold mb-4" />
              <p className="text-gray-700 leading-relaxed mb-6 flex-1">{t.quote}</p>
              <footer className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-11 h-11 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-serif text-lg">B</span>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-navy">
                    {t.name}
                    {t.isPlaceholder && (
                      <span className="ml-1 text-[10px] uppercase tracking-wider text-gold-dark/70">
                        Placeholder
                      </span>
                    )}
                  </p>
                  <p className="text-gray-500">
                    {t.city} · {t.sleepStyle} · {t.product}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
