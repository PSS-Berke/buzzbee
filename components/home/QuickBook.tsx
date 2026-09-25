'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

export default function QuickBook() {
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
    <div className="rounded-3xl bg-white border-2 border-gold/20 shadow-xl shadow-gold/5 p-5 sm:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="quick-book-heading" tabIndex={-1} className="text-2xl sm:text-3xl font-serif text-navy outline-none">
            Pick a time this week
          </h2>
          <p className="mt-1 text-gray-600">Free, private visits at our Elmhurst showroom. Try every bed.</p>
        </div>
        <Link href="/appointment" className="text-sm font-medium text-navy underline hover:text-gold-dark">
          See more dates
        </Link>
      </div>

      {/* Days — a swipeable strip on phones, a 7-up grid from sm. min-w-0 matters:
          a <fieldset> defaults to min-inline-size: min-content, which stretches it
          to the strip's full width so the strip never scrolls (it just gets clipped). */}
      <fieldset className="mt-6 min-w-0">
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
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-10">
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
    </div>
  );
}
