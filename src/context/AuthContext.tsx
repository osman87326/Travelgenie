import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  geminiApiKey: string;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  googleLogin: () => Promise<void>;
  demoLogin: () => Promise<void>;
  logout: () => void;
  setApiKey: (key: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load session
    const savedUser = localStorage.getItem('tg_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Load API key
    const savedKey = localStorage.getItem('tg_gemini_api_key');
    if (savedKey) {
      setGeminiApiKey(savedKey);
    } else {
      // Check env variable
      const envKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (envKey) {
        setGeminiApiKey(envKey);
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock validation
    if (!email.includes('@') || password.length < 4) {
      return false;
    }
    
    const mockUser: User = {
      id: "usr-" + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email: email,
      image: `https://api.dicebear.com/7.x/adventurer/svg?seed=${email}`
    };
    
    setUser(mockUser);
    localStorage.setItem('tg_user', JSON.stringify(mockUser));
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    if (name.trim().length < 2 || !email.includes('@') || password.length < 4) {
      return false;
    }

    const mockUser: User = {
      id: "usr-" + Date.now(),
      name: name,
      email: email,
      image: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`
    };
    
    setUser(mockUser);
    localStorage.setItem('tg_user', JSON.stringify(mockUser));
    return true;
  };

  const googleLogin = async () => {
    setIsLoading(true);
    // Simulate a brief redirect/loading window
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const googleUser: User = {
      id: "usr-google",
      name: "Google Traveler",
      email: "google.traveler@gmail.com",
      image: "https://lh3.googleusercontent.com/a/default-user=s96-c"
    };

    setUser(googleUser);
    localStorage.setItem('tg_user', JSON.stringify(googleUser));
    setIsLoading(false);
  };

  const demoLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const demoUser: User = {
      id: "usr-demo",
      name: "Alex Mercer",
      email: "demo@travelgenie.ai",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex"
    };

    setUser(demoUser);
    localStorage.setItem('tg_user', JSON.stringify(demoUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tg_user');
  };

  const setApiKey = (key: string) => {
    setGeminiApiKey(key);
    localStorage.setItem('tg_gemini_api_key', key);
  };

  return (
    <AuthContext.Provider value={{
      user,
      geminiApiKey,
      login,
      register,
      googleLogin,
      demoLogin,
      logout,
      setApiKey,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
