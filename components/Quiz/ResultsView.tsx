import React from 'react';
import { Question } from '../../types';
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Home, 
  Award,
  BookOpen,
  AlertCircle,
  Download
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ResultsViewProps {
  questions: Question[];
  userAnswers: number[];
  onRetry: () => void;
  onHome: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ questions, userAnswers, onRetry, onHome }) => {
  const correctCount = userAnswers.reduce((acc, ans, idx) => {
    return ans === questions[idx].correctIndex ? acc + 1 : acc;
  }, 0);

  const scorePercentage = Math.round((correctCount / questions.length) * 100);
  
  const data = [
    { name: 'Correct', value: correctCount },
    { name: 'Incorrect', value: questions.length - correctCount },
  ];
  
  const COLORS = ['#0ea5e9', '#e2e8f0'];

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 print:py-0 print:max-w-none print:px-0">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 print:shadow-none print:border-none print:rounded-none">
        
        {/* Header / Score Section */}
        <div className="bg-slate-900 text-white p-8 md:p-12 text-center relative overflow-hidden print:bg-slate-900 print:text-white print:p-6">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 transform rotate-12"><BookOpen size={100} /></div>
             <div className="absolute bottom-10 right-10 transform -rotate-12"><Award size={100} /></div>
          </div>
          
          <h2 className="text-3xl font-bold mb-2 relative z-10">Quiz Completed!</h2>
          <p className="text-slate-400 mb-8 relative z-10 print:text-slate-300">Here is how you performed</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">
            <div className="w-48 h-48 relative print:w-32 print:h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-4xl font-bold block print:text-2xl">{scorePercentage}%</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest">Score</span>
              </div>
            </div>

            <div className="text-left space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={24} />
                <div>
                  <div className="text-2xl font-bold">{correctCount}</div>
                  <div className="text-sm text-slate-400 print:text-slate-300">Correct Answers</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <XCircle className="text-red-500" size={24} />
                <div>
                  <div className="text-2xl font-bold">{questions.length - correctCount}</div>
                  <div className="text-sm text-slate-400 print:text-slate-300">Incorrect Answers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Review Section */}
        <div className="p-8 md:p-12 bg-slate-50 print:bg-white print:p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BookOpen className="text-lib-600" size={24} />
            Detailed Review
          </h3>
          
          <div className="space-y-8">
            {questions.map((q, idx) => {
              const isCorrect = userAnswers[idx] === q.correctIndex;
              return (
                <div key={q.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm print:shadow-none print:border print:border-slate-300 print:break-inside-avoid">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {isCorrect ? (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center print:bg-green-100">
                          <CheckCircle className="text-green-600" size={18} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center print:bg-red-100">
                          <XCircle className="text-red-600" size={18} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-800 mb-3">
                        <span className="text-slate-400 mr-2">{idx + 1}.</span>
                        {q.text}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {q.options.map((opt, optIdx) => {
                          let styleClass = "border-slate-200 text-slate-600";
                          let icon = null;

                          if (optIdx === q.correctIndex) {
                            styleClass = "border-green-500 bg-green-50 text-green-900 font-medium";
                            icon = (
                              <div className="flex items-center gap-1.5 text-green-700">
                                <span className="text-xs font-bold uppercase tracking-wider">Correct!</span>
                                <CheckCircle size={18} className="text-green-600" />
                              </div>
                            );
                          } else if (optIdx === userAnswers[idx] && !isCorrect) {
                            styleClass = "border-red-500 bg-red-50 text-red-900";
                            icon = (
                              <div className="flex items-center gap-1.5 text-red-700">
                                <span className="text-xs font-bold uppercase tracking-wider">Your Answer</span>
                                <XCircle size={18} className="text-red-600" />
                              </div>
                            );
                          }

                          return (
                            <div key={optIdx} className={`px-4 py-3 border rounded-lg text-sm flex items-center justify-between ${styleClass} print:border-width-2`}>
                              <span>{opt}</span>
                              {icon}
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-lib-50 border border-lib-100 rounded-lg p-4 text-sm text-slate-700 print:bg-slate-50 print:border-slate-200">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="text-lib-500 flex-shrink-0 mt-0.5" size={16} />
                          <div>
                            <span className="font-semibold text-lib-700 block mb-1">Explanation:</span>
                            {q.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions Footer - Hidden in Print */}
        <div className="p-6 border-t border-slate-200 bg-white flex flex-col md:flex-row gap-4 justify-center items-center print:hidden">
          <button 
            onClick={onRetry}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-lib-600 text-white font-semibold hover:bg-lib-700 transition-colors w-full md:w-auto justify-center"
          >
            <RefreshCw size={20} />
            Try Another Quiz
          </button>
          
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-lib-500 hover:text-lib-600 hover:bg-lib-50 transition-colors w-full md:w-auto justify-center"
          >
            <Download size={20} />
            Download Results
          </button>

          <button 
            onClick={onHome}
            className="flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-colors w-full md:w-auto justify-center"
          >
            <Home size={20} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;