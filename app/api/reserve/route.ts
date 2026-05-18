import { NextRequest, NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/submissions';
import { elmhurstStore } from '@/data/store';
import { insertReservation, SlotTakenError } from '@/lib/db';
import { sendUserReservationEmail } from '@/lib/email';
import { isValidSlot } from '@/lib/slots';

export const runtime = 'nodejs';

interface ReservePayload {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  timeSlot?: string;
  mattresses?: string[];
  notes?: string;
  source?: string;
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

  const { name, email, phone, date, timeSlot, mattresses, notes, source } = payload;
  const normalizedEmail = email?.trim().toLowerCase() ?? '';

  if (!name || !normalizedEmail || !isValidEmail(normalizedEmail)) {
    if (isFormPost(req)) {
      return NextResponse.redirect(
        new URL('/locations/elmhurst?reserve=error', req.url),
        303
      );
    }
    return NextResponse.json(
      { ok: false, error: 'Name and a valid email are required.' },
      { status: 400 }
    );
  }

  if (timeSlot && !isValidSlot(timeSlot)) {
    return NextResponse.json(
      { ok: false, error: 'Invalid time slot.' },
      { status: 400 }
    );
  }

  const record = {
    name: name.trim(),
    email: normalizedEmail,
    phone: phone?.trim() || null,
    preferred_date: date || null,
    time_slot: timeSlot || null,
    mattresses: mattresses ?? [],
    notes: notes?.trim() || null,
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

  await sendUserReservationEmail(record).catch((err) =>
    console.error('[reserve] user email failed', err)
  );

  if (isFormPost(req)) {
    return NextResponse.redirect(new URL('/locations/elmhurst?reserve=ok', req.url), 303);
  }

  return NextResponse.json({ ok: true });
}
