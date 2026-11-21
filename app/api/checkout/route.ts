import { NextRequest, NextResponse } from 'next/server';
import { resolveLineItem } from '@/data/products';
import { getStripe } from '@/lib/stripe';
import { friendlyError, type ErrorCode } from '@/lib/friendly-errors';
import { recordError } from '@/lib/error-log';

export const runtime = 'nodejs';

interface CheckoutItemInput {
  productId: string;
  size: string;
  quantity: number;
}

// How the order reaches the customer. Only the Studio Go page sends this
// today; the regular cart leaves it unset and always ships.
type Fulfillment = 'pickup' | 'delivery';

// Customers only ever see the friendly message; the technical reason goes to
// the /admin error log.
async function fail(req: NextRequest, code: ErrorCode, status: number, form: string, detail: string) {
  await recordError(req, code, form, { detail });
  return NextResponse.json({ code, error: friendlyError(code) }, { status });
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return fail(req, 'checkout_failed', 500, 'checkout', 'STRIPE_SECRET_KEY not configured');
  }
  let form = 'checkout';
  try {
    const { items, email, fulfillment: rawFulfillment } = (await req.json()) as {
      items?: CheckoutItemInput[];
      email?: string;
      fulfillment?: string;
    };

    if (rawFulfillment !== undefined) form = 'studio-go-checkout';
    if (rawFulfillment !== undefined && rawFulfillment !== 'pickup' && rawFulfillment !== 'delivery') {
      return fail(req, 'bad_request', 400, form, `bad fulfillment: ${String(rawFulfillment).slice(0, 40)}`);
    }
    const fulfillment = rawFulfillment as Fulfillment | undefined;

    if (!Array.isArray(items) || items.length === 0) {
      return fail(req, 'cart_empty', 400, form, 'no items');
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
      const badItems = items
        .filter((_, i) => resolved[i] === null)
        .map((it) => `${String(it?.productId).slice(0, 40)}/${String(it?.size).slice(0, 20)}x${String(it?.quantity).slice(0, 5)}`)
        .join(', ');
      return fail(req, 'item_unavailable', 400, form, `unresolvable: ${badItems}`);
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
      // Stripe fills in {CHECKOUT_SESSION_ID}; the success page uses it to
      // confirm payment before firing purchase analytics.
      success_url: fulfillment
        ? `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&fulfillment=${fulfillment}`
        : `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      // The Studio Go page is the only caller that sets fulfillment; send
      // shoppers who back out there instead of to the cart.
      cancel_url: fulfillment
        ? `${origin}/studio-go?checkout=cancelled`
        : `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return fail(
      req,
      'checkout_failed',
      500,
      form,
      `stripe: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
