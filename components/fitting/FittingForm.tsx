'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Status = 'idle' | 'submitting' | 'error';

// Rough windows instead of a calendar. A cold visitor will tap a chip; far
// fewer will commit to an exact date and slot before they have spoken to anyone.
const TIME_WINDOWS = [
  'As soon as possible',
  'Weekday mornings',
  'Weekday evenings',
  'Saturday',
  'Sunday',
];

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export default function FittingForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [window_, setWindow_] = useState<string>(TIME_WINDOWS[0]);
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
      preferredTime: window_,
      notes: data.get('notes')?.toString() || '',
      bb_check: data.get('bb_check')?.toString() || '',
      source: 'request-visit',
      gclid: gclidRef.current,
    };

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) {
        setStatus('error');
        setErrorMsg(
          json.error || 'Something went wrong on our end. Try once more, or call (844) 886-1640.'
        );
        return;
      }
      window.gtag?.('event', 'fitting_request_submit');
      // Full page load, not a client-side push, so gtag.js re-runs and the
      // URL-based Google Ads conversion on /appointment/confirmed actually fires.
      globalThis.location.assign('/appointment/confirmed');
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
              We text to confirm your time.
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

      <fieldset>
        <legend className="block text-sm font-medium text-navy mb-2">
          When suits you best?
        </legend>
        <div className="flex flex-wrap gap-2">
          {TIME_WINDOWS.map((w) => {
            const selected = window_ === w;
            return (
              <button
                key={w}
                type="button"
                onClick={() => setWindow_(w)}
                aria-pressed={selected}
                className={`px-4 py-2.5 rounded-full text-sm font-medium border-2 transition-colors ${
                  selected
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-navy border-gray-200 hover:border-gold'
                }`}
              >
                {w}
              </button>
            );
          })}
        </div>
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
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold rounded-full px-8 py-4 text-lg hover:bg-gold-light transition-colors disabled:opacity-60"
      >
        {status === 'submitting' && <Loader2 className="w-5 h-5 animate-spin" />}
        {status === 'submitting' ? 'Sending…' : 'Request my fitting'}
      </button>

      <p className="text-xs text-gray-600 text-center leading-relaxed">
        No cost, no obligation. We&rsquo;ll text you within one business day to lock in a time.
      </p>
    </form>
  );
}
