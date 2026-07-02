'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product, Size } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addItem, openCartDrawer } = useCart();
  const isStudio = product.line === 'studio';
  const [selectedSize, setSelectedSize] = useState<Size>(
    product.sizes.find((s) => s.name === 'Queen') || product.sizes[0]
  );
  const sizeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow-key selection for the size radiogroup, skipping out-of-stock sizes
  const handleSizeKeyDown = (e: React.KeyboardEvent, index: number) => {
    const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const backward = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!forward && !backward) return;
    e.preventDefault();
    const sizes = product.sizes;
    const step = forward ? 1 : -1;
    let next = (index + step + sizes.length) % sizes.length;
    let attempts = 0;
    while (!sizes[next].inStock && attempts < sizes.length) {
      next = (next + step + sizes.length) % sizes.length;
      attempts++;
    }
    if (sizes[next].inStock) {
      setSelectedSize(sizes[next]);
      sizeRefs.current[next]?.focus();
    }
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      productType: product.type,
      size: selectedSize.name,
      sizeDimensions: selectedSize.dimensions,
      price: selectedSize.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      image: product.images[0] || '',
    });
    openCartDrawer();
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-600 font-light">
        <ol className="flex flex-wrap items-center">
          <li className="flex items-center">
            <Link href="/" className="hover:text-navy transition-colors">Home</Link>
            <span aria-hidden="true" className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href="/products" className="hover:text-navy transition-colors">Mattresses</Link>
            <span aria-hidden="true" className="mx-2">/</span>
          </li>
          <li aria-current="page" className="text-navy">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Title Section - Editorial */}
      <div>
        <span className="inline-block text-[var(--accent-strong)] font-medium text-sm mb-3">
          {product.line === 'studio' ? 'Studio' : product.brand === 'abt' ? 'abt Exclusive' : 'Busby'}
        </span>
        <h1 className={`text-3xl md:text-4xl lg:text-5xl text-navy mb-3 ${isStudio ? 'font-sans' : 'font-serif'}`}>
          The <span className="font-semibold">{product.name}</span>
        </h1>
        <p className="text-lg text-gray-600">{product.tagline}</p>
      </div>

      {/* Price - Simplified; live so size changes announce the new price */}
      <div className="py-6 border-t border-b border-[var(--card-border)]/10">
        <div className="flex items-baseline gap-2" aria-live="polite">
          <span className="text-3xl text-navy">
            ${selectedSize.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-600">
            {selectedSize.name}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Flexible payment options available at checkout
        </p>
      </div>

      {/* Size Selector - Horizontal Pills */}
      <div className="space-y-4">
        <p id="size-group-label" className="block text-sm text-[var(--accent-strong)] font-medium">
          Select Size
        </p>
        <div role="radiogroup" aria-labelledby="size-group-label" className="flex flex-wrap gap-3">
          {product.sizes.map((size, index) => (
            <button
              key={size.name}
              ref={(el) => {
                sizeRefs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selectedSize.name === size.name}
              tabIndex={selectedSize.name === size.name ? 0 : -1}
              onClick={() => setSelectedSize(size)}
              onKeyDown={(e) => handleSizeKeyDown(e, index)}
              disabled={!size.inStock}
              className={`
                relative px-5 py-4 rounded-2xl border-2 transition-all duration-500
                ${selectedSize.name === size.name
                  ? 'border-[var(--card-border)] bg-white shadow-lg shadow-[var(--accent)]/10'
                  : size.inStock
                    ? 'border-[var(--card-border)]/10 hover:border-[var(--card-border)]/30 bg-white/60'
                    : 'border-gray-100 bg-gray-50/50 opacity-40 cursor-not-allowed'
                }
              `}
            >
              <span className="block font-semibold text-navy">{size.name}</span>
              <span className="block text-xs text-gray-600 mt-0.5">{size.dimensions}</span>
              {selectedSize.name === size.name && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--accent)] rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart - Premium Navy */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedSize.inStock}
        className="w-full bg-navy hover:bg-navy-dark text-white font-medium py-5 px-8 rounded-full text-lg tracking-wide transition-all duration-500 hover:shadow-2xl hover:shadow-navy/20 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="flex items-center justify-center gap-3">
          {selectedSize.inStock ? 'Add to Cart' : 'Out of Stock'}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
        </span>
      </button>

      {/* Trust Badges - Single Elegant Line */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 py-6 px-4 bg-[var(--accent)]/5 rounded-2xl text-sm text-gray-600">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 flex-shrink-0 bg-[var(--accent)] rounded-full" />
          Financing Available
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 flex-shrink-0 bg-[var(--accent)] rounded-full" />
          Free Doorstep Delivery
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 flex-shrink-0 bg-[var(--accent)] rounded-full" />
          Free Returns
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 flex-shrink-0 bg-[var(--accent)] rounded-full" />
          100 Night Guarantee
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 flex-shrink-0 bg-[var(--accent)] rounded-full" />
          10 Year Warranty
        </span>
      </div>
    </div>
  );
}
