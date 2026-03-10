'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';
import CartEmpty from './CartEmpty';

export default function CartDrawer() {
  const { state, closeCartDrawer, subtotal, savings, itemCount } = useCart();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeCartDrawer]);

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/30 backdrop-blur-sm transition-opacity"
        onClick={closeCartDrawer}
      />

      {/* Drawer panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slideIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/10">
          <div>
            <h2 className="text-xl font-serif text-navy">Your Cart</h2>
            <p className="text-sm text-gray-400">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={closeCartDrawer}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <CartEmpty />
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {state.items.length > 0 && (
          <div className="border-t border-gold/10 p-6 bg-gray-50/50">
            {/* Savings */}
            {savings > 0 && (
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-500">You&apos;re saving</span>
                <span className="text-gold-dark font-medium">
                  ${savings.toLocaleString()}
                </span>
              </div>
            )}

            {/* Subtotal */}
            <div className="flex justify-between mb-6">
              <span className="text-navy font-medium">Subtotal</span>
              <span className="text-xl text-navy font-semibold">
                ${subtotal.toLocaleString()}
              </span>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Link
                href="/checkout"
                onClick={closeCartDrawer}
                className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-medium py-4 px-6 rounded-full transition-all"
              >
                Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cart"
                onClick={closeCartDrawer}
                className="w-full flex items-center justify-center gap-2 border-2 border-gold/20 hover:border-gold/40 text-navy font-medium py-4 px-6 rounded-full transition-all"
              >
                View Cart
              </Link>
            </div>

            {/* Trust note */}
            <p className="text-xs text-gray-400 text-center mt-4">
              Free shipping on all orders
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
