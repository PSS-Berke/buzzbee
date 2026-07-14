import { SITE_URL } from '@/lib/site';
import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import FinancingBanner from '@/components/home/FinancingBanner';
import TheDifference from '@/components/home/TheDifference';
import SixComponents from '@/components/home/SixComponents';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SleepQuizCTA from '@/components/home/SleepQuizCTA';
import OurStoryTeaser from '@/components/home/OurStoryTeaser';
import ElmhurstAnnouncement from '@/components/home/ElmhurstAnnouncement';
import AppointmentModal from '@/components/home/AppointmentModal';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Busby',
  alternateName: 'Busby Mattress',
  url: SITE_URL,
  publisher: {
    '@type': 'Organization',
    name: 'Busby',
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="min-h-screen bg-[#faf8f5] linen-texture relative">
        {/* Warm ambient glow */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255, 220, 180, 0.4) 0%, rgba(255, 200, 150, 0.2) 30%, transparent 60%)',
          }}
        />
        <div className="relative z-10">
          <Hero />
          <TrustBar />
          <FeaturedProducts />
          <ElmhurstAnnouncement />
          <FinancingBanner />
          <SixComponents />
          <TheDifference />
          <SleepQuizCTA />
          <OurStoryTeaser />
        </div>
      </div>
      <AppointmentModal />
    </>
  );
}
