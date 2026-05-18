import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Quote, BookOpen, Search, Compass, ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/site';
import EmailCaptureForm from '@/components/forms/EmailCaptureForm';
import LpViewTracker from './LpViewTracker';

export const metadata: Metadata = {
  title: 'Free Sleep Guide | Busby Mattresses',
  description:
    'Get our expert sleep guide and be first to know about new mattresses and showroom events. From the makers of American-made Busby.',
  alternates: { canonical: '/sleep-guide' },
  openGraph: {
    title: 'Free Sleep Guide | Busby Mattresses',
    description:
      'Get the Busby Sleep Guide — 25 years of bedding expertise distilled into one free PDF.',
    url: `${SITE_URL}/sleep-guide`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/og-image.png`,
        width: 1500,
        height: 1200,
        alt: 'Busby Sleep Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Sleep Guide | Busby Mattresses',
    description:
      'Get the Busby Sleep Guide — 25 years of bedding expertise distilled into one free PDF.',
    images: [`${SITE_URL}/images/og-image.png`],
  },
};

const trustStats = [
  { stat: '25+', label: 'Years of bedding expertise' },
  { stat: '100%', label: 'Made in the USA' },
  { stat: '100', label: 'Nights to try at home' },
  { stat: '10', label: 'Year warranty' },
];

const guideContents = [
  {
    icon: BookOpen,
    title: 'The 6 essentials',
    body: 'Support, feel, temperature, stability, isolation, materials. Why each one matters and how to test for it in any mattress (Busby or otherwise).',
  },
  {
    icon: Search,
    title: 'How to tell what’s actually in your mattress',
    body: 'A plain-English guide to certifications, foam types, coil counts, and the marketing words that don’t mean anything.',
  },
  {
    icon: Compass,
    title: 'Sleep style → mattress fit',
    body: 'Side, back, stomach, combo. Hot sleeper, cold sleeper. Couple with different preferences. A simple decision flow you can use anywhere.',
  },
];

const faqs = [
  {
    q: 'What’s actually in the guide?',
    a: 'A 12-page PDF covering the six essentials of a great mattress, how to read materials and certifications, and how to match a mattress to your sleep style. No jargon, no hard sell.',
  },
  {
    q: 'Do I have to buy a mattress?',
    a: 'No. The guide is genuinely free, and we won’t pretend otherwise. If you do shop with us later, you’ll have the same 100-night home trial and 10-year warranty as everyone else.',
  },
  {
    q: 'How often will you email me?',
    a: 'About twice a month — sleep tips, occasional new-product news, and early invites to showroom events. You can unsubscribe in one click anytime.',
  },
];

export default function SleepGuidePage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] linen-texture">
      <LpViewTracker />

      {/* Minimal header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Link href="/" className="inline-flex items-center" aria-label="Busby home">
            <Image
              src="/2.svg"
              alt="Busby"
              width={120}
              height={40}
              unoptimized
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      {/* A1 — Hero */}
      <section className="relative bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest text-gold-dark mb-4">
                FREE SLEEP GUIDE
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy leading-tight mb-5">
                Sleep deeper, in <span className="text-gold">30 nights</span> or less.
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Get the Busby Sleep Guide — 25 years of bedding expertise, distilled into one PDF.
                Plus early access to new mattresses and showroom events.
              </p>

              <EmailCaptureForm
                source="sleep-guide-lp"
                buttonLabel="Send me the guide"
                formPosition="hero"
              />

              <p className="mt-6 text-sm text-gray-500">
                10,000+ American sleepers · Made in USA · 100-night trial
              </p>
            </div>

            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gold/20">
              <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                <div>
                  <BookOpen className="w-12 h-12 text-gold mx-auto mb-3" />
                  <p className="text-navy font-semibold">[REPLACE: Hero bedroom photo]</p>
                  <p className="text-sm text-gray-500 mt-1">Real bedroom, late-morning light</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A2 — Trust strip */}
      <section className="bg-navy text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {trustStats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-serif text-gold mb-1">{s.stat}</p>
                <p className="text-sm text-gray-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A3 — What's in the guide */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">What’s in the guide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A 12-page PDF written by our 25-year-veteran craftspeople. No jargon, no upsells, just
              the things we wish every shopper knew.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guideContents.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="bg-white rounded-2xl p-7 border-2 border-gold/15 shadow-sm"
                >
                  <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{c.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* A4 — Attributed quote */}
      <section className="py-20 md:py-24 bg-white border-y border-gold/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-10 h-10 text-gold mx-auto mb-6" />
          <p className="text-xl md:text-2xl font-serif italic text-navy leading-relaxed mb-6">
            “I’d tried four other online mattresses before Busby. The one that finally let me stop
            waking up at 4 a.m. with a sore lower back. I should have started here.”
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-navy">— [Jenna], [Oak Park]</span>
            <span className="mx-2">·</span>side sleeper
            <span className="mx-2">·</span>Busby Slumber
            <span className="ml-2 text-[10px] uppercase tracking-wider text-gold-dark/70">
              Placeholder
            </span>
          </p>
        </div>
      </section>

      {/* A5 — Sleep Quiz cross-link */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-3xl p-10 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-serif mb-3">Want a recommendation right now?</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Skip the guide and take our 2-minute Sleep Quiz. Six questions, instant personalized
              mattress match. (You can always come back for the guide later.)
            </p>
            <Link
              href="/quiz"
              data-event="lp_quiz_click"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Take the Sleep Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* A6 — Repeat email form */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">Ready for the guide?</h2>
          <div className="flex justify-center">
            <EmailCaptureForm
              source="sleep-guide-lp"
              buttonLabel="Send me the guide"
              formPosition="mid-page"
            />
          </div>
        </div>
      </section>

      {/* A7 — Founder note */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
            <Image
              src="/images/team/tag no tag.png"
              alt="Robert Taglianetti, Founder of Busby"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
              A note from our founder
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                After 25 years in the bedding industry, we knew two things: what makes a perfect
                mattress, and why most people never get one.
              </p>
              <p>
                Too many middlemen. Too much markup. Too little transparency. So we built our own
                factory in the USA and went back to the fundamentals.
              </p>
              <p>
                If you’re shopping for a mattress — Busby or otherwise — this guide is the one we
                wish we’d had when we started. It’s free. We hope it helps.
              </p>
              <p className="pt-2 text-navy font-semibold not-italic">— Robert Taglianetti</p>
              <p className="-mt-4 text-sm text-gold-dark">Founder, Busby</p>
            </div>
          </div>
        </div>
      </section>

      {/* A8 — FAQ */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif text-navy text-center mb-10">
            Quick questions
          </h2>
          <dl className="space-y-6">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="bg-white rounded-2xl p-6 border-2 border-gold/15 shadow-sm"
              >
                <dt className="font-semibold text-navy mb-2">{f.q}</dt>
                <dd className="text-gray-600 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* A9 — Minimal footer */}
      <footer className="bg-navy text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} Busby. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms</Link>
            <a href="mailto:support@mybusby.com" className="hover:text-gold transition-colors">
              support@mybusby.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
