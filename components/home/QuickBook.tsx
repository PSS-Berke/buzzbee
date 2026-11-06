'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { formatSlot } from '@/lib/slots';
import { isHeldBack, scheduledSlotsForDate } from '@/lib/availability';
import { SOURCE_IN_PERSON } from '@/lib/consult';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// How many days the mini picker shows, starting tomorrow (no same-day visits:
// a Sleep Guide has to be scheduled to meet each guest).
const DAYS_SHOWN = 7;
const SHOWROOM_TZ = 'America/Chicago';

type Status = 'idle' | 'submitting' | 'error';

// Dates are YYYY-MM-DD in the showroom's calendar, matching /api/reserve.
function showroomToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: SHOWROOM_TZ }).format(new Date());
}

function plusDays(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

function dayParts(iso: string) {
  const dt = new Date(`${iso}T12:00:00Z`);
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { ...o, timeZone: 'UTC' }).format(dt);
  return { weekday: fmt({ weekday: 'short' }), day: fmt({ day: 'numeric' }), long: fmt({ weekday: 'long', month: 'long', day: 'numeric' }) };
}

function upcomingDays(): string[] {
  const today = showroomToday();
  return Array.from({ length: DAYS_SHOWN }, (_, i) => plusDays(today, i + 1));
}

// Why book, all as promised on /appointment. Studio Go is left out on purpose: it
// isn't on the showroom floor.
const visitReasons = [
  {
    title: 'The whole showroom to yourself',
    body: 'No other customers, no floor staff circling. A Sleep Guide meets you at the door and the place is yours.',
  },
  {
    title: 'Nobody hovering, nobody selling',
    body: 'Your guide is salaried, never on commission, and there to help you choose, not to close you.',
  },
  {
    title: 'Free either way',
    body: 'Same prices as online and the same 100-night home trial, whether you buy that day or not.',
  },
];

export default function QuickBook() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // The picker can't be prerendered: its days come from today's date, and a page
  // built yesterday would fail hydration. Waiting until it's on screen also means
  // a home page view only costs availability's rate-limited database calls (one
  // per day shown) if the visitor actually scrolls here.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setMounted(true);
      observer.disconnect();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="quick-book"
      aria-labelledby="quick-book-heading"
      className="scroll-mt-20 lg:scroll-mt-24 py-16 md:py-24"
    >
      {/* grid-cols-1 caps the column at the page width, so the day strip scrolls instead of stretching it. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Why come in */}
        <div className="lg:col-span-5">
          <p className="text-gold-dark font-medium text-sm">Quick Appointment</p>
          <h2 id="quick-book-heading" className="mt-3 text-4xl md:text-5xl font-serif text-navy leading-tight">
            Not sure what feels right? <span className="wavy-underline">Come lie down.</span>
          </h2>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            Reading about a mattress only goes so far. Book a free, private visit to our Elmhurst
            showroom and feel the difference between our beds side by side. (Studio Go is online
            only, so it won&rsquo;t be on the floor.)
          </p>
          <ul className="mt-8 space-y-5">
            {visitReasons.map((r) => (
              <li key={r.title} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gold/15">
                  <Check className="h-4 w-4 text-gold-dark" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-navy">{r.title}</h3>
                  <p className="mt-0.5 text-gray-600 leading-relaxed">{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Then pick a time */}
        <div
          ref={cardRef}
          className="lg:col-span-7 rounded-3xl bg-white border-2 border-gold/20 shadow-xl shadow-gold/5 p-5 sm:p-8"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-serif text-navy">Pick a time this week</h3>
            <Link href="/appointment" className="shrink-0 text-sm font-medium text-navy underline hover:text-gold-dark">
              See more dates
            </Link>
          </div>

          {/* Holds the height of a full day of times, so nothing jumps while they load. */}
          <div className="mt-6 min-h-[491px] sm:min-h-[336px]">{mounted && <Picker />}</div>
        </div>
      </div>
    </section>
  );
}

function Picker() {
  const [days] = useState(upcomingDays);
  // null = still loading; a failed fetch falls back to [] so the picker stays usable
  // and the server's unique index still catches a clash at submit.
  const [booked, setBooked] = useState<Record<string, string[]> | null>(null);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const gclidRef = useRef('');

  const loadBooked = async () => {
    const entries = await Promise.all(
      days.map(async (d) => {
        try {
          const res = await fetch(`/api/availability?date=${d}`);
          const json = (await res.json()) as { ok: boolean; booked?: string[] };
          return [d, json.ok && json.booked ? json.booked : []] as const;
        } catch {
          return [d, []] as const;
        }
      }),
    );
    return Object.fromEntries(entries) as Record<string, string[]>;
  };

  useEffect(() => {
    let cancelled = false;
    loadBooked().then((b) => {
      if (cancelled) return;
      setBooked(b);
      // Open on the first day that still has a free time.
      setDate((current) => current || days.find((d) => slotsFor(d, b).some((s) => s.free)) || days[0]);
    });
    // Same Google Ads attribution as the full booking form (see ReserveForm).
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('gclid');
      if (fromUrl) sessionStorage.setItem('bb_gclid', fromUrl);
      gclidRef.current = fromUrl || sessionStorage.getItem('bb_gclid') || '';
    } catch {
      /* sessionStorage unavailable — attribution is best effort */
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function slotsFor(d: string, b: Record<string, string[]> | null = booked) {
    return scheduledSlotsForDate(d).map((s) => ({
      slot: s,
      free: !isHeldBack(d, s) && !(b?.[d] ?? []).includes(s),
    }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const phone = data.get('phone')?.toString().trim() || '';

    // Mirrors ReserveForm / the server's normalizePhone().
    const errors: typeof fieldErrors = {};
    if (!name) errors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';
    const digits = phone.replace(/\D/g, '');
    const national = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
    if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(national)) errors.phone = 'Please enter a valid 10-digit US phone number.';
    setFieldErrors(errors);
    if (errors.name || errors.email || errors.phone) {
      (errors.name ? nameRef : errors.email ? emailRef : phoneRef).current?.focus();
      return;
    }

    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          date,
          timeSlot: slot,
          mattresses: [],
          notes: '',
          gclid: gclidRef.current,
          bb_check: data.get('bb_check')?.toString() || '',
          source: SOURCE_IN_PERSON,
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; code?: string };
      if (!json.ok) {
        const taken = res.status === 409 || json.code === 'slot_taken';
        if (taken) {
          setBooked(await loadBooked());
          setSlot('');
        }
        setStatus('error');
        setErrorMsg(
          taken
            ? 'That time was just taken. Please pick another.'
            : json.error || 'Something went wrong on our end. Try once more, or email showroom@mybusby.com.',
        );
        return;
      }
      window.gtag?.('event', 'store_reserve_submit', { method: 'home_quick_book' });
      // Full page load so the conversion page_view fires (see ReserveForm).
      window.location.assign(`/appointment/confirmed?${new URLSearchParams({ date, slot, mode: 'in-person' })}`);
    } catch {
      setStatus('error');
      setErrorMsg('We couldn’t reach the server. Try once more, or email showroom@mybusby.com.');
    }
  };

  const daySlots = date ? slotsFor(date) : [];

  return (
    <>
      {/* Days — a swipeable strip on phones, a 7-up grid from sm. min-w-0 matters:
          a <fieldset> defaults to min-inline-size: min-content, which stretches it
          to the strip's full width so the strip never scrolls (it just gets clipped). */}
      <fieldset className="min-w-0">
        <legend className="sr-only">Day</legend>
        <div className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-2 overflow-x-auto overscroll-x-contain px-5 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-7 sm:overflow-visible sm:px-0">
          {days.map((d) => {
            const { weekday, day, long } = dayParts(d);
            const slots = slotsFor(d);
            const open = slots.filter((s) => s.free).length;
            const selected = date === d;
            const note = booked === null ? '…' : slots.length === 0 ? 'Closed' : open === 0 ? 'Full' : `${open} open`;
            return (
              <button
                key={d}
                type="button"
                aria-pressed={selected}
                aria-label={`${long}, ${note === '…' ? 'loading' : note}`}
                onClick={() => {
                  setDate(d);
                  setSlot('');
                }}
                className={`flex min-h-11 w-[4.5rem] shrink-0 snap-start sm:w-auto flex-col items-center rounded-2xl border-2 py-2 transition-colors ${
                  selected ? 'border-navy bg-navy text-white' : 'border-gray-200 bg-white text-navy hover:border-navy/40'
                }`}
              >
                <span className={`text-xs font-medium ${selected ? 'text-white/80' : 'text-gray-600'}`}>{weekday}</span>
                <span className="text-xl font-semibold leading-tight">{day}</span>
                <span className={`text-[11px] ${selected ? 'text-white/80' : 'text-gray-600'}`}>{note}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Times */}
      <fieldset className="mt-5 min-w-0">
        <legend className="mb-2 text-sm font-medium text-navy">
          {date ? dayParts(date).long : 'Loading times…'}
        </legend>
        {date && daySlots.length === 0 && (
          <p className="text-sm text-gray-600">The showroom is closed this day. Pick another.</p>
        )}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {daySlots.map(({ slot: s, free }) => {
            const selected = slot === s;
            return (
              <button
                key={s}
                type="button"
                disabled={!free || booked === null}
                aria-pressed={selected}
                aria-label={free ? formatSlot(s) : `${formatSlot(s)}, unavailable`}
                onClick={() => setSlot(s)}
                className={`min-h-11 rounded-full border-2 px-2 text-sm transition-colors ${
                  !free
                    ? 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400 line-through'
                    : selected
                      ? 'border-navy bg-navy text-white'
                      : 'border-gray-200 text-gray-700 hover:border-navy'
                }`}
              >
                {formatSlot(s)}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Contact — appears once a time is picked */}
      {slot && (
        <form onSubmit={handleSubmit} noValidate className="mt-6 border-t border-gray-100 pt-6">
          <input
            type="checkbox"
            name="bb_check"
            tabIndex={-1}
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {(
              [
                { name: 'name', label: 'Name', type: 'text', auto: 'name', ref: nameRef },
                { name: 'email', label: 'Email', type: 'email', auto: 'email', ref: emailRef },
                { name: 'phone', label: 'Phone', type: 'tel', auto: 'tel', ref: phoneRef },
              ] as const
            ).map((f) => {
              const err = fieldErrors[f.name];
              return (
                <label key={f.name} className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">{f.label}</span>
                  <input
                    ref={f.ref}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.auto}
                    required
                    aria-invalid={err ? true : undefined}
                    aria-describedby={err ? `qb-${f.name}-error` : undefined}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-gold transition-colors"
                  />
                  {err && (
                    <p id={`qb-${f.name}-error`} className="mt-1.5 text-sm text-red-600">
                      {err}
                    </p>
                  )}
                </label>
              );
            })}
          </div>

          {status === 'error' && (
            <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-5 inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-navy hover:bg-gold-light disabled:cursor-not-allowed disabled:bg-gold/60 sm:w-auto transition-colors"
          >
            {status === 'submitting' ? 'Reserving…' : `Reserve ${dayParts(date).weekday} at ${formatSlot(slot)}`}
            {status !== 'submitting' && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
          </button>
        </form>
      )}
    </>
  );
}
