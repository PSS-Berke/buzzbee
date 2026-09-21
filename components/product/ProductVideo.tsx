'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

interface ProductVideoProps {
  src: string;
  poster: string;
  productName: string;
}

/**
 * The per-mattress explainer.
 *
 * Plays muted on a loop, like the homepage hero, but only while it is on
 * screen: it starts when scrolled into view and pauses when scrolled away, so
 * the file is never fetched for visitors who don't reach it
 * (`preload="none"`). Visitors who prefer reduced motion get the poster frame
 * and start it themselves. The pause button satisfies WCAG 2.2.2.
 */
export default function ProductVideo({ src, poster, productName }: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Once the visitor pauses, scrolling back into view must not restart it
  const userPausedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // iOS only autoplays inline video that is muted; set the property as well
    // as the attribute, since React doesn't reliably render the attribute
    video.muted = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      userPausedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPausedRef.current) void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif text-navy mb-2">
          A closer look at the {productName}
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Under a minute on what is inside it and who it suits.
        </p>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-navy shadow-lg">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${productName} video`}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="w-full h-full object-cover"
          />

          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? `Pause the ${productName} video` : `Play the ${productName} video`}
            className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-navy/70 text-white transition-colors hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {playing ? (
              <Pause className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Play className="w-4 h-4 translate-x-px" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
