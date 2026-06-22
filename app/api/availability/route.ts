import { NextRequest, NextResponse } from 'next/server';
import { getBookedSlots } from '@/lib/db';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(req: NextRequest) {
  const rl = await rateLimit('availability', getClientIp(req));
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(rl.resetSec), 'Cache-Control': 'no-store' } }
    );
  }

  const date = req.nextUrl.searchParams.get('date');
  if (!date || !DATE_RE.test(date)) {
    return NextResponse.json(
      { ok: false, error: 'Pass ?date=YYYY-MM-DD.' },
      { status: 400 }
    );
  }

  try {
    const booked = await getBookedSlots(date);
    return NextResponse.json(
      { ok: true, date, booked },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('[availability] query failed', err);
    return NextResponse.json(
      { ok: false, error: 'Could not load availability.' },
      { status: 500 }
    );
  }
}
