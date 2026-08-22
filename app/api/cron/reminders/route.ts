import { NextRequest, NextResponse } from 'next/server';
import { claimRemindersForDate, releaseReminderClaim } from '@/lib/db';
import { sendUserReminderEmail } from '@/lib/email';
import { authorizeCron, sendClaimed } from '@/lib/reminder-runner';

export const runtime = 'nodejs';
// Reads live booking rows and sends mail — never serve this from cache.
export const dynamic = 'force-dynamic';

const LABEL = 'cron/reminders';

// Today's date (YYYY-MM-DD) in the showroom's timezone. The cron fires on a UTC
// schedule, so "today" must be resolved in Chicago time or the run lands on the
// wrong calendar day for early-morning UTC hours.
function chicagoToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());
}

/**
 * Morning-of reminder. Vercel Cron hits this once each morning (see
 * vercel.json); it emails everyone booked for today.
 *
 * Bookings made after the cron has already run for their date get no morning
 * reminder — they booked same-day and just received a confirmation. The
 * starting-soon cron still covers them.
 */
export async function GET(req: NextRequest) {
  const denied = authorizeCron(req, LABEL);
  if (denied) return denied;

  const date = chicagoToday();

  let claimed;
  try {
    claimed = await claimRemindersForDate(date);
  } catch (err) {
    console.error(`[${LABEL}] could not claim reservations`, err);
    return NextResponse.json({ ok: false, error: 'Database error.' }, { status: 500 });
  }

  if (claimed.length === 0) {
    console.log(`[${LABEL}] ${date}: nothing to send`);
    return NextResponse.json({ ok: true, date, sent: 0, failed: 0 });
  }

  const { sent, failed } = await sendClaimed(
    claimed,
    sendUserReminderEmail,
    releaseReminderClaim,
    LABEL
  );
  console.log(`[${LABEL}] ${date}: sent ${sent}, failed ${failed}`);

  return NextResponse.json({ ok: true, date, sent, failed });
}
