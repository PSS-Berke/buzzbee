import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const shopLinks = [
  { name: 'Busby Mattresses', href: '/shop/mattresses' },
  { name: 'Shop by Feel', href: '/shop-by-feel' },
  { name: 'Compare Mattresses', href: '/compare' },
];

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Sleep Quiz', href: '/quiz' },
  { name: 'Press', href: '/press' },
  { name: 'Warranty', href: '/warranty' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white relative z-10">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
          {/* Brand block */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/4.svg"
                alt="Busby - American Made Mattresses"
                width={200}
                height={200}
                unoptimized
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-gray-300 text-sm mb-6">
              Better sleep changes everything.
            </p>
            <div className="space-y-3">
              <a
                href="tel:18448861640"
                className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>(844) 886-1640</span>
              </a>
              <a
                href="mailto:wholesale@mybusby.com"
                className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>wholesale@mybusby.com</span>
              </a>
              <a
                href="mailto:press@mybusby.com"
                className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>press@mybusby.com</span>
              </a>
              <a
                href="mailto:support@mybusby.com"
                className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>support@mybusby.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.facebook.com/mybusby"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/Sleep6Mattress"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/my_busby"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div className="pt-0 md:pt-16">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="pt-0 md:pt-16">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-lg">Get Sleep Tips & Exclusive Offers</h3>
              <p className="text-gray-300 text-sm">Join our newsletter for better sleep and special savings.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-full bg-navy-light border border-navy-light text-white placeholder-gray-400 focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-gold-dark text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Busby. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
