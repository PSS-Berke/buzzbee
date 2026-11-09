// Site-wide mattress sale. Turning `active` off puts every bed back at its
// regular price everywhere at once: listings, product pages, cart and Stripe
// checkout all read the price from data/products.ts, which applies this.
//
// Studio Go is never on sale: it is always $599 and never shown slashed.

export interface Sale {
  active: boolean;
  /** Whole-number percent taken off the regular price. */
  percentOff: number;
  /** Short label for badges and the announcement pill. */
  label: string;
}

export const sale: Sale = {
  active: true,
  percentOff: 30,
  label: '30% off',
};

/** Sale price for a regular price, rounded to the nearest whole dollar. */
export function applySaleDiscount(regular: number): number {
  return Math.round(regular * (1 - sale.percentOff / 100));
}
