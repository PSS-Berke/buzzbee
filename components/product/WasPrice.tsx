import { sale } from '@/data/sale';

// The regular price, slashed, beside a sale price, plus a "30% off" tag. Renders nothing
// when there's no sale, so it can sit next to any price unconditionally.
// `className` replaces the default spacing and size. `tone` picks colors that read on
// a light or a dark background. `badge` hides the tag where space is tight (cart lines).
export default function WasPrice({
  value,
  className = 'ml-2 text-[0.8em]',
  tone = 'light',
  badge = true,
}: {
  value?: number;
  className?: string;
  tone?: 'light' | 'dark';
  badge?: boolean;
}) {
  if (value === undefined) return null;
  const dark = tone === 'dark';
  return (
    <span className={`inline-flex flex-wrap items-center gap-2 align-middle font-normal ${className}`}>
      <del className={`relative no-underline font-semibold ${dark ? 'text-white/80' : 'text-gray-600'}`}>
        <span className="sr-only">Regular price </span>${value.toLocaleString('en-US')}
        {/* The slash: a thick diagonal stroke instead of a hairline strikethrough. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-x-[6%] top-1/2 h-[0.14em] min-h-[2px] -translate-y-1/2 -rotate-[14deg] rounded-full ${dark ? 'bg-orange' : 'bg-coral'}`}
        />
      </del>
      {badge && (
        <span
          className={`rounded-sm px-1.5 py-0.5 text-[0.75em] font-bold uppercase leading-none tracking-wide ${
            dark ? 'bg-gold text-navy-dark' : 'bg-coral text-white'
          }`}
        >
          {sale.label}
        </span>
      )}
    </span>
  );
}

/** Classes for a price: louder while it's a sale price. */
export function priceClass(compareAtPrice: number | undefined, onSale: string, regular: string): string {
  return compareAtPrice === undefined ? regular : onSale;
}
