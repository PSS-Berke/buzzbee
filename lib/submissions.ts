export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Normalize a US phone number to E.164 (+1XXXXXXXXXX), or null if it isn't one.
 *
 * Stored normalized so the number is dialable straight from the admin table and
 * usable as-is by an SMS provider later — every provider wants E.164, and
 * cleaning "(630) 555-0142 ext 2" at send time is too late to reject it.
 *
 * Deliberately US/NANP-only: the showroom is in Elmhurst and walk-in visitors
 * are local, so an international number is far more likely a typo or a bot than
 * a real customer.
 */
export function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, '');
  // Accept a leading country code 1, but only with the full 10-digit number.
  const national = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (national.length !== 10) return null;
  // NANP: area code and exchange code both start 2-9. Rejects 000/111 fillers
  // and the 555-0100 range stays valid only if the area code is real.
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(national)) return null;
  return `+1${national}`;
}

/** Pretty-print an E.164 US number for display: +16305550142 → (630) 555-0142 */
export function formatPhone(e164: string): string {
  const m = /^\+1(\d{3})(\d{3})(\d{4})$/.exec(e164);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : e164;
}

/**
 * Collapse an address to a canonical form for "have we already contacted this
 * inbox?" checks. Lower-cases, strips +tags (sub-addressing), and removes dots
 * in the gmail local part — so victim@gmail.com, victim+x@gmail.com, and
 * vic.tim@gmail.com all map to one key. Used only for send-once / throttle
 * decisions; the raw address is still what we store and mail.
 */
export function canonicalizeEmail(email: string): string {
  const e = email.trim().toLowerCase();
  const at = e.lastIndexOf('@');
  if (at < 1) return e;
  let local = e.slice(0, at);
  // googlemail.com is the same inbox as gmail.com — fold it in so aliases collapse.
  const domain = e.slice(at + 1) === 'googlemail.com' ? 'gmail.com' : e.slice(at + 1);
  const plus = local.indexOf('+');
  if (plus !== -1) local = local.slice(0, plus);
  if (domain === 'gmail.com') {
    local = local.replace(/\./g, '');
  }
  // If stripping emptied the local part (e.g. "+tag@" / "...@"), keep the raw
  // address so distinct undeliverable inputs don't all merge to one key.
  if (!local) return e;
  return `${local}@${domain}`;
}
