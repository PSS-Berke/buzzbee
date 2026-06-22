import 'server-only';
import type { NextRequest } from 'next/server';
import { bumpRateLimit, cleanupRateLimits } from './db';

export interface RateLimitDecision {
  allowed: boolean;
  remaining: number;
  resetSec: number;
}

// Per-bucket limits. Generous enough that a real visitor never hits them, tight
// enough to stop scripted abuse. `reserveEmail` is keyed on the canonical
// recipient (not the IP) so a single victim address can't be mail-bombed across
// many source IPs. Note: fixed-window allows up to ~2x the limit across a window
// boundary — acceptable here given the headroom.
export const LIMITS = {
  subscribe: { limit: 8, windowSec: 600 }, // 8 / 10 min per IP
  reserve: { limit: 6, windowSec: 600 }, // 6 / 10 min per IP
  reserveEmail: { limit: 5, windowSec: 86_400 }, // 5 / day per recipient address
  availability: { limit: 60, windowSec: 60 }, // 60 / min per IP (fires on each date change)
} as const;

/**
 * Best-effort client IP from the proxy headers. On Vercel, `x-real-ip` is set to
 * the true client IP and `x-forwarded-for` is overwritten (external values are
 * not forwarded), so neither is client-spoofable on the standard platform. We
 * prefer the single-valued `x-real-ip` over parsing the XFF list. The `unknown`
 * fallback only applies off-Vercel / locally, where all traffic shares a bucket.
 *
 * NOTE: if this ever runs behind a different/custom proxy, switch to a trusted
 * IP source (e.g. `ipAddress()` from `@vercel/functions`) — raw XFF[0] would be
 * spoofable there.
 */
export function getClientIp(req: NextRequest): string {
  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  const xff = req.headers.get('x-forwarded-for');
  const first = xff?.split(',')[0]?.trim();
  return first || 'unknown';
}

/**
 * Fixed-window rate limit keyed by `name:identifier`, backed by Postgres so it
 * holds across serverless instances.
 *
 * Fails OPEN: if the limiter query errors we allow the request. The downstream
 * insert shares the same database, so a real outage surfaces there rather than
 * silently blocking legitimate customers. (Trade-off: a DB-saturating flood also
 * disables the limiter — defending against that needs an edge WAF, not Postgres.)
 */
export async function rateLimit(
  name: keyof typeof LIMITS,
  identifier: string
): Promise<RateLimitDecision> {
  const { limit, windowSec } = LIMITS[name];
  try {
    const { count, resetSec } = await bumpRateLimit(`${name}:${identifier}`, windowSec);
    // ~1% of calls sweep expired rows so the table stays bounded without a cron.
    // Awaited (not fire-and-forget) so it survives the serverless response return;
    // the delete is index-driven and cheap.
    if (Math.random() < 0.01) {
      await cleanupRateLimits().catch((err) => console.error('[rate-limit] cleanup failed', err));
    }
    return { allowed: count <= limit, remaining: Math.max(0, limit - count), resetSec };
  } catch (err) {
    console.error(`[rate-limit] ${name} check failed, allowing request`, err);
    return { allowed: true, remaining: limit, resetSec: windowSec };
  }
}
