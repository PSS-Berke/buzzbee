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
