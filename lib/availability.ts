// Which appointment slots the showroom OFFERS on a given date, independent of
// what's already booked (that lives in the DB). This is the schedule/hours layer;
// `getBookedSlots` is the occupancy layer. A slot is bookable only if it's both
// offered here AND not already booked.
//
// Default behavior is ALL_SLOTS (9 AM–7 PM) every day, minus a random-looking
// share held back each day (HOLD_BACK_SHARE) — the showroom accepts
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

// Share of each day's slots held back from booking, so the calendar never reads
// as wide open. Which slots are held is pseudo-random but deterministic per
// date+slot: every server and browser agrees, a reload never reshuffles, and the
// pattern changes day to day on its own. Held slots are genuinely unbookable —
// /api/reserve rejects them via isOpenSlot. Set to 0 to turn this off.
const HOLD_BACK_SHARE = 0.35;

// FNV-1a — tiny, stable 32-bit string hash (not for security).
function hash32(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Whether `slot` on `date` is held back from booking (see HOLD_BACK_SHARE). */
export function isHeldBack(date: string, slot: string): boolean {
  return hash32(`${date}|${slot}`) / 0x1_0000_0000 < HOLD_BACK_SHARE;
}

/**
 * The day's schedule before hold-backs: WEEK_OVERRIDE if the date has one, else
 * every slot. Pickers that show held slots as unavailable render from this.
 */
export function scheduledSlotsForDate(date: string): readonly string[] {
  return date in WEEK_OVERRIDE ? WEEK_OVERRIDE[date] : ALL_SLOTS;
}

/** Slots offered on `date` (YYYY-MM-DD): the schedule minus held-back slots. */
export function openSlotsForDate(date: string): readonly string[] {
  return scheduledSlotsForDate(date).filter((slot) => !isHeldBack(date, slot));
}

/** Whether `slot` is offered on `date` (before considering existing bookings). */
export function isOpenSlot(date: string, slot: string): boolean {
  return openSlotsForDate(date).includes(slot);
}
