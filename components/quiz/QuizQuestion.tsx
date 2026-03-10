'use client';

import { QuizQuestion as QuizQuestionType, QuizOption } from '@/lib/quiz-logic';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedOption: string | undefined;
  onSelect: (optionId: string) => void;
}

function IconGrid({
  options,
  selectedOption,
  onSelect,
}: {
  options: QuizOption[];
  selectedOption: string | undefined;
  onSelect: (optionId: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {options.map((option) => {
        const isSelected = selectedOption === option.id;
        const Icon = option.icon;

        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 ${
              isSelected
                ? 'border-gold bg-gold/5 shadow-md'
                : 'border-gray-200 hover:border-gold/50 hover:bg-gray-50'
            }`}
          >
            {Icon && (
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSelected ? 'bg-gold/20' : 'bg-gray-100'
                }`}
              >
                <Icon
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isSelected ? 'text-gold-dark' : 'text-gray-400'
                  }`}
                  strokeWidth={1.5}
                />
              </div>
            )}
            <span
              className={`text-lg font-medium ${
                isSelected ? 'text-navy' : 'text-gray-700'
              }`}
            >
              {option.label}
            </span>
            {option.sublabel && (
              <span className="text-sm text-gray-500">{option.sublabel}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function OptionList({
  options,
  selectedOption,
  onSelect,
}: {
  options: QuizOption[];
  selectedOption: string | undefined;
  onSelect: (optionId: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selectedOption === option.id;

        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full p-4 md:p-5 rounded-xl border-2 text-left transition-all duration-300 ${
              isSelected
                ? 'border-gold bg-gold/5 shadow-md'
                : 'border-gray-200 hover:border-gold/50 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isSelected ? 'border-gold bg-gold' : 'border-gray-300'
                }`}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div className="flex-1">
                <span
                  className={`text-lg ${
                    isSelected ? 'text-navy font-medium' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </span>
                {option.sublabel && (
                  <span className="block text-sm text-gray-500 mt-1">
                    {option.sublabel}
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function QuizQuestion({
  question,
  selectedOption,
  onSelect,
}: QuizQuestionProps) {
  // Check if all options have icons - use icon grid layout
  const allHaveIcons = question.options.every((opt) => opt.icon);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-navy text-center">
        {question.question}
      </h2>

      {allHaveIcons ? (
        <IconGrid
          options={question.options}
          selectedOption={selectedOption}
          onSelect={onSelect}
        />
      ) : (
        <OptionList
          options={question.options}
          selectedOption={selectedOption}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}
