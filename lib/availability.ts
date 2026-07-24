// Which appointment slots the showroom OFFERS on a given date, independent of
// what's already booked (that lives in the DB). This is the schedule/hours layer;
// `getBookedSlots` is the occupancy layer. A slot is bookable only if it's both
// offered here AND not already booked.
//
// ── Temporary override: Fri Jul 24 – Sun Aug 9, 2026 ───────────────────────────
// Same reduced pattern as the prior two weeks, extended through the weeks of
// Jul 27 and Aug 3: staffed Tue/Wed/Thu, 10:30 AM–1:30 PM (last appointment
// starts 1:30, ends 2:00). Mon/Fri/Sat/Sun closed. The remainder of the current
// week (Fri Jul 24 – Sun Jul 26) stays closed. Dates outside these entries are
// unaffected and keep the normal all-day slots — from Mon Aug 10 the site
// reopens fully unless this map is rolled forward again.
//
// NOTE: an existing reservation (Jul 31, 18:00) predates this closure; closing a
// date here only stops NEW bookings — rows already in the DB are untouched.
//
// To lift the restriction, delete the entries in WEEK_OVERRIDE (or the whole
// map) — openSlotsForDate then falls back to ALL_SLOTS for every date.

import { ALL_SLOTS } from '@/lib/slots';

const TUE_THU_WINDOW: readonly string[] = [
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
  // Remainder of the week of Jul 20
  '2026-07-24': CLOSED, // Fri — closed
  '2026-07-25': CLOSED, // Sat — closed
  '2026-07-26': CLOSED, // Sun — closed
  // Week of Jul 27
  '2026-07-27': CLOSED, // Mon — closed
  '2026-07-28': TUE_THU_WINDOW, // Tue
  '2026-07-29': TUE_THU_WINDOW, // Wed
  '2026-07-30': TUE_THU_WINDOW, // Thu
  '2026-07-31': CLOSED, // Fri — closed (one pre-existing 18:00 booking in DB)
  '2026-08-01': CLOSED, // Sat — closed
  '2026-08-02': CLOSED, // Sun — closed
  // Week of Aug 3
  '2026-08-03': CLOSED, // Mon — closed
  '2026-08-04': TUE_THU_WINDOW, // Tue
  '2026-08-05': TUE_THU_WINDOW, // Wed
  '2026-08-06': TUE_THU_WINDOW, // Thu
  '2026-08-07': CLOSED, // Fri — closed
  '2026-08-08': CLOSED, // Sat — closed
  '2026-08-09': CLOSED, // Sun — closed
};

/** Slots offered on `date` (YYYY-MM-DD). Dates with no override get all slots. */
export function openSlotsForDate(date: string): readonly string[] {
  return date in WEEK_OVERRIDE ? WEEK_OVERRIDE[date] : ALL_SLOTS;
}

/** Whether `slot` is offered on `date` (before considering existing bookings). */
export function isOpenSlot(date: string, slot: string): boolean {
  return openSlotsForDate(date).includes(slot);
}
