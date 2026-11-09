'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StudioGoWhySlide from './hero/StudioGoWhySlide';
import Studio12WhySlide from './hero/Studio12WhySlide';
import VideoSlide from './hero/VideoSlide';
import DreamSlide from './hero/DreamSlide';
import SaleSlide from './hero/SaleSlide';
import { sale } from '@/data/sale';

// Left to right, as they sit on the track. Studio Go stays first: a scroller always opens
// at its far left, so it's what paints before any JavaScript runs. The hero rotates
// rightward and wraps back to it. Labels are for screen readers. On screen the dots carry
// no names. The sale slide comes second, and only while the sale is on.
const allSlides = [
  { id: 'why', label: 'Why Studio Go' },
  { id: 'sale', label: `Mattress sale, ${sale.label}` },
  { id: 'video', label: 'Watch' },
  { id: 'dream', label: 'Busby Dream' },
  { id: 'studio12', label: 'Studio 12' },
] as const;
type SlideId = (typeof allSlides)[number]['id'];
const slides = allSlides.filter((s) => s.id !== 'sale' || sale.active);

const ROTATE_MS = 30_000;
// Slides that hold for less than the usual time. Studio Go gets half, so the hero reaches
// the sale sooner.
const HOLD_MS: Partial<Record<SlideId, number>> = { why: 15_000 };
// The video slide moves on after its plays finish instead. This only catches a video
// that never gets there, because it failed to load or the browser blocked it.
const VIDEO_BACKSTOP_MS = 90_000;

// Rotates on desktop only. Slides differ in height on a phone, so rotating there
// would move the page under someone's thumb.
const ROTATE_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

function subscribeRotate(onChange: () => void) {
  const query = window.matchMedia(ROTATE_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/**
 * The home hero: a row of slides on a native scroll-snap track, so swiping just works.
 * Only the active slide is interactive (the rest are inert). Each slide holds for 30
 * seconds, except Studio Go, which holds for 15, and the video, which gets two full plays. Rotation stops for good once
 * the visitor takes control, and holds under keyboard focus or off screen. The mouse
 * only holds it from on top of a button or link: the hero fills most of a desktop
 * screen, so holding on any hover would mean it rarely rotated at all.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firstRender = useRef(true);

  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [inView, setInView] = useState(true);
  const [videoPlayed, setVideoPlayed] = useState(false);

  const onVideo = slides[active].id === 'video';
  if (!onVideo && videoPlayed) setVideoPlayed(false);

  const canRotate = useSyncExternalStore(
    subscribeRotate,
    () => window.matchMedia(ROTATE_QUERY).matches,
    () => false,
  );
  const rotating = canRotate && !stopped;
  const running = rotating && !focusWithin && inView;

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: index * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  }, []);
  const userGoTo = (index: number) => {
    setStopped(true);
    goTo((index + slides.length) % slides.length);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (track) setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  useEffect(() => {
    if (!running) return;
    let timer: number;
    const advance = () => {
      // Moving the slide under a pointer would change what its click lands on.
      if (document.hidden || sectionRef.current?.querySelector('a:hover, button:hover')) {
        timer = window.setTimeout(advance, 1000);
      } else {
        goTo((active + 1) % slides.length);
      }
    };
    const hold = HOLD_MS[slides[active].id] ?? ROTATE_MS;
    const wait = !onVideo ? hold : videoPlayed ? 0 : VIDEO_BACKSTOP_MS;
    timer = window.setTimeout(advance, wait);
    return () => window.clearTimeout(timer);
  }, [running, active, onVideo, videoPlayed, goTo]);

  // Slides differ in height on a phone, so the track follows the active one.
  useEffect(() => {
    const track = trackRef.current;
    const slide = slideRefs.current[active];
    if (!track || !slide) return;
    const observer = new ResizeObserver(() => {
      track.style.setProperty('--slide-h', `${slide.offsetHeight}px`);
    });
    observer.observe(slide);
    return () => observer.disconnect();
  }, [active]);

  // The primary slide is long on a phone. Swiping from far down it onto a shorter slide
  // would otherwise leave the visitor looking at whatever is below the hero.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const section = sectionRef.current;
    if (!section || window.matchMedia('(min-width: 1024px)').matches) return;
    if (section.getBoundingClientRect().top < 0) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      section.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
    }
  }, [active]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const panels: Record<SlideId, ReactNode> = {
    sale: <SaleSlide />,
    video: (
      <VideoSlide
        active={onVideo && inView}
        onPlayedThrough={() => setVideoPlayed(true)}
        onControl={() => setStopped(true)}
      />
    ),
    why: <StudioGoWhySlide active={slides[active].id === 'why'} />,
    studio12: <Studio12WhySlide active={slides[active].id === 'studio12'} />,
    dream: <DreamSlide active={slides[active].id === 'dream'} />,
  };

  // On desktop the track fills the screen down to the controls, stopping above the fixed
  // "Now Open" pill so it doesn't cover them: 232px is the header, the controls and the pill.
  const controlClass =
    'flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5';

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Featured at Busby"
      // Keyboard focus only: a mouse click leaves focus on the button it clicked,
      // which would otherwise hold rotation until the next click elsewhere.
      onFocusCapture={(e) => setFocusWithin((e.target as HTMLElement).matches(':focus-visible'))}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocusWithin(false);
      }}
      className="scroll-mt-[108px] border-b border-grid lg:scroll-mt-[124px]"
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        onTouchStart={() => setStopped(true)}
        onWheel={(e) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) setStopped(true);
        }}
        aria-live={rotating ? 'off' : 'polite'}
        className="relative flex h-[var(--slide-h)] snap-x snap-mandatory items-start overflow-x-auto overflow-y-hidden overscroll-x-contain transition-[height] duration-300 [scrollbar-width:none] motion-reduce:transition-none lg:h-auto lg:min-h-[max(640px,min(56.25vw,calc(100svh-232px)))] lg:items-stretch [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${slide.label}`}
            inert={i !== active}
            className="w-full shrink-0 snap-start snap-always lg:flex"
          >
            {panels[slide.id]}
          </div>
        ))}
      </div>

      <div className="border-t border-grid bg-white">
        {/* Faint until someone reaches for it. */}
        <div
          role="group"
          aria-label="Choose a slide"
          className="mx-auto flex w-fit items-center opacity-60 transition-opacity hover:opacity-100 has-[:focus-visible]:opacity-100"
        >
          <button type="button" onClick={() => userGoTo(active - 1)} aria-label="Previous slide" className={controlClass}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={slide.label}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => userGoTo(i)}
              className="group/dot flex h-11 w-6 items-center justify-center"
            >
              <span
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === active ? 'bg-navy' : 'bg-navy/30 group-hover/dot:bg-navy/60'
                }`}
              />
            </button>
          ))}
          <button type="button" onClick={() => userGoTo(active + 1)} aria-label="Next slide" className={controlClass}>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
