import CompareClient from './CompareClient';

export const metadata = {
  title: 'Compare Mattresses | Busby',
  description:
    'Compare Busby mattresses side by side — toggle between the Artisan and Studio lines to find your perfect level.',
  alternates: { canonical: '/compare' },
};

export default function ComparePage() {
  return <CompareClient />;
}
