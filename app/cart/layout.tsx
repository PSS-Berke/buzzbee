import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | Busby',
  description: 'Review the items in your Busby cart before checkout.',
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
