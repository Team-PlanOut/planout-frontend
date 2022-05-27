import { createContext, useContext, useState } from "react";
import { authService } from "../service/authentication";

interface AuthData {
  user: Object | null;
  error: Object | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: unknown;
  setToken: unknown;
  token: String | null;
}

const authContext = createContext<AuthData | null>(null);

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props: any) {
  const [user, setUser] = useState<null | String>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<String | null>("");

  const loginWithGoogle = async () => {
    const { error, user } = await authService.loginWithGoogle();
    setError(error ?? "");
    setUser(user ?? null);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };
  const value: AuthData = {
    user,
    error,
    loginWithGoogle,
    logout,
    setUser,
    setToken,
    token,
  };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
}
