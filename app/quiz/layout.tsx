import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sleep Quiz | Find Your Perfect Busby Mattress',
  description: 'Take our free sleep quiz to find the perfect Busby mattress for your sleep style, position, and comfort preferences.',
  keywords: ['sleep quiz', 'mattress quiz', 'find the right mattress', 'Busby mattress quiz'],
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
