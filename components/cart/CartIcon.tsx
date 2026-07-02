'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartIcon() {
  const { state, toggleCartDrawer, itemCount } = useCart();

  return (
    <button
      onClick={toggleCartDrawer}
      className="relative p-2.5 hover:bg-gray-100 rounded-full transition-colors"
      aria-label={`Shopping cart with ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
      aria-haspopup="dialog"
      aria-expanded={state.isOpen}
    >
      <ShoppingBag className="w-6 h-6 text-navy" />
      {itemCount > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-navy text-xs font-semibold rounded-full flex items-center justify-center"
        >
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  );
}
