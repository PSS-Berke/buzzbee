import { NextRequest, NextResponse } from 'next/server';
import { canonicalizeEmail, isValidEmail } from '@/lib/submissions';
import { elmhurstStore } from '@/data/store';
import { insertReservation, SlotTakenError } from '@/lib/db';
import { sendAdminReservationEmail, sendUserReservationEmail } from '@/lib/email';
import { isValidSlot, MAX_BOOKING_DAYS_AHEAD } from '@/lib/slots';
import { isOpenSlot } from '@/lib/availability';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Today's date (YYYY-MM-DD) in the showroom's timezone, for past-date rejection.
function chicagoToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());
}

// Latest bookable date (YYYY-MM-DD), MAX_BOOKING_DAYS_AHEAD past today.
function latestBookingDate(): string {
  const [y, m, d] = chicagoToday().split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + MAX_BOOKING_DAYS_AHEAD));
  const mm = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(dt.getUTCDate()).padStart(2, '0');
  return `${dt.getUTCFullYear()}-${mm}-${dd}`;
}

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
      return NextResponse.redirect(new URL('/locations/elmhurst?reserve=ok', req.url), 303);
    }
    return NextResponse.json({ ok: true });
  }

  const rl = await rateLimit('reserve', getClientIp(req));
  if (!rl.allowed) {
    if (isFormPost(req)) {
      return NextResponse.redirect(new URL('/locations/elmhurst?reserve=error', req.url), 303);
    }
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(rl.resetSec) } }
    );
  }

  const { name, email, phone, date, timeSlot, mattresses, notes, source, gclid, preferredTime } =
    payload;

  // Two ways in. 'slot' bookings claim a specific date+time and are guarded by
  // the partial unique index. 'request-visit' leads come from the paid landing
  // page — they give us a name, phone and a rough preference, and a human calls
  // back to agree a time. Those rows deliberately carry a null date/slot, which
  // the schema allows. The flood risk that originally forced date+slot to be
  // required is now covered by lib/rate-limit.ts plus the honeypot above.
  const isRequest = source === 'request-visit';
  const normalizedEmail = email?.trim().toLowerCase() ?? '';

  // Invalid input → 400 (JSON) or back to the page with an error flag (no-JS form).
  const bad = (msg: string) =>
    isFormPost(req)
      ? NextResponse.redirect(new URL('/locations/elmhurst?reserve=error', req.url), 303)
      : NextResponse.json({ ok: false, error: msg }, { status: 400 });

  if (!name || !normalizedEmail || !isValidEmail(normalizedEmail)) {
    return bad('Name and a valid email are required.');
  }

  // Date and slot are REQUIRED and validated here. They can't be optional: the
  // unique index that prevents double-booking is partial (only non-null
  // date+slot collide), so a null/invalid pair would insert an unconstrained row
  // on every request — previously an unlimited booking + confirmation-email flood.
  if (!isRequest) {
    if (!date || !DATE_RE.test(date) || !isRealDate(date)) {
      return bad('Please choose a valid date.');
    }
    if (date < chicagoToday()) {
      return bad('Please choose a date that is not in the past.');
    }
    if (date > latestBookingDate()) {
      return bad(`Please choose a date within the next ${MAX_BOOKING_DAYS_AHEAD} days.`);
    }
    if (!isValidSlot(timeSlot)) {
      return bad('Please choose a valid time slot.');
    }
    // The slot must also be one the showroom is open for on that date (schedule
    // layer, separate from double-booking). Guards against stale forms and direct
    // POSTs to a closed time.
    if (!isOpenSlot(date, timeSlot)) {
      return bad('That time isn’t available on the selected date. Please choose an open slot.');
    }
  } else if (!phone || phone.replace(/\D/g, '').length < 10) {
    // A callback request is worthless without a number to call.
    return bad('Please enter a phone number so we can reach you.');
  }

  // Stash the Google Ads click id alongside the notes. The reservations table
  // has a fixed column set, so folding it in here gives us per-lead attribution
  // (which campaign / keyword produced this booking) without a schema migration.
  const cleanNotes = notes?.trim() || '';
  const cleanGclid = gclid?.trim().slice(0, 200) || '';
  const cleanPreferred = preferredTime?.trim().slice(0, 300) || '';
  const notesParts = [
    cleanPreferred ? `Prefers: ${cleanPreferred}` : '',
    cleanNotes,
    cleanGclid ? `[gclid: ${cleanGclid}]` : '',
  ].filter(Boolean);
  const notesWithAttribution = notesParts.join('\n\n');

  const record = {
    name: name.trim(),
    email: normalizedEmail,
    phone: phone?.trim() || null,
    preferred_date: isRequest ? null : date ?? null,
    time_slot: isRequest ? null : timeSlot ?? null,
    mattresses: mattresses ?? [],
    notes: notesWithAttribution || null,
    source: source || 'reserve-elmhurst',
    location: elmhurstStore.slug,
  };

  try {
    await insertReservation(record);
  } catch (err) {
    if (err instanceof SlotTakenError) {
      return NextResponse.json(
        { ok: false, error: 'That time was just booked. Please pick another.', code: 'slot_taken' },
        { status: 409 }
      );
    }
    console.error('[reserve] db insert failed', err);
    if (isFormPost(req)) {
      return NextResponse.redirect(
        new URL('/locations/elmhurst?reserve=error', req.url),
        303
      );
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
    return NextResponse.redirect(new URL('/locations/elmhurst?reserve=ok', req.url), 303);
  }

  return NextResponse.json({ ok: true });
}
