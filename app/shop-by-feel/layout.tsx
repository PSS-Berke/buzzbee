import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop by Feel | Busby',
  description:
    'Find your Busby mattress by how you sleep — side, back, stomach, hot sleepers, couples, and more.',
  alternates: { canonical: '/shop-by-feel' },
};

export default function ShopByFeelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
