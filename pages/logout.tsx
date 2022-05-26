import React from "react";
import { withProtected } from "../src/hook/route";

function Logout({ auth }: any) {
  const { logout } = auth;
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1>Are you sure you want to logout?</h1>
      <button
        onClick={logout}
        className="border  border-red-600 px-10 py-2 mt-2"
      >
        Logout
      </button>
      <button className="border  border-red-600 px-10 py-2 mt-2">
        {" "}
        <a href="/">Cancel</a>
      </button>
    </div>
  );
}

export default withProtected(Logout);
