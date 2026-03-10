'use client';

import { useState } from 'react';
import { Info, ArrowRight } from 'lucide-react';
import type { Product, Size } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addItem, openCartDrawer } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size>(
    product.sizes.find((s) => s.name === 'Queen') || product.sizes[0]
  );
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
      <nav className="text-sm text-gray-400 font-light">
        <a href="/" className="hover:text-navy transition-colors">Home</a>
        <span className="mx-2">/</span>
        <a href="/products" className="hover:text-navy transition-colors">Mattresses</a>
        <span className="mx-2">/</span>
        <span className="text-navy">{product.name}</span>
      </nav>

      {/* Title Section - Editorial */}
      <div>
        <span className="inline-block text-gold-dark font-medium text-sm mb-3">
          {product.brand === 'abt' ? 'abt Exclusive' : 'Online Exclusive'}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-3">
          The <span className="font-semibold">{product.name}</span>
        </h1>
        <p className="text-lg text-gray-500">{product.tagline}</p>
      </div>

      {/* Price - Simplified */}
      <div className="py-6 border-t border-b border-gold/10">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl text-navy">
            ${selectedSize.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400">
            {selectedSize.name}
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Flexible payment options available at checkout
        </p>
      </div>

      {/* Size Selector - Horizontal Pills */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gold-dark font-medium">
            Select Size
          </label>
          <button className="text-sm text-gray-400 hover:text-gold-dark transition-colors duration-300 flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>Size guide</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size.name}
              onClick={() => setSelectedSize(size)}
              disabled={!size.inStock}
              className={`
                relative px-5 py-4 rounded-2xl border-2 transition-all duration-500
                ${selectedSize.name === size.name
                  ? 'border-gold bg-white shadow-lg shadow-gold/10'
                  : size.inStock
                    ? 'border-gold/10 hover:border-gold/30 bg-white/60'
                    : 'border-gray-100 bg-gray-50/50 opacity-40 cursor-not-allowed'
                }
              `}
            >
              <p className="font-semibold text-navy">{size.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{size.dimensions}</p>
              {selectedSize.name === size.name && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full" />
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
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-6 px-4 bg-gold/5 rounded-2xl text-sm text-gray-600">
        <a href="/" className="flex items-center gap-2 hover:text-gold-dark transition-colors">
          <span className="w-1.5 h-1.5 bg-gold rounded-full" />
          Financing Available
        </a>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-gold rounded-full" />
          Free Doorstep Delivery
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-gold rounded-full" />
          Free Returns
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-gold rounded-full" />
          100 Night Guarantee
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-gold rounded-full" />
          10 Year Warranty
        </span>
      </div>
    </div>
  );
}
