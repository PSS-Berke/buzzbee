import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'One-Sheet | Robert Taglianetti | Busby',
  robots: { index: false, follow: false },
};

export default function OneSheetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
