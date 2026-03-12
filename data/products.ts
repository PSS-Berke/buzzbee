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

// Sleep6 — online exclusives
export const homeLineProducts: Product[] = [
  {
    id: 'hl-1',
    slug: 'nod',
    name: 'Busby Nod',
    brand: 'busby',
    type: 'Hybrid',
    tagline: 'Dependable comfort, night after night',
    description: 'The Busby Nod is a 13½" plush hybrid mattress built for sleepers who want the conforming feel of foam with the responsive support of individually wrapped coils. Five precision-layered components work together — from the CoolGel-infused quilt fill to the Quantum® reinforced perimeter coils — to deliver consistent, roll-off-free comfort from edge to edge.',
    price: 549,
    originalPrice: 1098,
    rating: 4.7,
    reviewCount: 0,
    images: [
      '/images/products/Nod/nod.svg',
      '/images/products/Nod/nod-room.png',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 399, inStock: true },
      { name: 'Twin XL', dimensions: '38" x 80"', price: 449, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 499, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 549, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 749, inStock: true },    ],
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
    type: 'Hybrid',
    tagline: 'Plush comfort, built to last.',
    description: 'The Busby Doze is a 13½" XPlush hybrid mattress engineered for sleepers who want deep, enveloping comfort without sacrificing support. A 2" Serene™ foam comfort layer — double the depth of the Nod — works alongside CoolGel quilting and individually wrapped coils to deliver responsive pressure relief from the very first night.',
    price: 749,
    originalPrice: 1498,
    rating: 4.8,
    reviewCount: 0,
    images: [
      '/images/products/Doze/doze.svg',
      '/images/products/Doze/doze-room.png',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 549, inStock: true },
      { name: 'Twin XL', dimensions: '38" x 80"', price: 599, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 699, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 749, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 999, inStock: true },    ],
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
    type: 'Hybrid',
    tagline: 'Rich, plush comfort that envelops you',
    description: 'The Busby Slumber is a 15½" plush hybrid mattress built for sleepers who demand the most from every layer. Six precision-engineered components — including 1" of 100% natural latex and 2" of Serene™ plush foam — work together with an individually wrapped coil system to deliver deep, responsive comfort from edge to edge.',
    price: 999,
    originalPrice: 1998,
    rating: 4.8,
    reviewCount: 0,
    images: [
      '/images/products/Slumber/slumber.svg',
      '/images/products/Slumber/slumber-room.png',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 749, inStock: true },
      { name: 'Twin XL', dimensions: '38" x 80"', price: 799, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 899, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 999, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 1249, inStock: true },    ],
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
    type: 'Hybrid',
    tagline: 'Engineered for luxury performance.',
    description: 'The Busby Dream is a 15½" XPlush pillowtop hybrid mattress — the most refined mattress in the Busby Home line. Seven precision-engineered layers, including Joma® Wool-infused CoolGel quilting, 1" of natural latex, 2" of Serene™ plush foam, and a Tri-Zone encased coil system, deliver uncompromising plush comfort from surface to foundation.',
    price: 1299,
    originalPrice: 2598,
    rating: 4.9,
    reviewCount: 0,
    images: [
      '/images/products/Dream/dream.svg',
      '/images/products/Dream/dream-room.png',
    ],
    sizes: [
      { name: 'Twin', dimensions: '38" x 75"', price: 999, inStock: true },
      { name: 'Twin XL', dimensions: '38" x 80"', price: 1049, inStock: true },
      { name: 'Full', dimensions: '54" x 75"', price: 1199, inStock: true },
      { name: 'Queen', dimensions: '60" x 80"', price: 1299, inStock: true },
      { name: 'King', dimensions: '76" x 80"', price: 1599, inStock: true },    ],
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
    type: 'Crib Mattress',
    tagline: 'Safe, supportive sleep from day one',
    description: 'The Nest is designed from the ground up for your baby\'s safety and comfort. A firm, flat sleep surface meets infant safety standards while breathable materials keep little ones cool and comfortable through every nap and night.',
    price: 179,
    originalPrice: 358,
    rating: 4.9,
    reviewCount: 0,
    images: [
      '/images/products/Nest/MyGreenMattress_Crib_February2024-1 (1).jpg',
      '/images/products/Nest/MyGreenMattress_Crib_February2024-5 (1).jpg',
    ],
    sizes: [
      { name: 'Standard Crib', dimensions: '28" x 52"', price: 179, inStock: true },
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
      'Online Exclusive',
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
];

export const accessoryProducts: Product[] = [
  {
    id: 'acc-1',
    slug: 'mattress-encasement',
    name: 'Busby Mattress Encasement',
    brand: 'busby',
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
      { name: 'Twin XL', dimensions: '38" x 80"', price: 114, inStock: true },
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

export function getAllProductSlugs(): string[] {
  return allProducts.map((p) => p.slug);
}
