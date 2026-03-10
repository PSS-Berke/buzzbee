'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/cart/CartItem';

export default function CartPage() {
  const { state, subtotal, savings, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f5] linen-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-12 h-12 text-gold-dark" />
            </div>
            <h1 className="text-3xl font-serif text-navy mb-4">Your cart is empty</h1>
            <p className="text-gray-500 mb-8">
              Discover our handcrafted mattresses and find your perfect sleep.
            </p>
            <Link
              href="/home-line"
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-medium py-4 px-8 rounded-full transition-all"
            >
              Shop Mattresses
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] linen-texture relative">
      {/* Warm ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255, 220, 180, 0.4) 0%, rgba(255, 200, 150, 0.2) 30%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-gold-dark font-medium text-sm mb-4">
            Your Selection
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-navy">Shopping Cart</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Items column */}
          <div className="lg:col-span-2">
            {/* Back link */}
            <Link
              href="/home-line"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-navy transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>

            {/* Cart items */}
            <div className="bg-white rounded-3xl border-2 border-gold/10 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-navy">
                  {state.items.length} {state.items.length === 1 ? 'Item' : 'Items'}
                </h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              <div className="divide-y divide-gold/10">
                {state.items.map((item) => (
                  <CartItem key={item.id} item={item} expanded />
                ))}
              </div>
            </div>
          </div>

          {/* Summary column */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-3xl border-2 border-gold/20 p-6 md:p-8 shadow-xl shadow-gold/5">
              <h2 className="text-xl font-serif text-navy mb-6">Order Summary</h2>

              {/* Subtotal */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-navy">${subtotal.toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">You Save</span>
                    <span className="text-gold-dark font-medium">
                      -${savings.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gold-dark font-medium">FREE</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gold/10 my-6" />

              {/* Total */}
              <div className="flex justify-between mb-8">
                <span className="text-lg font-semibold text-navy">Total</span>
                <span className="text-2xl font-semibold text-navy">
                  ${subtotal.toLocaleString()}
                </span>
              </div>

              {/* CTA */}
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-medium py-4 px-6 rounded-full transition-all group"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-gold/10">
                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                    Free Shipping
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                    Free Returns
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                    Secure Checkout
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                    Made in USA
                  </span>
                </div>
              </div>
            </div>

            {/* Financing note */}
            <div className="mt-6 bg-gold/5 rounded-2xl p-4 text-center">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gold-dark">Financing Available</span>
                {' '}&bull; Pay as low as ${Math.round(subtotal / 12)}/mo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
