'use client';

import { FormEvent, useRef, useState } from 'react';
import { Check, Loader2, Mail } from 'lucide-react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Status = 'idle' | 'submitting' | 'done' | 'error';

interface QuizEmailCaptureProps {
  productSlug: string;
  productName: string;
  firmness: string;
  headline: string;
}

/**
 * Email capture at the END of the quiz, not in front of it.
 *
 * The quiz is the best-engaged page on the site — 36s average against 3s on the
 * gated sleep guide — and it asks for nothing, which is probably why. So the ask
 * goes after the payoff, and what we send is the result they just earned rather
 * than a PDF. That also gives the ad account a retargetable audience with real
 * intent, which is the whole point of the post-Labor-Day pivot.
 */
export default function QuizEmailCapture({
  productSlug,
  productName,
  firmness,
  headline,
}: QuizEmailCaptureProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email')?.toString().trim() || '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      inputRef.current?.focus();
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'quiz-result',
          bb_check: data.get('bb_check')?.toString() || '',
          quiz: { productSlug, productName, firmness, headline },
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) {
        setStatus('error');
        setErrorMsg(json.error || 'Something went wrong. Try once more.');
        return;
      }
      // Secondary conversion only. Never make this a primary bidding target —
      // Google would go and find people who like filling in forms.
      window.gtag?.('event', 'quiz_email_capture');
      setStatus('done');
    } catch {
      setStatus('error');
      setErrorMsg('We couldn’t reach the server. Try once more.');
    }
  };

  if (status === 'done') {
    return (
      <div className="max-w-lg mx-auto rounded-2xl border-2 border-gold/25 bg-gold/[0.07] p-6 text-center">
        <Check className="w-6 h-6 text-gold-dark mx-auto" aria-hidden="true" />
        <p className="mt-3 font-semibold text-navy">On its way.</p>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
          Your match is in your inbox. Reply to it with a question if you have one, a person reads
          those.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto rounded-2xl border-2 border-gold/25 bg-white p-6 text-left"
      noValidate
    >
      <input
        type="checkbox"
        name="bb_check"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <p className="flex items-center gap-2 font-semibold text-navy">
        <Mail className="w-4 h-4 text-gold-dark" aria-hidden="true" />
        Want this emailed to you?
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
        We&rsquo;ll send your match and the firmness so you have it when you&rsquo;re ready. No
        newsletter, no drip.
      </p>

      <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
        <label htmlFor="quiz-email" className="sr-only">
          Email address
        </label>
        <input
          id="quiz-email"
          ref={inputRef}
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={status === 'error' ? true : undefined}
          aria-describedby={status === 'error' ? 'quiz-email-error' : undefined}
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 bg-navy text-white font-semibold rounded-xl px-6 py-3 hover:bg-navy/90 transition-colors disabled:opacity-60"
        >
          {status === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" />}
          {status === 'submitting' ? 'Sending…' : 'Send it'}
        </button>
      </div>

      {status === 'error' && (
        <p id="quiz-email-error" className="mt-2 text-sm text-red-600" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
