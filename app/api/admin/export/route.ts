import { NextRequest, NextResponse } from 'next/server';
import { listAllReservations, listAllSubscribes } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  let s: string;
  if (value instanceof Date) s = value.toISOString();
  else if (Array.isArray(value)) s = value.join('; ');
  else s = String(value);
  if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCsv(headers: string[], rows: Array<Record<string, unknown>>): string {
  const headerLine = headers.join(',');
  const lines = rows.map((row) => headers.map((h) => csvCell(row[h])).join(','));
  return [headerLine, ...lines].join('\r\n') + '\r\n';
}

function csvResponse(filename: string, body: string): NextResponse {
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type');
  const today = new Date().toISOString().slice(0, 10);

  if (type === 'subscribes') {
    const rows = await listAllSubscribes();
    const csv = toCsv(
      ['created_at', 'email', 'source', 'utm_source', 'utm_medium', 'utm_campaign'],
      rows as unknown as Array<Record<string, unknown>>
    );
    return csvResponse(`subscribes-${today}.csv`, csv);
  }

  if (type === 'reservations') {
    const rows = await listAllReservations();
    const csv = toCsv(
      [
        'created_at',
        'name',
        'email',
        'phone',
        'preferred_date',
        'time_slot',
        'mattresses',
        'notes',
        'source',
        'location',
      ],
      rows as unknown as Array<Record<string, unknown>>
    );
    return csvResponse(`reservations-${today}.csv`, csv);
  }

  return NextResponse.json(
    { ok: false, error: 'Pass ?type=subscribes or ?type=reservations.' },
    { status: 400 }
  );
}
