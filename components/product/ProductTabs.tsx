'use client';

import { useState } from 'react';
import { Check, Package, Truck, Home, Moon } from 'lucide-react';
import type { Product } from '@/data/products';

interface ProductTabsProps {
  product: Product;
}

type TabKey = 'overview' | 'materials' | 'delivery';

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'materials', label: 'Materials' },
    { key: 'delivery', label: 'Delivery' },
  ];

  return (
    <div className="mt-20">
      {/* Pill-style tab navigation */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-white/60 rounded-full p-1.5 gap-1 border border-gold/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                px-6 py-3 rounded-full font-medium text-sm transition-all duration-500
                ${activeTab === tab.key
                  ? 'bg-white text-navy shadow-sm border border-gold/20'
                  : 'text-gray-500 hover:text-navy'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-2xl font-serif text-navy mb-4">
                About the <span className="font-semibold">{product.name}</span>
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                {product.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm text-gold-dark font-medium text-center mb-6">
                Features
              </h4>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-gold/20 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm text-gold-dark font-medium text-center mb-6">
                Best For
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {product.bestFor.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-serif text-navy mb-2">
                American-Sourced <span className="font-semibold">Materials</span>
              </h3>
              <p className="text-gray-500">
                Every material certified and sourced from American suppliers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {product.materials.map((material, index) => (
                <div
                  key={index}
                  className="bg-white/80 rounded-3xl p-8 border-2 border-gold/10 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-semibold text-navy text-lg">{material.name}</h4>
                    <span className="px-3 py-1 bg-gold/20 text-gold-dark text-xs font-medium rounded-full">
                      {material.certification}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{material.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gold/10 rounded-3xl p-8 border-2 border-gold/20">
              <h4 className="font-semibold text-navy text-center mb-8">Firmness Scale</h4>
              {(() => {
                const scale = ['XFirm', 'Firm', 'Medium', 'Plush', 'XPlush'];
                const activeIdx = scale.findIndex(
                  (s) => s.toLowerCase() === product.selectedFirmness.toLowerCase()
                );
                const markerPct = (activeIdx / (scale.length - 1)) * 100;
                return (
                  <div className="max-w-lg mx-auto">
                    {/* Track */}
                    <div className="relative flex items-center mb-2" style={{ height: '32px' }}>
                      {/* Background track */}
                      <div className="absolute inset-x-0 h-1.5 rounded-full bg-gold/20" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                      {/* Filled portion up to marker */}
                      <div
                        className="absolute h-1.5 rounded-full bg-gold"
                        style={{ left: 0, width: `${markerPct}%`, top: '50%', transform: 'translateY(-50%)' }}
                      />
                      {/* Tick dots */}
                      <div className="relative flex justify-between w-full" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                        {scale.map((level) => (
                          <div
                            key={level}
                            className="w-2 h-2 rounded-full bg-gold/30 border border-gold/40"
                          />
                        ))}
                      </div>
                      {/* Floating marker */}
                      <div
                        className="absolute flex flex-col items-center"
                        style={{ left: `${markerPct}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
                      >
                        <div className="w-4 h-4 rounded-full bg-gold border-2 border-white shadow-md shadow-gold/40" />
                      </div>
                    </div>
                    {/* Labels */}
                    <div className="flex justify-between mt-3">
                      {scale.map((level, i) => {
                        const isActive = i === activeIdx;
                        return (
                          <span
                            key={level}
                            className={`text-xs text-center leading-tight ${
                              isActive ? 'text-gold-dark font-semibold' : 'text-gray-400'
                            }`}
                            style={{ width: '20%' }}
                          >
                            {level}
                          </span>
                        );
                      })}
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-6">
                      This mattress is rated <span className="text-gold-dark font-medium">{product.selectedFirmness}</span>
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-2xl font-serif text-navy mb-4">
                Fast Shipping, <span className="font-semibold">Easy Setup</span>
              </h3>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Your {product.name} ships compressed in a box straight to your door. Just unbox, unroll, and watch it expand to full size in minutes.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: Package,
                  title: 'Handcrafted',
                  desc: 'Your mattress begins production upon order',
                },
                {
                  icon: Truck,
                  title: 'Ships in 5-7 Days',
                  desc: 'Compressed and boxed for easy doorstep delivery',
                },
                {
                  icon: Home,
                  title: 'Unbox & Expand',
                  desc: 'Unroll in your room and it expands to full size within hours',
                },
                {
                  icon: Moon,
                  title: '100 Night Guarantee',
                  desc: 'Sleep on it risk-free for 100 nights',
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="text-center p-8 bg-white/80 rounded-3xl border-2 border-gold/10"
                >
                  <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-gold-dark" />
                  </div>
                  <h4 className="font-semibold text-navy text-lg mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
