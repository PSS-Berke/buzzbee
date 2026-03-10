import Link from 'next/link';
import { Sparkles, Clock, CheckCircle } from 'lucide-react';

export default function SleepQuizCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold/10 blob-shape blur-3xl -translate-y-1/2 -translate-x-1/3" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/2 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-gold/15 rounded-full px-4 py-2 text-sm mb-6 text-gold-dark">
              <Sparkles className="w-4 h-4" />
              <span>Personalized for You</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
              Not Sure Which Mattress Is Right for You?
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Take our 2-minute sleep quiz and get a personalized mattress recommendation
              based on your sleep style, body type, and preferences.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-gold" />
                <span>Only 2 minutes to complete</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <CheckCircle className="w-5 h-5 text-gold" />
                <span>6 simple questions</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Sparkles className="w-5 h-5 text-gold" />
                <span>Instant personalized recommendation</span>
              </li>
            </ul>

            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
            >
              Find Your Perfect Mattress
            </Link>
          </div>

          <div className="relative">
            {/* Quiz preview cards */}
            <div className="space-y-4">
              <div className="bg-white border-2 border-gold/20 rounded-2xl p-6 shadow-lg shadow-gold/5 transform rotate-1">
                <p className="text-sm text-gray-400 mb-2">Question 1 of 6</p>
                <p className="font-semibold text-navy mb-4">What&apos;s your primary sleep position?</p>
                <div className="grid grid-cols-3 gap-3">
                  {['Side', 'Back', 'Stomach'].map((pos) => (
                    <div key={pos} className="bg-gray-50 rounded-xl p-3 text-center text-sm text-gray-500">
                      {pos}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-2 border-gold/20 rounded-2xl p-6 shadow-lg shadow-gold/5 transform -rotate-1 translate-x-4">
                <p className="text-sm text-gray-400 mb-2">Question 3 of 6</p>
                <p className="font-semibold text-navy mb-4">How firm do you like your mattress?</p>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold-light to-gold w-1/2 rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Soft</span>
                  <span>Firm</span>
                </div>
              </div>

              <div className="bg-gold/20 border-2 border-gold/30 rounded-2xl p-6 shadow-lg shadow-gold/5 transform rotate-2 -translate-x-2">
                <p className="text-sm text-gold-dark/70 mb-2">Your Result</p>
                <p className="font-bold text-navy text-lg mb-2">The Sleep6 Doze</p>
                <p className="text-gray-600 text-sm">
                  Based on your answers, this mattress is your perfect match.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
