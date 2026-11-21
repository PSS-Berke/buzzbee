import { FRIENDLY_ERRORS, friendlyError, isErrorCode, type ErrorCode } from './friendly-errors';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Browser helper for showing an error: returns the friendly message for
 * `code`, counts it in Google Analytics as `form_error`, and (unless the server
 * already logged it) records it in the /admin error log.
 *
 * Use `serverLogged: true` for errors that came back from our API, which
 * records them itself.
 */
export function showError(
  code: ErrorCode | string | undefined,
  form: string,
  opts: { email?: string; detail?: string; serverLogged?: boolean } = {}
): string {
  const known: ErrorCode = isErrorCode(code) ? code : 'server_error';
  try {
    window.gtag?.('event', 'form_error', { error_code: known, form });
  } catch {
    // Analytics must never break the form.
  }
  if (!opts.serverLogged) {
    try {
      const payload = JSON.stringify({ code: known, form, email: opts.email, detail: opts.detail });
      if (!navigator.sendBeacon?.('/api/client-error', payload)) {
        fetch('/api/client-error', { method: 'POST', body: payload, keepalive: true }).catch(() => {});
      }
    } catch {
      // Best effort.
    }
  }
  return friendlyError(known);
}

export { FRIENDLY_ERRORS };
