'use client';

import { useState } from 'react';
import { Layers, Wind, Shield, Zap, Move, Sparkles } from 'lucide-react';

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
            The Sleep6 Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
            The 6 Essential Components
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            After 25 years in the industry, we identified exactly what makes a perfect mattress.
            No more, no less.
          </p>
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
                  <div
                    key={component.id}
                    className={`relative h-12 rounded-lg transition-all duration-300 cursor-pointer ${
                      activeComponent === component.id
                        ? 'bg-gold scale-105 shadow-lg z-10'
                        : 'bg-navy/70 hover:bg-navy/90'
                    }`}
                    style={{ marginTop: index === 0 ? 0 : '-4px' }}
                    onClick={() => setActiveComponent(component.id)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <component.icon className={`w-5 h-5 ${activeComponent === component.id ? 'text-white' : 'text-white/70'}`} />
                      <span className={`ml-2 text-sm font-medium ${activeComponent === component.id ? 'text-white' : 'text-white/70'}`}>
                        {component.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Component list */}
          <div className="space-y-4">
            {components.map((component) => (
              <div
                key={component.id}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeComponent === component.id
                    ? 'bg-white shadow-lg shadow-gold/10 border-2 border-gold/30'
                    : 'bg-white/50 border-2 border-transparent hover:border-gold/20'
                }`}
                onClick={() => setActiveComponent(component.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    activeComponent === component.id ? 'bg-gold/20' : 'bg-gray-100'
                  }`}>
                    <component.icon className={`w-6 h-6 ${activeComponent === component.id ? 'text-gold-dark' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${activeComponent === component.id ? 'text-navy' : 'text-gray-600'}`}>
                      {component.id}. {component.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{component.description}</p>
                    {activeComponent === component.id && (
                      <p className="text-gray-400 text-sm mt-2 italic">{component.detail}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
