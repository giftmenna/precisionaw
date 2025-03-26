import { users, type User, type InsertUser } from "@shared/schema";
import { Test, TestResult } from "../../shared/types"; // Adjust path as needed

// Define types for word of the day if not already defined
interface WordOfTheDay {
  word: string;
  definition: string;
  date: string;
}

// Define the interface with CRUD methods
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private currentId: number;

  // Add storage for tests, testResults, and wordOfTheDay
  public tests: Test[] = []; // Initialize with your test data
  public testResults: TestResult[] = [];
  public wordOfTheDay: WordOfTheDay = {
    word: "Example",
    definition: "A sample or instance",
    date: new Date().toISOString().split("T")[0],
  };

  constructor() {
    this.users = new Map();
    this.currentId = 1;

    // Initialize with sample data for Mathematics and English tests
    this.tests = [
      {
        id: "test-1",
        subject: "Mathematics",
        questions: [
          { id: "q1", question: "2 + 2", correctAnswer: "4", options: ["2", "3", "4", "5"] },
          { id: "q2", question: "5 - 3", correctAnswer: "2", options: ["1", "2", "3", "4"] },
          { id: "q3", question: "4 × 2", correctAnswer: "8", options: ["6", "8", "10", "12"] },
          { id: "q4", question: "10 ÷ 2", correctAnswer: "5", options: ["2", "5", "10", "15"] },
          { id: "q5", question: "3 + 5", correctAnswer: "8", options: ["6", "7", "8", "9"] },
        ],
      },
      {
        id: "test-2",
        subject: "English",
        questions: [
          { id: "q1", question: "What is the synonym of 'happy'?", correctAnswer: "joyful", options: ["sad", "joyful", "angry", "tired"] },
          { id: "q2", question: "Which word is a noun?", correctAnswer: "dog", options: ["run", "dog", "fast", "blue"] },
          { id: "q3", question: "What is the past tense of 'go'?", correctAnswer: "went", options: ["go", "going", "went", "gone"] },
          { id: "q4", question: "Choose the correct spelling:", correctAnswer: "receive", options: ["recieve", "receive", "receeve", "reseeve"] },
          { id: "q5", question: "What is the opposite of 'big'?", correctAnswer: "small", options: ["large", "small", "tall", "huge"] },
        ],
      },
    ];
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

// Export instance and variables
export const storage = new MemStorage();
export const tests = storage.tests;
export const testResults = storage.testResults;
export const wordOfTheDay = storage.wordOfTheDay;