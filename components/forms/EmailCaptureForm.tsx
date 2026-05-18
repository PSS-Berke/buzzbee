'use client';

import { FormEvent, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface Props {
  source: string;
  buttonLabel?: string;
  placeholder?: string;
  /** layout style — 'inline' for footer-style horizontal, 'stacked' for hero LP */
  layout?: 'inline' | 'stacked';
  /** for analytics — distinguish hero vs mid-page form on the LP */
  formPosition?: 'hero' | 'mid-page' | 'footer';
  microcopy?: string;
  successHeading?: string;
  successBody?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function EmailCaptureForm({
  source,
  buttonLabel = 'Send me the guide',
  placeholder = 'your@email.com',
  layout = 'stacked',
  formPosition = 'hero',
  microcopy = 'We won’t spam you. Unsubscribe anytime.',
  successHeading = 'Check your inbox.',
  successBody = 'Your Sleep Guide is on its way. (Subject line: “Your Busby Sleep Guide.”) If you don’t see it in 5 minutes, peek in spam or support@mybusby.com will sort it out.',
}: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string)?.trim();
    const honeypot = (formData.get('bb_check') as string)?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('That email doesn’t look right — could you double-check?');
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const payload = {
      email,
      source,
      bb_check: honeypot || undefined,
      utm_source: params.get('utm_source') ?? undefined,
      utm_medium: params.get('utm_medium') ?? undefined,
      utm_campaign: params.get('utm_campaign') ?? undefined,
    };

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) {
        setStatus('error');
        setErrorMsg(
          json.error ||
            'Something on our end. Try once more, or email newsletter@mybusby.com and we’ll add you manually.'
        );
        return;
      }
      window.gtag?.('event', 'lp_form_submit', { form_position: formPosition, source });
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg(
        'We couldn’t reach the server. Try once more, or email newsletter@mybusby.com.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="text-left" role="status" aria-live="polite">
        <h3 className="text-2xl font-serif text-navy mb-3">{successHeading}</h3>
        <p className="text-gray-600 leading-relaxed">{successBody}</p>
      </div>
    );
  }

  if (layout === 'inline') {
    return (
      <form
        onSubmit={handleSubmit}
        action="/api/subscribe"
        method="POST"
        className="flex gap-2 w-full md:w-auto"
        noValidate
      >
        <input type="hidden" name="source" value={source} />
        <input
          type="checkbox"
          name="bb_check"
          tabIndex={-1}
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />
        <label htmlFor={`email-${source}`} className="sr-only">
          Email
        </label>
        <input
          id={`email-${source}`}
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder={placeholder}
          className="flex-1 md:w-64 px-4 py-2.5 rounded-full bg-navy-light border border-navy-light text-white placeholder-gray-400 focus:outline-none focus:border-gold"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-gold hover:bg-gold-dark disabled:bg-gold/60 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
        >
          {status === 'submitting' ? 'Sending…' : buttonLabel}
        </button>
        {status === 'error' && (
          <p className="sr-only" aria-live="polite" role="alert">
            {errorMsg}
          </p>
        )}
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="/api/subscribe"
      method="POST"
      className="w-full max-w-md"
      aria-live="polite"
      noValidate
    >
      <input type="hidden" name="source" value={source} />
      <input
        type="checkbox"
        name="bb_check"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      <label htmlFor={`email-${source}`} className="sr-only">
        Email
      </label>
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <input
          id={`email-${source}`}
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder={placeholder}
          className="flex-1 px-5 py-3.5 rounded-full border-2 border-gray-200 bg-white focus:border-gold focus:outline-none transition-colors text-base"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-gold hover:bg-gold-dark disabled:bg-gold/60 text-white font-semibold px-7 py-3.5 rounded-full transition-colors whitespace-nowrap"
        >
          {status === 'submitting' ? 'Sending…' : buttonLabel}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600 mb-2" role="alert">
          {errorMsg}
        </p>
      )}
      <p className="text-xs text-gray-500">{microcopy}</p>
    </form>
  );
}
