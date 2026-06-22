import { NextRequest, NextResponse } from 'next/server';
import { canonicalizeEmail, isValidEmail } from '@/lib/submissions';
import { claimWelcome, insertSubscribe } from '@/lib/db';
import { sendUserSleepGuideEmail } from '@/lib/email';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

interface SubscribePayload {
  email?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  bb_check?: string; // honeypot — real users never fill this in
}

function isFormPost(req: NextRequest): boolean {
  const ct = req.headers.get('content-type') ?? '';
  return ct.includes('form');
}

export async function POST(req: NextRequest) {
  let payload: SubscribePayload;
  try {
    payload = (await req.json()) as SubscribePayload;
  } catch {
    const form = await req.formData();
    payload = {
      email: form.get('email')?.toString(),
      source: form.get('source')?.toString(),
      utm_source: form.get('utm_source')?.toString(),
      utm_medium: form.get('utm_medium')?.toString(),
      utm_campaign: form.get('utm_campaign')?.toString(),
      bb_check: form.get('bb_check')?.toString(),
    };
  }

  // Honeypot — bot filled the hidden field. Pretend success, do nothing.
  if (payload.bb_check && payload.bb_check.trim() !== '') {
    if (isFormPost(req)) {
      return NextResponse.redirect(new URL('/sleep-guide/thanks', req.url), 303);
    }
    return NextResponse.json({ ok: true });
  }

  const rl = await rateLimit('subscribe', getClientIp(req));
  if (!rl.allowed) {
    if (isFormPost(req)) {
      return NextResponse.redirect(new URL('/sleep-guide/thanks?error=rate', req.url), 303);
    }
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please wait a bit and try again.' },
      { status: 429, headers: { 'Retry-After': String(rl.resetSec) } }
    );
  }

  const email = payload.email?.trim().toLowerCase() ?? '';
  const source = payload.source ?? 'unknown';

  if (!email || !isValidEmail(email)) {
    if (isFormPost(req)) {
      return NextResponse.redirect(
        new URL(`/sleep-guide/thanks?error=email`, req.url),
        303
      );
    }
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  let shouldWelcome = false;
  try {
    await insertSubscribe({
      email,
      source,
      utm_source: payload.utm_source ?? null,
      utm_medium: payload.utm_medium ?? null,
      utm_campaign: payload.utm_campaign ?? null,
    });
    // Atomically claim the once-ever welcome for this inbox (canonical form, so
    // source rotation and gmail aliases can't re-trigger it). Race-proof: only
    // the first caller for a brand-new address gets `true`.
    shouldWelcome = await claimWelcome(canonicalizeEmail(email));
  } catch (err) {
    console.error('[subscribe] db insert failed', err);
    if (isFormPost(req)) {
      return NextResponse.redirect(
        new URL('/sleep-guide/thanks?error=server', req.url),
        303
      );
    }
    return NextResponse.json(
      { ok: false, error: 'Something on our end. Try again in a moment.' },
      { status: 500 }
    );
  }

  // Welcome email fires at most once per inbox, ever. Failures are logged, not fatal.
  if (shouldWelcome) {
    await sendUserSleepGuideEmail(email).catch((err) =>
      console.error('[subscribe] user email failed', err)
    );
  }

  if (isFormPost(req)) {
    const thanks = new URL('/sleep-guide/thanks', req.url);
    thanks.searchParams.set('source', source);
    return NextResponse.redirect(thanks, 303);
  }

  return NextResponse.json({ ok: true });
}
