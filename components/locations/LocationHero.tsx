import Link from 'next/link';
import { MapPin, Clock, Phone, CalendarCheck } from 'lucide-react';
import { elmhurstStore, formatAddress } from '@/data/store';

export default function LocationHero() {
  const eyebrowByPhase: Record<typeof elmhurstStore.launchPhase, string> = {
    'coming-soon': 'COMING SOON',
    'opening-on-date': 'OPENING SOON',
    'now-open': 'NOW OPEN',
    'steady-state': 'VISIT US',
  };

  return (
    <section className="relative bg-navy text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-2 text-sm text-gold mb-6">
          {eyebrowByPhase[elmhurstStore.launchPhase]}
        </div>

        <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-4">
          A showroom that&rsquo;s <span className="text-gold">always open</span>.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-12">
          Try every Busby mattress, 24/7. No salespeople, no pressure — just an in-store kiosk.
          Want expert help? Book a Sleep Consultation.
        </p>

        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gold/20 shadow-2xl shadow-navy/50 mb-10 bg-white">
          <iframe
            src={elmhurstStore.mapsEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map showing ${elmhurstStore.name} at ${formatAddress(elmhurstStore.address)}`}
            allowFullScreen
          />
          <a
            href={elmhurstStore.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white text-navy text-xs font-semibold px-3 py-2 rounded-full shadow-lg hover:bg-gold hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            Open in Maps
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Address</p>
              <a
                href={elmhurstStore.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-gold transition-colors"
              >
                {formatAddress(elmhurstStore.address)}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Hours</p>
              <p className="text-sm text-white">{elmhurstStore.hours}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Phone</p>
              <a
                href={`tel:${elmhurstStore.phoneE164}`}
                className="text-sm text-white hover:text-gold transition-colors"
              >
                {elmhurstStore.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CalendarCheck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Visits</p>
              <p className="text-sm text-white">
                Walk-ins welcome ·{' '}
                <Link href="/appointment" className="text-gold hover:underline">
                  Book a visit
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
