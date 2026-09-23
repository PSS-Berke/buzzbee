import type { Metadata } from 'next';
import Image from 'next/image';
import { CalendarCheck, MapPin, Globe, Gift, Star, Phone, Instagram } from 'lucide-react';
import { elmhurstStore, formatAddress } from '@/data/store';
import { getGiveawayStatus, formatDay } from '@/data/giveaways';

export const metadata: Metadata = {
  title: 'Busby Mattress | Links',
  description: `Book a showroom visit, get directions to ${formatAddress(elmhurstStore.address)}, and see current giveaway details.`,
  alternates: { canonical: '/linkinbio' },
  robots: { index: false, follow: true },
};

// Re-render hourly so the giveaway button tracks the current giveaway.
export const revalidate = 3600;

// Set to null to hide the Yelp button.
const YELP_URL: string | null = 'https://www.yelp.com/biz/busby-elmhurst';

// Tag every outbound click so Instagram bio traffic is separable in analytics.
const utm = (path: string) => `${path}${path.includes('?') ? '&' : '?'}utm_source=instagram&utm_medium=social&utm_campaign=bio`;

export default function LinksPage() {
  const giveaway = getGiveawayStatus();

  const links = [
    { href: utm('/appointment'), label: 'Book an appointment', sub: 'Private showroom visit, free', icon: CalendarCheck, primary: true },
    { href: elmhurstStore.mapsLink, label: 'Directions to our store', sub: formatAddress(elmhurstStore.address), icon: MapPin, external: true },
    { href: utm('/'), label: 'Check out our website', sub: 'American-made mattresses', icon: Globe },
    ...(giveaway.state === 'live'
      ? [{ href: utm('/giveaway'), label: 'Giveaway details', sub: `Enter by ${formatDay(giveaway.giveaway.endsAt)}`, icon: Gift }]
      : []),
    ...(YELP_URL ? [{ href: YELP_URL, label: 'Find us on Yelp', sub: 'Leave us a review', icon: Star, external: true }] : []),
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] px-4 pb-16 pt-10">
      <div className="mx-auto max-w-md">
        <header className="flex flex-col items-center text-center">
          <Image src="/2.svg" alt="Busby" width={128} height={128} unoptimized priority className="h-20 w-auto" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-navy">Busby Mattress</h1>
          <p className="mt-1 text-sm text-gray-600">
            Handcrafted in the USA · Showroom in {elmhurstStore.address.city}, {elmhurstStore.address.state}
          </p>
        </header>

        <nav aria-label="Busby links" className="mt-8">
          <ul className="space-y-3">
            {links.map(({ href, label, sub, icon: Icon, primary, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`flex min-h-16 items-center gap-4 rounded-2xl px-5 py-3 shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
                    primary ? 'bg-navy text-white' : 'bg-white text-navy ring-1 ring-gray-200'
                  }`}
                >
                  <Icon className={`h-6 w-6 flex-shrink-0 ${primary ? 'text-gold' : 'text-gold-dark'}`} aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block font-semibold">
                      {label}
                      {external && <span className="sr-only"> (opens in new tab)</span>}
                    </span>
                    <span className={`block truncate text-sm ${primary ? 'text-white/80' : 'text-gray-600'}`}>{sub}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>


        <footer className="mt-10 flex flex-col items-center gap-3 text-sm text-gray-600">
          <a href={`tel:${elmhurstStore.phoneE164}`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-navy">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {elmhurstStore.phone}
          </a>
          <p className="text-center">{elmhurstStore.hours}</p>
          <a
            href="https://www.instagram.com/my_busby"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Busby on Instagram (opens in new tab)"
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-navy"
          >
            <Instagram className="h-5 w-5" aria-hidden="true" />
          </a>
        </footer>
      </div>
    </div>
  );
}
