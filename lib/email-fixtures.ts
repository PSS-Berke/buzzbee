import type { OrderInput } from './db';
import type { ReservationPayload } from './email';

export const SAMPLE_SLEEP_GUIDE_TO = 'sample@example.com';

export const SAMPLE_RESERVATION: ReservationPayload = {
  name: 'Avery Chen',
  email: 'avery@example.com',
  phone: '+16305550142',
  preferred_date: '2026-05-17',
  time_slot: '14:00',
  mattresses: ['Beautyrest Black', 'Stearns & Foster Lux Estate'],
  notes: 'Side sleeper, prefer firm. Bringing partner.',
  source: 'product-page',
  location: 'elmhurst',
};

/** Sample paid Studio Go pickup order for the order email previews. */
export const SAMPLE_ORDER: OrderInput = {
  stripe_session_id: 'cs_test_sample0000000000',
  email: 'jordan@example.com',
  name: 'Jordan Rivera',
  phone: '+16305550142',
  amount_total: 64837,
  currency: 'usd',
  fulfillment: 'pickup',
  shipping_address: null,
  line_items: [{ name: 'Studio Go - Queen', quantity: 1, amount_total: 59900 }],
};
