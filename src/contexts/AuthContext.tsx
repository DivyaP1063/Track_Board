
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('kanban_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Attempting login with:', email, password);
    
    try {
      // Accept any email and password for testing
      if (email && password) {
        // Create a user object from the provided email
        const userWithoutPassword = { 
          id: Date.now().toString(),
          email: email, 
          name: email.split('@')[0] // Use part before @ as name
        };
        
        setUser(userWithoutPassword);
        localStorage.setItem('kanban_user', JSON.stringify(userWithoutPassword));
        console.log('Login successful for user:', userWithoutPassword);
        return true;
      }
      
      console.log('Login failed - email or password empty');
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    console.log('Attempting signup with:', email, name);
    
    // Simple frontend validation
    if (email.length < 3 || password.length < 6 || name.length < 2) {
      console.log('Signup failed: validation error');
      return false;
    }

    const users = JSON.parse(localStorage.getItem('kanban_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      console.log('Signup failed: user already exists');
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name
    };

    users.push(newUser);
    localStorage.setItem('kanban_users', JSON.stringify(users));
    console.log('New user created:', newUser);

    const userWithoutPassword = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userWithoutPassword);
    localStorage.setItem('kanban_user', JSON.stringify(userWithoutPassword));
    console.log('Signup successful');
    return true;
  };

  const logout = () => {
    console.log('Logging out');
    setUser(null);
    localStorage.removeItem('kanban_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
