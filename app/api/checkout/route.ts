import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import https from 'https';

export const runtime = 'nodejs';

const stripeAgent = new https.Agent({ keepAlive: false });

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe key not configured' }, { status: 500 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    httpAgent: stripeAgent,
  });
  try {
    const { items, email } = await req.json();

    const origin = req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email || undefined,
      line_items: items.map((item: { name: string; price: number; quantity: number; image?: string }) => ({
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.name,
            ...(item.image && origin.startsWith('https') ? { images: [new URL(item.image, origin).href] } : {}),
          },
        },
        quantity: item.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      phone_number_collection: {
        enabled: true,
      },
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
