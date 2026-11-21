import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Whether a Checkout Session was paid, for the success page. Session ids are
 * unguessable and the response carries no personal data, so this is public.
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('session_id') ?? '';
  const stripe = getStripe();
  if (!stripe || !/^cs_[A-Za-z0-9_]{10,200}$/.test(id)) {
    return NextResponse.json({ paid: false }, { headers: { 'Cache-Control': 'no-store' } });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    const meta = session.metadata?.fulfillment;
    return NextResponse.json(
      {
        paid: session.payment_status === 'paid',
        fulfillment: meta === 'pickup' || meta === 'delivery' ? meta : null,
        value: (session.amount_total ?? 0) / 100,
        currency: (session.currency ?? 'usd').toUpperCase(),
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json({ paid: false }, { headers: { 'Cache-Control': 'no-store' } });
  }
}
