import useAuthData from "@/hooks/useAuthData";
import useProduct from "@/hooks/useProduct";
import { createContext, useContext, type ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

const AuthContext = createContext<any | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const authData = useAuthData();
  const productData = useProduct();

  return (
    <AuthContext.Provider value={{ ...authData, ...productData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
