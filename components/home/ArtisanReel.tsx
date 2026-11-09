'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { getProductBySlug } from '@/data/products';
import WasPrice from '@/components/product/WasPrice';

// One file: the four Artisan explainer videos, each dissolving into the next bed, in the
// same order as the cards above this. The last half second dissolves back into the start,
// so the loop has no seam. Each is cut before its price screen, because a price burned
// into a video goes stale, so the only prices here are the rows', from the product data.
// `from` is the second in the file where a bed is fully on screen, and `until` is where
// its stretch ends, halfway through the dissolve into the next one.
const REEL = {
  src: '/Videos/artisan-reel.mp4',
  poster: '/Videos/artisan-reel-poster.jpg',
  label: 'Busby Dream, Slumber, Doze and Nod video',
};
const beds = [
  { product: getProductBySlug('dream')!, title: 'The Dream', from: 0, until: 7.05 },
  { product: getProductBySlug('slumber')!, title: 'The Slumber', from: 7.3, until: 14.35 },
  { product: getProductBySlug('doze')!, title: 'The Doze', from: 14.6, until: 21.65 },
  { product: getProductBySlug('nod')!, title: 'The Nod', from: 21.9, until: 28.95 },
];
// Past the last `until`, the reel is already dissolving back to the first bed.
const bedAt = (seconds: number) => Math.max(0, beds.findIndex((bed) => seconds < bed.until));

// How much of the card has to be on screen for the video to run.
const PLAY_RATIO = 0.25;

/**
 * A look at the whole Artisan line. The video file is only fetched once this scrolls into
 * view, it plays muted on a loop only while on screen, and visitors who prefer reduced
 * motion start it themselves. The rows follow the bed on screen and jump to one when
 * chosen, with a separate link to each bed, so what a click lands on never changes as the
 * video plays. The pause button satisfies WCAG 2.2.2.
 */
export default function ArtisanReel() {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  // null until first shown. Once the visitor pauses, coming back must not restart it.
  const userPausedRef = useRef<boolean | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Any of it showing means a row can be chosen, which needs the video there.
        if (entry.isIntersecting) setStarted(true);
        setInView(entry.intersectionRatio >= PLAY_RATIO);
      },
      { threshold: [0, PLAY_RATIO] },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // iOS only autoplays inline video that is muted; set the property as well as
    // the attribute, since React doesn't reliably render the attribute.
    video.muted = true;
    if (!inView) {
      video.pause();
      return;
    }
    if (userPausedRef.current === null) {
      userPausedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    if (!userPausedRef.current) void video.play().catch(() => {});
  }, [inView, started]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      void video.play();
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  const jumpTo = (index: number) => {
    const video = videoRef.current;
    if (!video) return;
    userPausedRef.current = false;
    video.currentTime = beds[index].from;
    setTime(beds[index].from);
    void video.play().catch(() => {});
    // On a phone the rows can be on screen with the video scrolled off above them.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    video.parentElement?.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
  };

  const current = bedAt(time);
  const progress =
    time < beds[current].until
      ? Math.max(0, (time - beds[current].from) / (beds[current].until - beds[current].from))
      : 0;

  return (
    <div
      ref={cardRef}
      className="mb-16 grid overflow-hidden rounded-3xl border-2 border-gold/30 bg-white shadow-xl shadow-gold/5 xl:grid-cols-12"
    >
      <div className="flex flex-col justify-center p-6 sm:p-8 xl:col-span-4">
        <p className="mb-3 text-sm font-medium text-gold-dark">See them up close</p>
        <h3 className="mb-5 font-serif text-3xl text-navy">
          Four beds, <span className="font-semibold">four rooms</span>
        </h3>
        <ul className="grid border-t border-gold/20 sm:grid-cols-2 sm:gap-x-8 xl:grid-cols-1">
          {beds.map((bed, i) => {
            const isCurrent = i === current;
            const queen = bed.product.sizes.find((s) => s.name === 'Queen')!;
            return (
              <li key={bed.product.slug} className="relative flex items-stretch border-b border-gold/20">
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-current={isCurrent ? 'true' : undefined}
                  className="group/row flex min-h-14 flex-1 flex-col justify-center py-2 text-left"
                >
                  <span className="sr-only">Watch </span>
                  <span
                    className={`font-medium transition-colors ${
                      isCurrent ? 'text-navy' : 'text-gray-600 group-hover/row:text-navy'
                    }`}
                  >
                    {bed.title}
                  </span>
                  <span className="text-sm tabular-nums text-gray-600">
                    {queen.name} ${queen.price.toLocaleString('en-US')}
                    <WasPrice value={queen.compareAtPrice} className="ml-1.5" />
                  </span>
                </button>
                <Link
                  href={`/products/${bed.product.slug}`}
                  aria-label={`See it: the ${bed.product.name}`}
                  className="group/see flex items-center gap-1.5 pl-3 text-sm font-medium text-gold-dark"
                >
                  See it
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover/see:translate-x-1 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                </Link>
                {isCurrent && (
                  <span
                    aria-hidden="true"
                    data-reel-progress
                    className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-gold transition-transform duration-300 ease-linear"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Comes first until there's room for the two side by side. */}
      <div className="relative order-first aspect-video scroll-mt-[108px] bg-navy lg:scroll-mt-[124px] xl:order-none xl:col-span-8">
        <Image
          src={REEL.poster}
          alt=""
          fill
          sizes="(min-width: 1280px) 810px, (min-width: 1024px) 960px, 100vw"
          className="object-cover"
        />
        {started && (
          <video
            ref={videoRef}
            src={REEL.src}
            muted
            loop
            playsInline
            preload="none"
            aria-label={REEL.label}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause the Busby beds video' : 'Play the Busby beds video'}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-navy/70 text-white transition-colors hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4 translate-x-px" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
