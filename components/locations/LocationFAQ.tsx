'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Wait — is the store really open 24/7?',
    a: 'Yes. The showroom is unlocked and accessible day and night. There’s no staff on site by default, and that’s the point — try the mattresses in peace, on your own schedule, no salesperson over your shoulder.',
  },
  {
    q: 'Then how do I get help if I have questions?',
    a: 'Two ways. The in-store kiosk walks you through every model — what’s inside, who it’s built for, how to try it. For deeper questions, book a Sleep Consultation and one of our Sleep Guides will meet you in store at a scheduled time.',
  },
  {
    q: 'How do I actually buy a mattress at the showroom?',
    a: 'You can order from the kiosk, from your phone in store, or from home after you visit — same prices, same 100-night home trial, same warranty. Nothing is sold off the showroom floor; every Busby is built to order in our USA factory.',
  },
  {
    q: 'Are prices the same as online?',
    a: 'Yes, exactly the same. No "in-store only" deals, no upcharges. The showroom is a place to try, not a place we mark up.',
  },
  {
    q: 'Is it safe? What stops people from messing with the mattresses?',
    a: 'The space is monitored by camera, climate-controlled, and audited daily. We trust people to be respectful — and so far, they have been.',
  },
  {
    q: 'Can I bring my kids?',
    a: 'Please do. The showroom is yours while you’re there.',
  },
  {
    q: 'What if I want to return a mattress I bought online?',
    a: 'You can start a return through support@mybusby.com. The 100-night home trial works the same whether you bought online or after a showroom visit.',
  },
];

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
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-navy">{f.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gold flex-shrink-0 transition-transform ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
