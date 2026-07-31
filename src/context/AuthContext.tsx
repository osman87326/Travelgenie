"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  geminiApiKey: string;
  setApiKey: (key: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GEMINI_API_KEY_STORAGE_KEY = "travelgenie_gemini_api_key";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [geminiApiKey, setGeminiApiKey] = useState<string>("");

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();

    try {
      const storedKey = localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY);
      if (storedKey) {
        setGeminiApiKey(storedKey);
      }
    } catch {
      // localStorage unavailable (e.g. SSR or privacy mode); ignore.
    }
  }, []);

  async function login(email: string, password: string) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.message || "Login failed.");
    }
    const data = await res.json();
    setUser(data.user);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  function setApiKey(key: string) {
    setGeminiApiKey(key);
    try {
      if (key) {
        localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, key);
      } else {
        localStorage.removeItem(GEMINI_API_KEY_STORAGE_KEY);
      }
    } catch {
      // localStorage unavailable; the key still lives in state for this session.
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, geminiApiKey, setApiKey }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}