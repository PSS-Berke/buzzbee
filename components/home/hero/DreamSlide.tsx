'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProductBySlug } from '@/data/products';
import { order, SceneCallouts, useSceneActive, type Callout } from './scene';
import WasPrice from '@/components/product/WasPrice';

const dream = getProductBySlug('dream')!;
const queen = dream.sizes.find((s) => s.name === 'Queen')!;

const stats = [
  { value: '15½"', label: 'Pillowtop hybrid' },
  { value: String(dream.components.length), label: 'Layers' },
  { value: '100', label: 'Nights to try it at home' },
];

// Percentages of the photo, so these stay on the lamps and the mattress at any width.
const lamps = [
  { x: 26.5, y: 37.5 },
  { x: 73.5, y: 37.5 },
];
const callouts: Callout[] = [
  { name: 'CoolGel + Joma® Wool', detail: 'Draws heat away', x: ['33%', '44%', '36%'], y: 58 },
  { name: 'Natural latex + Serene™', detail: 'Relieves pressure', x: ['50%', '54%', '50%'], y: 62.5 },
  { name: 'Tri-Zone encased coils', detail: 'Support edge to edge', x: ['67%', '64%', '64%'], y: 67.5 },
];

// The same room reveal as Studio Go, but at night, with the lamps coming on. It's sold on how
// it feels, not as the top of the range: Studio 12 and the Hybrids cost more. Every claim
// comes from Dream's product data, and unlike Studio Go it's on the showroom floor, so it
// can point to a visit.
export default function DreamSlide({ active }: { active: boolean }) {
  const on = useSceneActive(active);

  return (
    <div
      data-slide="dream"
      data-scene
      data-active={on}
      className="relative w-full overflow-hidden bg-navy-dark text-white"
    >
      {/* On a phone the photo sits on top. On desktop it fills the right of the slide and
          fades into the navy behind the text. The inner box keeps the photo's own shape
          however it's cropped, which is what the percentages above rely on. */}
      <div className="scene-room relative aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[62%]">
        <div className="absolute left-1/2 top-0 aspect-video h-full -translate-x-1/2">
          <div className="scene-push absolute inset-0">
            <Image
              src="/images/products/Dream/dream-hero.jpg"
              alt={`${dream.name} mattress on a wood platform bed against a navy wall, lamps lit on either side`}
              fill
              sizes="(min-width: 1024px) 1530px, 100vw"
              // Loaded ahead of time, so it's there for the lamps coming on.
              loading="eager"
              fetchPriority="low"
              className="scene-photo object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy-dark lg:h-1/5 lg:from-navy-dark/70" />
            {lamps.map((lamp) => (
              <span
                key={lamp.x}
                className="scene-glow absolute aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
                style={{ left: `${lamp.x}%`, top: `${lamp.y}%` }}
              />
            ))}
            <SceneCallouts
              callouts={callouts}
              labelY={23}
              labelClass="w-[17%] lg:w-[9.5%] xl:w-[13.5%]"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl px-4 pb-10 pt-5 sm:px-6 lg:h-full lg:grid-cols-12 lg:items-center lg:px-8 lg:py-10">
        <div className="lg:col-span-5 lg:max-w-[30rem]">
          <p className="scene-reveal text-sm font-semibold uppercase tracking-[0.2em] text-gold-light" style={order(0)}>
            The Artisan Line · {dream.name}
          </p>
          <h2 className="scene-reveal mt-4 font-serif text-5xl leading-[1.05] xl:text-7xl" style={order(1)}>
            <span className="text-gold-light">Plush</span> from the surface down.
          </h2>
          <p className="scene-reveal mt-5 text-lg leading-relaxed text-white/85" style={order(2)}>
            Seven layers of cooling quilt, natural latex and encased coils, made in Wisconsin.
          </p>

          <dl className="scene-reveal mt-6 grid grid-cols-3 gap-3 border-y border-white/20 py-4" style={order(3)}>
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end gap-1">
                <dt className="text-xs leading-snug text-white/75">{s.label}</dt>
                <dd className="font-serif text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="scene-reveal mt-6 flex items-center gap-3" style={order(4)}>
            <span className="rounded-sm bg-gold px-3 py-1.5 font-sans text-4xl font-bold leading-none text-navy tabular-nums">
              ${queen.price.toLocaleString('en-US')}
            </span>
            <WasPrice value={queen.compareAtPrice} className="text-xl text-white/75" />
            <span className="text-sm text-white/75">
              {queen.name} · {queen.dimensions}
            </span>
          </div>

          <div className="scene-reveal mt-6 flex flex-col gap-3 sm:flex-row" style={order(5)}>
            <Link
              href={`/products/${dream.slug}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 font-semibold text-navy transition-colors hover:bg-gold-light"
            >
              See the Dream
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="#quick-book"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white/40 px-7 py-3 font-semibold text-white transition-colors hover:border-gold"
            >
              Try it in Elmhurst
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
