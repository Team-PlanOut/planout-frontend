import React from "react";
import useAuth from "../src/hook/auth";
import { withPublic } from "../src/hook/route";

function Login({ auth }: any) {
  auth = useAuth();
  if (auth !== null) {
    const { loginWithGoogle } = auth;

    return (
      <div className="flex flex-col justify-center items-center mt-20">
        <h1>Please login to access your account.</h1>
        <button
          className="border  border-red-600 px-10 py-2 mt-2"
          onClick={loginWithGoogle}
        >
          Login with Google
        </button>
      </div>
    );
  }
}

export default withPublic(Login);
