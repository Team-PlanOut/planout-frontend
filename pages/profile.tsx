import React from "react";
import Dashboard from "../components/Dashboard";
import { withProtected } from "../src/hook/route";
import Navbar from "../components/Navbar";

function Profile() {
  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default withProtected(Profile);
