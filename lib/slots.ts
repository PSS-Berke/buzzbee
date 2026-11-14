// Reservation time slots for the Elmhurst showroom.
// 30-minute slots, 9:00 AM through 7:00 PM (last slot starts 6:30 PM).

const FIRST_HOUR = 9;
const LAST_HOUR = 19; // exclusive — last slot starts at 18:30, ends at 19:00

// How far ahead a visit can be booked. Bounds the distinct (date, slot) space so
// a booking flood can't generate unlimited reservations/notifications, and keeps
// the date picker sane. Enforced server-side; the form mirrors it as a max.
export const MAX_BOOKING_DAYS_AHEAD = 90;

// No same-day visits: a Sleep Guide has to be scheduled to meet each guest, so
// the earliest bookable date is tomorrow in the showroom's calendar. Enforced
// server-side in /api/reserve; every booking form mirrors it as the date min.
export const MIN_BOOKING_DAYS_AHEAD = 1;

export const SHOWROOM_TZ = 'America/Chicago';

/** Today (YYYY-MM-DD) in the showroom's calendar. */
export function showroomToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: SHOWROOM_TZ }).format(new Date());
}

/** `days` after today (YYYY-MM-DD) in the showroom's calendar. */
export function showroomDatePlusDays(days: number): string {
  const [y, m, d] = showroomToday().split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

/** Earliest bookable date (tomorrow, showroom time). */
export function earliestBookingDate(): string {
  return showroomDatePlusDays(MIN_BOOKING_DAYS_AHEAD);
}

/** Latest bookable date, MAX_BOOKING_DAYS_AHEAD past today (showroom time). */
export function latestBookingDate(): string {
  return showroomDatePlusDays(MAX_BOOKING_DAYS_AHEAD);
}

function buildSlots(): string[] {
  const out: string[] = [];
  for (let h = FIRST_HOUR; h < LAST_HOUR; h++) {
    out.push(`${String(h).padStart(2, '0')}:00`);
    out.push(`${String(h).padStart(2, '0')}:30`);
  }
  return out;
}

export const ALL_SLOTS: readonly string[] = buildSlots();

const SLOT_SET = new Set(ALL_SLOTS);

export function isValidSlot(s: unknown): s is string {
  return typeof s === 'string' && SLOT_SET.has(s);
}

export function formatSlot(slot: string): string {
  const [hStr, mStr] = slot.split(':');
  const h = Number(hStr);
  const m = Number(mStr);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}
