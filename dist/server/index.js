// server/index.ts
import express from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  currentId;
  // Add storage for tests, testResults, and wordOfTheDay
  tests = [];
  // Initialize with your test data
  testResults = [];
  wordOfTheDay = {
    word: "Example",
    definition: "A sample or instance",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  };
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.tests = [
      {
        id: "test-1",
        subject: "Mathematics",
        questions: [
          { id: "q1", question: "2 + 2", correctAnswer: "4", options: ["2", "3", "4", "5"] },
          { id: "q2", question: "5 - 3", correctAnswer: "2", options: ["1", "2", "3", "4"] },
          { id: "q3", question: "4 \xD7 2", correctAnswer: "8", options: ["6", "8", "10", "12"] },
          { id: "q4", question: "10 \xF7 2", correctAnswer: "5", options: ["2", "5", "10", "15"] },
          { id: "q5", question: "3 + 5", correctAnswer: "8", options: ["6", "7", "8", "9"] }
        ]
      },
      {
        id: "test-2",
        subject: "English",
        questions: [
          { id: "q1", question: "What is the synonym of 'happy'?", correctAnswer: "joyful", options: ["sad", "joyful", "angry", "tired"] },
          { id: "q2", question: "Which word is a noun?", correctAnswer: "dog", options: ["run", "dog", "fast", "blue"] },
          { id: "q3", question: "What is the past tense of 'go'?", correctAnswer: "went", options: ["go", "going", "went", "gone"] },
          { id: "q4", question: "Choose the correct spelling:", correctAnswer: "receive", options: ["recieve", "receive", "receeve", "reseeve"] },
          { id: "q5", question: "What is the opposite of 'big'?", correctAnswer: "small", options: ["large", "small", "tall", "huge"] }
        ]
      }
    ];
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
};
var storage = new MemStorage();
var tests = storage.tests;
var testResults = storage.testResults;
var wordOfTheDay = storage.wordOfTheDay;

// server/controllers/test-controller.ts
import { v4 as uuidv4 } from "uuid";
var TestController = class {
  getTests = (req, res) => {
    res.json(tests);
  };
  getTestById = (req, res) => {
    const { id } = req.params;
    const test = tests.find((test2) => test2.id === id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.json(test);
  };
  submitTest = (req, res) => {
    const { userId, testId, answers, timeTaken } = req.body;
    if (!userId || !testId || !answers || timeTaken === void 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const test = tests.find((test2) => test2.id === testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    let correctAnswers = 0;
    for (const question of test.questions) {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    }
    const score = Math.round(correctAnswers / test.questions.length * 100);
    const testResult = {
      id: uuidv4(),
      userId,
      testId,
      subject: test.subject,
      score,
      totalQuestions: test.questions.length,
      correctAnswers,
      timeTaken,
      completed: true,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    testResults.push(testResult);
    res.json(testResult);
  };
  getTestResult = (req, res) => {
    const { id } = req.params;
    const result = testResults.find((result2) => result2.id === id);
    if (!result) {
      return res.status(404).json({ message: "Test result not found" });
    }
    const test = tests.find((test2) => test2.id === result.testId);
    if (!test) {
      return res.status(500).json({ message: "Test not found for this result" });
    }
    res.json({
      ...result,
      questions: test.questions
    });
  };
  getTestResultsByUser = (req, res) => {
    const { userId } = req.params;
    const results = testResults.filter((result) => result.userId === userId);
    res.json(results);
  };
  getLeaderboard = (req, res) => {
    const leaderboardEntries = [];
    const subjectResults = {};
    for (const result of testResults) {
      if (!subjectResults[result.subject]) {
        subjectResults[result.subject] = [];
      }
      subjectResults[result.subject].push(result);
    }
    for (const subject in subjectResults) {
      const sortedResults = subjectResults[subject].sort((a, b) => b.score - a.score).slice(0, 5);
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
      const placeholderEntries = [
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
  getWordOfTheDay = (req, res) => {
    res.json(wordOfTheDay);
  };
};
var test_controller_default = new TestController();

// server/controllers/user-controller.ts
var UserController = class {
  storage;
  constructor(storage2) {
    this.storage = storage2;
  }
  /**
   * Get user by ID
   */
  getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    try {
      const user = await this.storage.getUser(Number(id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  };
  /**
   * Update user profile
   */
  updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }
    try {
      const user = await this.storage.getUser(Number(id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json({
        ...userWithoutPassword,
        // Simulate updated fields
        ...updateData
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  };
  /**
   * Change user password
   */
  changePassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }
    try {
      const user = await this.storage.getUser(Number(id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  };
};

// server/routes.ts
async function registerRoutes(app2) {
  const testController = new TestController();
  const userController = new UserController(storage);
  app2.get("/api/tests", testController.getTests);
  app2.get("/api/tests/:id", testController.getTestById);
  app2.post("/api/submit-test", testController.submitTest);
  app2.get("/api/results/:id", testController.getTestResult);
  app2.get("/api/users/:id", userController.getUserById);
  app2.patch("/api/users/:id", userController.updateUser);
  app2.post("/api/users/:id/change-password", userController.changePassword);
  app2.get("/api/users/:userId/results", testController.getTestResultsByUser);
  app2.get("/api/leaderboard", testController.getLeaderboard);
  app2.get("/api/word-of-the-day", testController.getWordOfTheDay);
  const httpServer = createServer(app2);
  return httpServer;
}

// server/index.ts
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      console.log(logLine);
    }
  });
  next();
});
registerRoutes(app);
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});
var index_default = app;
export {
  index_default as default
};
