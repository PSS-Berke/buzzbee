'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] linen-texture relative">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255, 220, 180, 0.4) 0%, rgba(255, 200, 150, 0.2) 30%, transparent 60%)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-gold-dark" />
          </div>
          <h1 className="text-4xl font-serif text-navy mb-4">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-2">Your order has been placed successfully.</p>
          <p className="text-gray-500 mb-10">
            A confirmation email will be sent to you shortly. If you have any questions, feel free to reach out to us.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-medium py-4 px-8 rounded-full transition-all group"
          >
            Back to Home
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
