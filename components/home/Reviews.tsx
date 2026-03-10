'use client';

import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  {
    id: 1,
    content: 'Sleep6, the new Chicago-based better sleep company selling high-end mattresses without the hassle and highway-robbery pricing…',
  },
  {
    id: 2,
    content: 'Sleep6\'s focus on quality will make it stand out in the field…',
  },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 relative">
      {/* Soft border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {quotes.map((quote) => (
              <div key={quote.id} className="w-full flex-shrink-0 text-center px-4">
                <Quote className="w-10 h-10 text-gold mx-auto mb-6" />
                <p className="text-xl md:text-2xl text-navy font-serif italic leading-relaxed">
                  &ldquo;{quote.content}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-gold' : 'bg-gray-300'
              }`}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
