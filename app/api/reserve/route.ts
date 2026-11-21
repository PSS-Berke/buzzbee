import { NextRequest, NextResponse } from 'next/server';
import { canonicalizeEmail, isValidEmail, normalizePhone } from '@/lib/submissions';
import { elmhurstStore } from '@/data/store';
import { insertReservation, SlotTakenError } from '@/lib/db';
import { sendAdminReservationEmail, sendUserReservationEmail } from '@/lib/email';
import { bookingDateError, isValidSlot } from '@/lib/slots';
import { isOpenSlot } from '@/lib/availability';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { modeFromSource } from '@/lib/consult';

export const runtime = 'nodejs';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Caps on free-text fields. Real bookings come nowhere near these; they stop a
// scripted POST from stuffing megabytes into the table and the team's inbox.
const MAX_NAME = 120;
const MAX_NOTES = 2000;
const MAX_SOURCE = 80;
const MAX_MATTRESSES = 12;
const MAX_MATTRESS_NAME = 80;

// DATE_RE is structural only — '2026-13-45' passes it. Confirm the value is a
// real calendar date so a bad date 400s cleanly instead of 500-ing at the insert.
function isRealDate(s: string): boolean {
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

interface ReservePayload {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  timeSlot?: string;
  mattresses?: string[];
  notes?: string;
  source?: string;
  preferredTime?: string; // free-text "when works for you" on request-a-visit
  gclid?: string; // Google Ads click id, for per-lead attribution
  bb_check?: string; // honeypot
}

function isFormPost(req: NextRequest): boolean {
  return req.headers.get('content-type')?.includes('form') ?? false;
}

// No-JS form posts land back on the page they came from (same-origin Referer
// only, so this can't be used as an open redirect), with ?reserve=<flag>.
// Falls back to /appointment, where the booking form lives.
function backToForm(req: NextRequest, flag: 'error' | 'slot_taken' | 'rate'): NextResponse {
  let path = '/appointment';
  const referer = req.headers.get('referer');
  if (referer) {
    try {
      const ref = new URL(referer);
      if (ref.origin === req.nextUrl.origin && !ref.pathname.startsWith('/api/')) path = ref.pathname;
    } catch {
      // Malformed Referer: use the fallback.
    }
  }
  const url = new URL(path, req.url);
  url.searchParams.set('reserve', flag);
  return NextResponse.redirect(url, 303);
}

// A no-JS booking that succeeded goes to the same confirmation page the JS form
// uses, so the Ads conversion trigger on that URL fires for both.
function toConfirmation(
  req: NextRequest,
  date: string | undefined,
  slot: string | undefined,
  source: string | undefined
): NextResponse {
  const url = new URL('/appointment/confirmed', req.url);
  if (date) url.searchParams.set('date', date);
  if (slot) url.searchParams.set('slot', slot);
  url.searchParams.set('mode', modeFromSource(source));
  return NextResponse.redirect(url, 303);
}

export async function POST(req: NextRequest) {
  let payload: ReservePayload;
  try {
    payload = (await req.json()) as ReservePayload;
  } catch {
    const form = await req.formData();
    payload = {
      name: form.get('name')?.toString(),
      email: form.get('email')?.toString(),
      phone: form.get('phone')?.toString(),
      date: form.get('date')?.toString(),
      timeSlot: form.get('timeSlot')?.toString() ?? form.get('time_slot')?.toString(),
      mattresses: form.getAll('mattresses').map((v) => v.toString()),
      notes: form.get('notes')?.toString(),
      source: form.get('source')?.toString(),
      preferredTime: form.get('preferredTime')?.toString(),
      gclid: form.get('gclid')?.toString(),
      bb_check: form.get('bb_check')?.toString(),
    };
  }

  // Honeypot — bot filled the hidden field. Pretend success, do nothing.
  if (payload.bb_check && payload.bb_check.trim() !== '') {
    if (isFormPost(req)) {
      return toConfirmation(req, payload.date, payload.timeSlot, payload.source);
    }
    return NextResponse.json({ ok: true });
  }

  const rl = await rateLimit('reserve', getClientIp(req));
  if (!rl.allowed) {
    if (isFormPost(req)) {
      return backToForm(req, 'rate');
    }
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(rl.resetSec) } }
    );
  }

  const { name, email, phone, date, timeSlot, mattresses, notes, source, gclid, preferredTime } =
    payload;

  // Every booking claims a specific date+time and is guarded by the partial
  // unique index, whichever page it came from. `source` only records which page
  // that was, for attribution.
  // Every booking now claims a real date + slot, whichever page it came from —
  // showroom, paid landing page or the national video consult. That is what
  // makes the confirmation carry a calendar invite and the reminder emails fire
  // without a human in the loop. Historical 'request-visit' rows still hold a
  // null date/slot; the partial unique index tolerates them.
  const normalizedEmail = email?.trim().toLowerCase() ?? '';

  // Invalid input → 400 (JSON) or back to the page with an error flag (no-JS form).
  const bad = (msg: string) =>
    isFormPost(req)
      ? backToForm(req, 'error')
      : NextResponse.json({ ok: false, error: msg }, { status: 400 });

  if (!name?.trim() || !normalizedEmail || !isValidEmail(normalizedEmail)) {
    return bad('Name and a valid email are required.');
  }

  // Phone is required — it's how the showroom chases no-shows and reaches
  // someone who's running late. Stored E.164 so it's dialable as-is.
  const normalizedPhone = normalizePhone(phone ?? '');
  if (!normalizedPhone) {
    return bad('Please enter a valid 10-digit US phone number.');
  }

  // Date and slot are REQUIRED and validated here. They can't be optional: the
  // unique index that prevents double-booking is partial (only non-null
  // date+slot collide), so a null/invalid pair would insert an unconstrained row
  // on every request — previously an unlimited booking + confirmation-email flood.
  if (!date || !DATE_RE.test(date) || !isRealDate(date)) {
    return bad('Please choose a valid date.');
  }
  // No same-day (or past) bookings, nothing past the booking window.
  const dateError = bookingDateError(date);
  if (dateError) {
    return bad(dateError);
  }
  if (!isValidSlot(timeSlot)) {
    return bad('Please choose a valid time slot.');
  }
  // The slot must also be one the showroom is open for on that date (schedule
  // layer, separate from double-booking). Guards against stale forms, direct
  // POSTs to a closed time, and dates closed after someone loaded the page.
  if (!isOpenSlot(date, timeSlot)) {
    return bad('That time isn’t available on the selected date. Please choose an open slot.');
  }

  // Stash the Google Ads click id alongside the notes. The reservations table
  // has a fixed column set, so folding it in here gives us per-lead attribution
  // (which campaign / keyword produced this booking) without a schema migration.
  const cleanNotes = notes?.trim().slice(0, MAX_NOTES) || '';
  const cleanGclid = gclid?.trim().slice(0, 200) || '';
  const cleanPreferred = preferredTime?.trim().slice(0, 300) || '';
  const notesParts = [
    cleanPreferred ? `Prefers: ${cleanPreferred}` : '',
    cleanNotes,
    cleanGclid ? `[gclid: ${cleanGclid}]` : '',
  ].filter(Boolean);
  const notesWithAttribution = notesParts.join('\n\n');

  const record = {
    name: name.trim().slice(0, MAX_NAME),
    email: normalizedEmail,
    phone: normalizedPhone,
    preferred_date: date,
    time_slot: timeSlot,
    mattresses: (Array.isArray(mattresses) ? mattresses : [])
      .filter((m): m is string => typeof m === 'string' && m.trim() !== '')
      .slice(0, MAX_MATTRESSES)
      .map((m) => m.trim().slice(0, MAX_MATTRESS_NAME)),
    notes: notesWithAttribution || null,
    source: source?.trim().slice(0, MAX_SOURCE) || 'reserve-elmhurst',
    location: elmhurstStore.slug,
  };

  try {
    await insertReservation(record);
  } catch (err) {
    if (err instanceof SlotTakenError) {
      if (isFormPost(req)) return backToForm(req, 'slot_taken');
      return NextResponse.json(
        { ok: false, error: 'That time was just booked. Please pick another.', code: 'slot_taken' },
        { status: 409 }
      );
    }
    console.error('[reserve] db insert failed', err);
    if (isFormPost(req)) {
      return backToForm(req, 'error');
    }
    return NextResponse.json(
      { ok: false, error: 'Something on our end. Try again in a moment.' },
      { status: 500 }
    );
  }

  // Per-recipient cap on the CUSTOMER confirmation, applied only AFTER a
  // successful booking — so slot-taken/failed retries never burn a real
  // customer's daily allowance, and the booking is never blocked. Over the cap
  // the booking is still saved; we just skip the (duplicate-looking) email.
  // The team notification fires unconditionally (they want every booking).
  const emailRl = await rateLimit('reserveEmail', canonicalizeEmail(normalizedEmail));
  if (!emailRl.allowed) {
    console.warn('[reserve] per-recipient email cap reached; booking saved without confirmation', {
      email: canonicalizeEmail(normalizedEmail),
    });
  }

  // Both sends are independent and non-fatal — run them concurrently so the
  // booking response waits on the slower one, not the sum.
  await Promise.all([
    sendAdminReservationEmail(record).catch((err) =>
      console.error('[reserve] admin notification failed', err)
    ),
    emailRl.allowed
      ? sendUserReservationEmail(record).catch((err) =>
          console.error('[reserve] user email failed', err)
        )
      : Promise.resolve(),
  ]);

  if (isFormPost(req)) {
    return toConfirmation(req, record.preferred_date, record.time_slot, record.source);
  }

  return NextResponse.json({ ok: true });
}
