import { createContext, useContext, useState } from "react";

import { authService } from "../service/authentication";

interface AuthData {
  user: object | null;
  setUser: (user: object | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  error: object | null;
  httpConfig: object;
}

const authContext = createContext<AuthData | null>(null);

export default function useAuth() {
  return useContext(authContext) as AuthData;
}

export function AuthProvider(props: any) {
  const [user, setUser] = useState<object | null>(null);
  const [error, setError] = useState<object | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const loginWithGoogle = async () => {
    const { error, user } = await authService.loginWithGoogle();
    setError(error ?? "");
    setUser(user ?? null);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const httpConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const value: AuthData = {
    user,
    setUser,
    token,
    setToken,
    loginWithGoogle,
    logout,
    error,
    httpConfig,
  };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
}
