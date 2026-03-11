import type { LucideIcon } from 'lucide-react';
import { Moon, Activity, Bed, RefreshCw, Thermometer, User, Users, Home } from 'lucide-react';
import { getProductBySlug } from '@/data/products';

export type RecommendedProduct = 'nod' | 'slumber' | 'dream';

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
  let recommendedProduct: RecommendedProduct = 'nod';
  let highestScore = scores.nod;

  if (scores.slumber > highestScore) {
    recommendedProduct = 'slumber';
    highestScore = scores.slumber;
  }

  if (scores.dream > highestScore) {
    recommendedProduct = 'dream';
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
    nod: {
      headline: 'Simple Comfort, Exceptional Value',
      reason:
        scores.nod > 10
          ? "You know what you want — quality sleep without overpaying. The Buzzbee Nod delivers exactly that: essential comfort, solid support, and American craftsmanship at an unbeatable price."
          : "Based on your sleep profile, you don't need the bells and whistles. The Buzzbee Nod gives you everything essential for great sleep — comfort, support, and durability — at our best value.",
    },
    slumber: {
      headline: 'Relief and Recovery While You Sleep',
      reason:
        scores.slumber > 12
          ? "Your body deserves extra care. The Buzzbee Slumber's natural latex and plush foam layers were designed for sleepers like you — contouring to pressure points and helping you wake up refreshed and pain-free."
          : "The Buzzbee Slumber is your match. Its pressure-relieving comfort layers and motion isolation will help you get the restorative sleep your body needs.",
    },
    dream: {
      headline: 'Cool, Comfortable Sleep Awaits',
      reason:
        scores.dream > 12
          ? "Temperature regulation is clearly key to your best sleep. The Buzzbee Dream combines Joma® Wool-infused CoolGel quilting with natural latex to actively dissipate heat — you'll notice the difference from night one."
          : "The Buzzbee Dream is perfect for you. With premium cooling materials and seven precision-engineered layers, it delivers the temperature-regulated, luxurious sleep experience you're looking for.",
    },
  };

  return messages[product];
}

export const productDetails: Record<
  RecommendedProduct,
  { name: string; price: number; tagline: string; features: string[] }
> = {
  nod: {
    name: 'Buzzbee Nod',
    price: 549,
    tagline: 'Dependable comfort, night after night',
    features: ['5-layer hybrid construction', 'CertiPUR-US certified foams', 'Made in Wisconsin, USA'],
  },
  slumber: {
    name: 'Buzzbee Slumber',
    price: 999,
    tagline: 'Rich, plush comfort that envelops you',
    features: ['100% natural latex layer', 'Deep pressure relief', 'Made in Wisconsin, USA'],
  },
  dream: {
    name: 'Buzzbee Dream',
    price: 1299,
    tagline: 'Engineered for luxury performance.',
    features: ['Joma® Wool CoolGel quilting', 'Tri-Zone encased coil system', 'Made in Wisconsin, USA'],
  },
};
