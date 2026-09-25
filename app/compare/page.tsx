import { Suspense } from 'react';
import CompareClient from './CompareClient';

export const metadata = {
  title: 'Compare Mattresses | Busby',
  description:
    'Build your own comparison: pick any Busby mattresses from the Artisan and Studio lines and see them side by side.',
  alternates: { canonical: '/compare' },
};

export default function ComparePage() {
  // CompareClient reads ?m= (the picked mattresses) via useSearchParams.
  return (
    <Suspense>
      <CompareClient />
    </Suspense>
  );
}
