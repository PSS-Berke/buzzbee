'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { formatSlot, MAX_BOOKING_DAYS_AHEAD } from '@/lib/slots';
import { openSlotsForDate } from '@/lib/availability';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const mattressOptions = ['Dream', 'Slumber', 'Nod', 'Doze', 'Not sure yet'];

// No 'success' state — a booking redirects to /appointment/confirmed, so the
// form stays in 'submitting' until the browser leaves the page.
type Status = 'idle' | 'submitting' | 'error';

function todayLocalISO(): string {
  const now = new Date();
  const tz = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - tz).toISOString().slice(0, 10);
}

function localISOPlusDays(days: number): string {
  const now = new Date();
  now.setDate(now.getDate() + days);
  const tz = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - tz).toISOString().slice(0, 10);
}

export default function ReserveForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [availabilityState, setAvailabilityState] = useState<'idle' | 'loading' | 'error'>('idle');
  // Held in a ref, not state: it is never rendered, only read at submit time.
  const gclidRef = useRef('');

  // Capture the Google Ads click id so every booking can be traced back to the
  // exact campaign / keyword that produced it. Persisted for the session so it
  // survives navigation away from the ad landing URL.
  useEffect(() => {
    const KEY = 'bb_gclid';
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('gclid');
      if (fromUrl) {
        sessionStorage.setItem(KEY, fromUrl);
        gclidRef.current = fromUrl;
        return;
      }
      const stored = sessionStorage.getItem(KEY);
      if (stored) gclidRef.current = stored;
    } catch {
      /* sessionStorage unavailable — attribution is best effort */
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
    // Refetch availability and clear the chosen slot whenever the date changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAvailability(date);
    setSlot('');
  }, [date]);

  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get('name')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const phone = data.get('phone')?.toString().trim() || '';
    const errors: { name?: string; email?: string; phone?: string } = {};
    if (!name) errors.name = 'Please enter your name.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    // Phone is required: it is the only way we can send a reminder before the
    // visit, and no-shows were the single biggest leak in this funnel.
    if (phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a phone number so we can text you a reminder.';
    }
    setFieldErrors(errors);
    if (errors.name || errors.email || errors.phone) {
      (errors.name ? nameInputRef : errors.email ? emailInputRef : phoneInputRef).current?.focus();
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const payload = {
      name,
      email,
      phone,
      gclid: gclidRef.current,
      date,
      timeSlot: slot,
      mattresses: data.getAll('mattresses').map((v) => v.toString()),
      notes: data.get('notes')?.toString() || '',
      bb_check: data.get('bb_check')?.toString() || '',
      source: 'reserve-elmhurst',
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
          // Someone grabbed the slot between page-load and submit. Refresh
          // availability so the picker greys it out, and prompt user to retry.
          await fetchAvailability(date);
          setSlot('');
        }
        setStatus('error');
        setErrorMsg(
          res.status === 409 || json.code === 'slot_taken'
            ? 'That time was just taken by someone else — your selection was cleared, please pick another slot.'
            : json.error ||
                'Something went wrong on our end. Try once more, or email showroom@mybusby.com.'
        );
        return;
      }
      window.gtag?.('event', 'store_reserve_submit');
      // Full page load (not router.push) so gtag.js re-runs and fires a page_view
      // for /appointment/confirmed. The tag only configures on initial document
      // load, so a client-side navigation would leave the Google Ads URL-based
      // conversion trigger unfired. Date and slot ride along to personalise the
      // page; email deliberately does not — it is PII and would land in GA.
      const params = new URLSearchParams({ date: payload.date, slot: payload.timeSlot });
      window.location.assign(`/appointment/confirmed?${params}`);
    } catch {
      setStatus('error');
      setErrorMsg('We couldn’t reach the server. Try once more, or email showroom@mybusby.com.');
    }
  };

  const canSubmit =
    status !== 'submitting' && date !== '' && slot !== '' && availabilityState !== 'loading';

  // Slots the showroom is open for on the chosen date (schedule layer). Booked
  // slots below are then greyed out of this set.
  const openSlots = date ? openSlotsForDate(date) : [];

  return (
    <form
      onSubmit={handleSubmit}
      action="/api/reserve"
      method="POST"
      className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gold/15 shadow-sm space-y-5"
      aria-live="polite"
      noValidate
    >
      <input type="hidden" name="source" value="reserve-elmhurst" />
      <input
        type="checkbox"
        name="bb_check"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="block">
          <span className="block text-sm font-medium text-navy mb-1.5">Name</span>
          <input
            ref={nameInputRef}
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? 'reserve-name-error' : undefined}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold transition-colors"
          />
          {fieldErrors.name && (
            <p id="reserve-name-error" className="mt-1.5 text-sm text-red-600">
              {fieldErrors.name}
            </p>
          )}
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-navy mb-1.5">Email</span>
          <input
            ref={emailInputRef}
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? 'reserve-email-error' : undefined}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold transition-colors"
          />
          {fieldErrors.email && (
            <p id="reserve-email-error" className="mt-1.5 text-sm text-red-600">
              {fieldErrors.email}
            </p>
          )}
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="block">
          <span className="block text-sm font-medium text-navy mb-1.5">
            Phone
          </span>
          <input
            ref={phoneInputRef}
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={fieldErrors.phone ? true : undefined}
            aria-describedby={fieldErrors.phone ? 'reserve-phone-error' : 'reserve-phone-hint'}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold transition-colors"
          />
          {fieldErrors.phone ? (
            <p id="reserve-phone-error" className="mt-1.5 text-sm text-red-600">
              {fieldErrors.phone}
            </p>
          ) : (
            <p id="reserve-phone-hint" className="mt-1.5 text-sm text-gray-600">
              So we can text you a reminder before your visit.
            </p>
          )}
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-navy mb-1.5">Preferred date</span>
          <input
            name="date"
            type="date"
            required
            min={todayLocalISO()}
            max={localISOPlusDays(MAX_BOOKING_DAYS_AHEAD)}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold transition-colors"
          />
        </label>
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-navy mb-2">Pick a time</legend>
        {!date && (
          <p className="text-sm text-gray-600">Choose a date above to see available times.</p>
        )}
        {date && availabilityState === 'loading' && (
          <p className="text-sm text-gray-600">Loading times…</p>
        )}
        {date && availabilityState === 'error' && openSlots.length > 0 && (
          <p className="text-sm text-red-600">
            Couldn’t load availability. Pick a time anyway and we’ll confirm by email if there’s a clash.
          </p>
        )}
        {date && availabilityState !== 'loading' && openSlots.length === 0 && (
          <p className="text-sm text-gray-600">
            No appointment times are available on this date. Please choose another day.
          </p>
        )}
        {date && openSlots.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {openSlots.map((s) => {
              const taken = bookedSlots.includes(s);
              const selected = slot === s;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={taken}
                  aria-pressed={selected}
                  onClick={() => setSlot(s)}
                  className={[
                    'px-3 py-2 rounded-full border-2 text-sm transition-colors',
                    taken
                      ? 'border-gray-100 bg-gray-50 text-gray-300 line-through cursor-not-allowed'
                      : selected
                        ? 'bg-navy border-navy text-white'
                        : 'border-gray-200 text-gray-700 hover:border-navy',
                  ].join(' ')}
                >
                  {formatSlot(s)}
                </button>
              );
            })}
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend className="block text-sm font-medium text-navy mb-2">
          Mattresses you’d like to try
        </legend>
        <div className="flex flex-wrap gap-2">
          {mattressOptions.map((m) => (
            <label
              key={m}
              className="inline-flex cursor-pointer items-center gap-1.5 px-4 py-2 rounded-full border-2 border-gray-200 text-sm text-gray-700 transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold has-[:checked]:text-navy has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-navy has-[:focus-visible]:ring-offset-2"
            >
              <input type="checkbox" name="mattresses" value={m} className="peer sr-only" />
              <Check className="hidden w-4 h-4 peer-checked:inline-block" aria-hidden="true" />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="block text-sm font-medium text-navy mb-1.5">
          Anything we should know? <span className="text-gray-600 font-normal">(optional)</span>
        </span>
        <textarea
          name="notes"
          rows={3}
          placeholder="e.g., side sleeper with shoulder pain"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold transition-colors resize-none"
        />
      </label>

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
        className="w-full bg-gold hover:bg-gold-light disabled:bg-gold/60 disabled:cursor-not-allowed text-navy font-semibold px-8 py-4 rounded-full transition-colors"
      >
        {status === 'submitting' ? 'Sending…' : !date ? 'Pick a date first' : !slot ? 'Pick a time' : 'Reserve my visit'}
      </button>
    </form>
  );
}
