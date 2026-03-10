'use client';

import { useEffect, useRef, useState } from 'react';
import { getMattressLayerConfig, type MattressLayer } from '@/data/mattress-layers';

// ─── Sub-Components ───────────────────────────────────────────────────────────

function LayerVisualization({
  activeIndex,
  layers,
  svgHeights,
  svgLabels,
}: {
  activeIndex: number;
  layers: MattressLayer[];
  svgHeights: number[];
  svgLabels: string[];
}) {
  const layer = layers[activeIndex];

  // Compute y positions top-to-bottom with 5px gaps
  const GAP = 5;
  const yPositions: number[] = [];
  let currentY = 0;
  for (let i = 0; i < svgHeights.length; i++) {
    yPositions[i] = currentY;
    currentY += svgHeights[i] + GAP;
  }
  const totalHeight = currentY - GAP;

  return (
    <div className="relative flex flex-col items-center justify-center p-8 lg:p-12 h-full">
      {/* Ghost layer number watermark */}
      <div
        className="absolute top-4 left-4 font-serif select-none pointer-events-none leading-none"
        style={{
          fontSize: 'clamp(100px, 15vw, 180px)',
          color: 'rgba(255,255,255,0.04)',
          transition: 'all 700ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {layer.number}
      </div>

      <div className="relative w-full max-w-xs lg:max-w-sm">
        {/* SVG Mattress Cross-Section */}
        <svg
          viewBox={`0 0 320 ${totalHeight}`}
          className="w-full"
          role="img"
          aria-label={`Mattress layer diagram — ${layer.title} highlighted`}
        >
          {/* Render layers top-to-bottom */}
          {svgHeights.map((height, idx) => {
            const y = yPositions[idx];
            const isActive = idx === activeIndex;
            const layerData = layers[idx];

            return (
              <g key={idx}>
                <rect
                  x={isActive ? 0 : 14}
                  y={y}
                  width={isActive ? 320 : 292}
                  height={height}
                  rx="6"
                  fill={isActive ? layerData.svgAccent : 'rgba(255,255,255,0.06)'}
                  style={{
                    transition: 'all 700ms cubic-bezier(0.4,0,0.2,1)',
                    filter: isActive
                      ? `drop-shadow(0 0 20px ${layerData.svgAccent}66)`
                      : 'none',
                  }}
                />
                {/* Active layer label inside slab */}
                <text
                  x="20"
                  y={y + height / 2 + 5}
                  fill={isActive && idx === 0 ? '#1a1e24' : 'white'}
                  fontSize="11"
                  fontFamily="inherit"
                  letterSpacing="2"
                  style={{
                    opacity: isActive ? 0.9 : 0.15,
                    transition: 'opacity 500ms cubic-bezier(0.4,0,0.2,1)',
                    textTransform: 'uppercase',
                  }}
                >
                  {svgLabels[idx]}
                </text>
              </g>
            );
          })}

          {/* Surface stitch detail */}
          <path
            d="M 10 4 Q 50 0 90 4 Q 130 8 170 4 Q 210 0 250 4 Q 290 8 310 4"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="5 5"
          />
        </svg>

        {/* Stat callout */}
        <div className="mt-8 text-center">
          <div
            className="font-serif leading-none"
            style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              color: 'white',
              transition: 'color 700ms cubic-bezier(0.4,0,0.2,1)',
            }}
            key={activeIndex}
          >
            {layer.stat}
          </div>
          <div
            className="mt-2 font-sans text-xs tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            {layer.statLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentInner({ layer }: { layer: MattressLayer }) {
  const Icon = layer.icon;
  return (
    <div className="space-y-6 px-4 lg:px-0">
      {/* Layer badge */}
      <div className="flex items-center gap-3">
        <span style={{ color: layer.accentColor }}>
          <Icon size={16} />
        </span>
        <span
          className="font-sans text-xs tracking-[0.3em] uppercase"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Layer {layer.number}
        </span>
      </div>

      {/* Title */}
      <div>
        <h2
          className="font-serif leading-tight mb-2"
          style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', color: 'white' }}
        >
          {layer.title}
        </h2>
        <p
          className="font-sans text-xs tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          {layer.subtitle}
        </p>
      </div>

      {/* Divider */}
      <div
        className="w-12 h-px"
        style={{
          backgroundColor: layer.accentColor,
          opacity: 0.5,
          transition: 'background-color 700ms cubic-bezier(0.4,0,0.2,1)',
        }}
      />

      {/* Body copy */}
      <p
        className="font-sans text-base lg:text-lg leading-relaxed max-w-md"
        style={{ color: 'rgba(255,255,255,0.65)' }}
      >
        {layer.body}
      </p>
    </div>
  );
}

function LayerContent({
  activeIndex,
  layers,
}: {
  activeIndex: number;
  layers: MattressLayer[];
}) {
  return (
    <div className="relative h-full flex flex-col justify-center">
      <div className="relative" style={{ minHeight: '320px' }}>
        {layers.map((layer, idx) => {
          const isActive = idx === activeIndex;
          const isPast = idx < activeIndex;

          return (
            <div
              key={layer.id}
              aria-hidden={!isActive}
              className="absolute inset-0 flex flex-col justify-center"
              style={{
                transform: isActive
                  ? 'translateY(0)'
                  : isPast
                  ? 'translateY(-40px)'
                  : 'translateY(60px)',
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
                transition: 'transform 700ms cubic-bezier(0.4,0,0.2,1), opacity 700ms cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <ContentInner layer={layer} />
            </div>
          );
        })}
        {/* Invisible spacer */}
        <div className="invisible pointer-events-none">
          <ContentInner layer={layers[0]} />
        </div>
      </div>
    </div>
  );
}

function ProgressDots({
  activeIndex,
  onDotClick,
  isMobile,
  layers,
}: {
  activeIndex: number;
  onDotClick: (index: number) => void;
  isMobile: boolean;
  layers: MattressLayer[];
}) {
  if (isMobile) {
    return (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-row gap-3 z-20">
        {layers.map((layer, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={layer.id}
              onClick={() => onDotClick(idx)}
              aria-label={`Jump to layer ${idx + 1}: ${layer.title}`}
              className="flex items-center justify-center"
              style={{ width: '24px', height: '24px' }}
            >
              <div
                style={{
                  width: isActive ? '10px' : '6px',
                  height: isActive ? '10px' : '6px',
                  borderRadius: '50%',
                  backgroundColor: isActive
                    ? layers[activeIndex].accentColor
                    : 'rgba(255,255,255,0.3)',
                  transition: 'all 500ms cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
      {layers.map((layer, idx) => {
        const isActive = idx === activeIndex;
        return (
          <button
            key={layer.id}
            onClick={() => onDotClick(idx)}
            aria-label={`Jump to layer ${idx + 1}: ${layer.title}`}
            className="group flex items-center gap-3 justify-end"
          >
            <span
              className="font-sans text-xs whitespace-nowrap"
              style={{
                color: 'rgba(255,255,255,0.55)',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(8px)',
                transition: 'opacity 300ms, transform 300ms',
                letterSpacing: '0.1em',
              }}
            >
              {layer.title}
            </span>
            <div
              style={{
                width: isActive ? '10px' : '6px',
                height: isActive ? '10px' : '6px',
                borderRadius: '50%',
                backgroundColor: isActive
                  ? layers[activeIndex].accentColor
                  : 'rgba(255,255,255,0.3)',
                transition: 'all 500ms cubic-bezier(0.4,0,0.2,1)',
                flexShrink: 0,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

function SectionHeader({
  activeIndex,
  sectionLabel,
  sectionSubtitle,
}: {
  activeIndex: number;
  sectionLabel?: string;
  sectionSubtitle?: string;
}) {
  return (
    <div
      className="absolute top-8 left-0 right-0 px-6 lg:px-16 pointer-events-none"
      style={{
        opacity: activeIndex === 0 ? 1 : 0.3,
        transition: 'opacity 700ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <span
        className="inline-block font-sans text-xs tracking-[0.35em] uppercase mb-1"
        style={{ color: 'rgba(243,165,29,0.7)' }}
      >
        {sectionLabel ?? 'The Science of Sleep'}
      </span>
      <p
        className="font-sans text-sm"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        {sectionSubtitle ?? 'Scroll to dig deeper'}
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LayerSwitcher({ slug }: { slug?: string }) {
  const config = getMattressLayerConfig(slug);
  const { layers, svgHeights, svgLabels, sectionLabel, sectionSubtitle } = config;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable <= 0) return;
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
        const newIndex = Math.round(progress * (layers.length - 1));
        setActiveIndex(newIndex);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [layers.length]);

  const handleDotClick = (index: number) => {
    if (isScrollingRef.current || !sectionRef.current) return;
    isScrollingRef.current = true;

    const sectionTop = sectionRef.current.offsetTop;
    const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
    const target = sectionTop + (index / (layers.length - 1)) * totalScrollable;

    window.scrollTo({ top: target, behavior: 'smooth' });
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  const activeLayer = layers[activeIndex];
  const sectionHeight = isMobile ? layers.length * 80 : layers.length * 100;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${sectionHeight}vh` }}
      aria-label={`Explore the ${layers.length} mattress layers`}
    >
      {/* Sticky viewport panel */}
      <div className="sticky top-0 overflow-hidden" style={{ height: '100vh' }}>
        {/* Animated background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: activeLayer.bgColor,
            transition: 'background-color 700ms cubic-bezier(0.4,0,0.2,1)',
          }}
        />

        {/* Subtle top vignette */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
          }}
        />

        {/* Main content grid */}
        <div
          className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {/* Left / Top: SVG Visualization */}
          <div
            style={{
              order: isMobile ? 1 : 0,
              maxHeight: isMobile ? '40vh' : 'none',
              overflow: 'hidden',
            }}
          >
            <LayerVisualization
              activeIndex={activeIndex}
              layers={layers}
              svgHeights={svgHeights}
              svgLabels={svgLabels}
            />
          </div>

          {/* Right / Bottom: Text Content */}
          <div
            aria-live="polite"
            style={{ order: isMobile ? 2 : 1 }}
          >
            <LayerContent activeIndex={activeIndex} layers={layers} />
          </div>
        </div>

        {/* Section header */}
        <SectionHeader
          activeIndex={activeIndex}
          sectionLabel={sectionLabel}
          sectionSubtitle={sectionSubtitle}
        />

        {/* Progress dots */}
        <ProgressDots
          activeIndex={activeIndex}
          onDotClick={handleDotClick}
          isMobile={isMobile}
          layers={layers}
        />
      </div>
    </section>
  );
}
