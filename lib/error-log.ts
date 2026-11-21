import 'server-only';
import type { NextRequest } from 'next/server';
import { insertErrorEvent } from './db';
import { getClientIp, rateLimit } from './rate-limit';
import type { ErrorCode } from './friendly-errors';

const clip = (v: string | null | undefined, max: number) => (v ? v.slice(0, max) : null);

/**
 * Record that a visitor was shown `code` on `form`. Never throws and never
 * blocks the response on failure: logging must not turn one error into two.
 * Rate-limited per IP so a bot hammering a form can't flood the table.
 */
export async function recordError(
  req: NextRequest,
  code: ErrorCode,
  form: string,
  extra: { email?: string | null; detail?: string | null; path?: string | null } = {}
): Promise<void> {
  try {
    const rl = await rateLimit('errorLog', getClientIp(req));
    if (!rl.allowed) return;
    let path = extra.path ?? null;
    if (!path) {
      const referer = req.headers.get('referer');
      try {
        path = referer ? new URL(referer).pathname : null;
      } catch {
        path = null;
      }
    }
    await insertErrorEvent({
      code,
      form: clip(form, 60) ?? 'unknown',
      path: clip(path, 200),
      email: clip(extra.email?.trim().toLowerCase(), 200),
      detail: clip(extra.detail, 500),
    });
  } catch (err) {
    console.error('[error-log] could not record', code, form, err);
  }
}
