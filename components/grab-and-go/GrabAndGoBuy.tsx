'use client';

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Store, Truck, Loader2, Lock } from 'lucide-react';
import { grabAndGoProduct } from '@/data/products';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Fulfillment = 'pickup' | 'delivery';

const options: {
  value: Fulfillment;
  icon: typeof Store;
  title: string;
  timing: string;
  detail: string;
}[] = [
  {
    value: 'pickup',
    icon: Store,
    title: 'Store pickup',
    timing: 'Ready in 72 hours',
    detail: 'Pick it up at our Elmhurst showroom',
  },
  {
    value: 'delivery',
    icon: Truck,
    title: 'Delivery',
    timing: 'At your door in 96 hours',
    detail: 'Free delivery, straight to your home',
  },
];

/**
 * Buy box for the grab and go special. Skips the cart on purpose: one bed, one
 * size, one decision, straight to Stripe with the pickup or delivery choice.
 */
export default function GrabAndGoBuy() {
  const product = grabAndGoProduct;
  const size = product.sizes[0];
  const [fulfillment, setFulfillment] = useState<Fulfillment>('pickup');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  function choose(value: Fulfillment) {
    setFulfillment(value);
    window.gtag?.('event', 'grab_and_go_fulfillment_select', { fulfillment: value });
  }

  async function handleBuy() {
    setStatus('loading');
    window.gtag?.('event', 'begin_checkout', {
      currency: 'USD',
      value: size.price,
      fulfillment,
      items: [{ item_id: product.id, item_name: product.name, item_variant: size.name, price: size.price, quantity: 1 }],
    });
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ productId: product.id, size: size.name, quantity: 1 }],
          fulfillment,
        }),
      });
      const data = (await res.json()) as { url?: string };
      if (!res.ok || !data.url) throw new Error('checkout failed');
      window.location.href = data.url;
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border-2 border-gold/15 shadow-lg text-navy">
      {/* Only the note waits on the URL, so the buy box itself still renders on the server. */}
      <Suspense fallback={null}>
        <CancelledNote />
      </Suspense>
      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-24 h-20 sm:w-28 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-[#faf8f5]">
          <Image
            src={product.images[0]}
            alt={`${product.name} mattress`}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-serif text-xl sm:text-2xl leading-tight">{product.name}</p>
          <p className="text-gray-600 text-sm">
            {size.name} · {size.dimensions}
          </p>
          <p className="mt-1 text-3xl font-semibold">
            ${size.price}
            <span className="ml-2 align-middle text-xs font-semibold uppercase tracking-wide text-gold-dark">
              Online only
            </span>
          </p>
        </div>
      </div>

      <fieldset className="mb-5">
        <legend className="font-semibold mb-3">How do you want it?</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((o) => {
            const Icon = o.icon;
            const selected = fulfillment === o.value;
            return (
              <label
                key={o.value}
                className={`relative flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-navy ${
                  selected ? 'border-gold bg-gold/10' : 'border-gray-200 hover:border-gold/50'
                }`}
              >
                <input
                  type="radio"
                  name="fulfillment"
                  value={o.value}
                  checked={selected}
                  onChange={() => choose(o.value)}
                  className="sr-only"
                />
                <Icon className="w-5 h-5 mt-0.5 text-gold-dark flex-shrink-0" aria-hidden="true" />
                <span>
                  <span className="block font-semibold">{o.title}</span>
                  <span className="block text-sm font-medium text-navy">{o.timing}</span>
                  <span className="block text-sm text-gray-600">{o.detail}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={handleBuy}
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold rounded-full px-8 py-4 text-lg hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            Opening secure checkout
          </>
        ) : (
          <>Buy now for ${size.price}</>
        )}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-500">
        <Lock className="w-3.5 h-3.5" aria-hidden="true" />
        Secure checkout. Tax added at checkout.
      </p>

      {status === 'error' && (
        <p role="alert" className="mt-3 text-sm text-coral text-center">
          We couldn&rsquo;t open checkout. Please try again, or call us at (844) 886-1640.
        </p>
      )}
    </div>
  );
}

// Stripe sends people who back out of checkout here with ?checkout=cancelled,
// which is how the offer's cart abandonment shows up in GA4.
function CancelledNote() {
  const cancelled = useSearchParams().get('checkout') === 'cancelled';

  useEffect(() => {
    if (cancelled) window.gtag?.('event', 'grab_and_go_checkout_abandon');
  }, [cancelled]);

  if (!cancelled) return null;
  return (
    <p role="status" className="mb-4 rounded-xl bg-gold/10 px-4 py-3 text-sm">
      Your order wasn&rsquo;t completed and nothing was charged. It&rsquo;s still here when you&rsquo;re ready.
    </p>
  );
}
