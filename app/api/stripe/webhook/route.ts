import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { deleteOrder, insertOrder, type OrderInput } from '@/lib/db';
import { sendAdminOrderEmail, sendUserOrderEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Stripe webhook: records each paid Checkout Session in `orders` and emails the
 * team and the customer.
 *
 * Setup (Stripe Dashboard → Developers → Webhooks): add an endpoint at
 * https://www.mybusby.com/api/stripe/webhook listening for
 * `checkout.session.completed` and `checkout.session.async_payment_succeeded`,
 * then put its signing secret in STRIPE_WEBHOOK_SECRET. Run
 * scripts/migrate-orders.mjs once to create the table.
 *
 * Idempotent: the session id is the primary key, so Stripe's retries and the
 * two event types for one session record (and email) it once.
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    console.error('[stripe-webhook] STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Not configured.' }, { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature.' }, { status: 400 });
  }

  // Signature verification needs the exact raw body.
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.warn('[stripe-webhook] bad signature', err);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  if (
    event.type !== 'checkout.session.completed' &&
    event.type !== 'checkout.session.async_payment_succeeded'
  ) {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  // A delayed payment method completes the session unpaid; it is recorded when
  // the async_payment_succeeded event arrives.
  if (session.payment_status !== 'paid') {
    return NextResponse.json({ received: true });
  }

  let order: OrderInput;
  try {
    order = await buildOrder(stripe, session);
  } catch (err) {
    console.error('[stripe-webhook] could not load session details', err);
    return NextResponse.json({ error: 'Could not load session.' }, { status: 500 });
  }

  let isNew: boolean;
  try {
    isNew = await insertOrder(order);
  } catch (err) {
    console.error('[stripe-webhook] order insert failed', err);
    // 500 so Stripe retries.
    return NextResponse.json({ error: 'Database error.' }, { status: 500 });
  }
  if (!isNew) return NextResponse.json({ received: true, duplicate: true });

  const [admin, user] = await Promise.allSettled([
    sendAdminOrderEmail(order),
    sendUserOrderEmail(order),
  ]);
  if (admin.status === 'rejected') {
    // The team must hear about every order. Drop the row and fail so Stripe
    // retries the whole thing (the customer email may then send twice, which
    // beats an order nobody knows about).
    console.error('[stripe-webhook] admin order email failed; will retry', admin.reason);
    await deleteOrder(order.stripe_session_id).catch((err) =>
      console.error('[stripe-webhook] could not roll back order row', err)
    );
    return NextResponse.json({ error: 'Notification failed.' }, { status: 500 });
  }
  if (user.status === 'rejected') {
    console.error('[stripe-webhook] customer order email failed', user.reason);
  }

  return NextResponse.json({ received: true });
}

async function buildOrder(stripe: Stripe, session: Stripe.Checkout.Session): Promise<OrderInput> {
  const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
  const meta = session.metadata?.fulfillment;
  const fulfillment: OrderInput['fulfillment'] =
    meta === 'pickup' || meta === 'delivery' ? meta : 'ship';
  const shipping = session.collected_information?.shipping_details;
  const addr = shipping?.address;
  const details = session.customer_details;

  return {
    stripe_session_id: session.id,
    email: details?.email ?? session.customer_email ?? null,
    name: shipping?.name ?? details?.name ?? null,
    phone: details?.phone ?? null,
    amount_total: session.amount_total ?? 0,
    currency: session.currency ?? 'usd',
    fulfillment,
    shipping_address: addr
      ? {
          line1: addr.line1 ?? null,
          line2: addr.line2 ?? null,
          city: addr.city ?? null,
          state: addr.state ?? null,
          postal_code: addr.postal_code ?? null,
        }
      : null,
    line_items: items.data.map((li) => ({
      name: li.description ?? 'Item',
      quantity: li.quantity ?? 1,
      amount_total: li.amount_total,
    })),
  };
}
