import Link from "next/link";
import React from "react";
import { withProtected } from "../src/hook/route";

function Logout({ auth }: any) {
  const { logout } = auth;

  return (
    <div className="flex flex-col items-center justify-center font-body h-screen m-auto md:w-1/2 bg-container bg-opacity-10">
      <h1 className="text-4xl mb-4 text-center">
        Are you sure you want to logout?
      </h1>
      <button
        onClick={logout}
        className="text-3xl border-4 rounded font-body hover:border-blue-300 bg-buttonColor px-10 py-2 mt-2 "
      >
        Logout
      </button>
      <button className="text-3xl border-4 hover:border-blue-300 rounded font-body  px-10 py-2 mt-2 bg-buttonColor ">
        <Link href="/">Cancel</Link>
      </button>
    </div>
  );
}

export default withProtected(Logout);
