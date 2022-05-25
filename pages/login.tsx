import React from "react";
import useAuth from "../src/hook/auth";

export default function Login() {
  const auth = useAuth();
  if (auth !== null) {
    const { user, loginWithGoogle, error } = auth;

    return (
      <div>
        {error && <h1>{error}</h1>}
        <h1 className="text-pink">{user?.uid}</h1>
        <button className="border-blue-500" onClick={loginWithGoogle}>
          Login with Google
        </button>
      </div>
    );
  }
}
