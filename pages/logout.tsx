import Link from "next/link";
import React from "react";
import { withProtected } from "../src/hook/route";
import { HiOutlineX } from "react-icons/hi";

function Logout({ auth }: any) {
  const { logout } = auth;

  return (
    <div className="flex flex-col items-center justify-center font-body  h-screen m-auto md:w-1/2 bg-container bg-opacity-10">
      <h1 className="text-2xl">Are you sure you want to logout?</h1>
      <button
        onClick={logout}
        className="border-2 rounded font-body  border-red-400 px-10 py-2 mt-2 hover:border-red-600"
      >
        Logout
      </button>
      <button className="border-2 rounded font-body  border-red-400 px-10 py-2 mt-2 hover:border-red-600">
        <Link href="/">Cancel</Link>
      </button>
    </div>
  );
}

export default withProtected(Logout);
