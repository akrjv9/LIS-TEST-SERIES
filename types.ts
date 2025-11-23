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
  ERROR = 'ERROR'
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}