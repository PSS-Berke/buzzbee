import 'server-only';
import Stripe from 'stripe';
import https from 'https';

// Same agent settings /api/checkout has always used.
const stripeAgent = new https.Agent({ keepAlive: false });

let _stripe: Stripe | null = null;

/** Shared Stripe client, or null when STRIPE_SECRET_KEY isn't configured. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!_stripe) _stripe = new Stripe(key, { httpAgent: stripeAgent });
  return _stripe;
}
