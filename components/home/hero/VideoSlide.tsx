'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { getProductBySlug } from '@/data/products';
import SlideButtons from './SlideButtons';

// One file: the two beds' explainer videos, each cut before its price screen and dissolving
// into the next bed, because a price burned into a video goes stale. The only price here is
// the card's, from the product data. The last half second dissolves back into the start, so
// the loop has no seam. `until` is the second in the file where a bed's stretch ends, so the
// card can follow the bed on screen. If a new reel runs past 45 seconds, raise
// VIDEO_BACKSTOP_MS in ../Hero.tsx so it still gets its two plays.
const REEL = {
  src: '/Videos/studio-hybrid-reel.mp4',
  poster: '/Videos/studio-hybrid-reel-poster.jpg',
  label: 'Studio Hybrid Firm and Studio Hybrid video',
};
const beds = [
  {
    product: getProductBySlug('studio-hybrid-firm')!,
    button: 'See the Hybrid Firm',
    line: 'Seven layers, pocketed coils and a firmer top.',
    until: 7.25,
  },
  {
    product: getProductBySlug('studio-hybrid')!,
    button: 'See the Hybrid',
    line: 'Seven layers, pocketed coils and a medium feel.',
    until: 14.75,
  },
];
// Past the last `until`, the reel is already dissolving back to the first bed.
const bedAt = (seconds: number) => Math.max(0, beds.findIndex((bed) => seconds < bed.until));

const PLAYS_BEFORE_MOVING_ON = 2;

/**
 * The big video. The file is only fetched the first time this slide comes up, it
 * plays muted on a loop only while on screen, and visitors who prefer reduced motion
 * start it themselves. From 1280px up it fills the slide edge to edge, trimming only
 * from the top, because its captions and logo are burned in along the bottom. Below
 * that it's never cropped, since the sides would start to go. The pause button
 * satisfies WCAG 2.2.2.
 *
 * `onPlayedThrough` fires once it has played through enough times to move on, and
 * `onControl` when the visitor uses its play or pause button.
 */
export default function VideoSlide({
  active,
  onPlayedThrough,
  onControl,
}: {
  active: boolean;
  onPlayedThrough: () => void;
  onControl: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [bedIndex, setBedIndex] = useState(0);
  const bed = beds[bedIndex];
  const queen = bed.product.sizes.find((s) => s.name === 'Queen')!;
  // null until first shown. Once the visitor pauses, coming back must not restart it.
  const userPausedRef = useRef<boolean | null>(null);
  const playsRef = useRef(0);
  const lastTimeRef = useRef(0);

  if (active && !started) setStarted(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // iOS only autoplays inline video that is muted; set the property as well as
    // the attribute, since React doesn't reliably render the attribute.
    video.muted = true;
    if (!active) {
      video.pause();
      return;
    }
    if (userPausedRef.current === null) {
      userPausedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    if (!userPausedRef.current) {
      // From the top, so someone arriving on this slide sees the whole thing.
      video.currentTime = 0;
      playsRef.current = 0;
      lastTimeRef.current = 0;
      void video.play().catch(() => {});
    }
  }, [active, started]);

  // A looping video never fires `ended`, so a finished play shows up as the clock
  // jumping back to the start.
  const onTimeUpdate = (video: HTMLVideoElement) => {
    if (video.currentTime < lastTimeRef.current - 1) {
      playsRef.current += 1;
      if (playsRef.current >= PLAYS_BEFORE_MOVING_ON) onPlayedThrough();
    }
    lastTimeRef.current = video.currentTime;
    setBedIndex(bedAt(video.currentTime));
  };

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    onControl();
    if (video.paused) {
      userPausedRef.current = false;
      void video.play();
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  return (
    <div data-slide="video" className="relative flex w-full flex-col bg-navy text-white">
      {/* Takes whatever height the tallest slide sets on desktop. Navy behind it
          blends with the video's end card and fills any leftover space. */}
      <div className="relative aspect-video lg:aspect-auto lg:flex-1">
        <Image
          src={REEL.poster}
          alt=""
          fill
          sizes="100vw"
          className="object-contain lg:object-top xl:object-cover xl:object-bottom"
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
            onTimeUpdate={(e) => onTimeUpdate(e.currentTarget)}
            className="absolute inset-0 h-full w-full object-contain lg:object-top xl:object-cover xl:object-bottom"
          />
        )}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause video' : 'Play video'}
          // On desktop this lines up with the left edge of the page content (max-w-7xl).
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-navy/70 text-white transition-colors hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:left-[max(2rem,calc((100%-80rem)/2+2rem))] lg:right-auto lg:top-6"
        >
          {playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4 translate-x-px" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Below the video on a phone. On desktop it floats over the video's top-right
          corner, clear of the captions down the left and the logo at the bottom, so the
          buttons are on screen without shrinking the video. It changes beds on its own
          every few seconds, which screen readers shouldn't announce each time. */}
      <div className="lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-6">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-0">
          <div
            aria-live="off"
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:pointer-events-auto lg:ml-auto lg:w-fit lg:max-w-xs lg:flex-col lg:items-stretch lg:rounded-sm lg:bg-navy/90 lg:p-5"
          >
            <div>
              <h2 className="font-sans text-xl font-semibold">{bed.product.name}</h2>
              <p className="text-sm text-gray-300">
                {bed.line} {queen.name} for ${queen.price.toLocaleString('en-US')}.
              </p>
            </div>
            <SlideButtons
              href={`/products/${bed.product.slug}`}
              label={bed.button}
              className="shrink-0 sm:flex-row lg:flex-col"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
