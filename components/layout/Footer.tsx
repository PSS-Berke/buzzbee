import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const shopLinks = [
  { name: 'ABT Exclusive', href: '/abt-exclusive' },
  { name: 'Sleep6 Home Line', href: '/home-line' },
  { name: 'Shop by Feel', href: '/shop-by-feel' },
  { name: 'Compare Mattresses', href: '/compare' },
];

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Sleep Quiz', href: '/quiz' },
  { name: 'Warranty', href: '/warranty' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white relative z-10">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand block */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4 bg-white rounded-lg px-3 py-2">
              <Image
                src="/images/logo.png"
                alt="Sleep6 - Crafted in Chicago"
                width={150}
                height={42}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-300 text-sm mb-6">
              Six essential components. One perfect mattress.
            </p>
            <div className="space-y-3">
              <a
                href="tel:18443753376"
                className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>1-844-375-3376</span>
              </a>
              <a
                href="mailto:wholesale@sleep6.com"
                className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>wholesale@sleep6.com</span>
              </a>
              <a
                href="mailto:press@sleep6.com"
                className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>press@sleep6.com</span>
              </a>
              <a
                href="mailto:support@Sleep6.com"
                className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>support@Sleep6.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.facebook.com/Sleep6Mattress"
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
                href="https://www.instagram.com/Sleep6_/"
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
          <div>
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
          <div>
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
            &copy; {new Date().getFullYear()} Sleep6. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
