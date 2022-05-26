import { createContext, useContext, useState } from "react";
import { authService } from "../service/authentication";

interface AuthData {
  user: any;
  error: any;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: () => any;
}

interface Children {
  children: any;
}

const authContext = createContext<AuthData | null>(null);

export default function useAuth() {
  return useContext(authContext);
}
export function AuthProvider({ ...children }: Children) {
  const [user, setUser] = useState<null>(null);
  const [error, setError] = useState<string | null>(null);

  const loginWithGoogle = async () => {
    const { error, user } = await authService.loginWithGoogle();
    setError(error ?? "");
    setUser(user ?? null);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };
  const value: AuthData = { user, error, loginWithGoogle, logout, setUser };
  return <authContext.Provider value={value} {...children} />;
}
