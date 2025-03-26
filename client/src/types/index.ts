export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

export interface TestResult {
  id: string;
  userId: string;
  testId: string;
  subject: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number; // in seconds
  completed: boolean;
  timestamp: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  description: string;
  timeLimit: number; // in minutes
  questions: Question[];
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  displayName: string;
  subject: string;
  score: number;
  rank: number;
}

export interface WordOfTheDay {
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  date: string;
}
