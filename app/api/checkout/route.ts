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

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe key not configured' }, { status: 500 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    httpAgent: stripeAgent,
  });
  try {
    const { items, email } = (await req.json()) as {
      items?: CheckoutItemInput[];
      email?: string;
    };

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
      customer_email: email || undefined,
      line_items,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: true,
      success_url: `${origin}/checkout/success`,
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
