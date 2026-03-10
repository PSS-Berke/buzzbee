'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartIcon() {
  const { toggleCartDrawer, itemCount } = useCart();

  return (
    <button
      onClick={toggleCartDrawer}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingBag className="w-6 h-6 text-navy" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-xs font-semibold rounded-full flex items-center justify-center animate-pulse">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  );
}
