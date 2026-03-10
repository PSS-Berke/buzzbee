import Link from 'next/link';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import { QuizResult as QuizResultType, productDetails } from '@/lib/quiz-logic';

interface QuizResultProps {
  result: QuizResultType;
  onRetake: () => void;
}

export default function QuizResult({ result, onRetake }: QuizResultProps) {
  const product = productDetails[result.product];

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <span className="inline-block text-gold font-medium tracking-[0.15em] uppercase text-sm">
          Your Perfect Match
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold text-navy">{result.headline}</h2>
        <p className="text-gray-600 max-w-xl mx-auto">{result.reason}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-lg mx-auto shadow-lg">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">We recommend</p>
            <h3 className="text-2xl font-bold text-navy">{product.name}</h3>
            <p className="text-gray-600">{product.tagline}</p>
          </div>

          {/* Firmness Recommendation */}
          <div className="bg-gold/10 rounded-xl p-4">
            <p className="text-sm text-gold-dark font-medium mb-1">Recommended Firmness</p>
            <p className="text-xl font-semibold text-navy">{result.recommendedFirmness}</p>
            <p className="text-sm text-gray-600 mt-1">{result.firmnessReason}</p>
          </div>

          {/* Best For Highlights */}
          {result.bestFor && result.bestFor.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-3">Best for</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {result.bestFor.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gold/10 text-gold-dark text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-3xl font-light text-navy">
            From ${product.price.toLocaleString()}
            <span className="text-sm text-gray-500 ml-2">Queen</span>
          </div>

          <div className="space-y-2">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-left">
                <Check className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <Link
              href={`/products/${result.product}?firmness=${result.recommendedFirmness}`}
              className="inline-flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/products/${result.product}`}
              className="inline-flex items-center justify-center gap-2 w-full border-2 border-navy text-navy font-semibold px-8 py-3 rounded-full hover:bg-navy hover:text-white transition-all"
            >
              See Pricing & Details
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={onRetake}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-navy transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Retake Quiz</span>
      </button>
    </div>
  );
}
