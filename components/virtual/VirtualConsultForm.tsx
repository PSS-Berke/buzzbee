'use client';

import { FormEvent, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Loader2 } from 'lucide-react';
import { SOURCE_VIRTUAL_NATIONAL } from '@/lib/consult';
import { formatSlot, MAX_BOOKING_DAYS_AHEAD } from '@/lib/slots';
import { openSlotsForDate } from '@/lib/availability';
import { chicagoWallClockToUtc } from '@/lib/calendar';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Status = 'idle' | 'submitting' | 'error';

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
}

function todayLocalISO(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function localISOPlusDays(days: number): string {
  const now = new Date();
  now.setDate(now.getDate() + days);
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

interface Zone {
  tz: string;
  abbr: string;
}

const NO_ZONE: Zone = { tz: '', abbr: '' };

/**
 * The visitor's IANA zone and its short label ("MDT", "PST"), read once and
 * cached. Cached because useSyncExternalStore requires a stable snapshot —
 * returning a fresh object each call would re-render forever.
 */
let zoneCache: Zone | null = null;
function clientZone(): Zone {
  if (zoneCache) return zoneCache;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(
      new Date()
    );
    zoneCache = { tz, abbr: parts.find((p) => p.type === 'timeZoneName')?.value ?? '' };
  } catch {
    zoneCache = NO_ZONE;
  }
  return zoneCache;
}

/** The zone never changes mid-session, so there is nothing to subscribe to. */
const subscribeToNothing = () => () => {};
const serverZone = () => NO_ZONE;

/** Central Time's own short label on the given date, so CDT/CST stays honest. */
function centralAbbr(at: Date): string {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      timeZoneName: 'short',
    }).formatToParts(at);
    return parts.find((p) => p.type === 'timeZoneName')?.value ?? 'CT';
  } catch {
    return 'CT';
  }
}

/**
 * A Chicago slot rendered in the visitor's own clock. Returns null when the
 * visitor is already on Central, so we don't print "11:00 AM · 11:00 AM".
 */
function localTimeFor(date: string, slot: string): string | null {
  const instant = chicagoWallClockToUtc(date, slot);
  if (!instant) return null;
  try {
    const mine = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(instant);
    const central = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(instant);
    return mine === central ? null : mine;
  } catch {
    return null;
  }
}

/** Whether the visitor's local calendar date differs from the Chicago one. */
function localDayNote(date: string, slot: string): string | null {
  const instant = chicagoWallClockToUtc(date, slot);
  if (!instant) return null;
  try {
    const mine = new Intl.DateTimeFormat('en-CA').format(instant);
    if (mine === date) return null;
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      .format(instant);
  } catch {
    return null;
  }
}

export default function VirtualConsultForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [availabilityState, setAvailabilityState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  // Server renders with no zone and the client fills it in on hydration, so the
  // two first renders agree and React swaps in the real value without a warning.
  const zone = useSyncExternalStore(subscribeToNothing, clientZone, serverZone);
  // Held in a ref, not state: never rendered, only read at submit time.
  const gclidRef = useRef('');

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const KEY = 'bb_gclid';
    try {
      const fromUrl = new URLSearchParams(globalThis.location.search).get('gclid');
      if (fromUrl) {
        sessionStorage.setItem(KEY, fromUrl);
        gclidRef.current = fromUrl;
        return;
      }
      const stored = sessionStorage.getItem(KEY);
      if (stored) gclidRef.current = stored;
    } catch {
      /* best effort */
    }
  }, []);

  const fetchAvailability = async (forDate: string) => {
    if (!forDate) {
      setBookedSlots([]);
      setAvailabilityState('idle');
      return;
    }
    setAvailabilityState('loading');
    try {
      const res = await fetch(`/api/availability?date=${encodeURIComponent(forDate)}`);
      const json = (await res.json()) as { ok: boolean; booked?: string[] };
      if (json.ok && json.booked) {
        setBookedSlots(json.booked);
        setAvailabilityState('idle');
      } else {
        setBookedSlots([]);
        setAvailabilityState('error');
      }
    } catch {
      setBookedSlots([]);
      setAvailabilityState('error');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAvailability(date);
    setSlot('');
  }, [date]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = data.get('name')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const phone = data.get('phone')?.toString().trim() || '';

    const errors: FieldErrors = {};
    if (!name) errors.name = 'Please enter your name.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a phone number we can reach you on.';
    }
    setFieldErrors(errors);
    if (errors.name || errors.email || errors.phone) {
      (errors.name ? nameRef : errors.email ? emailRef : phoneRef).current?.focus();
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const payload = {
      name,
      email,
      phone,
      date,
      timeSlot: slot,
      // The zone rides in the notes so whoever runs the call knows which clock
      // the customer was reading when they picked.
      notes: [data.get('notes')?.toString() || '', zone.tz ? `Customer timezone: ${zone.tz}` : '']
        .filter(Boolean)
        .join('\n\n'),
      bb_check: data.get('bb_check')?.toString() || '',
      source: SOURCE_VIRTUAL_NATIONAL,
      gclid: gclidRef.current,
    };

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; code?: string };
      if (!json.ok) {
        if (res.status === 409 || json.code === 'slot_taken') {
          await fetchAvailability(date);
          setSlot('');
        }
        setStatus('error');
        setErrorMsg(
          res.status === 409 || json.code === 'slot_taken'
            ? 'That time was just taken. Your selection was cleared, please pick another.'
            : json.error || 'Something went wrong on our end. Try once more, or call (844) 886-1640.'
        );
        return;
      }
      window.gtag?.('event', 'virtual_consult_submit');
      // Full page load, not a client-side push, so gtag.js re-runs and the
      // URL-based Google Ads conversion on /appointment/confirmed actually fires.
      const params = new URLSearchParams({ date, slot, mode: 'virtual' });
      globalThis.location.assign(`/appointment/confirmed?${params}`);
    } catch {
      setStatus('error');
      setErrorMsg('We couldn’t reach the server. Try once more, or call (844) 886-1640.');
    }
  };

  const inputClass =
    'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition-colors';

  const openSlots = date ? openSlotsForDate(date) : [];
  const canSubmit = status !== 'submitting' && date !== '' && slot !== '' && availabilityState !== 'loading';

  const ctAbbr = date ? centralAbbr(chicagoWallClockToUtc(date, '12:00') ?? new Date()) : 'CT';
  const dayNote = date && slot ? localDayNote(date, slot) : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gold/15 shadow-lg space-y-5"
      aria-live="polite"
      noValidate
    >
      <input
        type="checkbox"
        name="bb_check"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <div>
        <label htmlFor="vc-name" className="block text-sm font-medium text-navy mb-1.5">
          Name
        </label>
        <input
          id="vc-name"
          ref={nameRef}
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? 'vc-name-error' : undefined}
          className={inputClass}
        />
        {fieldErrors.name && (
          <p id="vc-name-error" className="mt-1.5 text-sm text-red-600">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="vc-email" className="block text-sm font-medium text-navy mb-1.5">
            Email
          </label>
          <input
            id="vc-email"
            ref={emailRef}
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? 'vc-email-error' : 'vc-email-hint'}
            className={inputClass}
          />
          {fieldErrors.email ? (
            <p id="vc-email-error" className="mt-1.5 text-sm text-red-600">
              {fieldErrors.email}
            </p>
          ) : (
            <p id="vc-email-hint" className="mt-1.5 text-xs text-gray-600">
              Where your join link goes.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="vc-phone" className="block text-sm font-medium text-navy mb-1.5">
            Phone
          </label>
          <input
            id="vc-phone"
            ref={phoneRef}
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="(630) 555-0142"
            aria-invalid={fieldErrors.phone ? true : undefined}
            aria-describedby={fieldErrors.phone ? 'vc-phone-error' : undefined}
            className={inputClass}
          />
          {fieldErrors.phone && (
            <p id="vc-phone-error" className="mt-1.5 text-sm text-red-600">
              {fieldErrors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="vc-date" className="block text-sm font-medium text-navy mb-1.5">
          Pick a day
        </label>
        <input
          id="vc-date"
          name="date"
          type="date"
          required
          min={todayLocalISO()}
          max={localISOPlusDays(MAX_BOOKING_DAYS_AHEAD)}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputClass}
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-navy mb-2">
          Pick a time{' '}
          <span className="font-normal text-gray-600">
            {zone.abbr ? `(shown in ${ctAbbr} and your time)` : `(${ctAbbr})`}
          </span>
        </legend>

        {!date && <p className="text-sm text-gray-600">Choose a day above to see open times.</p>}
        {date && availabilityState === 'loading' && (
          <p className="text-sm text-gray-600">Loading times…</p>
        )}
        {date && availabilityState === 'error' && openSlots.length > 0 && (
          <p className="text-sm text-red-600">
            Couldn&rsquo;t load availability. Pick a time anyway and we&rsquo;ll confirm by email if
            there&rsquo;s a clash.
          </p>
        )}
        {date && availabilityState !== 'loading' && openSlots.length === 0 && (
          <p className="text-sm text-gray-600">
            No times are available that day. Please choose another.
          </p>
        )}

        {date && openSlots.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {openSlots.map((s) => {
              const taken = bookedSlots.includes(s);
              const selected = slot === s;
              const mine = localTimeFor(date, s);
              return (
                <button
                  key={s}
                  type="button"
                  disabled={taken}
                  aria-pressed={selected}
                  onClick={() => setSlot(s)}
                  className={[
                    'min-h-11 px-2.5 py-2.5 rounded-xl border-2 text-sm leading-tight transition-colors',
                    taken
                      ? 'border-gray-100 bg-gray-50 text-gray-300 line-through cursor-not-allowed'
                      : selected
                        ? 'bg-navy border-navy text-white'
                        : 'border-gray-200 text-gray-700 hover:border-navy',
                  ].join(' ')}
                >
                  <span className="block font-medium">
                    {mine ?? formatSlot(s)}
                    {mine && zone.abbr ? ` ${zone.abbr}` : ''}
                  </span>
                  <span
                    className={[
                      'block text-[11px] mt-0.5',
                      taken ? 'text-gray-300' : selected ? 'text-white/70' : 'text-gray-500',
                    ].join(' ')}
                  >
                    {mine ? `${formatSlot(s)} ${ctAbbr}` : ctAbbr}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {dayNote && (
          <p className="mt-2 text-xs text-gray-600">
            That lands on {dayNote} where you are.
          </p>
        )}
      </fieldset>

      <div>
        <label htmlFor="vc-notes" className="block text-sm font-medium text-navy mb-1.5">
          How do you sleep? <span className="font-normal text-gray-600">(optional)</span>
        </label>
        <textarea
          id="vc-notes"
          name="notes"
          rows={3}
          placeholder="e.g., side sleeper, shoulder pain, we run hot"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p
          className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3"
          role="alert"
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold rounded-full px-8 py-4 text-lg hover:bg-gold-light transition-colors disabled:opacity-60"
      >
        {status === 'submitting' && <Loader2 className="w-5 h-5 animate-spin" />}
        {status === 'submitting'
          ? 'Sending…'
          : !date
            ? 'Pick a day first'
            : !slot
              ? 'Pick a time'
              : 'Book my video call'}
      </button>

      <p className="text-xs text-gray-600 text-center leading-relaxed">
        Free, about fifteen minutes, no obligation. You&rsquo;ll get a confirmation email with a
        calendar invite, and your join link before the call.
      </p>
    </form>
  );
}
