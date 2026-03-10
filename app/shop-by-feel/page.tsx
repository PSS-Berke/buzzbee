'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Moon,
  Activity,
  Bed,
  RefreshCw,
  Thermometer,
  Users,
  Volume2,
  ChevronDown,
} from 'lucide-react';
import { homeLineProducts } from '@/data/products';

// Category definitions
const sleepPositions = [
  {
    slug: 'side-sleeper',
    name: 'Side Sleeper',
    icon: Moon,
    description: 'Cozy cushioning for your shoulders & hips',
    tip: 'You curl up on your side? We get it. You\'ll love something with extra softness where you need it most.',
    recommended: ['slumber', 'dream'],
  },
  {
    slug: 'back-sleeper',
    name: 'Back Sleeper',
    icon: Activity,
    description: 'Gentle support that hugs your spine',
    tip: 'Sleeping on your back is wonderful for alignment. We\'ll find you something that keeps everything happy.',
    recommended: ['slumber', 'dream'],
  },
  {
    slug: 'stomach-sleeper',
    name: 'Stomach Sleeper',
    icon: Bed,
    description: 'A little firmer to keep you comfy',
    tip: 'Stomach sleepers do best with a bit more support. No sinking, just floating.',
    recommended: ['nod', 'doze'],
  },
  {
    slug: 'combination',
    name: 'I move around!',
    icon: RefreshCw,
    description: 'Perfect for restless dreamers',
    tip: 'You like to switch it up? Same. We\'ll find something that moves with you.',
    recommended: ['slumber', 'dream'],
  },
];

const sleepConcerns = [
  {
    slug: 'hot-sleeper',
    name: 'I sleep hot',
    icon: Thermometer,
    description: 'Stay cool and breezy all night',
    tip: 'Waking up sweaty? No fun. Our cooling materials help you stay comfortable.',
    recommended: ['slumber', 'dream'],
  },
  {
    slug: 'couples',
    name: 'Sharing the bed',
    icon: Users,
    description: 'Sleep peacefully together',
    tip: 'When your partner tosses and turns, you won\'t feel a thing. Promise.',
    recommended: ['slumber', 'dream'],
  },
  {
    slug: 'back-pain',
    name: 'My back bothers me',
    icon: Activity,
    description: 'Wake up without the aches',
    tip: 'We hear this a lot. The right support can make mornings feel so much better.',
    recommended: ['slumber', 'dream'],
  },
  {
    slug: 'light-sleeper',
    name: 'I wake up easily',
    icon: Volume2,
    description: 'Undisturbed, peaceful rest',
    tip: 'Light sleepers deserve deep sleep too. Motion isolation is your friend.',
    recommended: ['slumber', 'dream'],
  },
];

// Helper to get product by slug
const getProductBySlug = (slug: string) => homeLineProducts.find((p) => p.slug === slug);

export default function ShopByFeelPage() {
  const [activePosition, setActivePosition] = useState<string | null>(null);
  const [activeConcern, setActiveConcern] = useState<string | null>(null);

  const renderCategoryCard = (
    category: (typeof sleepPositions)[0],
    isActive: boolean,
    onClick: () => void
  ) => {
    const Icon = category.icon;
    return (
      <button
        key={category.slug}
        onClick={onClick}
        className={`
          text-left rounded-3xl p-6 md:p-8 border-2 transition-all duration-300 w-full
          ${isActive
            ? 'bg-white border-gold shadow-xl shadow-gold/10 scale-[1.02]'
            : 'bg-white/80 border-transparent hover:border-gold/30 hover:shadow-md'
          }
        `}
      >
        <div className="flex items-start gap-4">
          <div
            className={`
              w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
              ${isActive ? 'bg-gold/20' : 'bg-gray-100'}
            `}
          >
            <Icon
              className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-gold-dark' : 'text-gray-400'}`}
              strokeWidth={1.5}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3
                className={`text-lg font-medium transition-colors duration-300 ${isActive ? 'text-navy' : 'text-gray-700'}`}
              >
                {category.name}
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-gold rotate-180' : 'text-gray-300'}`}
              />
            </div>
            <p className={`text-sm mt-1 leading-relaxed ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
              {category.description}
            </p>
          </div>
        </div>

        {/* Expanded content */}
        {isActive && (
          <div className="mt-6 pt-6 border-t border-gold/20 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{category.tip}</p>
            <p className="text-gold-dark text-sm font-medium mb-3">
              We think you&apos;ll love...
            </p>
            <div className="space-y-3">
              {category.recommended.slice(0, 2).map((slug) => {
                const product = getProductBySlug(slug);
                if (!product) return null;
                return (
                  <Link
                    key={slug}
                    href={`/products/${slug}`}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gold/10 transition-colors group"
                  >
                    <div>
                      <span className="text-navy font-medium">{product.name}</span>
                      <span className="text-gray-400 text-sm ml-2">
                        From ${product.price.toLocaleString()}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] linen-texture relative">
      {/* Warm ambient glow - like soft lamplight */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255, 220, 180, 0.4) 0%, rgba(255, 200, 150, 0.2) 30%, transparent 60%)',
        }}
      />

      {/* Warm, inviting hero */}
      <section className="pt-24 pb-20 relative overflow-hidden z-10">
        {/* Organic blob shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blob-shape blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy/5 blob-shape-alt blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-4xl md:text-6xl font-serif text-navy mb-4">
            Made for how <span className="wavy-underline">you</span> rest.
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        {/* Sleep Position Section */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-navy mb-2">How do you like to drift off?</h2>
            <p className="text-gray-500">Pick the one that sounds most like you.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {sleepPositions.map((category) =>
              renderCategoryCard(category, activePosition === category.slug, () =>
                setActivePosition(activePosition === category.slug ? null : category.slug)
              )
            )}
          </div>
        </div>

        {/* Sleep Concerns Section */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-navy mb-2">Anything keeping you up at night?</h2>
            <p className="text-gray-500">These are totally optional, but they help us help you.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {sleepConcerns.map((category) =>
              renderCategoryCard(category, activeConcern === category.slug, () =>
                setActiveConcern(activeConcern === category.slug ? null : category.slug)
              )
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div className="text-center pt-8">
          <p className="text-gray-500 mb-6">Not sure yet? That&apos;s okay too.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/home-line"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-full font-medium hover:bg-navy-light transition-colors"
            >
              Browse all mattresses
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gold transition-colors"
            >
              Or take our full sleep quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
