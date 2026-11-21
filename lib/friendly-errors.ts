/**
 * Every error a customer can see, in one place and one voice: warm, a little
 * playful, never blaming, and always saying what to do next. Each has a stable
 * code so it can be counted in /admin and in Analytics without parsing copy.
 *
 * Shared by the API routes and the browser forms, so it must stay free of
 * server-only imports.
 */

export const SHOWROOM_PHONE = '(844) 886-1640';

export const FRIENDLY_ERRORS = {
  // ── Things the customer typed ──
  name_missing: 'We’d love to know what to call you. Pop your name in?',
  email_invalid: 'That email looks a little sleepy. Mind giving it another look?',
  phone_missing: 'Add a phone number so we can reach you if anything changes.',
  phone_invalid: 'That number’s missing a digit or two. We just need a 10-digit US number.',
  date_missing: 'Pick a day on the calendar and we’ll fluff the pillows.',
  date_too_soon: 'We need a night to get ready for you. Tomorrow or later works perfectly.',
  date_too_far: 'That’s a little far out for our calendar. Pick a day in the next three months?',
  slot_missing: 'Choose a time and we’ll save your spot.',

  // ── Timing and availability ──
  slot_taken: 'Someone just snuggled into that time. Pick another and it’s all yours.',
  slot_closed: 'We’re closed then, sorry! Any of the open times will work.',
  availability_unavailable:
    'We couldn’t check the calendar just now. Pick a time anyway and we’ll confirm by email.',

  // ── Cart and checkout ──
  cart_empty: 'Your bag is empty! Find a mattress you love first.',
  item_unavailable:
    'Something in your bag just sold out in that size. Take a peek at your cart and we’ll get you on your way.',
  checkout_failed: `Checkout tripped over its own blanket. Try again, or call us at ${SHOWROOM_PHONE} and we’ll take your order by phone.`,

  // ── Our side ──
  too_many_tries: 'Whoa, that’s a lot of tries in a row. Take a breather and try again in a few minutes.',
  server_error: `Our side dozed off for a second. Try again in a moment, or call us at ${SHOWROOM_PHONE}.`,
  network_error: `We couldn’t reach our servers. Check your connection and try once more, or call us at ${SHOWROOM_PHONE}.`,
  bad_request: `Something got scrambled on the way to us. Refresh the page and try again, or call us at ${SHOWROOM_PHONE}.`,
} as const;

export type ErrorCode = keyof typeof FRIENDLY_ERRORS;

export function isErrorCode(value: unknown): value is ErrorCode {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(FRIENDLY_ERRORS, value);
}

/** The customer-facing message for a code, falling back to the generic one. */
export function friendlyError(code: unknown): string {
  return isErrorCode(code) ? FRIENDLY_ERRORS[code] : FRIENDLY_ERRORS.server_error;
}
