'use client';

import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Phone, MapPin, CalendarCheck, DoorOpen } from 'lucide-react';
import CartIcon from '@/components/cart/CartIcon';
import { elmhurstStore, formatAddress } from '@/data/store';

const shopNav = {
  label: 'Shop',
  inStore: [
    {
      icon: CalendarCheck,
      name: 'Book a Sleep Consultation',
      sublabel: 'One-on-one with a Sleep Guide',
      href: '/appointment',
    },
    {
      icon: DoorOpen,
      name: 'Visit Anytime',
      sublabel: 'Open 24/7 · self-serve showroom',
      href: `/locations/${elmhurstStore.slug}`,
    },
  ],
  online: [
    { name: 'Artisan Collection', href: '/shop/mattresses' },
    { name: 'Studio Collection', href: '/studio' },
    { name: 'Shop by Feel', href: '/shop-by-feel' },
    { name: 'Compare Mattresses', href: '/compare' },
    { name: 'Sleep Accessories', href: '/shop/sleep-accessories' },
  ],
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const shopButtonRef = useRef<HTMLButtonElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const isCurrentPage = (href: string) =>
    pathname === href || (href !== '/' && pathname?.startsWith(`${href}/`));

  if (pathname?.startsWith('/sleep-guide')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-navy text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
          <Link
            href="/appointment"
            className="flex items-center gap-2 py-1 hover:text-gold-light transition-colors min-w-0"
          >
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{formatAddress(elmhurstStore.address)}</span>
          </Link>
          <a
            href={`tel:${elmhurstStore.phoneE164}`}
            className="hidden sm:flex items-center gap-1 py-1 hover:text-gold-light transition-colors flex-shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>{elmhurstStore.phone}</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav aria-label="Primary" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/2.svg"
              alt="Busby - American Made Mattresses"
              width={128}
              height={128}
              unoptimized
              className="h-10 sm:h-12 lg:h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Hover/blur handlers are pointer conveniences layered over the
                fully keyboard-operable Shop button inside */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('shop')}
              onMouseLeave={() => setActiveDropdown(null)}
              onKeyDown={(e) => {
                if (e.key === 'Escape' && activeDropdown === 'shop') {
                  setActiveDropdown(null);
                  shopButtonRef.current?.focus();
                }
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setActiveDropdown(null);
                }
              }}
            >
              <button
                ref={shopButtonRef}
                onClick={() =>
                  setActiveDropdown(activeDropdown === 'shop' ? null : 'shop')
                }
                aria-expanded={activeDropdown === 'shop'}
                aria-haspopup="true"
                aria-controls="shop-menu"
                className="flex items-center gap-1 text-gray-700 hover:text-navy font-medium py-4 transition-colors"
              >
                {shopNav.label}
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'shop' && (
                <div
                  id="shop-menu"
                  className="absolute top-full left-0 w-80 bg-white shadow-lg rounded-2xl py-3 border border-gray-100 overflow-hidden"
                >
                  {/* In Store */}
                  <div className="px-4 pt-1 pb-2">
                    <p className="text-[10px] font-semibold tracking-widest text-gold-dark uppercase">
                      In Store
                    </p>
                  </div>
                  <div className="px-2 space-y-1">
                    {shopNav.inStore.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-gold/10 transition-colors"
                        >
                          <div className="flex-shrink-0 w-9 h-9 bg-navy rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-gold" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-navy text-sm">{item.name}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{item.sublabel}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="my-3 border-t border-gray-100" />

                  {/* Online */}
                  <div className="px-4 pt-1 pb-2">
                    <p className="text-[10px] font-semibold tracking-widest text-gray-600 uppercase">
                      Online
                    </p>
                  </div>
                  {shopNav.online.map((item) => (
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
            {[
              { name: 'About Us', href: '/about' },
              { name: 'FAQ', href: '/faq' },
              { name: 'Sleep Quiz', href: '/quiz' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrentPage(item.href) ? 'page' : undefined}
                className={`font-medium transition-colors ${
                  isCurrentPage(item.href)
                    ? 'text-navy underline decoration-2 underline-offset-8'
                    : 'text-gray-700 hover:text-navy'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA button and Cart */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/shop/mattresses"
              className="bg-gold hover:bg-gold-light text-navy font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              Shop Now
            </Link>
            <CartIcon />
          </div>

          {/* Mobile cart and menu */}
          <div className="lg:hidden flex items-center gap-2">
            <CartIcon />
            <button
              ref={mobileToggleRef}
              className="p-3 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        // Escape-to-close enhancement; every control inside is natively interactive
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setMobileMenuOpen(false);
              mobileToggleRef.current?.focus();
            }
          }}
          className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100dvh-4rem)] overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-5">
            <div role="group" aria-label="Shop" className="space-y-3">
              <p aria-hidden="true" className="font-semibold text-navy">{shopNav.label}</p>

              {/* In Store */}
              <div role="group" aria-labelledby="mobile-instore-label" className="pl-4 space-y-2">
                <p id="mobile-instore-label" className="text-[10px] font-semibold tracking-widest text-gold-dark uppercase">
                  In Store
                </p>
                <div className="space-y-2">
                  {shopNav.inStore.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-xl bg-gold/5 hover:bg-gold/10 transition-colors"
                      >
                        <div className="flex-shrink-0 w-9 h-9 bg-navy rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gold" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-navy text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600 mt-0.5">{item.sublabel}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Online */}
              <div role="group" aria-labelledby="mobile-online-label" className="pl-4 space-y-2">
                <p id="mobile-online-label" className="text-[10px] font-semibold tracking-widest text-gray-600 uppercase">
                  Online
                </p>
                {shopNav.online.map((item) => (
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
            <div className="pt-4 space-y-3">
              <Link
                href="/shop/mattresses"
                className="block w-full bg-gold hover:bg-gold-light text-navy font-semibold px-6 py-3 rounded-full text-center transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop Now
              </Link>
              <a
                href="tel:18448861640"
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-navy transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">(844) 886-1640</span>
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
