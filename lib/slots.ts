// Reservation time slots for the Elmhurst showroom.
// 30-minute slots, 10:00 AM through 7:00 PM (last slot starts 6:30 PM).

const FIRST_HOUR = 10;
const LAST_HOUR = 19; // exclusive — last slot starts at 18:30, ends at 19:00

// How far ahead a visit can be booked. Bounds the distinct (date, slot) space so
// a booking flood can't generate unlimited reservations/notifications, and keeps
// the date picker sane. Enforced server-side; the form mirrors it as a max.
export const MAX_BOOKING_DAYS_AHEAD = 90;

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
