import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { TestController } from "./controllers/test-controller";
import { UserController } from "./controllers/user-controller";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize controllers
  const testController = new TestController();
  const userController = new UserController(storage);

  // API routes
  // Test routes
  app.get("/api/tests", testController.getTests);
  app.get("/api/tests/:id", testController.getTestById);
  app.post("/api/submit-test", testController.submitTest);
  app.get("/api/results/:id", testController.getTestResult);
  
  // User routes
  app.get("/api/users/:id", userController.getUserById);
  app.patch("/api/users/:id", userController.updateUser);
  app.post("/api/users/:id/change-password", userController.changePassword);
  app.get("/api/users/:userId/results", testController.getTestResultsByUser);
  
  // Home page data routes
  app.get("/api/leaderboard", testController.getLeaderboard);
  app.get("/api/word-of-the-day", testController.getWordOfTheDay);

  const httpServer = createServer(app);

  return httpServer;
}
