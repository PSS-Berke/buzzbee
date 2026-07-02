export interface Size {
  name: string;
  dimensions: string;
  price: number;
  inStock: boolean;
}

export interface FirmnessOption {
  level: string;
  description: string;
  recommended: string[];
}

export interface ComponentDetail {
  name: string;
  description: string;
  materials: string;
}

export interface Material {
  name: string;
  source: string;
  certification: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  sleepPosition: string;
  verified: boolean;
  date: string;
  helpful: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: 'abt' | 'busby';
  line: 'artisan' | 'studio';
  type: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  images: string[];
  sizes: Size[];
  firmness: FirmnessOption[];
  selectedFirmness: string;
  features: string[];
  bestFor: string[];
  components: ComponentDetail[];
  materials: Material[];
}

export type ProductLine = 'artisan' | 'studio';

export interface ProductLineMeta {
  slug: ProductLine;
  name: string;
  tagline: string;
  description: string;
  order: number;
}

// The two Busby mattress lines. Artisan = the original handcrafted hybrids;
// Studio = the modern, spec-forward line.
export const productLines: Record<ProductLine, ProductLineMeta> = {
  artisan: {
    slug: 'artisan',
    name: 'Artisan',
    tagline: 'Handcrafted hybrids, layered for the perfect night.',
    description:
      'Our original line. Each Artisan mattress is handcrafted in Wisconsin from premium layered components — natural latex, Serene™ comfort foams, Joma® wool, and individually wrapped coils — for rich, enveloping comfort.',
    order: 1,
  },
  studio: {
    slug: 'studio',
    name: 'Studio',
    tagline: 'Comfort, engineered by the numbers.',
    description:
      'A modern, design-led line. Studio is clean foam-over-coil engineering you can read like a blueprint — defined profiles, honest materials, and a feel chosen by the numbers.',
    order: 2,
  },
};

// Sleep6 — Busby home line
export const homeLineProducts: Product[] = [
  {
    id: 'hl-1',
    slug: 'nod',
    name: 'Busby Nod',
    brand: 'busby',
    line: 'artisan',
    type: 'Hybrid',
    tagline: 'Dependable comfort, night after night',
    description: 'The Busby Nod is a 13½" plush hybrid mattress built for sleepers who want the conforming feel of foam with the responsive support of individually wrapped coils. Five precision-layered components work together — from the CoolGel-infused quilt fill to the Quantum® reinforced perimeter coils — to deliver consistent, roll-off-free comfort from edge to edge.',
    price: 1499,
    originalPrice: 2998,
    rating: 4.7,
    reviewCount: 0,
    images: [
      '/images/products/Nod/nod.svg',
      '/images/products/Nod/nod-room.png',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 1199, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 1299, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 1499, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 1699, inStock: true },    ],
    firmness: [
      { level: 'Medium', description: 'Balanced support and comfort', recommended: ['All sleep positions', 'Couples'] },
      { level: 'Plush', description: 'Soft, enveloping comfort with coil support', recommended: ['Side sleepers', 'Lighter body types'] },
      { level: 'Firm', description: 'Maximum support, minimal sink', recommended: ['Back sleepers', 'Stomach sleepers'] },
    ],
    selectedFirmness: 'Plush',
    features: [
      'Adjustable base compatible',
      'Roll-pack delivery',
      'CertiPUR-US certified foams',
      '10-year warranty',
      'Made in Wisconsin, USA',
    ],
    bestFor: ['Plush comfort seekers', 'Couples', 'Hot sleepers', 'Adjustable base owners'],
    components: [
      { name: 'Designer Stretch Knit Fabric', description: 'Soft-to-the-touch fabric with a naturally neutral feel for immediate plush comfort.', materials: 'Stretch knit fabric' },
      { name: 'Dual Layer CoolGel Quilt Fill', description: 'Cooling gel-infused quilted top draws heat away while delivering a plush surface feel.', materials: 'Gel-infused quilt fill' },
      { name: '1" Serene™ Total Comfort Plush Foam', description: 'Exceptional contouring and pressure relief with built-in heat moderating technology.', materials: 'Serene™ plush foam' },
      { name: 'High Density Comfort Foam', description: 'Open-cell foam provides comfort and support with continuous airflow capacity.', materials: 'HD polyurethane foam (CertiPUR-US)' },
      { name: 'Individually Wrapped Coil System', description: 'Quantum® perimeter coils and Caliber™ end springs deliver consistent edge-to-edge support with reduced roll-off.', materials: 'Tempered steel individually wrapped coils' },
    ],
    materials: [
      { name: 'Stretch Knit Cover', source: 'USA', certification: 'Breathable', description: 'Soft, breathable stretch knit fabric for plush comfort.' },
      { name: 'CoolGel Quilt Fill', source: 'USA', certification: 'CertiPUR-US', description: 'Dual-layer cooling gel fill draws heat away and enhances plush feel.' },
      { name: 'Serene™ Plush Foam', source: 'USA', certification: 'CertiPUR-US', description: '1" comfort foam with heat moderating technology for contouring pressure relief.' },
      { name: 'High Density Comfort Foam', source: 'USA', certification: 'CertiPUR-US', description: 'Open-cell HD foam for airflow, support, and long-term durability.' },
      { name: 'Tempered Steel Coil System', source: 'USA', certification: 'Made in USA', description: 'Individually wrapped coils with Quantum® sides and Caliber™ ends for edge-to-edge support.' },
    ],
  },
  {
    id: 'hl-2',
    slug: 'doze',
    name: 'Busby Doze',
    brand: 'busby',
    line: 'artisan',
    type: 'Hybrid',
    tagline: 'Plush comfort, built to last.',
    description: 'The Busby Doze is a 13½" XPlush hybrid mattress engineered for sleepers who want deep, enveloping comfort without sacrificing support. A 2" Serene™ foam comfort layer — double the depth of the Nod — works alongside CoolGel quilting and individually wrapped coils to deliver responsive pressure relief from the very first night.',
    price: 1299,
    originalPrice: 2598,
    rating: 4.8,
    reviewCount: 0,
    images: [
      '/images/products/Doze/doze.svg',
      '/images/products/Doze/doze-room.png',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 999, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 1099, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 1299, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 1499, inStock: true },    ],
    firmness: [
      { level: 'XFirm', description: 'Maximum support', recommended: ['Stomach sleepers', 'Heavier body types'] },
      { level: 'Firm', description: 'Solid support with light cushion', recommended: ['Back sleepers', 'Stomach sleepers'] },
      { level: 'Medium', description: 'Balanced support and comfort', recommended: ['All sleep positions', 'Couples'] },
      { level: 'Plush', description: 'Soft surface with coil support', recommended: ['Side sleepers', 'Lighter body types'] },
      { level: 'XPlush', description: 'Deep enveloping comfort', recommended: ['Side sleepers', 'Pressure relief seekers'] },
    ],
    selectedFirmness: 'Medium',
    features: [
      'Adjustable base compatible',
      'Roll-pack delivery',
      'CertiPUR-US certified foams',
      '10-year warranty',
      'Made in Wisconsin, USA',
    ],
    bestFor: ['XPlush comfort seekers', 'Side sleepers', 'Hot sleepers', 'Adjustable base owners'],
    components: [
      { name: 'Designer Stretch Knit Fabric', description: 'Soft-to-the-touch fabric with a naturally neutral feel for immediate plush comfort.', materials: 'Stretch knit fabric' },
      { name: 'Dual Layer CoolGel Quilt Fill', description: 'Cooling gel-infused quilted top draws heat away while delivering an XPlush surface feel.', materials: 'Gel-infused quilt fill' },
      { name: '2" Serene™ Total Comfort Foam', description: 'Double-depth comfort foam delivers exceptional contouring, deep pressure relief, and heat moderating technology.', materials: 'Serene™ plush foam' },
      { name: 'High Density Comfort Foam', description: 'Open-cell foam provides comfort and support with continuous airflow capacity.', materials: 'HD polyurethane foam (CertiPUR-US)' },
      { name: 'Individually Wrapped Coil System', description: 'Quantum® perimeter coils and Caliber™ end springs deliver consistent edge-to-edge support with reduced roll-off.', materials: 'Tempered steel individually wrapped coils' },
    ],
    materials: [
      { name: 'Stretch Knit Cover', source: 'Wisconsin, USA', certification: 'Breathable', description: 'Soft, breathable stretch knit fabric for XPlush comfort.' },
      { name: 'CoolGel Quilt Fill', source: 'Wisconsin, USA', certification: 'CertiPUR-US', description: 'Dual-layer cooling gel fill draws heat away and enhances plush feel.' },
      { name: 'Serene™ 2" Comfort Foam', source: 'Wisconsin, USA', certification: 'CertiPUR-US', description: '2" deep-comfort foam with heat moderating technology for superior pressure relief.' },
      { name: 'High Density Comfort Foam', source: 'Wisconsin, USA', certification: 'CertiPUR-US', description: 'Open-cell HD foam for airflow, support, and long-term durability.' },
      { name: 'Tempered Steel Coil System', source: 'Wisconsin, USA', certification: 'Made in USA', description: 'Individually wrapped coils with Quantum® sides and Caliber™ ends for edge-to-edge support.' },
    ],
  },
  {
    id: 'hl-3',
    slug: 'slumber',
    name: 'Busby Slumber',
    brand: 'busby',
    line: 'artisan',
    type: 'Hybrid',
    tagline: 'Rich, plush comfort that envelops you',
    description: 'The Busby Slumber is a 15½" plush hybrid mattress built for sleepers who demand the most from every layer. Six precision-engineered components — including 1" of 100% natural latex and 2" of Serene™ plush foam — work together with an individually wrapped coil system to deliver deep, responsive comfort from edge to edge.',
    price: 1699,
    originalPrice: 3398,
    rating: 4.8,
    reviewCount: 0,
    images: [
      '/images/products/Slumber/slumber.svg',
      '/images/products/Slumber/slumber-room.png',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 1299, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 1499, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 1699, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 1999, inStock: true },    ],
    firmness: [
      { level: 'XFirm', description: 'Maximum support', recommended: ['Stomach sleepers', 'Heavier body types'] },
      { level: 'Firm', description: 'Solid support with light cushion', recommended: ['Back sleepers', 'Stomach sleepers'] },
      { level: 'Medium', description: 'Balanced support and comfort', recommended: ['All sleep positions', 'Couples'] },
      { level: 'Plush', description: 'Soft surface with coil support', recommended: ['Side sleepers', 'Lighter body types'] },
      { level: 'XPlush', description: 'Deep enveloping comfort', recommended: ['Side sleepers', 'Pressure relief seekers'] },
    ],
    selectedFirmness: 'Plush',
    features: [
      'Adjustable base compatible',
      'Roll-pack delivery',
      'CertiPUR-US certified foams',
      '10-year warranty',
      'Made in Wisconsin, USA',
    ],
    bestFor: ['Plush comfort seekers', 'Side sleepers', 'Hot sleepers', 'Adjustable base owners'],
    components: [
      { name: 'Designer Stretch Knit Fabric', description: 'Soft-to-the-touch fabric with a naturally neutral feel for immediate plush comfort.', materials: 'Stretch knit fabric' },
      { name: 'Dual Layer CoolGel Quilt Fill', description: 'Cooling gel-infused quilted top draws heat away while delivering a plush surface feel.', materials: 'Gel-infused quilt fill' },
      { name: 'High Density Comfort Foam', description: 'Open-cell foam provides exceptional comfort and support with continuous airflow capacity.', materials: 'HD polyurethane foam (CertiPUR-US)' },
      { name: '1" 100% Natural Latex Foam', description: 'Responsive natural latex delivers buoyant, pressure-relieving comfort with uniform support.', materials: '100% natural latex' },
      { name: '2" Serene™ Total Comfort Plush Foam', description: 'Heat-moderating plush foam for deep contouring and pressure relief beneath the latex layer.', materials: 'Serene™ plush foam' },
      { name: 'Individually Wrapped Coil System', description: 'Quantum® perimeter coils and Caliber™ end springs deliver consistent edge-to-edge support with reduced roll-off.', materials: 'Tempered steel individually wrapped coils' },
    ],
    materials: [
      { name: 'Stretch Knit Cover', source: 'Wisconsin, USA', certification: 'Breathable', description: 'Soft, breathable stretch knit fabric for plush comfort.' },
      { name: 'CoolGel Quilt Fill', source: 'Wisconsin, USA', certification: 'CertiPUR-US', description: 'Dual-layer cooling gel fill draws heat away and enhances plush feel.' },
      { name: 'High Density Comfort Foam', source: 'Wisconsin, USA', certification: 'CertiPUR-US', description: 'Open-cell HD foam for airflow, comfort, and support.' },
      { name: '100% Natural Latex Foam', source: 'Wisconsin, USA', certification: 'Rainforest Alliance', description: 'Natural latex for responsive, buoyant pressure relief.' },
      { name: 'Serene™ 2" Plush Foam', source: 'Wisconsin, USA', certification: 'CertiPUR-US', description: '2" heat-moderating plush foam for deep contouring and pressure relief.' },
      { name: 'Tempered Steel Coil System', source: 'Wisconsin, USA', certification: 'Made in USA', description: 'Individually wrapped coils with Quantum® sides and Caliber™ ends for edge-to-edge support.' },
    ],
  },
  {
    id: 'hl-4',
    slug: 'dream',
    name: 'Busby Dream',
    brand: 'busby',
    line: 'artisan',
    type: 'Hybrid',
    tagline: 'Engineered for luxury performance.',
    description: 'The Busby Dream is a 15½" XPlush pillowtop hybrid mattress — the most refined mattress in the Busby Home line. Seven precision-engineered layers, including Joma® Wool-infused CoolGel quilting, 1" of natural latex, 2" of Serene™ plush foam, and a Tri-Zone encased coil system, deliver uncompromising plush comfort from surface to foundation.',
    price: 1999,
    originalPrice: 3998,
    rating: 4.9,
    reviewCount: 0,
    images: [
      '/images/products/Dream/dream.svg',
      '/images/products/Dream/dream-room.png',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 1599, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 1799, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 1999, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 2100, inStock: true },    ],
    firmness: [
      { level: 'XFirm', description: 'Maximum support', recommended: ['Stomach sleepers', 'Heavier body types'] },
      { level: 'Firm', description: 'Solid support with light cushion', recommended: ['Back sleepers', 'Stomach sleepers'] },
      { level: 'Medium', description: 'Balanced support and comfort', recommended: ['All sleep positions', 'Couples'] },
      { level: 'Plush', description: 'Soft surface with coil support', recommended: ['Side sleepers', 'Lighter body types'] },
      { level: 'XPlush', description: 'Deep pillowtop enveloping comfort', recommended: ['Side sleepers', 'Pressure relief seekers'] },
    ],
    selectedFirmness: 'Plush',
    features: [
      'Adjustable base compatible',
      'Roll-pack delivery',
      'CertiPUR-US certified foams',
      '10-year warranty',
      'Made in Wisconsin, USA',
    ],
    bestFor: ['XPlush comfort seekers', 'Side sleepers', 'Hot sleepers', 'Adjustable base owners'],
    components: [
      { name: 'Designer Stretch Knit Fabric', description: 'Soft-to-the-touch fabric with a naturally neutral feel for immediate plush comfort.', materials: 'Stretch knit fabric' },
      { name: 'Dual Layer CoolGel Quilt w/Joma® Wool', description: 'Cooling gel and Joma® Wool-infused quilted top draws heat away while delivering an ultra-plush surface feel.', materials: 'Gel + Joma® Wool quilt fill' },
      { name: '1" 100% Natural Latex Foam', description: 'Sleeps cooler than traditional memory foam and provides responsive, uniform support.', materials: '100% natural latex' },
      { name: '2" Serene™ Total Comfort Plush Foam', description: 'Exceptional contouring and pressure-relieving performance with built-in heat moderating technology.', materials: 'Serene™ plush foam' },
      { name: 'High Density Comfort Foam', description: 'Open-cell foam provides exceptional comfort and support with continuous airflow capacity.', materials: 'HD polyurethane foam (CertiPUR-US)' },
      { name: '2" Heavy Duty (2#) Comfort Foam', description: 'Additional heavy-duty comfort foam layer for exceptional contouring and pressure relief with heat moderating technology.', materials: 'HD 2# comfort foam (CertiPUR-US)' },
      { name: 'Tri-Zone Full Dimension Encased Coil Unit', description: 'Quantum® perimeter edges frame the sides to deliver a consistent sleep surface and reduce the roll-off feeling.', materials: 'Tri-zone encased coil system' },
    ],
    materials: [
      { name: 'Stretch Knit Cover', source: 'Wisconsin, USA', certification: 'Breathable', description: 'Soft, breathable stretch knit fabric for XPlush comfort.' },
      { name: 'CoolGel + Joma® Wool Quilt', source: 'Wisconsin, USA', certification: 'CertiPUR-US', description: 'Dual-layer cooling gel and Joma® Wool fill draws heat away for premium plush feel.' },
      { name: '100% Natural Latex Foam', source: 'Wisconsin, USA', certification: 'Rainforest Alliance', description: 'Natural latex for cool, responsive, buoyant pressure relief.' },
      { name: 'Serene™ 2" Comfort Foam', source: 'Wisconsin, USA', certification: 'CertiPUR-US', description: '2" heat-moderating plush foam for deep contouring and pressure relief.' },
      { name: 'High Density Comfort Foam', source: 'Wisconsin, USA', certification: 'CertiPUR-US', description: 'Open-cell HD foam for airflow, support, and long-term durability.' },
      { name: 'Heavy Duty (2#) Comfort Foam', source: 'Wisconsin, USA', certification: 'CertiPUR-US', description: '2" heavy-duty foam for additional contouring and heat-moderating pressure relief.' },
      { name: 'Tri-Zone Encased Coil System', source: 'Wisconsin, USA', certification: 'Made in USA', description: 'Full dimension encased coil unit with Quantum® perimeter edges for consistent edge-to-edge support.' },
    ],
  },
  {
    id: 'hl-crib-1',
    slug: 'nest',
    name: 'Nest',
    brand: 'busby',
    line: 'artisan',
    type: 'Crib Mattress',
    tagline: 'Safe, supportive sleep from day one',
    description: 'The Nest is designed from the ground up for your baby\'s safety and comfort. A firm, flat sleep surface meets infant safety standards while breathable materials keep little ones cool and comfortable through every nap and night.',
    price: 299,
    originalPrice: 598,
    rating: 4.9,
    reviewCount: 0,
    images: [
      '/images/products/Nest/busby-nest-crib-mattress.png',
      '/images/products/Nest/busby-nest-crib-mattress-corner.png',
    ],
    sizes: [
      { name: 'Standard Crib', dimensions: '28" x 52"', price: 299, inStock: true },
    ],
    firmness: [
      { level: 'Infant Firm', description: 'AAP-recommended firm surface for safe infant sleep', recommended: ['Newborns', 'Infants'] },
      { level: 'Toddler', description: 'Slightly softer feel for toddlers transitioning from crib to bed', recommended: ['Toddlers 18 months+'] },
    ],
    selectedFirmness: 'Plush',
    features: [
      'Dual-sided: Infant firm / Toddler comfort',
      '100% Fiber Glass Free',
      'Breathable, waterproof cover',
      'CertiPUR-US certified foams',
    ],
    bestFor: ['Newborns', 'Infants', 'Toddlers', 'Safe sleep'],
    components: [
      { name: 'Waterproof Cover', description: 'Removable, machine-washable cover with waterproof barrier for easy cleaning', materials: 'Quilted waterproof fabric' },
      { name: 'Infant Comfort Layer', description: 'Breathable foam layer promotes airflow to keep baby cool and comfortable', materials: 'Breathable comfort foam' },
      { name: 'Firm Support Core', description: 'Dense, flat support core provides the firm surface recommended for safe infant sleep', materials: 'HD support foam' },
    ],
    materials: [
      { name: 'Waterproof Cover', source: 'North Carolina, USA', certification: 'OEKO-TEX', description: 'Washable waterproof quilted fabric' },
      { name: 'Breathable Foam', source: 'Georgia, USA', certification: 'CertiPUR-US', description: 'Airflow-promoting comfort layer' },
      { name: 'HD Support Foam', source: 'North Carolina, USA', certification: 'CertiPUR-US', description: 'Firm, flat safe-sleep core' },
    ],
  },
  // ── Studio line ────────────────────────────────────────────────────────────
  // Imported from the abt Exclusive catalog per Berke's mapping:
  //   Studio 10 ← Luna · Studio 12 ← Mystic.
  //   Studio Hybrid + Studio Hybrid Firm are the SAME Cosmos Hybrid pocketed-coil
  //   build sold as a paired SKU (Medium vs a firmer comfort top).
  //   Photos are the legacy abt product images (swap for Studio photography later).
  {
    id: 'hl-studio-1',
    slug: 'studio-10',
    name: 'Studio 10',
    brand: 'busby',
    line: 'studio',
    type: 'Foam',
    tagline: 'The essentials of comfort and support',
    description:
      'Studio 10 delivers essential comfort at an accessible price point. With 3 carefully designed foam layers — gel-infused comfort, cooling memory foam, and a high-density support core — this mattress provides the foundation for quality sleep without unnecessary complexity.',
    price: 1348,
    originalPrice: 1696,
    rating: 0,
    reviewCount: 0,
    images: [
      '/images/products/studio/studio-10.webp',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 848, inStock: true },
      { name: 'Twin XL', dimensions: '38" x 80"', price: 898, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 1148, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 1348, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 1598, inStock: true },
    ],
    firmness: [
      { level: 'Soft', description: 'Plush, pressure-relieving comfort', recommended: ['Side sleepers', 'Lighter body types'] },
      { level: 'Medium', description: 'Balanced support and comfort', recommended: ['All sleep positions', 'Couples'] },
      { level: 'Firm', description: 'Maximum support, minimal sink', recommended: ['Back sleepers', 'Stomach sleepers'] },
    ],
    selectedFirmness: 'Medium',
    features: [
      '3-layer construction',
      'Foam support core',
      '100% Fiber Glass Free',
      'CertiPUR-US certified foams',
      'Breathable cover',
      'Made in the USA',
    ],
    bestFor: ['Value seekers', 'Guest rooms', 'First mattress buyers'],
    components: [
      { name: 'ResponseGel Technology', description: 'Gel-infused layer provides pressure relief and temperature regulation', materials: 'ResponseGel foam' },
      { name: 'CoolFlow Visco', description: 'Open-cell memory foam promotes airflow for cooler sleep', materials: 'CoolFlow memory foam' },
      { name: '7-inch High Density Body Support Core', description: 'Durable high-density foam core provides lasting support and stability', materials: 'HD polyurethane foam' },
    ],
    materials: [
      { name: 'Stretch Knit Cover', source: 'North Carolina, USA', certification: 'Breathable', description: 'Soft, breathable stretch knit fabric for comfort' },
      { name: 'Comfort Foam', source: 'Georgia, USA', certification: 'CertiPUR-US', description: 'Responsive foam for pressure relief' },
      { name: 'Support Foam', source: 'North Carolina, USA', certification: 'CertiPUR-US', description: 'High-density base for durability' },
    ],
  },
  {
    id: 'hl-studio-2',
    slug: 'studio-12',
    name: 'Studio 12',
    brand: 'busby',
    line: 'studio',
    type: 'Foam',
    tagline: 'Balances affordability and comfort',
    description:
      'Studio 12 strikes the perfect balance between value and performance. Its 3-layer design with a motion-isolating core ensures undisturbed sleep for you and your partner.',
    price: 2148,
    originalPrice: 2696,
    rating: 0,
    reviewCount: 0,
    images: [
      '/images/products/studio/studio-12.webp',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 1348, inStock: true },
      { name: 'Twin XL', dimensions: '38" x 80"', price: 1548, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 1748, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 2148, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 2448, inStock: true },
    ],
    firmness: [
      { level: 'Soft', description: 'Plush comfort with motion isolation', recommended: ['Side sleepers', 'Lighter body types'] },
      { level: 'Medium', description: 'Balanced support and comfort', recommended: ['All sleep positions', 'Couples'] },
      { level: 'Firm', description: 'Supportive feel with motion isolation', recommended: ['Back sleepers', 'Stomach sleepers'] },
    ],
    selectedFirmness: 'Medium',
    features: [
      '3-layer construction',
      'Motion-isolating core',
      '100% Fiber Glass Free',
      'Zero motion transfer',
      'CertiPUR-US certified foams',
      'Made in the USA',
    ],
    bestFor: ['Couples', 'Light sleepers', 'Budget-conscious'],
    components: [
      { name: 'Support Core', description: 'Motion-isolating core absorbs movement so partners sleep undisturbed', materials: 'Viscoelastic foam' },
      { name: 'Comfort Layer', description: 'Responsive comfort layer provides pressure relief and contouring', materials: 'Memory foam' },
      { name: 'Surface & Cover', description: 'Soft, breathable cover for temperature regulation', materials: 'Breathable fabric blend' },
    ],
    materials: [
      { name: 'Stretch Knit Cover', source: 'North Carolina, USA', certification: 'Breathable', description: 'Soft, breathable stretch knit fabric for comfort' },
      { name: 'Memory Foam', source: 'Georgia, USA', certification: 'CertiPUR-US', description: 'Motion-isolating comfort layer' },
      { name: 'Viscoelastic Foam', source: 'North Carolina, USA', certification: 'CertiPUR-US', description: 'Motion-absorbing support core' },
    ],
  },
  {
    id: 'hl-studio-3',
    slug: 'studio-hybrid',
    name: 'Studio Hybrid',
    brand: 'busby',
    line: 'studio',
    type: 'Hybrid',
    tagline: 'Balanced hybrid comfort, medium feel',
    description:
      'Studio Hybrid is built across 7 precision-engineered layers, combining premium foams with a pocketed-coil core for balanced, medium-feel comfort with zero motion transfer and complete pressure relief. Want a firmer surface? Meet its sibling, the Studio Hybrid Firm.',
    price: 2448,
    originalPrice: 2696,
    rating: 0,
    reviewCount: 0,
    images: [
      '/images/products/studio/studio-hybrid.webp',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 1348, inStock: true },
      { name: 'Twin XL', dimensions: '38" x 80"', price: 1828, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 1848, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 2448, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 2748, inStock: true },
    ],
    firmness: [
      { level: 'Soft', description: 'Plush comfort with coil support', recommended: ['Side sleepers', 'Lighter body types'] },
      { level: 'Medium', description: 'Balanced hybrid comfort', recommended: ['All sleep positions', 'Couples'] },
      { level: 'Firm', description: 'Supportive hybrid feel', recommended: ['Back sleepers', 'Stomach sleepers'] },
    ],
    selectedFirmness: 'Medium',
    features: [
      '7-layer construction',
      'Pocketed coil support system',
      'Zero motion transfer',
      'Pressure point relief',
      'Available in Medium and Firm',
      '100% Fiber Glass Free',
      'Made in the USA',
    ],
    bestFor: ['Couples', 'Side sleepers', 'Back pain sufferers', 'Hot sleepers'],
    components: [
      { name: 'Base Layer', description: 'Foundation foam provides durability and stability', materials: 'High-density base foam' },
      { name: 'Support Core', description: 'Individually wrapped coils provide targeted support and motion isolation', materials: 'Pocketed coil system' },
      { name: 'Coil Encasement', description: 'Reinforced edge support for full-surface use', materials: 'HD foam perimeter' },
      { name: 'Transition Layer', description: 'Buffers coils from comfort layers for smooth feel', materials: 'Transition foam' },
      { name: 'Memory Foam Layer', description: 'Pressure-relieving memory foam contours to your body', materials: 'Viscoelastic memory foam' },
      { name: 'Comfort Layer', description: 'Responsive gel-infused top layer for balanced, medium-feel cushioning', materials: 'Gel-infused foam' },
      { name: 'Surface & Cover', description: 'Premium quilted cover for luxurious feel', materials: 'Premium quilted fabric' },
    ],
    materials: [
      { name: 'Stretch Knit Cover', source: 'South Carolina, USA', certification: 'Breathable', description: 'Premium quilted stretch knit fabric for comfort' },
      { name: 'Gel Comfort Foam', source: 'Georgia, USA', certification: 'CertiPUR-US', description: 'Cooling gel-infused comfort layer' },
      { name: 'Memory Foam', source: 'Georgia, USA', certification: 'CertiPUR-US', description: 'Pressure-relieving viscoelastic foam' },
      { name: 'Pocketed Coils', source: 'Ohio, USA', certification: 'ISO 9001', description: 'Individually wrapped coils for support' },
      { name: 'HD Base Foam', source: 'North Carolina, USA', certification: 'CertiPUR-US', description: 'Durable foundation layer' },
    ],
  },
  {
    id: 'hl-studio-4',
    slug: 'studio-hybrid-firm',
    name: 'Studio Hybrid Firm',
    brand: 'busby',
    line: 'studio',
    type: 'Hybrid',
    tagline: 'Same hybrid build, firmer feel',
    description:
      'Studio Hybrid Firm shares the same 7-layer pocketed-coil build as the Studio Hybrid, finished with a firmer comfort layer up top for a flatter, more supportive surface — ideal for back and stomach sleepers who want the Studio Hybrid in a firmer feel.',
    price: 2448,
    originalPrice: 2696,
    rating: 0,
    reviewCount: 0,
    images: [
      '/images/products/studio/studio-hybrid-firm.webp',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 1348, inStock: true },
      { name: 'Twin XL', dimensions: '38" x 80"', price: 1828, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 1848, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 2448, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 2748, inStock: true },
    ],
    firmness: [
      { level: 'Medium', description: 'Balanced hybrid comfort', recommended: ['All sleep positions', 'Couples'] },
      { level: 'Firm', description: 'Firm, supportive surface with coil support', recommended: ['Back sleepers', 'Stomach sleepers'] },
      { level: 'XFirm', description: 'Maximum support, minimal sink', recommended: ['Stomach sleepers', 'Heavier body types'] },
    ],
    selectedFirmness: 'Firm',
    features: [
      '7-layer construction',
      'Firmer comfort top',
      'Pocketed coil support system',
      'Zero motion transfer',
      'Pressure point relief',
      'Available in Medium and Firm',
      '100% Fiber Glass Free',
      'Made in the USA',
    ],
    bestFor: ['Back sleepers', 'Stomach sleepers', 'Couples', 'Hot sleepers'],
    components: [
      { name: 'Base Layer', description: 'Foundation foam provides durability and stability', materials: 'High-density base foam' },
      { name: 'Support Core', description: 'Individually wrapped coils provide targeted support and motion isolation', materials: 'Pocketed coil system' },
      { name: 'Coil Encasement', description: 'Reinforced edge support for full-surface use', materials: 'HD foam perimeter' },
      { name: 'Transition Layer', description: 'Buffers coils from comfort layers for smooth feel', materials: 'Transition foam' },
      { name: 'Memory Foam Layer', description: 'Pressure-relieving memory foam contours to your body', materials: 'Viscoelastic memory foam' },
      { name: 'Firm Comfort Layer', description: 'A firmer gel-infused top layer for a flatter, more supportive surface', materials: 'Firm gel-infused foam' },
      { name: 'Surface & Cover', description: 'Premium quilted cover for luxurious feel', materials: 'Premium quilted fabric' },
    ],
    materials: [
      { name: 'Stretch Knit Cover', source: 'South Carolina, USA', certification: 'Breathable', description: 'Premium quilted stretch knit fabric for comfort' },
      { name: 'Firm Gel Comfort Foam', source: 'Georgia, USA', certification: 'CertiPUR-US', description: 'Firmer cooling gel-infused comfort layer' },
      { name: 'Memory Foam', source: 'Georgia, USA', certification: 'CertiPUR-US', description: 'Pressure-relieving viscoelastic foam' },
      { name: 'Pocketed Coils', source: 'Ohio, USA', certification: 'ISO 9001', description: 'Individually wrapped coils for support' },
      { name: 'HD Base Foam', source: 'North Carolina, USA', certification: 'CertiPUR-US', description: 'Durable foundation layer' },
    ],
  },
];

export const accessoryProducts: Product[] = [
  {
    id: 'acc-1',
    slug: 'mattress-encasement',
    name: 'Busby Mattress Encasement',
    brand: 'busby',
    line: 'artisan',
    type: 'Mattress Encasement',
    tagline: 'Total protection. Luxurious feel.',
    description: 'The Busby Mattress Encasement delivers certified, lab-tested protection against bed bugs, dust mites, mold, and bacteria — wrapped in an impermeable yet breathable waterproof barrier with a luxurious feel. The 360° SecureZZZip® closure ensures complete encasement from every angle, and it\'s fully machine washable for lasting performance.',
    price: 144,
    originalPrice: 144,
    rating: 4.9,
    reviewCount: 0,
    images: [
      '/images/products/MattressEncasement/mattress-encasement.png',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 104, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 134, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 144, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 154, inStock: true },
    ],
    firmness: [],
    selectedFirmness: '',
    features: [
      '360° SecureZZZip® closure',
      'Guaranteed bed bug protection',
      'Certified & laboratory tested',
      'Non-allergenic',
      'Protects against dust mites, mold & bacteria',
      'Impermeable yet breathable waterproof barrier',
      'Machine washable',
      'Luxurious feel',
    ],
    bestFor: ['Allergy sufferers', 'Bed bug protection', 'Waterproof coverage', 'All sleepers'],
    components: [
      { name: '360° SecureZZZip®', description: 'Patented full-encasement zipper system that seals every angle of your mattress for complete bed bug protection.', materials: 'Reinforced zipper closure' },
      { name: 'Waterproof Barrier Fabric', description: 'Impermeable yet breathable fabric that blocks liquids, allergens, dust mites, mold, and bacteria without trapping heat.', materials: 'Breathable waterproof laminate' },
    ],
    materials: [
      { name: 'Waterproof Barrier Fabric', source: 'USA', certification: 'Laboratory Tested', description: 'Breathable, impermeable fabric that protects against liquids and allergens.' },
      { name: 'SecureZZZip® Closure', source: 'USA', certification: 'Certified', description: 'Patented zipper system for complete 360° encasement.' },
    ],
  },
];

export const allProducts: Product[] = [...homeLineProducts, ...accessoryProducts];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

/**
 * Adult mattresses for a given line, in display order (price ascending, then by
 * id so equally-priced SKUs — e.g. the Studio Hybrid pair — stay deterministic).
 * Excludes cribs so callers get exactly the 4-up lineup the compare toggle and
 * line landing pages expect, preserving the grid-cols-4 layout.
 */
export function getProductsByLine(line: ProductLine): Product[] {
  return homeLineProducts
    .filter((p) => p.line === line && p.type !== 'Crib Mattress')
    .sort((a, b) => a.price - b.price || a.id.localeCompare(b.id));
}

export interface ResolvedLineItem {
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
}

/**
 * Resolve a client-supplied cart line to its canonical, server-trusted values.
 * The client may only choose WHAT to buy (productId + size + quantity); the
 * price, name, and image always come from this data file — never from the
 * request body. Returns null for unknown products/sizes so the caller can reject.
 */
export function resolveLineItem(input: {
  productId: string;
  size: string;
  quantity: number;
}): ResolvedLineItem | null {
  const product = getProductById(input.productId);
  if (!product) return null;

  const size = product.sizes.find((s) => s.name === input.size);
  // Products always carry sizes; if the requested size is unknown, reject
  // rather than silently falling back to a different price.
  if (!size) return null;
  if (!size.inStock) return null;

  const quantity = Math.floor(input.quantity);
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > 20) return null;

  return {
    name: `${product.name} - ${size.name}`,
    price: size.price,
    originalPrice: product.originalPrice,
    image: product.images[0] ?? '',
    quantity,
  };
}

export function getAllProductSlugs(): string[] {
  return allProducts.map((p) => p.slug);
}
