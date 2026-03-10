'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ShoppingBag, Lock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CheckoutPage() {
  const { state, subtotal, savings } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const items = state.items.map((item) => ({
        name: `${item.productName} - ${item.size}`,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, email: formData.email }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Something went wrong');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

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
              Add some items to your cart before checking out.
            </p>
            <Link
              href="/products"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-navy">Checkout</h1>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            Secure Checkout
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-3xl border-2 border-gold/10 p-6 md:p-8">
                <h2 className="text-xl font-serif text-navy mb-6">Contact Information</h2>
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gold/10 focus:border-gold focus:outline-none transition-colors text-navy placeholder-gray-400"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gold/10 focus:border-gold focus:outline-none transition-colors text-navy placeholder-gray-400"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-3xl border-2 border-gold/10 p-6 md:p-8">
                <h2 className="text-xl font-serif text-navy mb-6">Shipping Address</h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gold/10 focus:border-gold focus:outline-none transition-colors text-navy placeholder-gray-400"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gold/10 focus:border-gold focus:outline-none transition-colors text-navy placeholder-gray-400"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gold/10 focus:border-gold focus:outline-none transition-colors text-navy placeholder-gray-400"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-2">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gold/10 focus:border-gold focus:outline-none transition-colors text-navy placeholder-gray-400"
                      placeholder="Apt 4B"
                    />
                  </div>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-3">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gold/10 focus:border-gold focus:outline-none transition-colors text-navy placeholder-gray-400"
                        placeholder="Chicago"
                      />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        maxLength={2}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gold/10 focus:border-gold focus:outline-none transition-colors text-navy placeholder-gray-400 uppercase"
                        placeholder="IL"
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gold/10 focus:border-gold focus:outline-none transition-colors text-navy placeholder-gray-400"
                        placeholder="60601"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-3xl border-2 border-gold/20 p-6 md:p-8">
                <h2 className="text-xl font-serif text-navy mb-6">Payment</h2>
                <div className="bg-gold/5 rounded-2xl p-6 flex items-start gap-4">
                  <Lock className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-navy mb-1">Secure Payment via Stripe</p>
                    <p>
                      You&apos;ll enter your card details on Stripe&apos;s encrypted payment page. We never store your card information.
                    </p>
                  </div>
                </div>
                {error && (
                  <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
                )}
              </div>

              {/* Submit button - Mobile */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-full transition-all group"
                >
                  {loading ? 'Redirecting to Stripe...' : 'Proceed to Secure Payment'}
                  {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </div>

            {/* Order Summary column */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-3xl border-2 border-gold/20 p-6 md:p-8 shadow-xl shadow-gold/5">
                <h2 className="text-xl font-serif text-navy mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.productName}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-navy truncate">{item.productName}</p>
                        <p className="text-xs text-gray-400">
                          {item.size}
                        </p>
                        <p className="text-sm text-navy mt-1">${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gold/10 my-6" />

                {/* Totals */}
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
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span className="text-gray-400">Calculated at next step</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gold/10 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-navy">Total</span>
                    <span className="text-2xl font-semibold text-navy">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Submit button - Desktop */}
                <div className="hidden lg:block">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-full transition-all group"
                  >
                    {loading ? 'Redirecting to Stripe...' : 'Proceed to Secure Payment'}
                    {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-gold/10">
                  <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                      Free Shipping
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
