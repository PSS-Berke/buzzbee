import { NextRequest, NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/submissions';
import { insertSubscribe } from '@/lib/db';
import { sendUserSleepGuideEmail } from '@/lib/email';

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

  let duplicate = false;
  try {
    const result = await insertSubscribe({
      email,
      source,
      utm_source: payload.utm_source ?? null,
      utm_medium: payload.utm_medium ?? null,
      utm_campaign: payload.utm_campaign ?? null,
    });
    duplicate = result.duplicate;
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

  // On a duplicate signup we skip the user-facing confirmation (don't spam returning visitors).
  // Failures are logged but don't fail the request.
  if (!duplicate) {
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
