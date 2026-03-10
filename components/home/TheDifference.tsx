import { Check, X } from 'lucide-react';

const comparisons = [
  { ours: 'Handcrafted in our USA factory', theirs: 'Mass-produced overseas' },
  { ours: 'Better sourced materials', theirs: 'Mystery materials from unknown sources' },
  { ours: 'Direct-to-consumer pricing', theirs: 'Retail markup adds 300%+' },
  { ours: 'Expert craftspeople with 25+ years', theirs: 'Anonymous assembly lines' },
  { ours: 'Transparent pricing, no hidden fees', theirs: 'Confusing sales and bait-and-switch pricing' },
  { ours: 'Every mattress individually inspected', theirs: 'Mass-produced with minimal quality checks' },
];

export default function TheDifference() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
            The Sleep6 Difference
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We eliminated the middleman and went back to the fundamentals.
            Here&apos;s what that means for your sleep.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Sleep6 */}
          <div className="bg-white border-2 border-gold/30 rounded-3xl p-8 shadow-lg shadow-gold/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-gold-dark font-bold text-xl">6</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy">Sleep6</h3>
                <p className="text-gray-500 text-sm">The better way</p>
              </div>
            </div>
            <ul className="space-y-4">
              {comparisons.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-navy">
                  <div className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-gold-dark" />
                  </div>
                  <span>{item.ours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Traditional */}
          <div className="bg-white/50 border border-gray-200 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-400 font-bold text-xl">?</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-500">Traditional Retailers</h3>
                <p className="text-gray-400 text-sm">The old way</p>
              </div>
            </div>
            <ul className="space-y-4">
              {comparisons.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-500">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-gray-400" />
                  </div>
                  <span>{item.theirs}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Same luxury quality. <span className="font-semibold text-navy">A fraction of the price.</span>
            <br />
            <span className="text-navy font-semibold">No shortcuts. No hype. Just real comfort.</span>
          </p>
          <a
            href="/home-line"
            className="inline-flex items-center gap-2 text-gold-dark hover:text-gold font-semibold transition-colors"
          >
            Learn more about our products
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
