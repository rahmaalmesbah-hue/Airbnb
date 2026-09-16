import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

const USER_KEY = "airbnb_user";

interface AuthContextValue {
  user: string | null;
  login: (userName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem(USER_KEY));

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (userName: string) => {
        localStorage.setItem(USER_KEY, userName);
        setUser(userName);
      },
      logout: () => {
        localStorage.removeItem(USER_KEY);
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
