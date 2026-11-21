import { NextRequest, NextResponse } from 'next/server';
import { canonicalizeEmail, isValidEmail } from '@/lib/submissions';
import { claimWelcome, insertSubscribe } from '@/lib/db';
import { sendUserQuizMatchEmail, sendUserSleepGuideEmail } from '@/lib/email';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { friendlyError } from '@/lib/friendly-errors';
import { recordError } from '@/lib/error-log';
import { getProductBySlug } from '@/data/products';
import { isRecommendedProduct, quizHeadlineFor } from '@/lib/quiz-logic';

export const runtime = 'nodejs';

// A quiz result, when the capture came from the end of /quiz. Present only on
// that path; its absence is what makes this an ordinary sleep-guide signup.
// Only the slug and firmness are read. The product name and headline that go
// into the email are rebuilt on the server, so this route can't be used to
// send arbitrary text to arbitrary inboxes under our name.
interface QuizMatch {
  productSlug?: string;
  firmness?: string;
}

const FIRMNESS = ['Soft', 'Medium', 'Firm'] as const;
const MAX_SOURCE = 80;
const MAX_UTM = 200;

function clip(value: string | undefined, max: number): string | null {
  const v = value?.trim();
  return v ? v.slice(0, max) : null;
}

/** The match to email, built from trusted data, or null if the input isn't a real result. */
function resolveQuizMatch(quiz: QuizMatch | undefined) {
  if (!quiz || !isRecommendedProduct(quiz.productSlug)) return null;
  const firmness = FIRMNESS.find((f) => f === quiz.firmness);
  const product = getProductBySlug(quiz.productSlug);
  if (!firmness || !product) return null;
  return {
    productSlug: quiz.productSlug,
    productName: product.name,
    firmness,
    headline: quizHeadlineFor(quiz.productSlug),
  };
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
  // The body can only be read once, so pick the parser from the content type.
  // (Trying JSON first and falling back to formData() threw "Body has already
  // been read", so every no-JS form post 500'd.)
  let payload: SubscribePayload;
  if (isFormPost(req)) {
    const form = await req.formData();
    payload = {
      email: form.get('email')?.toString(),
      source: form.get('source')?.toString(),
      utm_source: form.get('utm_source')?.toString(),
      utm_medium: form.get('utm_medium')?.toString(),
      utm_campaign: form.get('utm_campaign')?.toString(),
      bb_check: form.get('bb_check')?.toString(),
    };
  } else {
    try {
      payload = (await req.json()) as SubscribePayload;
      if (!payload || typeof payload !== 'object') throw new Error('not an object');
    } catch {
      await recordError(req, 'bad_request', 'subscribe', { detail: 'unparseable JSON body' });
      return NextResponse.json(
        { ok: false, code: 'bad_request', error: friendlyError('bad_request') },
        { status: 400 }
      );
    }
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
    await recordError(req, 'too_many_tries', payload.source ?? 'subscribe', { email: payload.email });
    if (isFormPost(req)) {
      return NextResponse.redirect(new URL('/sleep-guide/thanks?error=rate', req.url), 303);
    }
    return NextResponse.json(
      { ok: false, code: 'too_many_tries', error: friendlyError('too_many_tries') },
      { status: 429, headers: { 'Retry-After': String(rl.resetSec) } }
    );
  }

  const email = payload.email?.trim().toLowerCase() ?? '';
  const source = clip(payload.source, MAX_SOURCE) ?? 'unknown';

  if (!email || !isValidEmail(email)) {
    await recordError(req, 'email_invalid', source, { email, detail: email ? undefined : 'empty' });
    if (isFormPost(req)) {
      return NextResponse.redirect(
        new URL(`/sleep-guide/thanks?error=email`, req.url),
        303
      );
    }
    return NextResponse.json(
      { ok: false, code: 'email_invalid', error: friendlyError('email_invalid') },
      { status: 400 }
    );
  }

  // Decided before the insert, because it changes whether we consume this
  // inbox's once-ever guide welcome.
  const quizMatch = resolveQuizMatch(payload.quiz);
  const hasQuizMatch = quizMatch !== null;

  let shouldWelcome = false;
  try {
    await insertSubscribe({
      email,
      source,
      utm_source: clip(payload.utm_source, MAX_UTM),
      utm_medium: clip(payload.utm_medium, MAX_UTM),
      utm_campaign: clip(payload.utm_campaign, MAX_UTM),
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
    await recordError(req, 'server_error', source, {
      email,
      detail: `insert failed: ${err instanceof Error ? err.message : String(err)}`,
    });
    if (isFormPost(req)) {
      return NextResponse.redirect(
        new URL('/sleep-guide/thanks?error=server', req.url),
        303
      );
    }
    return NextResponse.json(
      { ok: false, code: 'server_error', error: friendlyError('server_error') },
      { status: 500 }
    );
  }

  // A quiz signup gets the thing it was promised — their match — not the generic
  // guide. It is NOT gated on `shouldWelcome`: someone who took the quiz twice
  // asked for their result twice. The once-ever guide welcome is deliberately
  // left unclaimed here, so a quiz taker can still request the guide later and
  // actually receive it. It IS capped per recipient (like booking
  // confirmations), so one inbox can't be flooded from many IPs.
  if (quizMatch) {
    const emailRl = await rateLimit('quizEmail', canonicalizeEmail(email));
    if (emailRl.allowed) {
      await sendUserQuizMatchEmail({ email, ...quizMatch }).catch((err) =>
        console.error('[subscribe] quiz match email failed', err)
      );
    } else {
      console.warn('[subscribe] per-recipient quiz email cap reached; signup saved without email');
    }
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
