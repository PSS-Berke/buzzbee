import Link from 'next/link';
import {
  Star,
  Phone,
  MessageSquare,
  ExternalLink,
  GraduationCap,
  KeyRound,
  BedDouble,
  Truck,
  Store,
  CalendarCheck,
  ArrowRight,
} from 'lucide-react';
import { elmhurstStore, formatAddress } from '@/data/store';
import GrabAndGoBuy from '@/components/grab-and-go/GrabAndGoBuy';

// Who it is for. Richard's examples from the Oct 26 call were a kid heading off
// to college and someone renting a place for a year.
const moments = [
  {
    icon: GraduationCap,
    title: 'Heading off to school',
    body: 'A real mattress for the first apartment, sorted before move-in day.',
  },
  {
    icon: KeyRound,
    title: 'Renting for a year',
    body: 'Sleep well on a short lease without a big spend.',
  },
  {
    icon: BedDouble,
    title: 'Guest room or just moved',
    body: 'Something far better than the air mattress, ready this week.',
  },
];

const ways = [
  {
    icon: CalendarCheck,
    title: 'Try it first',
    timing: 'Your time',
    body: 'Book a visit and lie on it at the showroom before you decide.',
    cta: { label: 'Book a visit', href: '/book-a-fitting' },
  },
  {
    icon: Store,
    title: 'Pick it up',
    timing: '72 hours',
    body: 'Order online and it is waiting at our Elmhurst showroom three days later.',
    cta: { label: 'Order for pickup', href: '#buy' },
  },
  {
    icon: Truck,
    title: 'Have it delivered',
    timing: '96 hours',
    body: 'Order online and we bring it to your door within four days. Delivery is free.',
    cta: { label: 'Order for delivery', href: '#buy' },
  },
];

export default function GrabAndGoPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* ── Hero + buy box. On a phone: headline, then the buy box, then the rest. ── */}
      <section id="top" className="relative bg-navy text-white overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 md:pt-20 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-6 lg:gap-x-14 lg:gap-y-8 items-start">
            <div className="lg:col-start-1 lg:row-start-1 lg:pt-6">
              <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-2 text-sm text-gold-light mb-4">
                <Star className="w-4 h-4 fill-gold text-gold" aria-hidden="true" />
                <span>Our online special</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-3">
                Grab and Go. <span className="text-gold">$599.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-5">
                A Busby mattress made in Wisconsin, ready this week. Only online.
              </p>

              {/* The speed is the point, so the hours get top billing. */}
              <dl className="grid grid-cols-2 gap-3 max-w-md">
                <div className="rounded-xl bg-white/10 px-4 py-3">
                  <dt className="text-xs uppercase tracking-wide text-gray-300">Store pickup</dt>
                  <dd className="font-serif text-3xl text-gold">
                    72<span className="text-lg"> hrs</span>
                  </dd>
                </div>
                <div className="rounded-xl bg-white/10 px-4 py-3">
                  <dt className="text-xs uppercase tracking-wide text-gray-300">Free delivery</dt>
                  <dd className="font-serif text-3xl text-gold">
                    96<span className="text-lg"> hrs</span>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Supporting detail. Below the buy box on a phone. */}
            <div className="lg:col-start-1 lg:row-start-2 order-last lg:order-none">
              <p className="text-gray-300 leading-relaxed mb-5 max-w-md">
                Made in Wisconsin and backed by the same local team and Elmhurst showroom as
                every Busby bed. Just quicker, and simpler.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 text-sm">
                <a
                  href={`tel:${elmhurstStore.phoneE164}`}
                  className="inline-flex items-center gap-2 py-2 text-gold-light hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Questions? {elmhurstStore.phone}
                </a>
                <a
                  href={`sms:${elmhurstStore.phoneE164}`}
                  className="inline-flex items-center gap-2 py-2 text-gold-light hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  Or text us
                </a>
              </div>
            </div>

            <div id="buy" className="scroll-mt-24 lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <GrabAndGoBuy />
            </div>
          </div>
        </div>
      </section>

      {/* ── Who it is for ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-navy mb-3 text-center">
            For when you need a good bed now
          </h2>
          <p className="text-gray-600 text-center max-w-xl mx-auto mb-10 leading-relaxed">
            No weeks of waiting and no sales floor. Order it, and sleep on it this week.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moments.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.title} className="bg-white rounded-2xl p-7 border-2 border-gold/15 shadow-sm">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy mb-4">
                    <Icon className="w-5 h-5 text-gold" aria-hidden="true" />
                  </span>
                  <p className="font-semibold text-navy mb-2">{m.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{m.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Three ways to get it ── */}
      <section className="py-16 bg-white border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-navy mb-10 text-center">
            Three ways to get yours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ways.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="flex flex-col bg-[#faf8f5] rounded-2xl p-7 border-2 border-gold/15"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-6 h-6 text-gold-dark" aria-hidden="true" />
                    <span className="font-serif text-xl text-navy">{w.timing}</span>
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{w.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{w.body}</p>
                  <Link
                    href={w.cta.href}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 text-gold-dark font-semibold hover:text-navy transition-colors"
                  >
                    {w.cta.label}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Where + final CTA ── */}
      <section className="py-16 border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-navy mb-3">Pickup in Elmhurst</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">
              {formatAddress(elmhurstStore.address)}. Free parking right outside, easy from anywhere
              in the western suburbs. We reach out to set your pickup time once it is ready.
            </p>
            <a
              href={elmhurstStore.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold-dark font-semibold hover:text-navy transition-colors mb-6"
            >
              Get directions
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <div>
              <a
                href="#buy"
                className="inline-flex items-center gap-2 bg-navy text-white font-semibold rounded-full px-8 py-4 hover:bg-navy/90 transition-colors"
              >
                Grab mine for $599
              </a>
            </div>
          </div>

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
        </div>
      </section>
    </div>
  );
}
