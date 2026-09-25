import type { ProductLine } from '@/data/products';

// Small Artisan / Studio label for places where both lines sit side by side.
// Each tag previews its line's own design language (gold pill vs clay spec label).
export default function LineTag({ line }: { line: ProductLine }) {
  return line === 'studio' ? (
    <span className="inline-block bg-paper text-clay-deep text-[11px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 border border-grid">
      Studio
    </span>
  ) : (
    <span className="inline-block bg-white text-gold-dark text-xs font-semibold px-3 py-1 rounded-full ring-1 ring-gold/30">
      Artisan
    </span>
  );
}
