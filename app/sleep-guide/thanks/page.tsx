import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thanks — your Sleep Guide is on the way | Busby',
  description: 'Check your inbox for the Busby Sleep Guide.',
  robots: { index: false, follow: false },
};

interface SearchParams {
  searchParams: Promise<{ source?: string; error?: string }>;
}

export default async function ThanksPage({ searchParams }: SearchParams) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-[#faf8f5] linen-texture flex flex-col">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Link href="/" className="inline-flex items-center" aria-label="Busby home">
            <Image
              src="/2.svg"
              alt="Busby"
              width={120}
              height={40}
              unoptimized
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-xl text-center">
          {error === 'rate' ? (
            <>
              <h1 className="text-3xl md:text-4xl font-serif text-navy mb-4">
                You’re going a little fast.
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We’ve had a few requests from you in a short window. Give it a minute and try again
                — or email{' '}
                <a href="mailto:newsletter@mybusby.com" className="text-gold-dark hover:underline">
                  newsletter@mybusby.com
                </a>{' '}
                and we’ll add you manually.
              </p>
            </>
          ) : error ? (
            <>
              <h1 className="text-3xl md:text-4xl font-serif text-navy mb-4">
                That email didn’t go through.
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Looks like the address got mistyped, or our system hiccuped. Try once more, or email{' '}
                <a href="mailto:newsletter@mybusby.com" className="text-gold-dark hover:underline">
                  newsletter@mybusby.com
                </a>{' '}
                and we’ll add you manually.
              </p>
              <Link
                href="/sleep-guide"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
              >
                Try again
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-9 h-9 text-gold-dark" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif text-navy mb-4">Check your inbox.</h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your Sleep Guide is on its way. (Subject line: <em>Your Busby Sleep Guide.</em>) If
                you don’t see it in 5 minutes, peek in spam or{' '}
                <a href="mailto:support@mybusby.com" className="text-gold-dark hover:underline">
                  support@mybusby.com
                </a>{' '}
                will sort it out.
              </p>
              <p className="text-gray-600 mb-8">
                While you’re here — take the 2-minute Sleep Quiz for an instant mattress match.
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
              >
                Take the Sleep Quiz
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>
      </main>

      <footer className="bg-navy text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Busby. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
