import React, { useState } from 'react';
import { PREDEFINED_TOPICS, ICONS } from '../../constants';
import { QuizConfig } from '../../types';
import { ArrowRight, Sparkles, BookOpenCheck, Search } from 'lucide-react';

interface TopicSelectorProps {
  onStartQuiz: (config: QuizConfig) => void;
  onSearchTopic: (topic: string) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ onStartQuiz, onSearchTopic }) => {
  const [customTopic, setCustomTopic] = useState('');
  const [studyTopic, setStudyTopic] = useState('');
  const [difficulty, setDifficulty] = useState<QuizConfig['difficulty']>('Intermediate');
  const [questionCount, setQuestionCount] = useState<number>(10);

  const handlePresetClick = (topicName: string) => {
    onStartQuiz({
      topic: topicName,
      difficulty,
      questionCount
    });
  };

  const handleCustomQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopic.trim()) {
      onStartQuiz({
        topic: customTopic,
        difficulty,
        questionCount
      });
    }
  };

  const handleStudySearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studyTopic.trim()) {
      onSearchTopic(studyTopic);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          LIST Test Series
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Your trusted partner for Library and Information Science competitive exams (UGC NET, SET, Librarian). 
          Practice with content curated from <strong>listestseries.wordpress.com</strong> and AI.
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

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {PREDEFINED_TOPICS.map((topic) => {
          const IconComponent = ICONS[topic.icon] || BookOpenCheck;
          return (
            <button
              key={topic.id}
              onClick={() => handlePresetClick(topic.name)}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-lib-300 transition-all text-left group flex flex-col h-full"
            >
              <div className="bg-lib-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-lib-100 transition-colors">
                <IconComponent className="text-lib-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-lib-700 transition-colors">
                {topic.name}
              </h3>
              <p className="text-slate-500 text-sm mb-4 flex-grow">
                {topic.description}
              </p>
              <div className="flex items-center text-lib-600 font-medium text-sm mt-auto">
                Start Quiz <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom & Study Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Custom Quiz */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={100} />
          </div>
          <h3 className="text-xl font-bold mb-2 relative z-10">Custom Quiz</h3>
          <p className="text-slate-400 mb-6 text-sm relative z-10">Enter any topic to generate a specialized test.</p>
          <form onSubmit={handleCustomQuizSubmit} className="relative z-10">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="e.g. MARC 21 Tags..." 
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lib-400"
              />
              <button 
                type="submit"
                disabled={!customTopic.trim()}
                className="bg-lib-500 hover:bg-lib-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-semibold transition-colors"
              >
                Go
              </button>
            </div>
          </form>
        </div>

        {/* Study Guide Search */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
           <h3 className="text-xl font-bold mb-2 text-slate-800">Study Guides</h3>
           <p className="text-slate-500 mb-6 text-sm">Generate comprehensive notes from LIST Test Series.</p>
           <form onSubmit={handleStudySearchSubmit}>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Topic to study..." 
                  value={studyTopic}
                  onChange={(e) => setStudyTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-lib-500"
                />
              </div>
              <button 
                type="submit"
                disabled={!studyTopic.trim()}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-semibold transition-colors"
              >
                Study
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopicSelector;