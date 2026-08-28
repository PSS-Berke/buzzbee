import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CalendarCheck,
  MapPin,
  Mail,
  Phone,
  Clock,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { elmhurstStore, formatAddress } from '@/data/store';
import { formatSlot, isValidSlot } from '@/lib/slots';
import { parseMode } from '@/lib/consult';
import { Video } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Your consultation is booked | Busby Elmhurst Showroom',
  description: 'Your Busby sleep consultation is confirmed.',
  robots: { index: false, follow: false },
};

// Renders "2026-07-24" as "Friday, July 24". Parsed as a plain calendar date —
// splitting the parts avoids the UTC-midnight shift that `new Date('2026-07-24')`
// would introduce for anyone west of Greenwich.
function formatBookedDate(iso: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  if (Number.isNaN(date.getTime()) || date.getMonth() !== m - 1) return null;
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

const inPersonSteps = [
  'A confirmation email is on its way with your time and the showroom address.',
  'Your Sleep Guide will meet you at the door and the showroom is yours. No other customers, nobody hovering.',
  'Nothing to bring. Wear what you would sleep in if you like; you will be lying down.',
  'Need to move it? Reply to the confirmation email or call the showroom.',
];

const virtualSteps = [
  'A confirmation email is on its way with your time.',
  'Rob will email you a link to join before your call. Nothing to install.',
  'Bring your questions. How you sleep, what hurts, what you have already tried.',
  'If you want to feel the beds afterwards, you can book a visit at the end of the call.',
  'Need to move it? Reply to the confirmation email or call us.',
];

export default async function AppointmentConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; slot?: string; mode?: string }>;
}) {
  const { date, slot, mode } = await searchParams;

  const prettyDate = date ? formatBookedDate(date) : null;
  const prettySlot = slot && isValidSlot(slot) ? formatSlot(slot) : null;
  const isVirtual = parseMode(mode) === 'virtual';
  const nextSteps = isVirtual ? virtualSteps : inPersonSteps;

  return (
    <div className="min-h-screen bg-[#faf8f5] linen-texture relative">
      {/* Warm ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255, 220, 180, 0.4) 0%, rgba(255, 200, 150, 0.2) 30%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* ── Confirmation ── */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gold/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CalendarCheck className="w-8 h-8 text-gold-dark" />
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-navy mb-4 leading-tight">
            You&rsquo;re booked.
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            {prettyDate ? (
              <>
                We have you down for <strong className="text-navy">{prettyDate}</strong>
                {prettySlot ? (
                  <>
                    {' '}
                    at <strong className="text-navy">{prettySlot}</strong>
                  </>
                ) : null}
                . A confirmation is on its way to your inbox.
              </>
            ) : (
              <>
                Your {isVirtual ? 'call' : 'visit'} is confirmed. A confirmation is on its way to
                your inbox with the details.
              </>
            )}
          </p>
        </div>

        {/* ── Where to go / how to join ── */}
        {isVirtual ? (
          <div className="border-2 border-gold/20 rounded-3xl bg-white shadow-sm shadow-gold/5 p-8 mb-8">
            <h2 className="text-xl font-serif text-navy mb-6">How to join</h2>
            <div className="flex items-start gap-4">
              <Video className="w-5 h-5 text-gold-dark mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-navy text-sm mb-1">A link is coming by email</p>
                <p className="text-gray-600 text-sm">
                  Rob sends it before your call. It opens in your browser, so there is nothing to
                  download and nothing to set up. If it has not arrived an hour beforehand, email{' '}
                  <a
                    href={`mailto:${elmhurstStore.email}`}
                    className="text-gold-dark underline underline-offset-2 hover:text-navy transition-colors"
                  >
                    {elmhurstStore.email}
                  </a>{' '}
                  and we will resend it.
                </p>
              </div>
            </div>
          </div>
        ) : (
        <div className="border-2 border-gold/20 rounded-3xl bg-white shadow-sm shadow-gold/5 p-8 mb-8">
          <h2 className="text-xl font-serif text-navy mb-6">Where to go</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gold-dark mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-navy text-sm mb-1">{elmhurstStore.name}</p>
                <p className="text-gray-600 text-sm mb-2">{formatAddress(elmhurstStore.address)}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${elmhurstStore.name}, ${formatAddress(elmhurstStore.address)}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gold-dark underline underline-offset-2 hover:text-navy transition-colors"
                >
                  Get directions
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-gold-dark mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-navy text-sm mb-1">Parking</p>
                <p className="text-gray-600 text-sm">{elmhurstStore.parking}</p>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* ── What happens next ── */}
        <div className="border-2 border-gold/20 rounded-3xl bg-white shadow-sm shadow-gold/5 p-8 mb-8">
          <h2 className="text-xl font-serif text-navy mb-6">What happens next</h2>
          <ul className="space-y-4">
            {nextSteps.map((step) => (
              <li key={step} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                {step}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Reach us ── */}
        <div className="border-2 border-gold/20 rounded-3xl bg-white shadow-sm shadow-gold/5 p-8 mb-12">
          <h2 className="text-xl font-serif text-navy mb-6">Need to reach us?</h2>
          <div className="space-y-3">
            <a
              href={`mailto:${elmhurstStore.email}`}
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-navy transition-colors"
            >
              <Mail className="w-4 h-4 text-gold flex-shrink-0" />
              {elmhurstStore.email}
            </a>
            <a
              href={`tel:${elmhurstStore.phoneE164}`}
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-navy transition-colors"
            >
              <Phone className="w-4 h-4 text-gold flex-shrink-0" />
              {elmhurstStore.phone}
            </a>
          </div>
        </div>

        {/* ── Onward ── */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            While you wait — take the 2-minute Sleep Quiz. Your Guide will have your results ready.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            Take the Sleep Quiz
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
