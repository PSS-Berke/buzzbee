'use client';

import Image from 'next/image';
import SlideButtons from './SlideButtons';
import { order, useSceneActive } from './scene';

export type WhyContent = {
  eyebrow: string;
  /** The line leading into the price. */
  lead: string;
  price: string;
  subhead: string;
  story: string;
  photo: {
    src: string;
    alt: string;
    /** The photo's own shape, as a CSS aspect ratio. */
    ratio: string;
    /** Which part of it shows when it's cropped: 0% is the top, 100% the bottom. */
    focus: number;
  };
  /** Three reasons, each with a numbered pin placed by percent on the photo. */
  reasons: { title: string; body: string; pin: { x: number; y: number } }[];
  summary: { label: string; value: string };
  rows: { label: string; value: string }[];
  button: { href: string; label: string; onClick?: () => void; showVisit?: boolean };
};

const number = (i: number) => String(i + 1).padStart(2, '0');

// The boxes bump up when they, or their numbered pins, are hovered (see "the why slides" in
// globals.css). The hover sits on a grid cell that stays put, with the box moving inside
// it, so a pointer near a box's bottom edge can't lose the hover as the box rises and set
// it bouncing.
const cellClass = '-ml-px -mt-px';
const boxClass = 'why-box relative h-full border p-4';

/**
 * The Studio line's paper and hairlines, for laying out why a bed is worth it. The grid
 * draws itself in, the photo wipes open, the price stamps down and the reasons arrive,
 * each with a numbered pin on the bed. Hovering a reason or its pin raises both. `main`
 * marks the slide the page opens on, which carries the h1 and loads its photo first.
 * data-embed keeps the page's quilted overlay (see globals.css).
 */
export default function WhySlide({
  active,
  slideId,
  content,
  main = false,
}: {
  active: boolean;
  slideId: string;
  content: WhyContent;
  main?: boolean;
}) {
  const on = useSceneActive(active);
  const Heading = main ? 'h1' : 'h2';
  const { photo, button } = content;

  return (
    <div
      data-slide={slideId}
      data-why
      data-scene
      data-active={on}
      data-line="studio"
      data-embed
      className="relative flex w-full flex-col justify-center overflow-hidden bg-paper"
    >
      <div className="scene-grid absolute inset-0 blueprint-grid opacity-[0.25] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-5 sm:px-6 md:pt-8 lg:px-8 lg:py-5">
        {/* On a desktop the two blocks of words stack beside the photo, centered as one. */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:gap-y-0">
          {/* The deal comes first on every screen. On a phone that puts it above the photo,
              clear of the fixed "Now Open" pill along the bottom of the screen. */}
          <div className="lg:col-span-5 lg:col-start-1 lg:self-end">
            <p
              className="scene-reveal text-xs font-medium uppercase tracking-[0.2em] text-clay-deep sm:text-sm"
              style={order(0)}
            >
              {content.eyebrow}
            </p>
            <Heading className="mt-2 font-sans tracking-tight text-navy">
              <span className="scene-reveal block text-3xl font-semibold sm:text-4xl" style={order(1)}>
                {content.lead}
              </span>{' '}
              <span className="scene-stamp mt-2 inline-block overflow-hidden rounded-sm bg-gold px-4 py-2 text-7xl font-bold leading-none tabular-nums">
                {content.price}
              </span>
            </Heading>
          </div>

          {/* The bed. The inner box keeps the photo's own shape, and sits where
              object-position would put it, so the pins stay on the bed. */}
          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <div className="scene-wipe relative aspect-[16/10] overflow-hidden border border-grid bg-putty/40 lg:aspect-auto lg:h-[clamp(20rem,calc(100svh-620px),30rem)]">
              <div
                className="absolute inset-x-0"
                style={{
                  aspectRatio: photo.ratio,
                  top: `${photo.focus}%`,
                  translate: `0 -${photo.focus}%`,
                }}
              >
                <div className="scene-push absolute inset-0">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1280px) 700px, (min-width: 1024px) 58vw, 100vw"
                    // Slides that aren't first still load ahead of time, ready for the wipe.
                    {...(main ? { priority: true } : { loading: 'eager', fetchPriority: 'low' })}
                    className="scene-photo object-cover"
                  />
                  {content.reasons.map((r, i) => (
                    <span
                      key={r.title}
                      aria-hidden="true"
                      data-pin={i}
                      className="scene-dot why-pin absolute -ml-3 -mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-clay-deep text-[10px] font-semibold tabular-nums text-white ring-2 ring-white"
                      style={{ ...order(i), left: `${r.pin.x}%`, top: `${r.pin.y}%` }}
                    >
                      {number(i)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* The story */}
          <div className="lg:col-span-5 lg:col-start-1 lg:self-start">
            <p className="scene-reveal text-lg font-semibold text-navy lg:mt-2" style={order(4)}>
              {content.subhead}
            </p>
            <p className="scene-reveal mt-2 leading-relaxed text-navy/70" style={order(5)}>
              {content.story}
            </p>
          </div>
        </div>

        {/* Why this bed, ending on the deal. Each box has its own hairline, overlapping its
            neighbor's, so a raised box leaves the page behind it rather than a gap. They
            stay solid and only what's in them arrives. */}
        <div className="scene-reveal mt-4 grid pl-px pt-px sm:grid-cols-2 lg:grid-cols-4" style={order(5)}>
          {content.reasons.map((r, i) => (
            <div key={r.title} data-reason={i} className={cellClass}>
              <div className={`${boxClass} border-grid bg-paper`}>
                <span
                  className="scene-rule absolute inset-x-0 top-0 h-0.5 origin-left bg-clay transition-transform duration-300"
                  style={order(i)}
                />
                <div className="scene-reveal" style={order(6 + i)}>
                  <span className="text-xs tabular-nums text-clay-deep">{number(i)}</span>
                  <h3 className="mt-1 font-sans text-lg font-semibold text-navy">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy/70">{r.body}</p>
                </div>
              </div>
            </div>
          ))}

          {/* First on a phone, where three stacked reasons would bury the button. */}
          <div data-deal-box className={`${cellClass} order-first sm:order-none`}>
            <div className={`${boxClass} flex flex-col justify-between gap-3 border-navy bg-navy text-white`}>
              <dl className="text-sm">
                <div className="scene-reveal flex items-baseline justify-between gap-3" style={order(9)}>
                  <dt className="font-semibold">{content.summary.label}</dt>
                  <dd className="font-sans text-2xl font-bold tabular-nums text-gold">{content.summary.value}</dd>
                </div>
                {content.rows.map((row, i) => (
                  <div
                    key={row.label}
                    className="scene-reveal mt-1.5 flex items-baseline justify-between gap-3 border-t border-white/15 pt-1.5 text-gray-300"
                    style={order(10 + i)}
                  >
                    <dt>{row.label}</dt>
                    <dd className="shrink-0 font-medium tabular-nums text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="scene-reveal" style={order(13)}>
                <SlideButtons
                  href={button.href}
                  label={button.label}
                  onClick={button.onClick}
                  showVisit={button.showVisit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
