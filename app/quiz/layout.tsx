import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sleep Quiz | Find Your Perfect Buzzbee Mattress',
  description: 'Take our free sleep quiz to find the perfect Buzzbee mattress for your sleep style, position, and comfort preferences.',
  keywords: ['sleep quiz', 'mattress quiz', 'find the right mattress', 'Buzzbee mattress quiz'],
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
