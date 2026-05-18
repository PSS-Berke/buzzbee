'use client';

import { MapPin, Car, Train, Accessibility, ExternalLink } from 'lucide-react';
import { elmhurstStore, formatAddress } from '@/data/store';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GettingHere() {
  const handleDirections = () => {
    window.gtag?.('event', 'store_directions_click');
  };

  return (
    <section className="py-20 md:py-24 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">How to find us</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gold/15 shadow-sm bg-gray-100">
            <iframe
              src={elmhurstStore.mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${elmhurstStore.name}`}
              allowFullScreen
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-gold/15 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-navy mb-1">Address</p>
                  <p className="text-gray-600 mb-3">{formatAddress(elmhurstStore.address)}</p>
                  <a
                    href={elmhurstStore.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDirections}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark hover:text-gold transition-colors"
                  >
                    Get directions
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gold/15 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                  <Car className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">Parking</p>
                  <p className="text-gray-600">{elmhurstStore.parking}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gold/15 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                  <Train className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">Public transit</p>
                  <p className="text-gray-600">{elmhurstStore.transit}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gold/15 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                  <Accessibility className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">Accessibility</p>
                  <p className="text-gray-600">{elmhurstStore.accessibility}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
