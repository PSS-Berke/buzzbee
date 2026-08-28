import { NextRequest, NextResponse } from 'next/server';
import { canonicalizeEmail, isValidEmail } from '@/lib/submissions';
import { claimWelcome, insertSubscribe } from '@/lib/db';
import { sendUserQuizMatchEmail, sendUserSleepGuideEmail } from '@/lib/email';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

// A quiz result, when the capture came from the end of /quiz. Present only on
// that path; its absence is what makes this an ordinary sleep-guide signup.
interface QuizMatch {
  productSlug?: string;
  productName?: string;
  firmness?: string;
  headline?: string;
}

interface SubscribePayload {
  email?: string;
  source?: string;
  quiz?: QuizMatch;
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

  // Decided before the insert, because it changes whether we consume this
  // inbox's once-ever guide welcome.
  const quiz = payload.quiz;
  const hasQuizMatch = !!(quiz?.productSlug && quiz.productName && quiz.firmness);

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
    // Skipped for quiz signups: they get their match instead of the guide, so
    // burning the claim here would silently deny them the guide later.
    if (!hasQuizMatch) {
      shouldWelcome = await claimWelcome(canonicalizeEmail(email));
    }
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

  // A quiz signup gets the thing it was promised — their match — not the generic
  // guide. It is NOT gated on `shouldWelcome`: someone who took the quiz twice
  // asked for their result twice. The once-ever guide welcome is deliberately
  // left unclaimed here, so a quiz taker can still request the guide later and
  // actually receive it.
  if (hasQuizMatch) {
    await sendUserQuizMatchEmail({
      email,
      productSlug: quiz!.productSlug!,
      productName: quiz!.productName!,
      firmness: quiz!.firmness!,
      headline: quiz!.headline ?? '',
    }).catch((err) => console.error('[subscribe] quiz match email failed', err));
  } else if (shouldWelcome) {
    // Welcome email fires at most once per inbox, ever. Failures are logged, not fatal.
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
