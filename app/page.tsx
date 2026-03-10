import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import TheDifference from '@/components/home/TheDifference';
import SixComponents from '@/components/home/SixComponents';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SleepQuizCTA from '@/components/home/SleepQuizCTA';
import Reviews from '@/components/home/Reviews';
import OurStoryTeaser from '@/components/home/OurStoryTeaser';

export default function Home() {
  return (
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
        <SixComponents />
        <TheDifference />
        <SleepQuizCTA />
        <Reviews />
        <OurStoryTeaser />
      </div>
    </div>
  );
}
