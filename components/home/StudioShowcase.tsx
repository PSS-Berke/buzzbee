import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProductsByLine } from '@/data/products';
import StudioDesignIndex from '@/components/studio/StudioDesignIndex';

const studioProducts = getProductsByLine('studio');

// Home page counterpart to FeaturedProducts: the Studio line in its own
// spec-sheet design language, so it isn't lost below the Artisan collection.
export default function StudioShowcase() {
  return (
    <div className="bg-paper border-y border-grid">
      <StudioDesignIndex
        products={studioProducts}
        eyebrow="Studio by Busby"
        title="Comfort, engineered by the numbers."
        subtitle="Our modern line. Four builds, from essential foam to a pocketed-coil hybrid — each with the spec right on the label."
      >
        <div className="text-center mt-12">
          <Link
            href="/studio"
            className="inline-flex items-center gap-3 bg-navy hover:bg-navy-dark text-white font-medium px-7 py-3.5 rounded-sm transition-colors"
          >
            Explore the Studio Line <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </StudioDesignIndex>
    </div>
  );
}
