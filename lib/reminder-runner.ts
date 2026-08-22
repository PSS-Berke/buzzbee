import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import type { ReminderClaim } from './db';

/**
 * Shared plumbing for the reminder crons: auth, then send each claimed
 * reservation independently, releasing the claim on any that fail so the next
 * run retries them.
 */

/**
 * Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. Returns a response to
 * return immediately, or null when the request is authorized.
 *
 * Without the secret configured these routes are public URLs that send mail to
 * real customers, so an unset secret fails closed rather than open.
 */
export function authorizeCron(req: NextRequest, label: string): NextResponse | null {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error(`[${label}] CRON_SECRET is not set; refusing to run`);
    return NextResponse.json({ ok: false, error: 'Not configured.' }, { status: 500 });
  }
  if (req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }
  return null;
}

export async function sendClaimed(
  claimed: ReminderClaim[],
  send: (payload: {
    name: string;
    email: string;
    phone: string | null;
    preferred_date: string;
    time_slot: string | null;
    mattresses: string[];
    notes: string | null;
    source: string;
    location: string;
  }) => Promise<void>,
  release: (id: number) => Promise<void>,
  label: string
): Promise<{ sent: number; failed: number }> {
  const results = await Promise.all(
    claimed.map(async (r) => {
      try {
        await send({
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
        console.error(`[${label}] send failed for reservation ${r.id}`, err);
        await release(r.id).catch((relErr) =>
          // Claim stuck as sent — this reservation gets no reminder. Logged
          // loudly because it is the one case that fails silently for the customer.
          console.error(`[${label}] could not release claim ${r.id}`, relErr)
        );
        return false;
      }
    })
  );

  const sent = results.filter(Boolean).length;
  return { sent, failed: results.length - sent };
}
