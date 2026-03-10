'use client';

import { useState } from 'react';
import type { ComponentDetail } from '@/data/products';

interface MattressLayersProps {
  components: ComponentDetail[];
  productName: string;
}

// Layer colors for the detail list indicators
const layerIndicatorColors = [
  { bg: 'bg-white', border: 'border-navy', twoTone: true },
  { bg: 'bg-sky-300', border: 'border-sky-400', twoTone: false },
  { bg: 'bg-amber-100', border: 'border-amber-200', twoTone: false },
  { bg: 'bg-slate-300', border: 'border-slate-400', twoTone: false },
];

export default function MattressLayers({ components, productName }: MattressLayersProps) {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const getLayerOpacity = (layerId: number) => {
    if (activeLayer === null) return 1;
    return activeLayer === layerId ? 1 : 0.5;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block text-gold-dark font-medium text-sm mb-2">
          {components.length} Layers of Comfort
        </span>
        <h3 className="text-2xl font-serif text-navy">
          Inside the <span className="font-semibold">{productName}</span>
        </h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* SVG Mattress Visualization */}
        <div className="relative">
          <div className="bg-[#e8f4fc] rounded-3xl p-8 border-2 border-sky-100">
            {/* Wrapper div handles mouse leave for entire diagram */}
            <div
              onMouseLeave={() => {
                setActiveLayer(null);
                setIsHovering(false);
              }}
              onMouseEnter={() => setIsHovering(true)}
            >
              <svg
                viewBox="0 0 450 180"
                className="w-full h-auto"
                style={{ maxHeight: '280px' }}
              >
                <defs>
                  {/* Gradients for 3D depth effect */}
                  <linearGradient id="coverTopGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f1f5f9" />
                  </linearGradient>

                  <linearGradient id="navyCoverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a5f" />
                    <stop offset="100%" stopColor="#172554" />
                  </linearGradient>

                  <linearGradient id="gelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="50%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>

                  <linearGradient id="viscoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="50%" stopColor="#fde68a" />
                    <stop offset="100%" stopColor="#fcd34d" />
                  </linearGradient>

                  <linearGradient id="coreGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="50%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>

                  {/* Shadow filter */}
                  <filter id="mattressShadow" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1e3a5f" floodOpacity="0.2" />
                  </filter>

                  {/* Highlight filter for active layer */}
                  <filter id="activeGlow" x="-5%" y="-5%" width="110%" height="110%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#d4a574" floodOpacity="0.6" />
                  </filter>
                </defs>

                {/* Heat dissipation arrows */}
                <g className="heat-arrows">
                  {[100, 150, 200, 250, 300].map((x, i) => (
                    <g key={i} transform={`translate(${x}, 8)`}>
                      <path
                        d="M0 18 L5 7 L2.5 7 L2.5 0 L-2.5 0 L-2.5 7 L-5 7 Z"
                        fill="#f59e0b"
                        opacity="0.85"
                      />
                    </g>
                  ))}
                </g>

                {/* Main mattress group */}
                <g transform="translate(50, 30)" filter="url(#mattressShadow)">

                  {/* === STRETCH KNIT COVER (the only outer element) === */}
                  <g
                    className="cursor-pointer"
                    style={{
                      opacity: getLayerOpacity(0),
                      transition: 'opacity 0.2s ease-out'
                    }}
                    filter={activeLayer === 0 ? 'url(#activeGlow)' : 'none'}
                    onClick={() => setActiveLayer(activeLayer === 0 ? null : 0)}
                    onMouseEnter={() => setActiveLayer(0)}
                  >
                    {/* Navy cover - left side (intact/covered portion) */}
                    <path
                      d="M0 15
                         Q0 0 15 0
                         L60 0
                         L60 125
                         Q60 140 45 140
                         L15 140
                         Q0 140 0 125
                         Z"
                      fill="url(#navyCoverGradient)"
                    />

                    {/* White quilted top surface */}
                    <path
                      d="M15 0
                         L300 0
                         Q315 0 315 15
                         L315 22
                         L60 22
                         L60 0
                         Z"
                      fill="url(#coverTopGradient)"
                    />

                    {/* Quilted pattern dots on white top */}
                    {[90, 130, 170, 210, 250].map((cx, i) => (
                      <circle key={i} cx={cx} cy="11" r="2" fill="#cbd5e1" opacity="0.4" />
                    ))}

                    {/* Navy cover border - wrapping around the cutaway */}
                    {/* Top edge continuing from white */}
                    <path
                      d="M60 22
                         L315 22
                         L315 30
                         L68 30
                         L68 22
                         Z"
                      fill="url(#navyCoverGradient)"
                    />

                    {/* Left inner edge of cutaway */}
                    <path
                      d="M60 22
                         L68 22
                         L68 132
                         L60 132
                         Z"
                      fill="url(#navyCoverGradient)"
                    />

                    {/* Bottom edge of cover */}
                    <path
                      d="M60 132
                         L68 132
                         L68 125
                         Q68 132 75 132
                         L307 132
                         Q315 132 315 125
                         L315 132
                         Q315 140 300 140
                         L45 140
                         Q60 140 60 125
                         Z"
                      fill="url(#navyCoverGradient)"
                    />

                    {/* Right rounded edge of cover (cutaway curve) */}
                    <path
                      d="M315 22
                         L315 125
                         Q315 132 307 132
                         L307 125
                         Q307 125 307 30
                         L315 30
                         Z"
                      fill="url(#navyCoverGradient)"
                    />
                  </g>

                  {/* === INNER LAYERS (visible through cutaway) === */}

                  {/* Gel Layer (ResponseGel Technology) */}
                  <g
                    className="cursor-pointer"
                    style={{
                      opacity: getLayerOpacity(1),
                      transition: 'opacity 0.2s ease-out'
                    }}
                    filter={activeLayer === 1 ? 'url(#activeGlow)' : 'none'}
                    onClick={() => setActiveLayer(activeLayer === 1 ? null : 1)}
                    onMouseEnter={() => setActiveLayer(1)}
                  >
                    <path
                      d="M68 30
                         L307 30
                         L307 65
                         L68 65
                         Z"
                      fill="url(#gelGradient)"
                    />
                  </g>

                  {/* Visco Layer (CoolFlow Visco) */}
                  <g
                    className="cursor-pointer"
                    style={{
                      opacity: getLayerOpacity(2),
                      transition: 'opacity 0.2s ease-out'
                    }}
                    filter={activeLayer === 2 ? 'url(#activeGlow)' : 'none'}
                    onClick={() => setActiveLayer(activeLayer === 2 ? null : 2)}
                    onMouseEnter={() => setActiveLayer(2)}
                  >
                    <path
                      d="M68 65
                         L307 65
                         L307 90
                         L68 90
                         Z"
                      fill="url(#viscoGradient)"
                    />
                  </g>

                  {/* Core Layer (High Density Support Core) */}
                  <g
                    className="cursor-pointer"
                    style={{
                      opacity: getLayerOpacity(3),
                      transition: 'opacity 0.2s ease-out'
                    }}
                    filter={activeLayer === 3 ? 'url(#activeGlow)' : 'none'}
                    onClick={() => setActiveLayer(activeLayer === 3 ? null : 3)}
                    onMouseEnter={() => setActiveLayer(3)}
                  >
                    <path
                      d="M68 90
                         L307 90
                         L307 125
                         Q307 132 300 132
                         L75 132
                         Q68 132 68 125
                         Z"
                      fill="url(#coreGradient)"
                    />
                  </g>

                  {/* Subtle highlight line on cutaway edge */}
                  <path
                    d="M307 30 L307 125"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                    fill="none"
                  />
                </g>

                {/* Layer indicator lines on the right */}
                <g transform="translate(370, 30)">
                  {components.slice(0, 4).map((_, index) => {
                    const yPositions = [11, 47, 77, 110];
                    return (
                      <g key={index}>
                        <line
                          x1="0"
                          y1={yPositions[index]}
                          x2="25"
                          y2={yPositions[index]}
                          stroke={activeLayer === index ? '#d4a574' : '#94a3b8'}
                          strokeWidth={activeLayer === index ? 2 : 1}
                          style={{ transition: 'all 0.2s ease-out' }}
                        />
                        <circle
                          cx="32"
                          cy={yPositions[index]}
                          r={activeLayer === index ? 5 : 3}
                          fill={activeLayer === index ? '#d4a574' : '#cbd5e1'}
                          style={{ transition: 'all 0.2s ease-out' }}
                        />
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>

            {/* Small text */}
            <p className="text-center text-xs text-gray-400 mt-2">
              *Layers not to scale
            </p>
          </div>
        </div>

        {/* Layer details list */}
        <div className="space-y-3">
          {components.map((component, index) => {
            const isActive = activeLayer === index;
            const colorConfig = layerIndicatorColors[index] || layerIndicatorColors[0];

            return (
              <div
                key={index}
                className={`
                  p-5 rounded-2xl cursor-pointer
                  transition-all duration-200
                  ${isActive
                    ? 'bg-white shadow-lg shadow-gold/10 border-2 border-gold/30 scale-[1.02]'
                    : 'bg-white/50 border-2 border-transparent hover:border-gold/10'
                  }
                `}
                onClick={() => setActiveLayer(activeLayer === index ? null : index)}
                onMouseEnter={() => setActiveLayer(index)}
                onMouseLeave={() => !isHovering && setActiveLayer(null)}
              >
                <div className="flex items-start gap-4">
                  {/* Color indicator */}
                  {colorConfig.twoTone ? (
                    <div
                      className={`
                        flex-shrink-0 w-4 h-4 rounded-full mt-1 overflow-hidden
                        border-2 border-gray-200
                        ${isActive ? 'ring-2 ring-gold ring-offset-2' : ''}
                      `}
                    >
                      <div className="h-1/2 bg-white" />
                      <div className="h-1/2 bg-navy" />
                    </div>
                  ) : (
                    <div
                      className={`
                        flex-shrink-0 w-4 h-4 rounded-full mt-1
                        ${colorConfig.bg} border-2 ${colorConfig.border}
                        ${isActive ? 'ring-2 ring-gold ring-offset-2' : ''}
                      `}
                    />
                  )}
                  <div className="flex-1">
                    <h4 className={`
                      font-semibold text-sm transition-colors duration-200
                      ${isActive ? 'text-navy' : 'text-gray-600'}
                    `}>
                      {component.name}
                    </h4>
                    {isActive && (
                      <div className="mt-2 space-y-1 animate-fadeIn">
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {component.description}
                        </p>
                        <p className="text-xs text-gray-400">
                          <span className="text-gold-dark font-medium">Materials:</span> {component.materials}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
