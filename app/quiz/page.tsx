'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import QuizProgress from '@/components/quiz/QuizProgress';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizResult from '@/components/quiz/QuizResult';
import { quizQuestions, calculateResult, QuizAnswers, QuizResult as QuizResultType } from '@/lib/quiz-logic';

type QuizState = 'intro' | 'questions' | 'result';

export default function QuizPage() {
  const [state, setState] = useState<QuizState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<QuizResultType | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const canProceed = answers[currentQuestion?.id] !== undefined;

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const quizResult = calculateResult(answers);
      setResult(quizResult);
      setState('result');
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setState('intro');
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
    setState('intro');
  };

  const handleStart = () => {
    setState('questions');
  };

  return (
    <div data-page="quiz" className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        {state === 'intro' && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-gold font-medium tracking-[0.15em] uppercase text-sm">
                Sleep Quiz
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-navy">
                Find Your Perfect Mattress
              </h1>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Answer 6 quick questions and we&apos;ll match you with the ideal mattress for your sleep style.
              </p>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-medium">
                  6
                </span>
                <span>Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-medium">
                  1
                </span>
                <span>Minute</span>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-10 py-4 rounded-full transition-all hover:scale-105"
            >
              Start Quiz
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {state === 'questions' && currentQuestion && (
          <div className="space-y-10">
            <QuizProgress
              currentStep={currentQuestionIndex + 1}
              totalSteps={quizQuestions.length}
            />

            <QuizQuestion
              question={currentQuestion}
              selectedOption={answers[currentQuestion.id]}
              onSelect={handleSelect}
            />

            <div className="flex items-center justify-between pt-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-navy transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${
                  canProceed
                    ? 'bg-gold hover:bg-gold-dark text-white hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>{isLastQuestion ? 'See Results' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {state === 'result' && result && (
          <QuizResult result={result} onRetake={handleRetake} />
        )}
      </div>
    </div>
  );
}
