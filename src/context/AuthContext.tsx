import useAuthData from "@/hooks/useAuthData";
import { createContext, useContext, type ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

const AuthContext = createContext<any | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const authData = useAuthData();

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
