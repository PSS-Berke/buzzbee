'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { showroomFaqs as faqs } from '@/data/showroomFaqs';

export default function LocationFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-navy">Showroom FAQ</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border-2 border-gold/15 rounded-2xl overflow-hidden bg-white">
              <h3>
                <button
                  type="button"
                  id={`showroom-faq-button-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`showroom-faq-panel-${i}`}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-navy">{f.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-dark flex-shrink-0 transition-transform ${
                      open === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </h3>
              {open === i && (
                <div
                  id={`showroom-faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`showroom-faq-button-${i}`}
                  className="px-5 pb-5 text-gray-600 leading-relaxed"
                >
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
