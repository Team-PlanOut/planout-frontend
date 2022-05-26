import { createContext, useContext, useState } from "react";
import { authService } from "../service/authentication";

interface AuthData {
  user: Object | null;
  error: Object | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: unknown;
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
  console.log(typeof user);
  console.log(typeof setUser);

  return <authContext.Provider value={value} {...children} />;
}
