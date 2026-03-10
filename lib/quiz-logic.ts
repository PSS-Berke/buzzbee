import type { LucideIcon } from 'lucide-react';
import { Moon, Activity, Bed, RefreshCw, Thermometer, User, Users, Home } from 'lucide-react';
import { getProductBySlug } from '@/data/products';

export type RecommendedProduct = 'luna' | 'mystic' | 'fak-cosmos';

export interface ProductWeights {
  luna: number;
  mystic: number;
  'fak-cosmos': number;
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
  luna: number;
  mystic: number;
  'fak-cosmos': number;
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
        weights: { luna: 1, mystic: 2, 'fak-cosmos': 2 },
        firmnessWeight: { soft: 3, medium: 2, firm: 0 },
      },
      {
        id: 'back',
        label: 'Back',
        icon: Activity,
        weights: { luna: 1, mystic: 1, 'fak-cosmos': 2 },
        firmnessWeight: { soft: 1, medium: 3, firm: 1 },
      },
      {
        id: 'stomach',
        label: 'Stomach',
        icon: Bed,
        weights: { luna: 2, mystic: 1, 'fak-cosmos': 1 },
        firmnessWeight: { soft: 0, medium: 1, firm: 3 },
      },
      {
        id: 'combination',
        label: 'Combination',
        icon: RefreshCw,
        weights: { luna: 1, mystic: 1, 'fak-cosmos': 2 },
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
        weights: { luna: 0, mystic: 3, 'fak-cosmos': 2 },
        firmnessWeight: { soft: 0, medium: 2, firm: 2 },
      },
      {
        id: 'shoulder-hip',
        label: 'Shoulder/hip pressure',
        weights: { luna: 0, mystic: 4, 'fak-cosmos': 2 },
        firmnessWeight: { soft: 3, medium: 1, firm: 0 },
      },
      {
        id: 'neck',
        label: 'Neck pain',
        weights: { luna: 1, mystic: 2, 'fak-cosmos': 1 },
        firmnessWeight: { soft: 1, medium: 2, firm: 1 },
      },
      {
        id: 'none',
        label: 'I sleep comfortably',
        weights: { luna: 2, mystic: 0, 'fak-cosmos': 1 },
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
        weights: { luna: 0, mystic: 2, 'fak-cosmos': 2 },
        firmnessWeight: { soft: 4, medium: 0, firm: 0 },
      },
      {
        id: 'medium',
        label: 'Medium',
        sublabel: 'Balanced feel',
        weights: { luna: 1, mystic: 1, 'fak-cosmos': 2 },
        firmnessWeight: { soft: 0, medium: 4, firm: 0 },
      },
      {
        id: 'medium-firm',
        label: 'Medium-Firm',
        sublabel: 'Supportive with cushion',
        weights: { luna: 2, mystic: 1, 'fak-cosmos': 1 },
        firmnessWeight: { soft: 0, medium: 2, firm: 2 },
      },
      {
        id: 'firm',
        label: 'Firm',
        sublabel: 'Minimal sink',
        weights: { luna: 3, mystic: 0, 'fak-cosmos': 0 },
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
        weights: { luna: 0, mystic: 0, 'fak-cosmos': 4 },
      },
      {
        id: 'sometimes',
        label: 'Sometimes',
        weights: { luna: 1, mystic: 1, 'fak-cosmos': 2 },
      },
      {
        id: 'no',
        label: 'No',
        weights: { luna: 2, mystic: 2, 'fak-cosmos': 0 },
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
        weights: { luna: 2, mystic: 1, 'fak-cosmos': 1 },
      },
      {
        id: 'partner',
        label: 'Me + partner',
        icon: Users,
        weights: { luna: 0, mystic: 3, 'fak-cosmos': 2 },
      },
      {
        id: 'family',
        label: 'Family/pets join',
        icon: Home,
        weights: { luna: 0, mystic: 2, 'fak-cosmos': 2 },
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
        weights: { luna: 0, mystic: 4, 'fak-cosmos': 1 },
      },
      {
        id: 'hybrid',
        label: 'Balanced support + bounce',
        sublabel: 'Hybrid feel',
        weights: { luna: 1, mystic: 1, 'fak-cosmos': 3 },
      },
      {
        id: 'responsive',
        label: 'Responsive + supportive',
        sublabel: 'Traditional foam feel',
        weights: { luna: 3, mystic: 0, 'fak-cosmos': 1 },
      },
      {
        id: 'not-sure',
        label: 'Not sure',
        weights: { luna: 1, mystic: 1, 'fak-cosmos': 1 },
      },
    ],
  },
];

export function calculateResult(answers: QuizAnswers): QuizResult {
  const scores: ProductScores = {
    luna: 0,
    mystic: 0,
    'fak-cosmos': 0,
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
    scores.luna += selectedOption.weights.luna;
    scores.mystic += selectedOption.weights.mystic;
    scores['fak-cosmos'] += selectedOption.weights['fak-cosmos'];

    // Firmness scores (if present)
    if (selectedOption.firmnessWeight) {
      firmnessScores.soft += selectedOption.firmnessWeight.soft;
      firmnessScores.medium += selectedOption.firmnessWeight.medium;
      firmnessScores.firm += selectedOption.firmnessWeight.firm;
    }
  }

  // Find the product with the highest score
  // Tie-breaker favors budget options: Luna > Mystic > FAK Cosmos
  let recommendedProduct: RecommendedProduct = 'luna';
  let highestScore = scores.luna;

  if (scores.mystic > highestScore) {
    recommendedProduct = 'mystic';
    highestScore = scores.mystic;
  }

  if (scores['fak-cosmos'] > highestScore) {
    recommendedProduct = 'fak-cosmos';
  }

  // Determine recommended firmness
  let recommendedFirmness: 'Soft' | 'Medium' | 'Firm' = 'Medium';
  if (firmnessScores.soft > firmnessScores.medium && firmnessScores.soft > firmnessScores.firm) {
    recommendedFirmness = 'Soft';
  } else if (firmnessScores.firm > firmnessScores.medium && firmnessScores.firm > firmnessScores.soft) {
    recommendedFirmness = 'Firm';
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
    luna: {
      headline: 'Simple Comfort, Exceptional Value',
      reason:
        scores.luna > 10
          ? "You know what you want—quality sleep without overpaying. The Luna delivers exactly that: essential comfort, solid support, and American craftsmanship at an unbeatable price."
          : "Based on your sleep profile, you don't need the bells and whistles. The Luna gives you everything essential for great sleep—comfort, support, and durability—at our best value.",
    },
    mystic: {
      headline: 'Relief and Recovery While You Sleep',
      reason:
        scores.mystic > 12
          ? "Your body deserves extra care. The Mystic's advanced motion-isolating memory foam was designed for sleepers like you—contouring to pressure points and helping you wake up refreshed and pain-free."
          : "The Mystic is your match. Its pressure-relieving memory foam and motion isolation technology will help you get the restorative sleep your body needs.",
    },
    'fak-cosmos': {
      headline: 'Cool, Comfortable Sleep Awaits',
      reason:
        scores['fak-cosmos'] > 12
          ? "Temperature regulation is clearly key to your best sleep. The FAK Cosmos combines gel-infused foam with natural latex to actively dissipate heat—you'll notice the difference from night one."
          : "The FAK Cosmos is perfect for you. With gel cooling technology and premium materials, it delivers the temperature-regulated, luxurious sleep experience you're looking for.",
    },
  };

  return messages[product];
}

export const productDetails: Record<
  RecommendedProduct,
  { name: string; price: number; tagline: string; features: string[] }
> = {
  luna: {
    name: 'Luna',
    price: 648,
    tagline: 'The essentials of comfort and support',
    features: ['3-layer construction', 'CertiPUR-US certified', 'Made in the USA'],
  },
  mystic: {
    name: 'Mystic',
    price: 848,
    tagline: 'Balances affordability and comfort',
    features: ['Motion-isolating core', 'Pressure relief', 'Made in the USA'],
  },
  'fak-cosmos': {
    name: 'FAK Cosmos',
    price: 1348,
    tagline: 'Maximum comfort with premium materials',
    features: ['Gel-infused cooling', 'Natural latex layer', 'Temperature regulation'],
  },
};
