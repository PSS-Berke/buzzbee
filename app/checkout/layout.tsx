import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | Busby',
  description: 'Securely complete your Busby order.',
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
