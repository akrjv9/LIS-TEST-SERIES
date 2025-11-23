import React, { useState } from 'react';
import Header from './components/Layout/Header';
import TopicSelector from './components/Home/TopicSelector';
import QuizRunner from './components/Quiz/QuizRunner';
import ResultsView from './components/Quiz/ResultsView';
import StudyView from './components/Study/StudyView';
import Loader from './components/Layout/Loader';
import { AppView, Question, QuizConfig, StudyGuide } from './types';
import { generateQuizQuestions, generateStudyGuide } from './services/geminiService';
import { AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentConfig, setCurrentConfig] = useState<QuizConfig | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [studyGuide, setStudyGuide] = useState<StudyGuide | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const startQuiz = async (config: QuizConfig) => {
    setView(AppView.LOADING);
    setLoadingMessage(`Generating ${config.difficulty} ${config.topic} Questions...`);
    setCurrentConfig(config);
    setError(null);
    try {
      const generatedQuestions = await generateQuizQuestions(config);
      setQuestions(generatedQuestions);
      setView(AppView.QUIZ);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate quiz questions. Please check your connection or try a different topic.");
      setView(AppView.ERROR);
    }
  };

  const handleStudySearch = async (topic: string) => {
    setView(AppView.LOADING);
    setLoadingMessage(`Compiling Study Guide for "${topic}"...`);
    setError(null);
    try {
      const guide = await generateStudyGuide(topic);
      setStudyGuide(guide);
      setView(AppView.STUDY);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate study guide. Please try a different topic or check your internet connection.");
      setView(AppView.ERROR);
    }
  };

  const handleQuizFinish = (answers: number[]) => {
    setUserAnswers(answers);
    setView(AppView.RESULTS);
  };

  const resetApp = () => {
    setView(AppView.HOME);
    setQuestions([]);
    setCurrentConfig(null);
    setUserAnswers([]);
    setStudyGuide(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Header onHomeClick={resetApp} />

      <main className="flex-grow">
        {view === AppView.HOME && (
          <TopicSelector 
            onStartQuiz={startQuiz} 
            onSearchTopic={handleStudySearch}
          />
        )}

        {view === AppView.LOADING && (
          <Loader message={loadingMessage} />
        )}

        {view === AppView.QUIZ && currentConfig && (
          <QuizRunner 
            questions={questions} 
            topic={currentConfig.topic}
            onFinish={handleQuizFinish} 
          />
        )}

        {view === AppView.RESULTS && (
          <ResultsView 
            questions={questions} 
            userAnswers={userAnswers} 
            topic={currentConfig?.topic || 'Library Science'}
            onRetry={resetApp}
            onHome={resetApp}
          />
        )}

        {view === AppView.STUDY && studyGuide && (
          <StudyView 
            guide={studyGuide}
            onBack={resetApp}
          />
        )}

        {view === AppView.ERROR && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="text-red-500" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-slate-600 mb-8 max-w-md">{error}</p>
            <button 
              onClick={resetApp}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
            >
              Return Home
            </button>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 print:hidden">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} LIST Test Series. Built for Library Professionals.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;