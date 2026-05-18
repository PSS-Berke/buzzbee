import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarCheck, Clock, MapPin, Phone, DoorOpen, ArrowRight, CheckCircle } from 'lucide-react';
import { SITE_URL } from '@/lib/site';
import { elmhurstStore, formatAddress } from '@/data/store';
import ReserveForm from '@/components/locations/ReserveForm';

export const metadata: Metadata = {
  title: 'Book a Sleep Consultation | Busby Elmhurst Showroom',
  description:
    'Schedule one-on-one time with a Sleep Guide at the Busby Elmhurst showroom. The store is open 24/7 self-serve — book a consultation when you want expert guidance.',
  alternates: { canonical: '/appointment' },
  openGraph: {
    title: 'Book a Sleep Consultation | Busby Elmhurst Showroom',
    description:
      'Schedule one-on-one time with a Sleep Guide at the Busby Elmhurst showroom.',
    url: `${SITE_URL}/appointment`,
    type: 'website',
  },
};

const benefits = [
  {
    title: 'A Sleep Guide who actually shows up',
    body: 'The showroom is unstaffed by default. Book a consultation and one of our guides will meet you in person at the time you pick.',
  },
  {
    title: 'Real expertise, no commission',
    body: 'Our Sleep Guides work on salary. They have nothing to gain from steering you to a more expensive bed.',
  },
  {
    title: 'Personalised to your sleep',
    body: 'Tell us how you sleep, what hurts, what you’ve tried — we’ll narrow four mattresses to the one that fits.',
  },
  {
    title: 'No pressure to buy',
    body: 'Same prices as online, same 100-night home trial, same warranty. The consultation is free either way.',
  },
];

export default function AppointmentPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4" aria-hidden="true" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-2 text-sm text-gold mb-6">
            <CalendarCheck className="w-4 h-4" />
            <span>Sleep Consultation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-4">
            Book a <span className="text-gold">Sleep Consultation</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            The Elmhurst showroom is open 24/7 and self-serve. Book a consultation when you want a
            Sleep Guide there in person — to walk you through the models, answer technical
            questions, and help you narrow the choice.
          </p>
        </div>
      </section>

      {/* Form + benefits */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Benefits / store info */}
          <div className="space-y-8 lg:sticky lg:top-32">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-navy mb-5">
                What a consultation gets you
              </h2>
              <ul className="space-y-4">
                {benefits.map((b) => (
                  <li key={b.title} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-navy">{b.title}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{b.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gold/15 shadow-sm space-y-4">
              <p className="font-semibold text-navy">{elmhurstStore.name}</p>
              <div className="space-y-3 text-sm">
                <a
                  href={elmhurstStore.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-600 hover:text-gold-dark transition-colors"
                >
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>{formatAddress(elmhurstStore.address)}</span>
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
            </div>
          </div>

          {/* Form */}
          <div>
            <ReserveForm />
          </div>
        </div>
      </section>

      {/* Walk-in alternative */}
      <section className="py-16 bg-white border-t border-gold/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-navy/5 rounded-full px-4 py-2 text-sm text-navy mb-5">
            <DoorOpen className="w-4 h-4 text-gold-dark" />
            <span>Don&rsquo;t need an expert?</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-navy mb-3">
            Just stop by — the showroom is always open.
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The Elmhurst showroom is unlocked 24/7 and entirely self-serve, with an in-store kiosk
            to walk you through every model. Book a consultation only when you want a guide there
            in person.
          </p>
          <Link
            href={`/locations/${elmhurstStore.slug}`}
            className="inline-flex items-center gap-2 text-gold-dark font-semibold hover:text-gold transition-colors"
          >
            See showroom details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
