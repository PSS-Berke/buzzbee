import { NextRequest, NextResponse } from 'next/server';
import { claimRemindersForDate, releaseReminderClaim } from '@/lib/db';
import { sendUserReminderEmail } from '@/lib/email';

export const runtime = 'nodejs';
// Reads live booking rows and sends mail — never serve this from cache.
export const dynamic = 'force-dynamic';

// Today's date (YYYY-MM-DD) in the showroom's timezone. The cron fires on a UTC
// schedule, so "today" must be resolved in Chicago time or the run lands on the
// wrong calendar day for early-morning UTC hours.
function chicagoToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());
}

/**
 * Day-of reminder emails. Vercel Cron hits this once each morning (see
 * vercel.json); it emails everyone booked for today.
 *
 * Bookings made after the cron has already run for their date get no reminder —
 * they booked same-day and just received a confirmation, so a reminder hours
 * later would be noise.
 */
export async function GET(req: NextRequest) {
  // Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. Anything else is a
  // stranger hitting a public URL that sends mail, so refuse it.
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error('[cron/reminders] CRON_SECRET is not set; refusing to run');
    return NextResponse.json({ ok: false, error: 'Not configured.' }, { status: 500 });
  }
  if (req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const date = chicagoToday();

  let claimed;
  try {
    claimed = await claimRemindersForDate(date);
  } catch (err) {
    console.error('[cron/reminders] could not claim reservations', err);
    return NextResponse.json({ ok: false, error: 'Database error.' }, { status: 500 });
  }

  if (claimed.length === 0) {
    console.log(`[cron/reminders] ${date}: nothing to send`);
    return NextResponse.json({ ok: true, date, sent: 0, failed: 0 });
  }

  // Sends are independent; one bad address must not stop the rest. A failure
  // releases its claim so the next run retries that reservation.
  const results = await Promise.all(
    claimed.map(async (r) => {
      try {
        await sendUserReminderEmail({
          name: r.name,
          email: r.email,
          phone: r.phone,
          preferred_date: r.preferred_date,
          time_slot: r.time_slot,
          mattresses: r.mattresses,
          notes: r.notes,
          source: r.source,
          location: r.location,
        });
        return true;
      } catch (err) {
        console.error(`[cron/reminders] send failed for reservation ${r.id}`, err);
        await releaseReminderClaim(r.id).catch((relErr) =>
          // Claim stuck as sent — this reservation gets no reminder. Logged loudly
          // because it is the one case that fails silently for the customer.
          console.error(`[cron/reminders] could not release claim ${r.id}`, relErr)
        );
        return false;
      }
    })
  );

  const sent = results.filter(Boolean).length;
  const failed = results.length - sent;
  console.log(`[cron/reminders] ${date}: sent ${sent}, failed ${failed}`);

  return NextResponse.json({ ok: true, date, sent, failed });
}
