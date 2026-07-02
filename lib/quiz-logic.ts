import type { LucideIcon } from 'lucide-react';
import { Moon, Activity, Bed, RefreshCw, Thermometer, User, Users, Home, Gem, LayoutGrid, Scale } from 'lucide-react';
import { getProductBySlug } from '@/data/products';

export type ArtisanProduct = 'nod' | 'slumber' | 'dream';
export type RecommendedProduct =
  | ArtisanProduct
  | 'studio-10'
  | 'studio-14'
  | 'studio-hybrid'
  | 'studio-hybrid-firm';

export interface ProductWeights {
  nod: number;
  slumber: number;
  dream: number;
}

export interface FirmnessWeight {
  soft: number;
  medium: number;
  firm: number;
}

export interface QuizOption {
  id: string;
  label: string;
  sublabel?: string;
  icon?: LucideIcon;
  weights: ProductWeights;
  firmnessWeight?: FirmnessWeight;
  /** Steers the result toward a product line; only used by the collection question. */
  line?: 'artisan' | 'studio' | 'either';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizAnswers {
  [questionId: string]: string; // questionId -> optionId
}

export interface ProductScores {
  nod: number;
  slumber: number;
  dream: number;
}

export interface FirmnessScores {
  soft: number;
  medium: number;
  firm: number;
}

export interface QuizResult {
  product: RecommendedProduct;
  scores: ProductScores;
  headline: string;
  reason: string;
  recommendedFirmness: 'Soft' | 'Medium' | 'Firm';
  firmnessReason: string;
  bestFor: string[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'sleep-position',
    question: 'What position do you mostly sleep in?',
    options: [
      {
        id: 'side',
        label: 'Side',
        icon: Moon,
        weights: { nod: 1, slumber: 2, dream: 2 },
        firmnessWeight: { soft: 3, medium: 2, firm: 0 },
      },
      {
        id: 'back',
        label: 'Back',
        icon: Activity,
        weights: { nod: 1, slumber: 1, dream: 2 },
        firmnessWeight: { soft: 1, medium: 3, firm: 1 },
      },
      {
        id: 'stomach',
        label: 'Stomach',
        icon: Bed,
        weights: { nod: 2, slumber: 1, dream: 1 },
        firmnessWeight: { soft: 0, medium: 1, firm: 3 },
      },
      {
        id: 'combination',
        label: 'Combination',
        icon: RefreshCw,
        weights: { nod: 1, slumber: 1, dream: 2 },
        firmnessWeight: { soft: 1, medium: 3, firm: 1 },
      },
    ],
  },
  {
    id: 'discomfort',
    question: 'Do you wake up with discomfort?',
    options: [
      {
        id: 'lower-back',
        label: 'Lower back pain',
        weights: { nod: 0, slumber: 3, dream: 2 },
        firmnessWeight: { soft: 0, medium: 2, firm: 2 },
      },
      {
        id: 'shoulder-hip',
        label: 'Shoulder/hip pressure',
        weights: { nod: 0, slumber: 4, dream: 2 },
        firmnessWeight: { soft: 3, medium: 1, firm: 0 },
      },
      {
        id: 'neck',
        label: 'Neck pain',
        weights: { nod: 1, slumber: 2, dream: 1 },
        firmnessWeight: { soft: 1, medium: 2, firm: 1 },
      },
      {
        id: 'none',
        label: 'I sleep comfortably',
        weights: { nod: 2, slumber: 0, dream: 1 },
        firmnessWeight: { soft: 1, medium: 2, firm: 1 },
      },
    ],
  },
  {
    id: 'firmness-pref',
    question: 'How firm do you like your mattress?',
    options: [
      {
        id: 'plush',
        label: 'Plush',
        sublabel: 'Sink-in softness',
        weights: { nod: 0, slumber: 2, dream: 2 },
        firmnessWeight: { soft: 4, medium: 0, firm: 0 },
      },
      {
        id: 'medium',
        label: 'Medium',
        sublabel: 'Balanced feel',
        weights: { nod: 1, slumber: 1, dream: 2 },
        firmnessWeight: { soft: 0, medium: 4, firm: 0 },
      },
      {
        id: 'medium-firm',
        label: 'Medium-Firm',
        sublabel: 'Supportive with cushion',
        weights: { nod: 2, slumber: 1, dream: 1 },
        firmnessWeight: { soft: 0, medium: 2, firm: 2 },
      },
      {
        id: 'firm',
        label: 'Firm',
        sublabel: 'Minimal sink',
        weights: { nod: 3, slumber: 0, dream: 0 },
        firmnessWeight: { soft: 0, medium: 0, firm: 4 },
      },
    ],
  },
  {
    id: 'temperature',
    question: 'Do you tend to sleep hot?',
    options: [
      {
        id: 'overheat',
        label: 'Yes, I overheat',
        icon: Thermometer,
        weights: { nod: 0, slumber: 0, dream: 4 },
      },
      {
        id: 'sometimes',
        label: 'Sometimes',
        weights: { nod: 1, slumber: 1, dream: 2 },
      },
      {
        id: 'no',
        label: 'No',
        weights: { nod: 2, slumber: 2, dream: 0 },
      },
    ],
  },
  {
    id: 'sleepers',
    question: "Who's sleeping on this mattress?",
    options: [
      {
        id: 'just-me',
        label: 'Just me',
        icon: User,
        weights: { nod: 2, slumber: 1, dream: 1 },
      },
      {
        id: 'partner',
        label: 'Me + partner',
        icon: Users,
        weights: { nod: 0, slumber: 3, dream: 2 },
      },
      {
        id: 'family',
        label: 'Family/pets join',
        icon: Home,
        weights: { nod: 0, slumber: 2, dream: 2 },
      },
    ],
  },
  {
    id: 'feel',
    question: 'Which feel sounds best to you?',
    options: [
      {
        id: 'memory-foam',
        label: 'Deep contouring',
        sublabel: 'Memory foam feel',
        weights: { nod: 0, slumber: 4, dream: 1 },
      },
      {
        id: 'hybrid',
        label: 'Balanced support + bounce',
        sublabel: 'Hybrid feel',
        weights: { nod: 1, slumber: 1, dream: 3 },
      },
      {
        id: 'responsive',
        label: 'Responsive + supportive',
        sublabel: 'Traditional foam feel',
        weights: { nod: 3, slumber: 0, dream: 1 },
      },
      {
        id: 'not-sure',
        label: 'Not sure',
        weights: { nod: 1, slumber: 1, dream: 1 },
      },
    ],
  },
  {
    id: 'collection',
    question: 'Which collection speaks to you?',
    options: [
      {
        id: 'artisan',
        label: 'Artisan',
        sublabel: 'Handcrafted with natural latex & wool',
        icon: Gem,
        weights: { nod: 0, slumber: 0, dream: 0 },
        line: 'artisan',
      },
      {
        id: 'studio',
        label: 'Studio',
        sublabel: 'Modern, spec-forward design at a sharper price',
        icon: LayoutGrid,
        weights: { nod: 0, slumber: 0, dream: 0 },
        line: 'studio',
      },
      {
        id: 'either',
        label: 'No preference',
        sublabel: 'Just match my sleep needs',
        icon: Scale,
        weights: { nod: 0, slumber: 0, dream: 0 },
        line: 'either',
      },
    ],
  },
];

export function calculateResult(answers: QuizAnswers): QuizResult {
  const scores: ProductScores = {
    nod: 0,
    slumber: 0,
    dream: 0,
  };

  const firmnessScores: FirmnessScores = {
    soft: 0,
    medium: 0,
    firm: 0,
  };

  // Calculate weighted scores for each product and firmness
  for (const question of quizQuestions) {
    const answerId = answers[question.id];
    if (!answerId) continue;

    const selectedOption = question.options.find((opt) => opt.id === answerId);
    if (!selectedOption) continue;

    // Product scores
    scores.nod += selectedOption.weights.nod;
    scores.slumber += selectedOption.weights.slumber;
    scores.dream += selectedOption.weights.dream;

    // Firmness scores (if present)
    if (selectedOption.firmnessWeight) {
      firmnessScores.soft += selectedOption.firmnessWeight.soft;
      firmnessScores.medium += selectedOption.firmnessWeight.medium;
      firmnessScores.firm += selectedOption.firmnessWeight.firm;
    }
  }

  // Find the product with the highest score
  // Tie-breaker favors budget options: Nod > Slumber > Dream
  let artisanWinner: ArtisanProduct = 'nod';
  let highestScore = scores.nod;

  if (scores.slumber > highestScore) {
    artisanWinner = 'slumber';
    highestScore = scores.slumber;
  }

  if (scores.dream > highestScore) {
    artisanWinner = 'dream';
  }

  // Determine recommended firmness
  let recommendedFirmness: 'Soft' | 'Medium' | 'Firm' = 'Medium';
  if (firmnessScores.soft > firmnessScores.medium && firmnessScores.soft > firmnessScores.firm) {
    recommendedFirmness = 'Soft';
  } else if (firmnessScores.firm > firmnessScores.medium && firmnessScores.firm > firmnessScores.soft) {
    recommendedFirmness = 'Firm';
  }

  // If the sleeper prefers the Studio line, swap in the Studio counterpart
  // of their Artisan match (the Hybrid pair splits on firmness).
  let recommendedProduct: RecommendedProduct = artisanWinner;
  if (answers['collection'] === 'studio') {
    const studioCounterpart: Record<ArtisanProduct, RecommendedProduct> = {
      nod: 'studio-10',
      slumber: 'studio-14',
      dream: recommendedFirmness === 'Firm' ? 'studio-hybrid-firm' : 'studio-hybrid',
    };
    recommendedProduct = studioCounterpart[artisanWinner];
  }

  // Get product data for bestFor
  const product = getProductBySlug(recommendedProduct);
  const bestFor = product?.bestFor || [];

  // Return result with personalized messaging
  return {
    product: recommendedProduct,
    scores,
    recommendedFirmness,
    firmnessReason: getFirmnessReason(recommendedFirmness),
    bestFor,
    ...getResultMessaging(recommendedProduct, scores),
  };
}

function getFirmnessReason(firmness: 'Soft' | 'Medium' | 'Firm'): string {
  const reasons: Record<string, string> = {
    Soft: 'Based on your sleep position and comfort preferences, a softer feel will provide the pressure relief you need.',
    Medium: 'A medium firmness offers the perfect balance of support and comfort for your sleep style.',
    Firm: 'Based on your preferences, a firmer mattress will provide the support you need for quality sleep.',
  };
  return reasons[firmness];
}

function getResultMessaging(
  product: RecommendedProduct,
  scores: ProductScores
): { headline: string; reason: string } {
  const messages: Record<RecommendedProduct, { headline: string; reason: string }> = {
    nod: {
      headline: 'Simple Comfort, Exceptional Value',
      reason:
        scores.nod > 10
          ? "You know what you want — quality sleep without overpaying. The Busby Nod delivers exactly that: essential comfort, solid support, and American craftsmanship at an unbeatable price."
          : "Based on your sleep profile, you don't need the bells and whistles. The Busby Nod gives you everything essential for great sleep — comfort, support, and durability — at our best value.",
    },
    slumber: {
      headline: 'Relief and Recovery While You Sleep',
      reason:
        scores.slumber > 12
          ? "Your body deserves extra care. The Busby Slumber's natural latex and plush foam layers were designed for sleepers like you — contouring to pressure points and helping you wake up refreshed and pain-free."
          : "The Busby Slumber is your match. Its pressure-relieving comfort layers and motion isolation will help you get the restorative sleep your body needs.",
    },
    dream: {
      headline: 'Cool, Comfortable Sleep Awaits',
      reason:
        scores.dream > 12
          ? "Temperature regulation is clearly key to your best sleep. The Busby Dream combines Joma® Wool-infused CoolGel quilting with natural latex to actively dissipate heat — you'll notice the difference from night one."
          : "The Busby Dream is perfect for you. With premium cooling materials and seven precision-engineered layers, it delivers the temperature-regulated, luxurious sleep experience you're looking for.",
    },
    'studio-10': {
      headline: 'Clean Design, Smart Value',
      reason:
        "You want quality sleep without the extras — and you like the Studio approach. The Studio 10's three-layer foam build delivers essential comfort and honest support at our most accessible price.",
    },
    'studio-14': {
      headline: 'Undisturbed Sleep by Design',
      reason:
        "The Studio 14 is your match. Its motion-isolating core and contouring comfort layer absorb pressure and movement, so you get the restorative, undisturbed sleep your body needs — at a Studio price.",
    },
    'studio-hybrid': {
      headline: 'Balanced Hybrid Comfort',
      reason:
        'The Studio Hybrid is built for you. Seven precision-engineered layers pair premium foams with a pocketed-coil core for a balanced medium feel, zero motion transfer, and cool, pressure-relieving sleep.',
    },
    'studio-hybrid-firm': {
      headline: 'Firm Support, Hybrid Performance',
      reason:
        'The Studio Hybrid Firm is built for you. It shares the same seven-layer pocketed-coil build as the Studio Hybrid, topped with a firmer comfort layer for the flatter, more supportive surface your sleep style calls for.',
    },
  };

  return messages[product];
}

export const productDetails: Record<
  RecommendedProduct,
  { name: string; price: number; tagline: string; features: string[] }
> = {
  nod: {
    name: 'Busby Nod',
    price: 1499,
    tagline: 'Dependable comfort, night after night',
    features: ['5-layer hybrid construction', 'CertiPUR-US certified foams', 'Made in Wisconsin, USA'],
  },
  slumber: {
    name: 'Busby Slumber',
    price: 1699,
    tagline: 'Rich, plush comfort that envelops you',
    features: ['100% natural latex layer', 'Deep pressure relief', 'Made in Wisconsin, USA'],
  },
  dream: {
    name: 'Busby Dream',
    price: 1999,
    tagline: 'Engineered for luxury performance.',
    features: ['Joma® Wool CoolGel quilting', 'Tri-Zone encased coil system', 'Made in Wisconsin, USA'],
  },
  'studio-10': {
    name: 'Studio 10',
    price: 898,
    tagline: 'The essentials of comfort and support',
    features: ['3-layer foam construction', 'CertiPUR-US certified foams', 'Made in the USA'],
  },
  'studio-14': {
    name: 'Studio 14',
    price: 1348,
    tagline: 'Balances affordability and comfort',
    features: ['Motion-isolating core', '100% fiber glass free', 'Made in the USA'],
  },
  'studio-hybrid': {
    name: 'Studio Hybrid',
    price: 2448,
    tagline: 'Balanced hybrid comfort, medium feel',
    features: ['7-layer construction', 'Pocketed coil support system', 'Made in the USA'],
  },
  'studio-hybrid-firm': {
    name: 'Studio Hybrid Firm',
    price: 2448,
    tagline: 'Same hybrid build, firmer feel',
    features: ['7-layer construction', 'Firmer comfort top', 'Made in the USA'],
  },
};
