import Image from 'next/image';
import { CalendarCheck, CheckCircle, MapPin, Phone, ArrowRight } from 'lucide-react';
import { elmhurstStore, formatAddress } from '@/data/store';
import ReserveForm from '@/components/locations/ReserveForm';
import BookingPageView from '@/components/booking/BookingPageView';

// Senior Booking: landing page for the senior discount ads. Bookings made here
// are saved with source `senior-booking` and tagged on /appointment/confirmed,
// so they count separately from every other booking.

const perks = [
  {
    title: 'The showroom to yourself',
    body: 'A Sleep Guide meets you at the door. No crowd, no rush, and nobody else on the floor.',
  },
  {
    title: 'Take all the time you need',
    body: 'Lie down on every bed you like. Bring a son, a daughter or a friend for a second opinion.',
  },
  {
    title: 'Easy to get to',
    body: 'Free parking right outside the door, on North Avenue in Elmhurst.',
  },
  {
    title: 'No pressure to buy',
    body: 'The visit is free and there is no obligation to buy.',
  },
];

export default function SeniorBookingPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <BookingPageView offer="senior" />

      {/* Hero: the $300 first */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[420px] h-[420px] bg-gold/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4"
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-14 md:pt-20 md:pb-20 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-gold text-navy rounded-full px-5 py-2 text-base font-bold uppercase tracking-wider mb-6">
              Senior Discount
            </div>
            <h1 className="font-serif leading-[1.05]">
              <span className="block text-gold text-7xl md:text-8xl">$300 off</span>
              <span className="block text-3xl md:text-5xl mt-3">applied to your order.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mt-6">
              Book your visit on this page and an extra $300 off any showroom bed is saved to your
              booking. It comes on top of 30% off every showroom bed through December 31.
            </p>
            <div className="mt-8">
              <a
                href="#book"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold rounded-full px-8 py-4 text-lg hover:bg-gold-light transition-colors"
              >
                <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                Book my visit with $300 off
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <p className="text-sm text-gray-400 mt-3">
                For guests 65 and older. Takes about a minute.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden border-2 border-gold/30 shadow-2xl">
              <Image
                src="/images/products/Nod/nod-room.png"
                alt="A Busby bed in a calm bedroom setting"
                width={1248}
                height={832}
                priority
                className="w-full h-auto"
              />
            </div>
            {/* The applied-discount "ticket" */}
            <div className="absolute -bottom-6 left-4 right-4 sm:left-8 sm:right-auto bg-[#faf8f5] text-navy rounded-2xl shadow-xl border-2 border-gold px-6 py-4 flex items-center gap-4">
              <CheckCircle className="w-9 h-9 text-gold-dark flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-dark">
                  Applied to your order
                </p>
                <p className="font-serif text-2xl leading-tight">-$300 senior discount</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the savings stack */}
      <section className="pt-16 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border-2 border-gold/20 shadow-sm p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-serif text-navy mb-6 text-center">
              Your savings, together
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center text-center">
              <div className="rounded-2xl bg-[#faf8f5] p-5">
                <p className="text-4xl font-serif text-navy">30% off</p>
                <p className="text-gray-600 text-sm mt-1">every showroom bed through Dec 31</p>
              </div>
              <p className="text-3xl font-serif text-gold-dark" aria-hidden="true">
                +
              </p>
              <div className="rounded-2xl bg-navy text-white p-5">
                <p className="text-4xl font-serif text-gold">$300 off</p>
                <p className="text-gray-300 text-sm mt-1">extra, for guests 65 and older</p>
              </div>
            </div>
            <p className="text-center text-xs text-gray-600 mt-5 leading-relaxed">
              Applies to showroom beds. Studio Go is not included. Offer ends December 31, 2026.
            </p>
          </div>
        </div>
      </section>

      {/* Booking form + where */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div id="book" className="scroll-mt-28">
            <h2 className="text-2xl md:text-3xl font-serif text-navy mb-2">Pick a time</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">
              Choose a day and time for your private visit. You&rsquo;ll get a confirmation by email
              straight away with your $300 senior discount on it, and a reminder before you come.
            </p>
            <ReserveForm variant="senior" />
          </div>

          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-gold/15 shadow-sm space-y-4">
              <h2 className="text-2xl font-serif text-navy">Where to find us</h2>
              <a
                href={elmhurstStore.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-600 hover:text-gold-dark transition-colors"
              >
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {formatAddress(elmhurstStore.address)}
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </span>
              </a>
              <p className="text-gray-600 text-sm">{elmhurstStore.parking}</p>
              <a
                href={`tel:${elmhurstStore.phoneE164}`}
                className="flex items-start gap-3 text-navy font-semibold hover:text-gold-dark transition-colors"
              >
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Rather book by phone? Call {elmhurstStore.phone}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((p) => (
                <div key={p.title} className="bg-[#faf8f5] rounded-2xl p-5 border-2 border-gold/15">
                  <CheckCircle className="w-5 h-5 text-gold mb-2" aria-hidden="true" />
                  <p className="font-semibold text-navy mb-1">{p.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
