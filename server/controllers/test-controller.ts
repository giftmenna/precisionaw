import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Test, TestResult, LeaderboardEntry } from "../../shared/types";
import { tests, testResults, wordOfTheDay } from "../storage";

export class TestController {
  getTests = (req: Request, res: Response) => {
    res.json(tests);
  };

  getTestById = (req: Request, res: Response) => {
    const { id } = req.params;
    const test = tests.find(test => test.id === id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.json(test);
  };

  submitTest = (req: Request, res: Response) => {
    const { userId, testId, answers, timeTaken } = req.body;
    if (!userId || !testId || !answers || timeTaken === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const test = tests.find(test => test.id === testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    let correctAnswers = 0;
    for (const question of test.questions) {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    }

    const score = Math.round((correctAnswers / test.questions.length) * 100);
    const testResult: TestResult = {
      id: uuidv4(),
      userId,
      testId,
      subject: test.subject,
      score,
      totalQuestions: test.questions.length,
      correctAnswers,
      timeTaken,
      completed: true,
      timestamp: new Date().toISOString()
    };

    testResults.push(testResult);
    res.json(testResult);
  };

  getTestResult = (req: Request, res: Response) => {
    const { id } = req.params;
    const result = testResults.find(result => result.id === id);
    if (!result) {
      return res.status(404).json({ message: "Test result not found" });
    }

    const test = tests.find(test => test.id === result.testId);
    if (!test) {
      return res.status(500).json({ message: "Test not found for this result" });
    }

    res.json({
      ...result,
      questions: test.questions
    });
  };

  getTestResultsByUser = (req: Request, res: Response) => {
    const { userId } = req.params;
    const results = testResults.filter(result => result.userId === userId);
    res.json(results);
  };

  getLeaderboard = (req: Request, res: Response) => {
    const leaderboardEntries: LeaderboardEntry[] = [];
    const subjectResults: Record<string, TestResult[]> = {};

    for (const result of testResults) {
      if (!subjectResults[result.subject]) {
        subjectResults[result.subject] = [];
      }
      subjectResults[result.subject].push(result);
    }

    for (const subject in subjectResults) {
      const sortedResults = subjectResults[subject]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      sortedResults.forEach((result, index) => {
        leaderboardEntries.push({
          id: uuidv4(),
          userId: result.userId,
          displayName: `Student ${String.fromCharCode(65 + index)}`,
          subject: result.subject,
          score: result.score,
          rank: index + 1
        });
      });
    }

    if (leaderboardEntries.length < 5) {
      const placeholderEntries: LeaderboardEntry[] = [
        { id: "lb-1", userId: "user-1", displayName: "Student A", subject: "Mathematics", score: 98, rank: 1 },
        { id: "lb-2", userId: "user-2", displayName: "Student B", subject: "English", score: 95, rank: 2 },
        { id: "lb-3", userId: "user-3", displayName: "Student C", subject: "Mathematics", score: 92, rank: 3 },
        { id: "lb-4", userId: "user-4", displayName: "Student D", subject: "English", score: 90, rank: 4 },
        { id: "lb-5", userId: "user-5", displayName: "Student E", subject: "Mathematics", score: 89, rank: 5 }
      ];

      const placeholdersToAdd = 5 - leaderboardEntries.length;
      leaderboardEntries.push(...placeholderEntries.slice(0, placeholdersToAdd));
    }

    res.json(leaderboardEntries);
  };

  getWordOfTheDay = (req: Request, res: Response) => {
    res.json(wordOfTheDay);
  };
}

export default new TestController();