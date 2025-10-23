"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const TOKEN_KEY = "authToken";
const API_URL = "https://laboratory-sample-tracker-api.onrender.com";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Note: In a real app, we'd sync this with localStorage
  // to keep the user logged in on page refresh.
  // Add that later to keep things simple.

  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  };

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const validateToken = async (storedToken: string) => {
      try {
        const res = await fetch(`${API_URL}/api/user/`, {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        });
        if (!res.ok) {
          throw new Error("Invalid token");
        }
        const userData = await res.json();

        setTokenState(storedToken);
        setUser(userData);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (storedToken) {
      validateToken(storedToken);
    } else {
      setLoading(false);
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, logout }}>
      {!loading && children}
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
