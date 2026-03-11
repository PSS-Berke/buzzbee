import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found | Busby',
  description: 'The page you were looking for could not be found. Browse our American-made mattress collection.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">404</p>
        <h1 className="text-4xl font-serif text-navy mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you were looking for doesn&apos;t exist. Let&apos;s get you back to better sleep.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop/mattresses"
            className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-full transition-colors"
          >
            Shop Mattresses
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-8 py-4 rounded-full transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
