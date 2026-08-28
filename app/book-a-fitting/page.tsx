import {
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle,
  ShieldCheck,
  Moon,
  Car,
  ExternalLink,
} from 'lucide-react';
import { elmhurstStore, formatAddress } from '@/data/store';
import FittingForm from '@/components/fitting/FittingForm';

const trustPoints = [
  { icon: Moon, label: '100-night home trial' },
  { icon: ShieldCheck, label: '10-year warranty' },
  { icon: CheckCircle, label: 'Made in the USA' },
  { icon: Car, label: 'Free parking on site' },
];

const steps = [
  {
    n: '1',
    title: 'Pick your time',
    body: 'Choose a day and a slot. Confirmation and a calendar invite land straight away.',
  },
  {
    n: '2',
    title: 'We get the beds ready',
    body: 'Tell us what you want to try and they are made up and waiting when you arrive.',
  },
  {
    n: '3',
    title: 'The showroom is yours',
    body: 'A Sleep Guide meets you at the door. No other customers, nobody hovering.',
  },
];

const reasons = [
  {
    title: 'You get the place to yourself',
    body: 'We book one visit at a time. No crowds, no salespeople circling while you try to think.',
  },
  {
    title: 'Lie on them properly',
    body: 'Ten minutes a bed, in your own time. That is the only way to tell what actually suits you.',
  },
  {
    title: 'Nobody is closing you',
    body: 'Your guide is there to help you choose. Prices are the same as online whether you buy or not.',
  },
  {
    title: 'Made by us, in the USA',
    body: 'Busby beds are built in our own USA factory, so your guide can tell you what is actually inside them.',
  },
];

export default function BookAFittingPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* ── Hero + form, side by side. Form is above the fold on desktop. ── */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-6 lg:gap-x-14 lg:gap-y-8 items-start">
            {/* Headline. First thing on every screen size. */}
            <div className="lg:col-start-1 lg:row-start-1 lg:pt-6">
              <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-2 text-sm text-gold-light mb-5">
                <MapPin className="w-4 h-4" />
                <span>Elmhurst, IL</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-4">
                Book a Free <span className="text-gold">Mattress Fitting</span>.
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                Our Elmhurst showroom is by appointment, so when you come the whole place is yours.
                Try every bed we make with nobody hovering and no pressure to buy.
              </p>
            </div>

            {/* Proof. Below the form on a phone — it is reassurance, not the ask. */}
            <div className="lg:col-start-1 lg:row-start-2 order-last lg:order-none">
              <ul className="space-y-3 mb-8">
                {trustPoints.map((t) => {
                  const Icon = t.icon;
                  return (
                    <li key={t.label} className="flex items-center gap-3 text-gray-200">
                      <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-gold" />
                      </span>
                      <span className="text-base">{t.label}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 text-sm">
                <a
                  href={`tel:${elmhurstStore.phoneE164}`}
                  className="inline-flex items-center gap-2 py-2 text-gold-light hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Prefer to call? {elmhurstStore.phone}
                </a>
                <a
                  href={`sms:${elmhurstStore.phoneE164}`}
                  className="inline-flex items-center gap-2 py-2 text-gold-light hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Or text us
                </a>
              </div>
            </div>

            {/* The form. Second on a phone, right-hand column on desktop. */}
            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="mb-4">
                <p className="text-2xl md:text-3xl font-serif text-white mb-1">
                  Request your fitting
                </p>
                <p className="text-gray-400">
                  Takes about a minute. Pick your time and it&rsquo;s confirmed.
                </p>
              </div>
              <FittingForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-navy mb-10 text-center">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.n}
                className="bg-white rounded-2xl p-7 border-2 border-gold/15 shadow-sm"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy text-gold font-serif text-lg mb-4">
                  {s.n}
                </span>
                <p className="font-semibold text-navy mb-2">{s.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why bother coming in ── */}
      <section className="py-16 bg-white border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-navy mb-3 text-center">
            Why it beats buying a mattress online
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            You spend a third of your life on it. Twenty minutes lying on the real thing tells you
            more than a hundred reviews.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="bg-[#faf8f5] rounded-2xl p-6 border-2 border-gold/15"
              >
                <CheckCircle className="w-6 h-6 text-gold mb-3" />
                <p className="font-semibold text-navy mb-1.5">{r.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where + final CTA ── */}
      <section className="py-16 border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-navy mb-3">Where to find us</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">
              {elmhurstStore.name} — {formatAddress(elmhurstStore.address)}. Free parking right
              outside, easy from anywhere in the western suburbs.
            </p>
            <div className="space-y-3 text-sm mb-6">
              <a
                href={elmhurstStore.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold-dark font-semibold hover:text-navy transition-colors"
              >
                Get directions
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <a
              href="#top"
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold rounded-full px-8 py-4 hover:bg-navy/90 transition-colors"
            >
              Book my fitting
            </a>
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
