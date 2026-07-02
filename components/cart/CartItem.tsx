'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
  expanded?: boolean;
}

export default function CartItem({ item, expanded = false }: CartItemProps) {
  const { removeItem } = useCart();

  return (
    <div className={`flex gap-4 ${expanded ? 'py-6' : 'py-4'} border-b border-gold/10`}>
      {/* Image */}
      <Link
        href={`/products/${item.productSlug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <div
          className={`${expanded ? 'w-28 h-28' : 'w-20 h-20'} rounded-2xl overflow-hidden bg-gray-100`}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.productName}
              width={expanded ? 112 : 80}
              height={expanded ? 112 : 80}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
              No image
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.productSlug}`}
          className="font-semibold text-navy hover:text-gold-dark transition-colors"
        >
          {item.productName}
        </Link>
        <p className="text-sm text-gray-600 mt-0.5">
          {item.size}
        </p>
        <p className="text-xs text-gray-600 mt-0.5">{item.productType}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-navy font-medium">
            {item.originalPrice > item.price && <span className="sr-only">Sale price: </span>}
            ${item.price.toLocaleString()}
          </span>
          {item.originalPrice > item.price && (
            <s className="text-gray-600 line-through text-sm">
              <span className="sr-only">Original price: </span>
              ${item.originalPrice.toLocaleString()}
            </s>
          )}
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.id)}
        className="flex-shrink-0 p-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        aria-label={`Remove ${item.productName} (${item.size}) from cart`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
