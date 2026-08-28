'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

interface ShowroomPlayerProps {
  src: string;
  poster: string;
  name: string;
  tagline: string;
}

/**
 * A tile on the floor tablet. Same load-on-demand behaviour as the product
 * page player, but sized for a thumb and never muted — the whole point here is
 * that a customer can hear it while Rob is with someone else.
 */
export default function ShowroomPlayer({ src, poster, name, tagline }: ShowroomPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    requestAnimationFrame(() => void videoRef.current?.play());
  };

  return (
    <figure className="m-0">
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black">
        <video
          ref={videoRef}
          src={started ? src : undefined}
          poster={poster}
          controls={started}
          preload="none"
          playsInline
          className="h-full w-full object-cover"
        >
          <track kind="captions" />
        </video>

        {!started && (
          <button
            type="button"
            onClick={start}
            aria-label={`Play the ${name} video`}
            className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-xl">
              <Play className="h-8 w-8 translate-x-0.5 text-navy" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm text-white/60">{tagline}</p>
      </figcaption>
    </figure>
  );
}
