
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { mongoDBService, UserCredentials } from "../utils/mongoDBService";

type UserRole = "admin" | "user";

interface User {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  loginWithCredentials: (username: string, password: string) => Promise<User>;
  register: (username: string, password: string, role: UserRole, email?: string, phone?: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  
  const login = (loggedInUser: User) => {
    setUser(loggedInUser);
  };
  
  const loginWithCredentials = async (username: string, password: string): Promise<User> => {
    try {
      // Attempt to login using MongoDB service
      const userFromDB = mongoDBService.loginUser(username, password);
      
      // Convert to User type (omitting password)
      const loggedInUser: User = {
        id: userFromDB.id,
        username: userFromDB.username,
        email: userFromDB.email,
        phone: userFromDB.phone,
        role: userFromDB.role
      };
      
      // Set as current user
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      throw error;
    }
  };
  
  const register = async (
    username: string, 
    password: string, 
    role: UserRole = "user",
    email?: string,
    phone?: string
  ): Promise<User> => {
    try {
      // Register user in MongoDB
      const newUser = mongoDBService.registerUser({
        username,
        password,
        role,
        email,
        phone,
      });
      
      // Convert to User type (omitting password)
      const registeredUser: User = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      };
      
      // Set as current user
      setUser(registeredUser);
      return registeredUser;
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin,
      login,
      loginWithCredentials,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
