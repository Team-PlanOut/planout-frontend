import React from "react";
import useAuth from "../src/hook/auth";
import { withPublic } from "../src/hook/route";

function Login({ auth }: any) {
  auth = useAuth();
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

export default withPublic(Login);
