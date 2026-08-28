import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CalendarCheck,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { SITE_URL } from '@/lib/site';
import { elmhurstStore, formatAddress } from '@/data/store';
import ReserveForm from '@/components/locations/ReserveForm';

export const metadata: Metadata = {
  title: 'Book a Free Mattress Fitting | Busby Elmhurst Showroom',
  description:
    'Try every Busby mattress in private at our Elmhurst showroom. Visits are by appointment — pick a time online and a Sleep Guide meets you at the door.',
  alternates: { canonical: '/appointment' },
  openGraph: {
    title: 'Book a Free Mattress Fitting | Busby Elmhurst Showroom',
    description:
      'Try every Busby mattress in private at our Elmhurst showroom. Visits are by appointment.',
    url: `${SITE_URL}/appointment`,
    type: 'website',
  },
};

const benefits = [
  {
    title: 'The whole showroom to yourself',
    body: 'No other customers, no floor staff circling. A Sleep Guide meets you at the door and the place is yours.',
  },
  {
    title: 'Nobody hovering, nobody selling',
    body: 'Your guide is there to help you choose, not to close you. Same prices as online whether you buy that day or not.',
  },
  {
    title: 'Matched before you arrive',
    body: 'Tell us how you like to sleep and what you are replacing, and we will have the right models ready to try.',
  },
  {
    title: 'Free either way',
    body: 'Same 100-night home trial, same 10-year warranty. The fitting costs nothing and there is no obligation.',
  },
];

export default function AppointmentPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4" aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-2 text-sm text-gold-light mb-6">
            <CalendarCheck className="w-4 h-4" />
            <span>Free Mattress Fitting</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-4">
            Book a Free <span className="text-gold">Mattress Fitting</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Our Elmhurst showroom is by appointment. Pick a time and a Sleep Guide meets you at the
            door, then you have the whole place to yourself to try every bed we make.
          </p>

          {/* Primary path: book online */}
          <div className="mt-8">
            <a
              href="#book"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold rounded-full px-8 py-4 text-lg hover:bg-gold-light transition-colors"
            >
              <CalendarCheck className="w-5 h-5" />
              Book an appointment
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-sm text-gray-400 mt-3">
              Takes about a minute. Instant confirmation by email.
            </p>
          </div>
        </div>
      </section>

      {/* Booking form + map — side by side */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left half: pick a time */}
          <div id="book" className="scroll-mt-28">
            <h2 className="text-2xl md:text-3xl font-serif text-navy mb-2">Pick a time</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">
              Come to the showroom and try every bed, or start with fifteen minutes on video if
              you&rsquo;d rather not make the drive yet. Either way you&rsquo;ll get a confirmation
              by email straight away, and a reminder before your time.
            </p>
            <ReserveForm />
          </div>

          {/* Right half: where to find us */}
          <div className="lg:sticky lg:top-28">
            <h2 className="text-2xl md:text-3xl font-serif text-navy mb-2">Where to find us</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">
              {elmhurstStore.name} — free on-site parking, easy to reach from Chicagoland.
            </p>

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

            <div className="mt-6 bg-white rounded-2xl p-6 border-2 border-gold/15 shadow-sm space-y-4">
              <p className="font-semibold text-navy">{elmhurstStore.name}</p>
              <div className="space-y-3 text-sm">
                <a
                  href={elmhurstStore.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-600 hover:text-gold-dark transition-colors"
                >
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    {formatAddress(elmhurstStore.address)}
                    <span className="sr-only"> (opens Google Maps in a new tab)</span>
                  </span>
                </a>
                <div className="flex items-start gap-3 text-gray-600">
                  <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>{elmhurstStore.hours}</span>
                </div>
                <a
                  href={`tel:${elmhurstStore.phoneE164}`}
                  className="flex items-start gap-3 text-gray-600 hover:text-gold-dark transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>{elmhurstStore.phone}</span>
                </a>
              </div>
              <a
                href={elmhurstStore.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark hover:text-navy transition-colors"
              >
                Get directions
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What a fitting gets you */}
      <section className="py-16 bg-white border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-navy mb-8 text-center">
            What a fitting gets you
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-[#faf8f5] rounded-2xl p-6 border-2 border-gold/15"
              >
                <CheckCircle className="w-6 h-6 text-gold mb-3" />
                <p className="font-semibold text-navy mb-1.5">{b.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 border-t border-gold/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-navy/5 rounded-full px-4 py-2 text-sm text-navy mb-5">
            <CalendarCheck className="w-4 h-4 text-gold-dark" />
            <span>Free, no obligation</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-navy mb-3">
            Ready to try them in person?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Pick a time that suits you and we&rsquo;ll have a Sleep Guide waiting. Questions first?
            Give us a call at {elmhurstStore.phone}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#book"
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold rounded-full px-7 py-3.5 hover:bg-navy/90 transition-colors"
            >
              <CalendarCheck className="w-5 h-5" />
              Book an appointment
            </a>
            <Link
              href={`/locations/${elmhurstStore.slug}`}
              className="inline-flex items-center gap-2 text-gold-dark font-semibold hover:text-navy transition-colors"
            >
              See showroom details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
