import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import https from 'https';
import { resolveLineItem } from '@/data/products';

export const runtime = 'nodejs';

const stripeAgent = new https.Agent({ keepAlive: false });

interface CheckoutItemInput {
  productId: string;
  size: string;
  quantity: number;
}

// How the order reaches the customer. Only the grab and go page sends this
// today; the regular cart leaves it unset and always ships.
type Fulfillment = 'pickup' | 'delivery';

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe key not configured' }, { status: 500 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    httpAgent: stripeAgent,
  });
  try {
    const { items, email, fulfillment: rawFulfillment } = (await req.json()) as {
      items?: CheckoutItemInput[];
      email?: string;
      fulfillment?: string;
    };

    if (rawFulfillment !== undefined && rawFulfillment !== 'pickup' && rawFulfillment !== 'delivery') {
      return NextResponse.json({ error: 'Invalid fulfillment option' }, { status: 400 });
    }
    const fulfillment = rawFulfillment as Fulfillment | undefined;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const origin = req.nextUrl.origin;

    // Resolve every line against server-trusted data. Price, name, and image
    // come from data/products.ts — never from the request body — so a tampered
    // request cannot change what the customer is charged.
    const resolved = items.map((item) =>
      resolveLineItem({
        productId: item?.productId,
        size: item?.size,
        quantity: item?.quantity,
      })
    );

    if (resolved.some((r) => r === null)) {
      return NextResponse.json(
        { error: 'One or more items are invalid or unavailable' },
        { status: 400 }
      );
    }

    const line_items = resolved.map((item) => ({
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(item!.price * 100),
        // Tax is added on top of the listed price, not carved out of it.
        tax_behavior: 'exclusive' as const,
        product_data: {
          name: item!.name,
          ...(item!.image && origin.startsWith('https')
            ? { images: [new URL(item!.image, origin).href] }
            : {}),
        },
      },
      quantity: item!.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // Requires Stripe Tax to be activated in the Dashboard (Settings → Tax),
      // with an origin address and state registrations — session creation
      // fails otherwise.
      automatic_tax: { enabled: true },
      customer_email: email || undefined,
      line_items,
      // Store pickup needs no shipping address; everything else ships.
      ...(fulfillment === 'pickup'
        ? {}
        : { shipping_address_collection: { allowed_countries: ['US' as const] } }),
      ...(fulfillment
        ? {
            metadata: { fulfillment },
            custom_text: {
              submit: {
                message:
                  fulfillment === 'pickup'
                    ? 'Store pickup at 665 W North Ave, Elmhurst. Ready in 72 hours. We will contact you to set a time.'
                    : 'Delivered to your door within 96 hours. We will contact you to set a delivery window.',
              },
            },
          }
        : {}),
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: true,
      success_url: fulfillment
        ? `${origin}/checkout/success?fulfillment=${fulfillment}`
        : `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
