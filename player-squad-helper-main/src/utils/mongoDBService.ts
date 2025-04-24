
// MongoDB service for user authentication and storage
import { MONGODB_CONFIG } from "./mongoDBConfig";

// Define user types
export interface UserCredentials {
  id: string;
  username: string;
  password: string;
  email?: string;
  phone?: string;
  role: "user" | "admin";
}

// Since we can't connect directly to MongoDB from the frontend in a real production app,
// we're simulating MongoDB operations with localStorage for this demo
// In a real app, these functions would make API calls to a backend server

// Collection names (simulating MongoDB collections)
const COLLECTIONS = {
  USERS: "users",
};

// Helper to get all users from storage
const getAllUsers = (): UserCredentials[] => {
  const usersJson = localStorage.getItem(COLLECTIONS.USERS);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Helper to save all users to storage
const saveAllUsers = (users: UserCredentials[]): void => {
  localStorage.setItem(COLLECTIONS.USERS, JSON.stringify(users));
};

// User authentication methods
export const mongoDBService = {
  // Register a new user
  registerUser: (user: Omit<UserCredentials, "id">): UserCredentials => {
    const users = getAllUsers();
    
    // Check if username already exists
    const existingUser = users.find(u => u.username === user.username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Check if at least email or phone is provided
    if (!user.email && !user.phone) {
      throw new Error("Either email or phone number is required");
    }
    
    // Create new user
    const newUser: UserCredentials = {
      ...user,
      id: Date.now().toString(),
    };
    
    // Add to "database"
    users.push(newUser);
    saveAllUsers(users);
    
    return newUser;
  },
  
  // Verify user credentials without logging in
  verifyCredentials: (username: string, password: string): UserCredentials => {
    const users = getAllUsers();
    
    // Find user by username and password
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      throw new Error("Invalid username or password");
    }
    
    return user;
  },
  
  // Login user - fixed to properly find existing users
  loginUser: (username: string, password: string): UserCredentials => {
    const users = getAllUsers();
    
    // Find user with exact username and password match
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      throw new Error("Invalid username or password");
    }
    
    return user;
  },
  
  // Check if username exists
  usernameExists: (username: string): boolean => {
    const users = getAllUsers();
    return users.some(u => u.username === username);
  },
  
  // Initialize with default admin user if none exists
  initDefaultAdmin: (): void => {
    const users = getAllUsers();
    
    // Check if admin exists
    const adminExists = users.some(u => u.role === "admin");
    
    if (!adminExists) {
      // Create default admin
      const adminUser: UserCredentials = {
        id: "admin-" + Date.now(),
        username: "admin",
        password: "admin123", // In real app, use hashed passwords
        email: "admin@example.com", // Added email to satisfy the requirement
        role: "admin"
      };
      
      users.push(adminUser);
      saveAllUsers(users);
      console.log("Default admin user created:", adminUser.username);
    }
  }
};

// Initialize default admin on module load
mongoDBService.initDefaultAdmin();
