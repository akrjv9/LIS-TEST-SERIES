export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizConfig {
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionCount: number;
  sourceText?: string; // Optional source text to generate questions from
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: number[]; // -1 for unanswered, 0-3 for selected index
  isFinished: boolean;
  score: number;
}

export enum AppView {
  HOME = 'HOME',
  LOADING = 'LOADING',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR',
  STUDY = 'STUDY'
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface StudyGuide {
  topic: string;
  content: string;
  sources: { uri: string; title: string }[];
}