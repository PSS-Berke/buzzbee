'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Phone, Flag } from 'lucide-react';
import CartIcon from '@/components/cart/CartIcon';

const navigation = {
  mattresses: {
    label: 'Mattresses',
    items: [
      { name: 'Sleep6', href: '/home-line' },
      { name: 'Abt Exclusive', href: '/abt-exclusive' },
      { name: 'Shop by Feel', href: '/shop-by-feel' },
      { name: 'Compare Mattresses', href: '/compare' },
    ],
  },
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-navy text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4" />
            <span>Proudly Made in the USA</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <a href="tel:18443753376" className="flex items-center gap-1 hover:text-gold-light transition-colors">
              <Phone className="w-4 h-4" />
              <span>1-844-375-3376</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Sleep6 - Crafted in Chicago"
              width={180}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {Object.entries(navigation).map(([key, section]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-gray-700 hover:text-navy font-medium py-4 transition-colors">
                  {section.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === key && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 border border-gray-100">
                    {section.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-navy transition-colors"
                      >
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/about"
              className="text-gray-700 hover:text-navy font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/faq"
              className="text-gray-700 hover:text-navy font-medium transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/quiz"
              className="text-gray-700 hover:text-navy font-medium transition-colors"
            >
              Sleep Quiz
            </Link>
          </div>

          {/* CTA button and Cart */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/home-line"
              className="bg-gold hover:bg-gold-dark text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              Shop Now
            </Link>
            <CartIcon />
          </div>

          {/* Mobile cart and menu */}
          <div className="lg:hidden flex items-center gap-2">
            <CartIcon />
            <button
              className="p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            {Object.entries(navigation).map(([key, section]) => (
              <div key={key} className="space-y-2">
                <p className="font-semibold text-navy">{section.label}</p>
                <div className="pl-4 space-y-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-gray-600 hover:text-navy transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <Link
                href="/about"
                className="block text-gray-700 hover:text-navy font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/faq"
                className="block text-gray-700 hover:text-navy font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/quiz"
                className="block text-gray-700 hover:text-navy font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sleep Quiz
              </Link>
            </div>
            <div className="pt-4">
              <Link
                href="/home-line"
                className="block w-full bg-gold hover:bg-gold-dark text-white font-semibold px-6 py-3 rounded-full text-center transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
