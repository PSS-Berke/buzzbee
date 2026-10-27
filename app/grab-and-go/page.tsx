import Link from 'next/link';
import {
  Tag,
  CheckCircle,
  Phone,
  MessageSquare,
  ExternalLink,
  ShoppingBag,
  PackageCheck,
  Home,
} from 'lucide-react';
import { elmhurstStore, formatAddress } from '@/data/store';
import { grabAndGoProduct } from '@/data/products';
import GrabAndGoBuy from '@/components/grab-and-go/GrabAndGoBuy';

const steps = [
  {
    icon: ShoppingBag,
    title: 'Order online',
    body: 'Pick store pickup or delivery and check out in a couple of minutes.',
  },
  {
    icon: PackageCheck,
    title: 'We get it ready',
    body: 'We reach out to confirm your pickup time or delivery window.',
  },
  {
    icon: Home,
    title: 'Sleep on it this week',
    body: 'Ready at the showroom in 72 hours, or at your door in 96.',
  },
];

const faqs = [
  {
    q: 'Why is it only online?',
    a: 'Selling it online keeps it simple and keeps the price at $599. Order here and choose pickup or delivery.',
  },
  {
    q: 'Where do I pick it up?',
    a: `At the ${elmhurstStore.name}, ${formatAddress(elmhurstStore.address)}. Free parking right outside. We will contact you to set a time once it is ready.`,
  },
  {
    q: 'How fast is delivery?',
    a: 'Within 96 hours of your order. We will reach out to set a delivery window that works for you.',
  },
  {
    q: 'Can I try it before I buy?',
    a: 'Yes. Book a free fitting and lie on it at the showroom first. The $599 price is still for online orders.',
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
                <Tag className="w-4 h-4" aria-hidden="true" />
                <span>Online only special</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-3">
                A Busby queen for <span className="text-gold">$599</span>.
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                Order online, then pick it up in Elmhurst in 72 hours or have it delivered in 96.
                No waiting weeks for a good night&rsquo;s sleep.
              </p>
            </div>

            {/* Supporting detail. Below the buy box on a phone. */}
            <div className="lg:col-start-1 lg:row-start-2 order-last lg:order-none">
              <ul className="space-y-3 mb-8">
                {grabAndGoProduct.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-200">
                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-gold" aria-hidden="true" />
                    </span>
                    <span className="text-base">{f}</span>
                  </li>
                ))}
              </ul>

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

            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <GrabAndGoBuy />
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
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-white rounded-2xl p-7 border-2 border-gold/15 shadow-sm">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy mb-4">
                    <Icon className="w-5 h-5 text-gold" aria-hidden="true" />
                  </span>
                  <p className="font-semibold text-navy mb-2">{s.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Questions ── */}
      <section className="py-16 bg-white border-t border-gold/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-navy mb-8 text-center">
            Good to know
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="bg-[#faf8f5] rounded-2xl p-6 border-2 border-gold/15">
                <h3 className="font-semibold text-navy mb-1.5">{f.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
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
              in the western suburbs.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 text-sm">
              <a
                href={elmhurstStore.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold-dark font-semibold hover:text-navy transition-colors"
              >
                Get directions
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <Link
                href="/book-a-fitting"
                className="inline-flex items-center gap-2 text-gold-dark font-semibold hover:text-navy transition-colors"
              >
                Want to try it first? Book a free fitting
              </Link>
            </div>
            <a
              href="#top"
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold rounded-full px-8 py-4 hover:bg-navy/90 transition-colors"
            >
              Get mine for $599
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
