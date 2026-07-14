// Which appointment slots the showroom OFFERS on a given date, independent of
// what's already booked (that lives in the DB). This is the schedule/hours layer;
// `getBookedSlots` is the occupancy layer. A slot is bookable only if it's both
// offered here AND not already booked.
//
// ── Temporary override: week of Mon Jul 13 – Sun Jul 19, 2026 ──────────────────
// This week the showroom is only staffed Tue/Wed/Thu, 10:30 AM–1:30 PM (last
// appointment starts 1:30, ends 2:00). Every other day THIS WEEK is closed.
// Dates outside this week are unaffected and keep the normal all-day slots.
//
// To lift the restriction, delete the entries in WEEK_OVERRIDE (or the whole
// map) — openSlotsForDate then falls back to ALL_SLOTS for every date.

import { ALL_SLOTS } from '@/lib/slots';

const THIS_WEEK_WINDOW: readonly string[] = [
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
];

const CLOSED: readonly string[] = [];

// Keyed by YYYY-MM-DD in the showroom's local calendar.
const WEEK_OVERRIDE: Record<string, readonly string[]> = {
  '2026-07-13': CLOSED, // Mon — closed
  '2026-07-14': THIS_WEEK_WINDOW, // Tue
  '2026-07-15': THIS_WEEK_WINDOW, // Wed
  '2026-07-16': THIS_WEEK_WINDOW, // Thu
  '2026-07-17': CLOSED, // Fri — closed
  '2026-07-18': CLOSED, // Sat — closed
  '2026-07-19': CLOSED, // Sun — closed
};

/** Slots offered on `date` (YYYY-MM-DD). Dates with no override get all slots. */
export function openSlotsForDate(date: string): readonly string[] {
  return date in WEEK_OVERRIDE ? WEEK_OVERRIDE[date] : ALL_SLOTS;
}

/** Whether `slot` is offered on `date` (before considering existing bookings). */
export function isOpenSlot(date: string, slot: string): boolean {
  return openSlotsForDate(date).includes(slot);
}
