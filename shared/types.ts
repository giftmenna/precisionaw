// User-related types
export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserProfile {
  displayName?: string;
  email?: string;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
}

// Test-related types
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
  userAnswers?: Record<string, number>; // questionId -> selected answer index
}

export interface TestSubmission {
  userId: string;
  testId: string;
  answers: Record<string, number>; // questionId -> selected answer index
  timeTaken: number; // in seconds
}

// Home page related types
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

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
