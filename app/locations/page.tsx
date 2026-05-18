import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { allLocations, formatAddress } from '@/data/store';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Visit a Busby Showroom',
  description:
    'Try every Busby mattress in person. Now open in Elmhurst, with more cities coming soon.',
  alternates: { canonical: '/locations' },
  openGraph: {
    title: 'Visit a Busby Showroom',
    description: 'Try every Busby mattress in person. Now open in Elmhurst.',
    url: `${SITE_URL}/locations`,
    type: 'website',
  },
};

export default function LocationsIndex() {
  return (
    <div className="min-h-screen bg-[#faf8f5] linen-texture">
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-gold mb-4">
            BUSBY SHOWROOMS
          </span>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-4">
            Try every Busby in person.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            One showroom open today, more on the way. Every model on the floor, no commission, same online prices.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {allLocations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group bg-white rounded-2xl p-7 border-2 border-gold/15 shadow-sm hover:shadow-md hover:border-gold/40 transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-gold-dark mb-3">
                <span className="w-2 h-2 bg-gold rounded-full" />
                NOW OPEN
              </div>
              <h2 className="text-2xl font-serif text-navy mb-4">{loc.name}</h2>
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>{formatAddress(loc.address)}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>{loc.hours}</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark group-hover:text-gold transition-colors">
                Visit the showroom
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}

          <div className="bg-white/40 rounded-2xl p-7 border-2 border-dashed border-gold/30 flex items-center justify-center text-center">
            <div>
              <p className="text-sm font-semibold text-gold-dark mb-2 tracking-widest">COMING SOON</p>
              <p className="text-gray-600">More Busby showrooms on the way.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
