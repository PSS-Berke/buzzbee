import { Clock, Layers, MonitorSmartphone, Tag, Moon, CalendarCheck } from 'lucide-react';

const tiles = [
  {
    icon: Clock,
    title: 'Open whenever you are',
    body: 'The showroom is unlocked 24/7. Stop in at 11 a.m. or 11 p.m. — no hours, no waiting room, no salespeople hovering.',
  },
  {
    icon: Layers,
    title: 'Every mattress, side by side',
    body: 'All four Busby models in one room — Dream, Slumber, Nod, Doze. Try them in any order, as many times as you want.',
  },
  {
    icon: MonitorSmartphone,
    title: 'A kiosk to walk you through',
    body: 'An in-store touch kiosk explains what’s in each bed, who it’s built for, and what to feel for as you try it.',
  },
  {
    icon: CalendarCheck,
    title: 'Sleep consultations on request',
    body: 'Want a one-on-one with an expert? Book a Sleep Consultation and a Sleep Guide will meet you there.',
  },
  {
    icon: Tag,
    title: 'Same online prices',
    body: 'What you see online is what you pay. No "store-only" pricing tricks.',
  },
  {
    icon: Moon,
    title: '100 nights to keep deciding',
    body: 'Whether you order in the showroom or online, the 100-night home trial is the same. Sleep on it before you decide for real.',
  },
];

export default function WhatToExpect() {
  return (
    <section className="py-20 md:py-24 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">
            What to expect when you visit
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <div
                key={tile.title}
                className="bg-white rounded-2xl p-7 border-2 border-gold/15 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">{tile.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tile.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
