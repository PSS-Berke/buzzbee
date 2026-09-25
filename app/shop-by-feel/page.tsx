'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Moon,
  Activity,
  Bed,
  RefreshCw,
  Thermometer,
  Users,
  Volume2,
  Check,
  Plus,
  X,
} from 'lucide-react';
import { comparableProducts, compareHref, MAX_COMPARE } from '@/lib/compare';
import LineTag from '@/components/product/LineTag';
import type { Product } from '@/data/products';

type Category = {
  slug: string;
  name: string;
  icon: typeof Moon;
  description: string;
  tip: string;
  /** Short reason shown on a matching mattress ("Why it fits"). */
  fit: string;
  /** Best first. Artisan picks are the original ones; Studio picks follow each build's bestFor. */
  recommended: string[];
};

// Category definitions
const sleepPositions: Category[] = [
  {
    slug: 'side-sleeper',
    name: 'Side Sleeper',
    icon: Moon,
    description: 'Cozy cushioning for your shoulders & hips',
    tip: 'You curl up on your side? We get it. You\'ll love something with extra softness where you need it most.',
    fit: 'Side sleepers',
    recommended: ['slumber', 'dream', 'studio-hybrid', 'studio-12'],
  },
  {
    slug: 'back-sleeper',
    name: 'Back Sleeper',
    icon: Activity,
    description: 'Gentle support that hugs your spine',
    tip: 'Sleeping on your back is wonderful for alignment. We\'ll find you something that keeps everything happy.',
    fit: 'Back sleepers',
    recommended: ['slumber', 'dream', 'studio-hybrid-firm', 'studio-hybrid'],
  },
  {
    slug: 'stomach-sleeper',
    name: 'Stomach Sleeper',
    icon: Bed,
    description: 'A little firmer to keep you comfy',
    tip: 'Stomach sleepers do best with a bit more support. No sinking, just floating.',
    fit: 'Stomach sleepers',
    recommended: ['nod', 'doze', 'studio-hybrid-firm', 'studio-10'],
  },
  {
    slug: 'combination',
    name: 'I move around!',
    icon: RefreshCw,
    description: 'Perfect for restless dreamers',
    tip: 'You like to switch it up? Same. We\'ll find something that moves with you.',
    fit: 'Combination sleepers',
    recommended: ['slumber', 'dream', 'studio-hybrid', 'studio-hybrid-firm'],
  },
];

const sleepConcerns: Category[] = [
  {
    slug: 'hot-sleeper',
    name: 'I sleep hot',
    icon: Thermometer,
    description: 'Stay cool and breezy all night',
    tip: 'Waking up sweaty? No fun. Our cooling materials help you stay comfortable.',
    fit: 'Sleeps cool',
    recommended: ['slumber', 'dream', 'studio-hybrid', 'studio-hybrid-firm', 'studio-10'],
  },
  {
    slug: 'couples',
    name: 'Sharing the bed',
    icon: Users,
    description: 'Sleep peacefully together',
    tip: 'When your partner tosses and turns, you won\'t feel a thing. Promise.',
    fit: 'Great for couples',
    recommended: ['slumber', 'dream', 'studio-12', 'studio-hybrid', 'studio-hybrid-firm'],
  },
  {
    slug: 'back-pain',
    name: 'My back bothers me',
    icon: Activity,
    description: 'Wake up without the aches',
    tip: 'We hear this a lot. The right support can make mornings feel so much better.',
    fit: 'Back support',
    recommended: ['slumber', 'dream', 'studio-hybrid', 'studio-hybrid-firm'],
  },
  {
    slug: 'light-sleeper',
    name: 'I wake up easily',
    icon: Volume2,
    description: 'Undisturbed, peaceful rest',
    tip: 'Light sleepers deserve deep sleep too. Motion isolation is your friend.',
    fit: 'Low motion transfer',
    recommended: ['slumber', 'dream', 'studio-12', 'studio-hybrid'],
  },
];

const RESULTS_SHOWN = 4;

type Match = { product: Product; score: number; reasons: string[]; rank: number };

// Position counts double: it matters more to feel than any single concern.
function scoreMatches(position: Category | undefined, concerns: Category[]): Match[] {
  const picks = [...(position ? [{ c: position, weight: 2 }] : []), ...concerns.map((c) => ({ c, weight: 1 }))];
  return comparableProducts
    .map((product) => {
      let score = 0;
      let rank = 0;
      const reasons: string[] = [];
      for (const { c, weight } of picks) {
        const i = c.recommended.indexOf(product.slug);
        if (i === -1) continue;
        score += weight;
        rank += i;
        reasons.push(c.fit);
      }
      return { product, score, reasons, rank };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score || a.rank - b.rank || a.product.price - b.product.price);
}

function CategoryCard({
  category,
  selected,
  onClick,
}: {
  category: Category;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = category.icon;
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex w-full items-start gap-4 rounded-3xl border-2 p-6 text-left transition-all duration-300 ${
        selected
          ? 'bg-white border-gold shadow-xl shadow-gold/10'
          : 'bg-white/80 border-transparent hover:border-gold/30 hover:shadow-md'
      }`}
    >
      <span
        className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
          selected ? 'bg-gold/20' : 'bg-gray-100'
        }`}
      >
        <Icon className={`h-6 w-6 ${selected ? 'text-gold-dark' : 'text-gray-600'}`} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2 text-lg font-medium text-navy">
          {category.name}
          <span
            aria-hidden="true"
            className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 ${
              selected ? 'border-gold bg-gold text-navy' : 'border-gray-300'
            }`}
          >
            {selected && <Check className="h-4 w-4" />}
          </span>
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-gray-600">{category.description}</span>
      </span>
    </button>
  );
}

export default function ShopByFeelPage() {
  const [position, setPosition] = useState<string | null>(null);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);

  const activePosition = sleepPositions.find((c) => c.slug === position);
  const activeConcerns = sleepConcerns.filter((c) => concerns.includes(c.slug));
  const matches = scoreMatches(activePosition, activeConcerns);
  const shown = matches.slice(0, RESULTS_SHOWN);
  const hasAnswers = !!activePosition || activeConcerns.length > 0;
  const compared = compare
    .map((slug) => comparableProducts.find((p) => p.slug === slug))
    .filter((p): p is Product => !!p);

  const toggleCompare = (slug: string) =>
    setCompare((c) =>
      c.includes(slug) ? c.filter((s) => s !== slug) : c.length >= MAX_COMPARE ? c : [...c, slug],
    );

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
      <section className="pt-12 pb-16 relative overflow-hidden z-10">
        {/* Organic blob shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blob-shape blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy/5 blob-shape-alt blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-4xl md:text-6xl font-serif text-navy mb-4">
            Made for how <span className="wavy-underline">you</span> rest.
          </h1>
          <p className="text-lg text-gray-600">
            Tell us how you sleep. We&apos;ll match you across our Artisan and Studio lines.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${compared.length > 0 ? 'pb-32' : 'pb-12'}`}
      >
        {/* Sleep Position Section */}
        <section aria-labelledby="position-heading" className="mb-14">
          <div className="mb-6">
            <h2 id="position-heading" className="text-2xl md:text-3xl font-serif text-navy mb-2">
              How do you like to drift off?
            </h2>
            <p className="text-gray-600">Pick the one that sounds most like you.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {sleepPositions.map((c) => (
              <CategoryCard
                key={c.slug}
                category={c}
                selected={position === c.slug}
                onClick={() => setPosition(position === c.slug ? null : c.slug)}
              />
            ))}
          </div>
        </section>

        {/* Sleep Concerns Section */}
        <section aria-labelledby="concerns-heading" className="mb-14">
          <div className="mb-6">
            <h2 id="concerns-heading" className="text-2xl md:text-3xl font-serif text-navy mb-2">
              Anything keeping you up at night?
            </h2>
            <p className="text-gray-600">Pick as many as you like. These are optional, but they help us help you.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {sleepConcerns.map((c) => (
              <CategoryCard
                key={c.slug}
                category={c}
                selected={concerns.includes(c.slug)}
                onClick={() =>
                  setConcerns((s) => (s.includes(c.slug) ? s.filter((x) => x !== c.slug) : [...s, c.slug]))
                }
              />
            ))}
          </div>
        </section>

        {/* Matches */}
        <section aria-labelledby="matches-heading" aria-live="polite" className="mb-14">
          <h2 id="matches-heading" className="text-2xl md:text-3xl font-serif text-navy mb-2">
            Your matches
          </h2>
          {!hasAnswers ? (
            <p className="text-gray-600">Pick a sleep style or a concern above to see your matches.</p>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                {activePosition ? activePosition.tip : activeConcerns[0].tip}
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {shown.map(({ product: p, reasons }, i) => {
                  const inCompare = compare.includes(p.slug);
                  const atMax = !inCompare && compare.length >= MAX_COMPARE;
                  return (
                    <li key={p.slug} className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-gray-200">
                      <div className="relative aspect-[16/9] bg-gray-100">
                        {p.images[0] && (
                          <Image src={p.images[0]} alt="" fill sizes="(min-width: 640px) 400px, 100vw" className="object-cover" />
                        )}
                        <div className="absolute left-3 top-3 flex gap-2">
                          <LineTag line={p.line} />
                          {i === 0 && (
                            <span className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">Best match</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="text-lg font-semibold text-navy">{p.name}</h3>
                          <p className="text-navy">
                            <span className="font-semibold">${p.price.toLocaleString()}</span>
                            <span className="ml-1 text-xs text-gray-600">Queen</span>
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{p.tagline}</p>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Why it fits</p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {reasons.map((r) => (
                            <li key={r} className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium text-navy">
                              <Check className="h-3 w-3" aria-hidden="true" />
                              {r}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto flex gap-2 pt-5">
                          <Link
                            href={`/products/${p.slug}`}
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-navy px-4 text-sm font-medium text-white hover:bg-navy-light"
                          >
                            View<span className="sr-only"> {p.name}</span>
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                          <button
                            type="button"
                            aria-pressed={inCompare}
                            disabled={atMax}
                            onClick={() => toggleCompare(p.slug)}
                            className={`inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full border-2 px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                              inCompare ? 'border-gold bg-gold text-navy' : 'border-navy/20 text-navy hover:border-navy'
                            }`}
                          >
                            {inCompare ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                            {inCompare ? 'Comparing' : 'Compare'}
                            <span className="sr-only"> {p.name}</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {matches.length > RESULTS_SHOWN && (
                <p className="mt-4 text-sm text-gray-600">
                  {matches.length - RESULTS_SHOWN} more also fit.{' '}
                  <Link href={compareHref(matches.slice(0, MAX_COMPARE).map((m) => m.product.slug))} className="font-semibold text-navy underline">
                    Compare your top {MAX_COMPARE}
                  </Link>{' '}
                  or{' '}
                  <Link href="/products" className="font-semibold text-navy underline">
                    browse them all
                  </Link>
                  .
                </p>
              )}
            </>
          )}
        </section>

        {/* Bottom section */}
        <div className="text-center pt-4">
          <p className="text-gray-600 mb-6">Not sure yet? That&apos;s okay too.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-full font-medium hover:bg-navy-light transition-colors"
            >
              Build your own comparison
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-navy transition-colors"
            >
              Or take our full sleep quiz
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Compare tray */}
      {compared.length > 0 && (
        <div
          role="region"
          aria-label="Compare tray"
          data-compare-tray
          className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur shadow-[0_-8px_24px_rgba(0,0,0,0.08)]"
        >
          <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <p className="flex-1 text-sm font-medium text-navy sm:hidden">{compared.length} selected</p>
            <ul className="hidden flex-1 flex-wrap gap-2 sm:flex">
              {compared.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    onClick={() => toggleCompare(p.slug)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-gray-100 px-3 text-sm font-medium text-navy hover:bg-gray-200"
                  >
                    {p.name}
                    <X className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Remove from compare</span>
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setCompare([])}
              className="min-h-11 px-3 text-sm font-medium text-gray-600 hover:text-navy"
            >
              Clear
            </button>
            {compared.length < 2 ? (
              <span className="inline-flex min-h-11 items-center rounded-full bg-gray-200 px-6 text-sm font-semibold text-gray-600">
                Pick 1 more
              </span>
            ) : (
              <Link
                href={compareHref(compare)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white hover:bg-navy-dark"
              >
                Compare {compared.length}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
