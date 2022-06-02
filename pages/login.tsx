import React from "react";
import useAuth from "../src/hook/auth";
import { withPublic } from "../src/hook/route";
function Login({ auth }: any) {
  auth = useAuth();
  if (auth !== null) {
    const { loginWithGoogle } = auth;

    return (
      <div className="h-screen md:w-2/3 bg-yellow-100 m-auto flex flex-col items-center p-20 shadow-2xl">
        <div className="mb-10 text-5xl font-body text-center">
          Plan your next event with{" "}
          <div className="font-logo text-6xl mt-2">PlanOut!</div>
        </div>
        <div className="flex md:flex-row justify-center pt-20">
          <button
            className="border font-header text-green-500 text-xl w-auto border-black  px-16 py-2 mt-2 hover:bg-green-100 transition-all duration-500 ease-in hover:text-black"
            onClick={loginWithGoogle}
          >
            Login with Google
          </button>
          <button
            className="border ml-10 font-header text-green-500 text-xl w-auto border-black px-16 py-2 mt-2 hover:bg-green-100 transition-all duration-500 ease-in hover:text-black"
            onClick={loginWithGoogle}
          >
            Signup with Google
          </button>
        </div>
      </div>
    );
  }
}

export default withPublic(Login);
