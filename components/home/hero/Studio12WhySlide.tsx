'use client';

import { getProductBySlug } from '@/data/products';
import WhySlide, { type WhyContent } from './WhySlide';

const product = getProductBySlug('studio-12')!;
const money = (n: number) => `$${n.toLocaleString('en-US')}`;
const queen = product.sizes.find((s) => s.name === 'Queen')!;
const prices = product.sizes.map((s) => s.price);

// The same layout as the primary hero, for the Studio bed with its own story: a quiet night
// for two. Every claim comes from its product data, and no installment line, since a
// payment plan confirmed for Studio Go isn't confirmed for this price.
const content: WhyContent = {
  eyebrow: `${product.name} · The Studio Line`,
  lead: 'Quiet by design. Queen for',
  price: money(queen.price),
  subhead: 'Zero motion transfer, so you both sleep undisturbed.',
  story: `An early alarm. A restless partner. A dog that changes spots at midnight. None of it should travel across the bed. ${product.name}’s motion-isolating core absorbs it before it reaches your side.`,
  photo: {
    src: product.images[0],
    alt: `${product.name} queen mattress on a wood frame in a brick loft, with city towers through the window`,
    ratio: '4 / 5',
    focus: 62,
  },
  reasons: [
    {
      title: 'Movement stays put',
      body: 'A motion-isolating core absorbs movement before it crosses the bed, so you and your partner sleep undisturbed.',
      pin: { x: 30, y: 61 },
    },
    {
      title: 'Contours to you',
      body: 'A responsive memory foam layer relieves pressure and contours to your body, under a soft, breathable cover.',
      pin: { x: 50, y: 50 },
    },
    {
      title: 'Clean foam, made here',
      body: 'CertiPUR-US certified foams, 100% fiberglass free and made in the USA. Plus 100 nights at home to be sure.',
      pin: { x: 70, y: 61 },
    },
  ],
  summary: { label: `${product.name} ${queen.name}`, value: money(queen.price) },
  rows: [
    { label: 'Twin to King', value: `${money(Math.min(...prices))} to ${money(Math.max(...prices))}` },
    { label: 'Feels', value: 'Soft, medium or firm' },
    { label: 'Delivery', value: 'Free' },
  ],
  button: { href: `/products/${product.slug}`, label: `See the ${product.name}` },
};

export default function Studio12WhySlide({ active }: { active: boolean }) {
  return <WhySlide active={active} slideId="studio12" content={content} />;
}
