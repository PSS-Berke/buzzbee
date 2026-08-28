// Which appointment slots the showroom OFFERS on a given date, independent of
// what's already booked (that lives in the DB). This is the schedule/hours layer;
// `getBookedSlots` is the occupancy layer. A slot is bookable only if it's both
// offered here AND not already booked.
//
// Default behavior is ALL_SLOTS (9 AM–7 PM) every day — the showroom accepts
// appointments across the full window even outside staffed hours, because a
// Sleep Guide meets each guest at the door. Populate WEEK_OVERRIDE only for
// date-specific closures or reduced windows.

import { ALL_SLOTS } from '@/lib/slots';

const CLOSED: readonly string[] = [];

// Keyed by YYYY-MM-DD in the showroom's local calendar.
// Entries in the past are harmless (the form's min date hides them) but clean
// them out when rolling forward so this stays readable.
const WEEK_OVERRIDE: Record<string, readonly string[]> = {
  // Weekend of Aug 29–30, 2026: showroom closed, no appointments (per Robert).
  // No reservations existed on these dates when they were closed.
  '2026-08-29': CLOSED, // Sat
  '2026-08-30': CLOSED, // Sun
};

/** Slots offered on `date` (YYYY-MM-DD). Dates with no override get all slots. */
export function openSlotsForDate(date: string): readonly string[] {
  return date in WEEK_OVERRIDE ? WEEK_OVERRIDE[date] : ALL_SLOTS;
}

/** Whether `slot` is offered on `date` (before considering existing bookings). */
export function isOpenSlot(date: string, slot: string): boolean {
  return openSlotsForDate(date).includes(slot);
}
