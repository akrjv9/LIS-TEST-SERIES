import React, { useState } from 'react';
import { Question } from '../../types';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

interface QuizRunnerProps {
  questions: Question[];
  topic: string;
  onFinish: (answers: number[]) => void;
}

const QuizRunner: React.FC<QuizRunnerProps> = ({ questions, topic, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedOption !== null ? selectedOption : -1;
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      // Check if next question was already answered (for navigating back/forth support if added later, though this is linear)
      setSelectedOption(newAnswers[currentIndex + 1] !== -1 ? newAnswers[currentIndex + 1] : null);
    } else {
      onFinish(newAnswers);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header info */}
        <div className="mb-8 flex items-center justify-between text-slate-500 text-sm font-medium uppercase tracking-wider">
          <span>{topic}</span>
          <span>Question {currentIndex + 1} of {questions.length}</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-slate-200 rounded-full mb-10 overflow-hidden">
          <div 
            className="h-full bg-lib-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 leading-tight">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
                  selectedOption === idx 
                    ? 'border-lib-500 bg-lib-50 shadow-md ring-1 ring-lib-200' 
                    : 'border-slate-200 hover:border-lib-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors
                    ${selectedOption === idx ? 'border-lib-500 bg-lib-500 text-white' : 'border-slate-300 text-slate-500 group-hover:border-lib-400'}
                  `}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`text-lg ${selectedOption === idx ? 'text-slate-900 font-semibold' : 'text-slate-700'}`}>
                    {option}
                  </span>
                </div>
                {selectedOption === idx && (
                  <CheckCircle2 className="text-lib-500 animate-in zoom-in duration-200" size={24} />
                )}
                {selectedOption !== idx && (
                  <Circle className="text-slate-200 group-hover:text-slate-300" size={24} />
                )}
              </button>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="
                flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 
                text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200
                shadow-lg hover:shadow-xl disabled:shadow-none
              "
            >
              {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizRunner;