'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { formatSlot, MAX_BOOKING_DAYS_AHEAD } from '@/lib/slots';
import { localISOPlusDays, todayLocalISO, useAvailability } from '@/hooks/useAvailability';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Status = 'idle' | 'submitting' | 'error';

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export default function FittingForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const { openSlots, booked, state: availability, refresh } = useAvailability(date);
  // Held in a ref, not state: it is never rendered, only read at submit time.
  const gclidRef = useRef('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Persist the Google Ads click id for the session so the lead can be traced
  // back to the exact campaign and search term that produced it.
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = data.get('name')?.toString().trim() || '';
    const phone = data.get('phone')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';

    const errors: FieldErrors = {};
    if (!name) errors.name = 'Please enter your name.';
    if (phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a phone number we can reach you on.';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    setFieldErrors(errors);
    if (errors.name || errors.phone || errors.email) {
      (errors.name ? nameRef : errors.phone ? phoneRef : emailRef).current?.focus();
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
      notes: data.get('notes')?.toString() || '',
      bb_check: data.get('bb_check')?.toString() || '',
      source: 'book-a-fitting',
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
          // Someone booked it between page load and submit. Refresh so the
          // picker greys it out, and make the visitor choose again.
          await refresh(date);
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
      window.gtag?.('event', 'fitting_request_submit');
      // Full page load, not a client-side push, so gtag.js re-runs and the
      // URL-based Google Ads conversion on /appointment/confirmed actually fires.
      const params = new URLSearchParams({ date, slot });
      globalThis.location.assign(`/appointment/confirmed?${params}`);
    } catch {
      setStatus('error');
      setErrorMsg('We couldn’t reach the server. Try once more, or call (844) 886-1640.');
    }
  };

  const inputClass =
    'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition-colors';

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
        <label htmlFor="fit-name" className="block text-sm font-medium text-navy mb-1.5">
          Name
        </label>
        <input
          id="fit-name"
          ref={nameRef}
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? 'fit-name-error' : undefined}
          className={inputClass}
        />
        {fieldErrors.name && (
          <p id="fit-name-error" className="mt-1.5 text-sm text-red-600">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fit-phone" className="block text-sm font-medium text-navy mb-1.5">
            Mobile number
          </label>
          <input
            id="fit-phone"
            ref={phoneRef}
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={fieldErrors.phone ? true : undefined}
            aria-describedby={fieldErrors.phone ? 'fit-phone-error' : 'fit-phone-hint'}
            className={inputClass}
          />
          {fieldErrors.phone ? (
            <p id="fit-phone-error" className="mt-1.5 text-sm text-red-600">
              {fieldErrors.phone}
            </p>
          ) : (
            <p id="fit-phone-hint" className="mt-1.5 text-xs text-gray-600">
              So we can reach you if plans change.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="fit-email" className="block text-sm font-medium text-navy mb-1.5">
            Email
          </label>
          <input
            id="fit-email"
            ref={emailRef}
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? 'fit-email-error' : undefined}
            className={inputClass}
          />
          {fieldErrors.email && (
            <p id="fit-email-error" className="mt-1.5 text-sm text-red-600">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="fit-date" className="block text-sm font-medium text-navy mb-1.5">
          Pick a day
        </label>
        <input
          id="fit-date"
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
        <legend className="block text-sm font-medium text-navy mb-2">Pick a time</legend>

        {!date && <p className="text-sm text-gray-600">Choose a day above to see open times.</p>}
        {date && availability === 'loading' && (
          <p className="text-sm text-gray-600">Loading times…</p>
        )}
        {date && availability === 'error' && openSlots.length > 0 && (
          <p className="text-sm text-red-600">
            Couldn&rsquo;t load availability. Pick a time anyway and we&rsquo;ll confirm by email if
            there&rsquo;s a clash.
          </p>
        )}
        {date && availability !== 'loading' && openSlots.length === 0 && (
          <p className="text-sm text-gray-600">
            The showroom is closed that day. Please choose another.
          </p>
        )}

        {date && openSlots.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {openSlots.map((s) => {
              const taken = booked.includes(s);
              const selected = slot === s;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={taken}
                  aria-pressed={selected}
                  onClick={() => setSlot(s)}
                  className={[
                    'min-h-11 px-3 py-2.5 rounded-full border-2 text-sm transition-colors',
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

      <div>
        <label htmlFor="fit-notes" className="block text-sm font-medium text-navy mb-1.5">
          Anything we should know?{' '}
          <span className="text-gray-600 font-normal">(optional)</span>
        </label>
        <textarea
          id="fit-notes"
          name="notes"
          rows={2}
          className={inputClass}
          placeholder="Who's coming, what you're replacing, anything else."
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting' || !date || !slot}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold rounded-full px-8 py-4 text-lg hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' && <Loader2 className="w-5 h-5 animate-spin" />}
        {status === 'submitting'
          ? 'Sending…'
          : !date
            ? 'Pick a day first'
            : !slot
              ? 'Pick a time'
              : 'Book my fitting'}
      </button>

      <p className="text-xs text-gray-600 text-center leading-relaxed">
        Free, no obligation. You&rsquo;ll get a confirmation email with a calendar invite straight
        away.
      </p>
    </form>
  );
}
