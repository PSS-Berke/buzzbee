import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { elmhurstStore, formatAddress } from '@/data/store';
import { showroomFaqs } from '@/data/showroomFaqs';
import LocationHero from '@/components/locations/LocationHero';
import WhatToExpect from '@/components/locations/WhatToExpect';
import SleepGuides from '@/components/locations/SleepGuides';
import ProductsOnDisplay from '@/components/locations/ProductsOnDisplay';
import GettingHere from '@/components/locations/GettingHere';
import LocationFAQ from '@/components/locations/LocationFAQ';
import StoreViewTracker from '@/components/locations/StoreViewTracker';

export const metadata: Metadata = {
  title: 'Mattress Store in Elmhurst, IL — Busby Showroom, by Appointment',
  description: `Try every Busby mattress side-by-side at our showroom at ${formatAddress(elmhurstStore.address)}. Staffed Mon–Thu 10 AM–2 PM; by appointment 9 AM–7 PM daily. Serving Elmhurst, Oak Brook, Hinsdale, and the western Chicago suburbs. American-made, 100-night trial.`,
  alternates: { canonical: '/locations/elmhurst' },
  openGraph: {
    title: 'Mattress Store in Elmhurst, IL — Busby Showroom, by Appointment',
    description:
      'Try every Busby mattress side-by-side at our Elmhurst showroom. Staffed Mon–Thu 10 AM–2 PM; by appointment 9 AM–7 PM daily.',
    url: `${SITE_URL}/locations/elmhurst`,
    type: 'website',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  '@id': `${SITE_URL}/locations/elmhurst`,
  name: elmhurstStore.name,
  url: `${SITE_URL}/locations/elmhurst`,
  image: `${SITE_URL}/images/og-image.png`,
  telephone: elmhurstStore.phoneE164,
  email: elmhurstStore.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: elmhurstStore.address.street,
    addressLocality: elmhurstStore.address.city,
    addressRegion: elmhurstStore.address.state,
    postalCode: elmhurstStore.address.zip,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: elmhurstStore.geo.lat,
    longitude: elmhurstStore.geo.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '10:00',
      closes: '14:00',
    },
  ],
  areaServed: ['Elmhurst', 'Oak Brook', 'Hinsdale', 'Chicago', 'DuPage County'],
  priceRange: '$$$',
  description:
    'Busby mattress showroom in Elmhurst, IL. Staffed Mon–Thu 10 AM–2 PM; by appointment 9 AM–7 PM daily. Try every American-made Busby mattress side-by-side, same prices as online.',
  hasMap: elmhurstStore.mapsLink,
  parentOrganization: {
    '@type': 'Organization',
    name: 'Busby',
    url: SITE_URL,
  },
  sameAs: [
    'https://www.facebook.com/mybusby',
    'https://www.instagram.com/my_busby',
    'https://x.com/Sleep6Mattress',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: showroomFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Locations', item: `${SITE_URL}/locations` },
    { '@type': 'ListItem', position: 3, name: 'Elmhurst', item: `${SITE_URL}/locations/elmhurst` },
  ],
};

export default function ElmhurstPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <StoreViewTracker slug={elmhurstStore.slug} />
      <LocationHero />
      <WhatToExpect />
      <SleepGuides />
      <ProductsOnDisplay />
      <GettingHere />
      <LocationFAQ />
    </div>
  );
}
