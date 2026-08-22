// Calendar links and .ics generation for showroom bookings.
//
// Bookings are stored as a naive date + wall-clock slot ('2026-05-17', '14:00')
// in the showroom's local time. Every consumer here needs a real instant, so the
// conversion to UTC happens once, correctly, in chicagoWallClockToUtc().

export const SHOWROOM_TZ = 'America/Chicago';

/** Visit length blocked out on the customer's calendar. */
export const VISIT_MINUTES = 60;

/**
 * Offset (ms) of the showroom timezone at a given instant — positive when the
 * local wall clock is ahead of UTC. Derived by formatting the instant as local
 * wall time and re-reading it as if it were UTC; the delta is the offset. This
 * is DST-correct by construction because Intl applies the rules for that date.
 */
function zoneOffsetMs(at: Date): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: SHOWROOM_TZ,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .formatToParts(at)
      .map((p) => [p.type, p.value])
  ) as Record<string, string>;

  const asIfUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return asIfUtc - at.getTime();
}

/**
 * Convert a showroom wall-clock date + slot to the real UTC instant.
 *
 * Two passes: the correct offset depends on the instant, and the instant depends
 * on the offset. Guessing with the offset at the naive timestamp then re-reading
 * it at the corrected one settles the DST-boundary case, where the first guess
 * can be an hour off.
 *
 * Returns null for input that isn't a real date/time.
 */
export function chicagoWallClockToUtc(date: string, timeSlot: string): Date | null {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = timeSlot.split(':').map(Number);
  if (![y, m, d, hh, mm].every(Number.isFinite)) return null;

  const naive = Date.UTC(y, m - 1, d, hh, mm);
  let ts = naive - zoneOffsetMs(new Date(naive));
  ts = naive - zoneOffsetMs(new Date(ts));
  return new Date(ts);
}

/** Compact UTC stamp for calendar URLs and ICS: 20260517T190000Z */
function utcStamp(dt: Date): string {
  return `${dt.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;
}

export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  /** Showroom-local date, YYYY-MM-DD */
  date: string;
  /** Showroom-local slot, HH:MM */
  timeSlot: string;
}

function eventWindow(ev: CalendarEvent): { start: Date; end: Date } | null {
  const start = chicagoWallClockToUtc(ev.date, ev.timeSlot);
  if (!start) return null;
  return { start, end: new Date(start.getTime() + VISIT_MINUTES * 60_000) };
}

/** "Add to Google Calendar" deeplink. Null if the date/slot is unusable. */
export function googleCalendarUrl(ev: CalendarEvent): string | null {
  const w = eventWindow(ev);
  if (!w) return null;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${utcStamp(w.start)}/${utcStamp(w.end)}`,
    location: ev.location,
    details: ev.description,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * "Add to Outlook" deeplink. Targets outlook.live.com (personal accounts); the
 * same path on outlook.office.com serves work accounts, and Microsoft redirects
 * a signed-in work user there automatically.
 */
export function outlookCalendarUrl(ev: CalendarEvent): string | null {
  const w = eventWindow(ev);
  if (!w) return null;
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: ev.title,
    startdt: w.start.toISOString(),
    enddt: w.end.toISOString(),
    location: ev.location,
    body: ev.description,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/** Escape a value for an ICS text field (RFC 5545 §3.3.11). */
function icsEscape(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * Fold a content line to 75 octets per RFC 5545 §3.1. Folding is measured in
 * bytes, not characters, so a multi-byte character must not be split across the
 * boundary — hence the per-character byte accounting rather than slice(0, 75).
 */
function icsFold(line: string): string {
  const enc = new TextEncoder();
  if (enc.encode(line).length <= 75) return line;

  const out: string[] = [];
  let current = '';
  let bytes = 0;
  // First line allows 75 octets; continuations start with a space that counts.
  let limit = 75;
  for (const ch of line) {
    const chBytes = enc.encode(ch).length;
    if (bytes + chBytes > limit) {
      out.push(current);
      current = ch;
      bytes = chBytes + 1; // +1 for the leading space on the folded line
      limit = 75;
    } else {
      current += ch;
      bytes += chBytes;
    }
  }
  if (current) out.push(current);
  return out.join('\r\n ');
}

/**
 * Build a VCALENDAR for the visit. Attached to the confirmation email so Apple
 * Mail, Outlook desktop, and every mobile client get a native "add to calendar"
 * prompt — which the URL buttons alone can't reach.
 *
 * `uid` is derived from the booking, not random, so if the same booking is ever
 * mailed twice the calendar client updates one event instead of creating two.
 */
export function buildIcs(ev: CalendarEvent, uidSeed: string): string | null {
  const w = eventWindow(ev);
  if (!w) return null;

  // Non-cryptographic; this only needs to be stable and collision-free enough to
  // key one booking's calendar event.
  let hash = 0;
  for (let i = 0; i < uidSeed.length; i++) {
    hash = (Math.imul(31, hash) + uidSeed.charCodeAt(i)) | 0;
  }
  const uid = `${ev.date.replace(/-/g, '')}-${ev.timeSlot.replace(':', '')}-${(hash >>> 0).toString(36)}@mybusby.com`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Busby//Showroom Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(w.start)}`,
    `DTEND:${utcStamp(w.end)}`,
    `SUMMARY:${icsEscape(ev.title)}`,
    `DESCRIPTION:${icsEscape(ev.description)}`,
    `LOCATION:${icsEscape(ev.location)}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    // Client-side nudge 60 minutes out — independent of our own reminder emails,
    // and it fires even if the customer never opens their inbox.
    'BEGIN:VALARM',
    'TRIGGER:-PT60M',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsEscape(ev.title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  // CRLF line endings are required by the spec; some clients reject bare LF.
  return lines.map(icsFold).join('\r\n') + '\r\n';
}
