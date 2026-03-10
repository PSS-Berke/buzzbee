'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartEmpty() {
  const { closeCartDrawer } = useCart();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="w-10 h-10 text-gold-dark" />
      </div>
      <h3 className="text-xl font-serif text-navy mb-2">Your cart is empty</h3>
      <p className="text-gray-500 mb-8 max-w-xs">
        Discover our handcrafted mattresses and find your perfect sleep.
      </p>
      <Link
        href="/home-line"
        onClick={closeCartDrawer}
        className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-medium py-3 px-6 rounded-full transition-all"
      >
        Shop Mattresses
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
