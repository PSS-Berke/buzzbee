import { NextRequest, NextResponse } from 'next/server';
import { claimStartingSoon, releaseStartingSoonClaim } from '@/lib/db';
import { sendUserStartingSoonEmail } from '@/lib/email';
import { authorizeCron, sendClaimed } from '@/lib/reminder-runner';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LABEL = 'cron/reminders-soon';

/**
 * How far ahead of the appointment to send the final nudge.
 *
 * This is a window, not an exact offset: the cron runs every 5 minutes (see
 * vercel.json), so an appointment is caught on the first run that falls inside
 * the window — roughly 15-20 minutes out. Widening it past the cron interval is
 * what makes a delayed or skipped run recoverable instead of a silent miss.
 */
const WINDOW_MINUTES = 20;

/**
 * Don't nudge a booking made in the last half hour — the confirmation email is
 * still fresh in their inbox.
 */
const MIN_AGE_MINUTES = 30;

export async function GET(req: NextRequest) {
  const denied = authorizeCron(req, LABEL);
  if (denied) return denied;

  let claimed;
  try {
    claimed = await claimStartingSoon(WINDOW_MINUTES, MIN_AGE_MINUTES);
  } catch (err) {
    console.error(`[${LABEL}] could not claim reservations`, err);
    return NextResponse.json({ ok: false, error: 'Database error.' }, { status: 500 });
  }

  // The common case by far — this runs 288 times a day and the showroom takes a
  // handful of bookings. Return before logging so the logs stay readable.
  if (claimed.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, failed: 0 });
  }

  const { sent, failed } = await sendClaimed(
    claimed,
    sendUserStartingSoonEmail,
    releaseStartingSoonClaim,
    LABEL
  );
  console.log(`[${LABEL}] sent ${sent}, failed ${failed}`);

  return NextResponse.json({ ok: true, sent, failed });
}
