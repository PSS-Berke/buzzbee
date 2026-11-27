import type { ReactNode } from 'react';
import { CheckCircle, ExternalLink, MapPin, MessageSquare, Phone } from 'lucide-react';
import { elmhurstStore, formatAddress } from '@/data/store';
import ReserveForm from '@/components/locations/ReserveForm';
import BookingPageView from '@/components/booking/BookingPageView';
import type { BookingOffer } from '@/lib/consult';

/**
 * Shared layout for the booking landing pages that Google search ads point at
 * (/sale-booking, /elmhurst-booking, /studio-go-booking). The offer and the
 * booking form share the first screen: on a phone the headline comes first and
 * the form straight after it; on desktop the form sits beside the headline.
 * Everything below the form is reassurance, not the ask.
 */
export interface BookingLandingProps {
  offer: BookingOffer;
  badge: { icon?: ReactNode; label: string };
  title: ReactNode;
  intro: ReactNode;
  /** Two or three big-number tiles under the headline. */
  highlights: { value: string; label: string }[];
  formTitle: string;
  formNote: string;
  /** Optional line under the form, e.g. a link for people who would rather not book. */
  afterForm?: ReactNode;
  reasonsTitle: string;
  reasons: { title: string; body: string }[];
  finePrint?: string;
}

export default function BookingLanding({
  offer,
  badge,
  title,
  intro,
  highlights,
  formTitle,
  formNote,
  afterForm,
  reasonsTitle,
  reasons,
  finePrint,
}: BookingLandingProps) {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <BookingPageView offer={offer} />

      {/* ── Offer + form. The form is on the first screen on every size. ── */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4"
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 md:pt-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-6 lg:gap-x-14 lg:gap-y-8 items-start">
            {/* Headline: first on every screen size. Kept short so the form is close behind on a phone. */}
            <div className="lg:col-start-1 lg:row-start-1 lg:pt-6">
              <div className="inline-flex items-center gap-2 bg-gold text-navy rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wider mb-4">
                {badge.icon}
                <span>{badge.label}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-3">
                {title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                {intro}
              </p>
            </div>

            {/* Proof. Below the form on a phone. */}
            <div className="lg:col-start-1 lg:row-start-2 order-last lg:order-none">
              <dl className="grid grid-cols-3 gap-3 max-w-lg mb-6">
                {highlights.map((h) => (
                  // dt before dd for screen readers; flex-col-reverse shows the number on top.
                  <div key={h.label} className="flex flex-col-reverse rounded-xl bg-white/10 px-3 py-3">
                    <dt className="text-xs text-gray-300 mt-1 leading-snug">{h.label}</dt>
                    <dd className="font-serif text-2xl sm:text-3xl text-gold leading-tight">
                      {h.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col sm:flex-row gap-3 text-sm">
                <a
                  href={`tel:${elmhurstStore.phoneE164}`}
                  className="inline-flex items-center gap-2 py-2 text-gold-light hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Rather call? {elmhurstStore.phone}
                </a>
                <a
                  href={`sms:${elmhurstStore.phoneE164}`}
                  className="inline-flex items-center gap-2 py-2 text-gold-light hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  Or text us
                </a>
              </div>
              {finePrint && <p className="text-xs text-gray-400 mt-4 max-w-lg">{finePrint}</p>}
            </div>

            {/* The form: second on a phone, right-hand column on desktop. */}
            <div id="book" className="scroll-mt-24 lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-serif text-white mb-1">{formTitle}</h2>
                <p className="text-gray-400">{formNote}</p>
              </div>
              <ReserveForm variant={offer} />
              {afterForm && <div className="mt-4 text-sm text-gray-300">{afterForm}</div>}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why come in ── */}
      <section className="py-16 bg-white border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-navy mb-10 text-center">
            {reasonsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="bg-[#faf8f5] rounded-2xl p-6 border-2 border-gold/15">
                <CheckCircle className="w-6 h-6 text-gold mb-3" aria-hidden="true" />
                <p className="font-semibold text-navy mb-1.5">{r.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where + back to the form ── */}
      <section className="py-16 border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-navy mb-3">Where to find us</h2>
            <p className="flex items-start gap-2 text-gray-600 mb-2 leading-relaxed">
              <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                {elmhurstStore.name}, {formatAddress(elmhurstStore.address)}
              </span>
            </p>
            <p className="text-gray-600 text-sm mb-5">{elmhurstStore.parking}</p>
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
                href="#book"
                className="inline-flex items-center gap-2 bg-navy text-white font-semibold rounded-full px-8 py-4 hover:bg-navy/90 transition-colors"
              >
                Pick my time
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
