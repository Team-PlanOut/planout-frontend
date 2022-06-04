import React from "react";

import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";

function Profile() {
  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default withProtected(Profile);
