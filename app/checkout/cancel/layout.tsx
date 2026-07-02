import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Cancelled | Busby',
  robots: { index: false, follow: false },
};

export default function CheckoutCancelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
