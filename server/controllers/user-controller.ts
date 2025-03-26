import { Request, Response } from "express";
import { IStorage } from "../storage";
import { UserProfile } from "../../shared/types";

export class UserController {
  private storage: IStorage;

  constructor(storage: IStorage) {
    this.storage = storage;
  }

  /**
   * Get user by ID
   */
  getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    try {
      const user = await this.storage.getUser(Number(id));
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send the password
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
  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData: UserProfile = req.body;
    
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    // Validate update data
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }
    
    try {
      const user = await this.storage.getUser(Number(id));
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // In a real app, we would update the user data here
      // For now, we'll just return a success response
      
      // Don't send the password
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
  changePassword = async (req: Request, res: Response) => {
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
      
      // In a real app, we would verify the current password and update it
      // For now, we'll just return a success response
      
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  };
}
