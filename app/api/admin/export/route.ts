import { NextRequest, NextResponse } from 'next/server';
import { listAllOrders, listAllReservations, listAllSubscribes } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  let s: string;
  if (value instanceof Date) s = value.toISOString();
  else if (Array.isArray(value)) s = value.join('; ');
  else s = String(value);
  // Names and notes come from public forms. A cell starting with = + - @ (or a
  // tab/CR that some apps skip past) runs as a formula when staff open the file
  // in Excel or Sheets, so prefix it with ' to keep it plain text.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
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

  if (type === 'orders') {
    const rows = (await listAllOrders()).map((o) => ({
      created_at: o.created_at,
      name: o.name,
      email: o.email,
      phone: o.phone,
      total: (o.amount_total / 100).toFixed(2),
      currency: o.currency.toUpperCase(),
      fulfillment: o.fulfillment,
      items: o.line_items.map((l) => `${l.name} x ${l.quantity}`),
      address: o.shipping_address
        ? [
            o.shipping_address.line1,
            o.shipping_address.line2,
            o.shipping_address.city,
            o.shipping_address.state,
            o.shipping_address.postal_code,
          ]
            .filter(Boolean)
            .join(', ')
        : '',
      stripe_session_id: o.stripe_session_id,
    }));
    const csv = toCsv(
      ['created_at', 'name', 'email', 'phone', 'total', 'currency', 'fulfillment', 'items', 'address', 'stripe_session_id'],
      rows
    );
    return csvResponse(`orders-${today}.csv`, csv);
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
    { ok: false, error: 'Pass ?type=orders, ?type=subscribes or ?type=reservations.' },
    { status: 400 }
  );
}
