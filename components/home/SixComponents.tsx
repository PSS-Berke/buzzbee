'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Layers, Wind, Shield, Zap, Move, Sparkles } from 'lucide-react';

const components = [
  {
    id: 1,
    icon: Layers,
    title: 'The Right Support',
    description: 'Not too soft, not too firm. Your spine should stay naturally aligned whether you sleep on your back, side, or stomach.',
    detail: 'Look for zoned support that adapts to different body areas - firmer under your hips, softer under your shoulders.',
  },
  {
    id: 2,
    icon: Sparkles,
    title: 'The Right Feel',
    description: 'Comfort that lasts all night. You should feel cradled without sinking too deep or feeling stuck.',
    detail: 'Quality comfort layers respond to your movement and bounce back - no body impressions after a few months.',
  },
  {
    id: 3,
    icon: Wind,
    title: 'The Right Temperature',
    description: 'Cool sleep, every season. Overheating is the #1 cause of disrupted sleep - your mattress shouldn\'t trap heat.',
    detail: 'Breathable materials and airflow design keep you in the optimal 65-68°F sleep temperature zone.',
  },
  {
    id: 4,
    icon: Shield,
    title: 'The Right Stability',
    description: 'No rolling to the middle. Strong edges mean you can use every inch and get in and out easily.',
    detail: 'Reinforced perimeters prevent the "hammock effect" that causes partners to roll toward each other.',
  },
  {
    id: 5,
    icon: Move,
    title: 'The Right Isolation',
    description: 'Your side, your sleep. When your partner moves, you shouldn\'t feel a thing.',
    detail: 'Independent support systems absorb motion so late-night bathroom trips don\'t become a two-person event.',
  },
  {
    id: 6,
    icon: Zap,
    title: 'The Right Materials',
    description: 'Safe, certified, sustainable. You spend 8 hours a night on your mattress - know what\'s in it.',
    detail: 'CertiPUR-US certified foams and absolutely zero fiberglass. Better materials, better sleep.',
  },
];

export default function SixComponents() {
  const [activeComponent, setActiveComponent] = useState(1);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-4">
            The Busby Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-2">
            The 6 Essential Components
          </h2>
          <p className="text-xl text-gray-600 mb-4">to a perfect night&apos;s sleep</p>
          <p className="text-lg font-medium text-navy mt-3">
            Sleep is not a luxury. It&apos;s a foundation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual representation */}
          <div className="relative">
            <div className="aspect-square bg-white/80 border-2 border-gold/20 rounded-3xl shadow-xl shadow-gold/5 p-8 flex items-center justify-center">
              {/* Mattress layer visualization */}
              <div className="w-full max-w-sm">
                {components.map((component, index) => (
                  <button
                    key={component.id}
                    type="button"
                    onClick={() => setActiveComponent(component.id)}
                    aria-expanded={activeComponent === component.id}
                    aria-controls={`component-detail-${component.id}`}
                    className={`relative block w-full h-12 rounded-lg transition-all duration-300 cursor-pointer ${
                      activeComponent === component.id
                        ? 'bg-gold scale-105 shadow-lg z-10 ring-2 ring-navy ring-offset-2'
                        : 'bg-navy/80 hover:bg-navy/90'
                    }`}
                    style={{ marginTop: index === 0 ? 0 : '-4px' }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center">
                      <component.icon className={`w-5 h-5 ${activeComponent === component.id ? 'text-navy' : 'text-white/90'}`} />
                      <span className={`ml-2 text-sm font-medium ${activeComponent === component.id ? 'text-navy' : 'text-white/90'}`}>
                        {component.title}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Component list */}
          <div className="space-y-4">
            {components.map((component) => (
              <div
                key={component.id}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  activeComponent === component.id
                    ? 'bg-white shadow-lg shadow-gold/10 border-2 border-gold/30'
                    : 'bg-white/50 border-2 border-transparent hover:border-gold/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    activeComponent === component.id ? 'bg-gold/20' : 'bg-gray-100'
                  }`}>
                    <component.icon className={`w-6 h-6 ${activeComponent === component.id ? 'text-gold-dark' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1">
                      <button
                        type="button"
                        onClick={() => setActiveComponent(component.id)}
                        aria-expanded={activeComponent === component.id}
                        aria-controls={`component-detail-${component.id}`}
                        className={`flex w-full items-center justify-between gap-2 text-left font-semibold ${
                          activeComponent === component.id ? 'text-navy' : 'text-gray-600'
                        }`}
                      >
                        <span>
                          {component.id}. {component.title}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                            activeComponent === component.id ? 'rotate-180 text-gold-dark' : 'text-gray-600'
                          }`}
                        />
                      </button>
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{component.description}</p>
                    {activeComponent === component.id && (
                      <p id={`component-detail-${component.id}`} className="text-gray-600 text-sm mt-2 italic">
                        {component.detail}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/sleep-guide"
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-105"
          >
            Read the full Busby philosophy
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1.5 text-gold-dark hover:text-navy font-semibold transition-colors"
          >
            Or find your match in 90 seconds
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
