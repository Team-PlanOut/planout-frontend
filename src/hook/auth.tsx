import { createContext, useContext, useState } from "react";
import { authService } from "../service/authentication";

interface AuthData {
  user: any;
  error: any;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

interface Children {
  children: any;
}

const authContext = createContext<AuthData | null>(null);

export default function useAuth() {
  return useContext(authContext);
}
export function AuthProvider({ children }: Children) {
  const [user, setUser] = useState<null>(null);
  const [error, setError] = useState<string | null>(null);

  const loginWithGoogle = async () => {
    const { error, user } = await authService.loginWithGoogle();
    setUser(user ?? null);
    setError(error ?? "");
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };
  const value: AuthData = { user, error, loginWithGoogle, logout };
  return (
    <authContext.Provider value={value}> {children} </authContext.Provider>
  );
}
