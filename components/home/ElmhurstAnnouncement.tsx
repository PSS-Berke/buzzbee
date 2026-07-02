'use client';

import Link from 'next/link';
import { MapPin, Clock, Phone, ArrowRight, CalendarCheck } from 'lucide-react';
import { elmhurstStore, formatAddress } from '@/data/store';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const eyebrowByPhase: Record<typeof elmhurstStore.launchPhase, string> = {
  'coming-soon': 'COMING SOON',
  'opening-on-date': 'OPENING SOON IN ELMHURST',
  'now-open': 'NOW OPEN IN ELMHURST',
  'steady-state': 'VISIT US IN ELMHURST',
};

export default function ElmhurstAnnouncement() {
  const handleCta = (cta: 'visit' | 'reserve') => {
    window.gtag?.('event', 'home_store_section_click', { cta });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gold/10">
          <div className="grid lg:grid-cols-2">
            {/* Map — embedded Google listing for the Elmhurst showroom.
                Rendered after the content in tab order (visual position kept via lg:order). */}
            <div className="relative aspect-[4/3] lg:aspect-auto bg-white lg:order-2">
              <iframe
                src={elmhurstStore.mapsEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing ${elmhurstStore.name} at ${formatAddress(elmhurstStore.address)}`}
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              <a
                href={elmhurstStore.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white text-navy text-xs font-semibold px-3 py-2 rounded-full shadow-lg hover:bg-gold hover:text-navy transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                Open in Maps
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 lg:order-1">
              <span className="inline-block text-xs font-semibold tracking-widest text-gold-dark mb-3">
                {eyebrowByPhase[elmhurstStore.launchPhase]}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4 leading-tight">
                A showroom that&rsquo;s open whenever you are.
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Every Busby model, side by side, 24/7. No salespeople, no pressure — just an
                in-store kiosk to walk you through each bed at your own pace. Want a one-on-one?
                Book a Sleep Consultation and we&rsquo;ll meet you there.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Location</p>
                    <a
                      href={elmhurstStore.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gold-dark transition-colors"
                    >
                      {formatAddress(elmhurstStore.address)}
                      <span className="sr-only"> (opens Google Maps in a new tab)</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Hours</p>
                    <p className="text-gray-600">{elmhurstStore.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Phone</p>
                    <a
                      href={`tel:${elmhurstStore.phoneE164}`}
                      className="text-gold-dark hover:text-navy transition-colors"
                    >
                      {elmhurstStore.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/locations/${elmhurstStore.slug}`}
                  onClick={() => handleCta('visit')}
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy font-semibold px-7 py-3.5 rounded-full transition-colors"
                >
                  Visit the Showroom
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/appointment"
                  onClick={() => handleCta('reserve')}
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:border-navy hover:text-navy font-semibold px-7 py-3.5 rounded-full transition-colors"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
