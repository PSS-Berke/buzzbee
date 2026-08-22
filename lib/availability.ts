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

// Keyed by YYYY-MM-DD in the showroom's local calendar.
const WEEK_OVERRIDE: Record<string, readonly string[]> = {};

/** Slots offered on `date` (YYYY-MM-DD). Dates with no override get all slots. */
export function openSlotsForDate(date: string): readonly string[] {
  return date in WEEK_OVERRIDE ? WEEK_OVERRIDE[date] : ALL_SLOTS;
}

/** Whether `slot` is offered on `date` (before considering existing bookings). */
export function isOpenSlot(date: string, slot: string): boolean {
  return openSlotsForDate(date).includes(slot);
}
