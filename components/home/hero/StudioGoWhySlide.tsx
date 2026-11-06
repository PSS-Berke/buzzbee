'use client';

import { studioGoProduct } from '@/data/products';
import WhySlide, { type WhyContent } from './WhySlide';

const product = studioGoProduct;
const size = product.sizes[0];

// The primary hero, the slide the page opens on. It sells the bed on its own terms, for any
// room, not as the cheap alternative to Busby's other queens. All foam and medium firm are
// the only build details confirmed so far, so nothing here names layers or certifications
// yet. No "was" price, since there's no real former price to show.
const content: WhyContent = {
  eyebrow: `${product.name} · Online only`,
  lead: 'An all-foam queen for',
  price: `$${size.price}`,
  subhead: 'Made in Wisconsin, ready this week.',
  story: `Your own bedroom. The guest room. A new place. Wherever it’s going, finding a good bed shouldn’t take weeks. ${product.name} keeps it simple: one queen, one feel, one price.`,
  photo: {
    src: product.images[0],
    alt: `${product.name} queen mattress on a low wood platform in a sunlit bedroom`,
    ratio: '4 / 3',
    focus: 70,
  },
  // In the order someone weighs it.
  reasons: [
    {
      title: 'All foam, medium firm',
      body: 'Foam shapes itself to your body and soaks up movement, with no coils to squeak. Medium firm gives you that cushion without letting your hips sink.',
      pin: { x: 36, y: 56 },
    },
    {
      title: 'Made here, backed here',
      body: 'Made in Wisconsin and backed by the same local team and Elmhurst showroom as every Busby bed. Plus 100 nights at home to be sure.',
      pin: { x: 50, y: 72 },
    },
    {
      title: 'Ready this week',
      body: 'Pick it up in Elmhurst in 72 hours, or get free delivery to your door in 96. No weeks of waiting for a good night’s sleep.',
      pin: { x: 64, y: 56 },
    },
  ],
  summary: { label: `${product.name} ${size.name}`, value: `$${size.price}` },
  rows: [
    { label: 'Feels', value: 'Medium firm' },
    { label: 'Delivery', value: 'Free' },
    { label: 'Or 4 interest-free payments', value: `$${(size.price / 4).toFixed(2)}` },
  ],
  button: {
    href: `/products/${product.slug}`,
    label: 'See the Go',
    onClick: () => window.gtag?.('event', 'grab_and_go_home_click'),
    // It isn't on the showroom floor, so there's nothing to try in Elmhurst.
    showVisit: false,
  },
};

export default function StudioGoWhySlide({ active }: { active: boolean }) {
  return <WhySlide active={active} slideId="why" content={content} main />;
}
