import { NextRequest, NextResponse } from 'next/server';
import { isErrorCode } from '@/lib/friendly-errors';
import { recordError } from '@/lib/error-log';

export const runtime = 'nodejs';

/**
 * Browser-side half of the error log: errors the server never saw (a form's
 * own validation, a dropped connection) are reported here with
 * navigator.sendBeacon. Only known codes are stored; anything else is ignored.
 */
export async function POST(req: NextRequest) {
  let body: { code?: unknown; form?: unknown; email?: unknown; detail?: unknown };
  try {
    // sendBeacon posts a string as text/plain, so parse the text ourselves.
    body = JSON.parse(await req.text());
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  if (body && isErrorCode(body.code) && typeof body.form === 'string') {
    await recordError(req, body.code, body.form, {
      email: typeof body.email === 'string' ? body.email : null,
      detail: typeof body.detail === 'string' ? `browser: ${body.detail}` : 'browser',
    });
  }
  return new NextResponse(null, { status: 204 });
}
