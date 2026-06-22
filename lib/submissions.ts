export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
