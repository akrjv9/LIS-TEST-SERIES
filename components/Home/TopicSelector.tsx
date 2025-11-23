import React, { useState } from 'react';
import { PREDEFINED_TOPICS, ICONS } from '../../constants';
import { QuizConfig } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface TopicSelectorProps {
  onStartQuiz: (config: QuizConfig) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ onStartQuiz }) => {
  const [customTopic, setCustomTopic] = useState('');
  const [difficulty, setDifficulty] = useState<QuizConfig['difficulty']>('Intermediate');
  const [questionCount, setQuestionCount] = useState<number>(10);

  const handlePresetClick = (topicName: string) => {
    onStartQuiz({
      topic: topicName,
      difficulty,
      questionCount
    });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopic.trim()) {
      onStartQuiz({
        topic: customTopic,
        difficulty,
        questionCount
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Master Library Science
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Prepare for UGC NET, SET, and Librarian exams with AI-generated mock tests tailored to your specific needs.
        </p>
      </div>

      {/* Settings Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-12 flex flex-col md:flex-row gap-6 items-center justify-center">
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-slate-700">Difficulty:</label>
          <select 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lib-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-slate-700">Questions:</label>
          <select 
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lib-500"
          >
            <option value="5">5 Questions</option>
            <option value="10">10 Questions</option>
            <option value="15">15 Questions</option>
            <option value="20">20 Questions</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {PREDEFINED_TOPICS.map((topic) => {
          const Icon = ICONS[topic.icon];
          return (
            <button
              key={topic.id}
              onClick={() => handlePresetClick(topic.name)}
              className="group text-left bg-white hover:bg-lib-50 p-6 rounded-2xl border border-slate-200 hover:border-lib-300 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-lib-100 text-lib-700 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <Icon size={24} />
                </div>
                <ArrowRight className="text-slate-300 group-hover:text-lib-500 opacity-0 group-hover:opacity-100 transition-all" size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-lib-800">
                {topic.name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {topic.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Custom Topic Generator */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Sparkles size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="text-yellow-400" size={24} />
              Generate Custom Quiz
            </h3>
            <p className="text-slate-300">
              Can't find your topic? Type anything from "Ranganathan's Laws" to "Web 3.0 in Libraries".
            </p>
          </div>
          <form onSubmit={handleCustomSubmit} className="flex-1 w-full md:max-w-md flex gap-2">
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g., Copyright Laws in India..."
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lib-400 focus:bg-white/20 transition-all"
            />
            <button 
              type="submit"
              disabled={!customTopic.trim()}
              className="bg-lib-500 hover:bg-lib-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-lib-900/20"
            >
              Start
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopicSelector;