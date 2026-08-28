'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

interface ProductVideoProps {
  src: string;
  poster: string;
  productName: string;
}

/**
 * The per-mattress explainer.
 *
 * Unlike the homepage hero this does NOT autoplay: it carries a voiceover, and
 * a video that starts talking at someone reading a product page is hostile. It
 * sits on its poster frame until they press play, which also means the file is
 * never fetched for the majority who don't watch it (`preload="none"`).
 */
export default function ProductVideo({ src, poster, productName }: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    // The element only gets a source once the poster overlay is dismissed, so
    // the first play() has to wait a tick for React to attach it.
    requestAnimationFrame(() => void videoRef.current?.play());
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
            src={started ? src : undefined}
            poster={poster}
            controls={started}
            preload="none"
            playsInline
            className="w-full h-full object-cover"
          >
            <track kind="captions" />
          </video>

          {!started && (
            <button
              type="button"
              onClick={start}
              aria-label={`Play the ${productName} video`}
              className="absolute inset-0 flex items-center justify-center bg-navy/20 transition-colors hover:bg-navy/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform hover:scale-105">
                <Play className="w-6 h-6 text-navy translate-x-0.5" aria-hidden="true" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
