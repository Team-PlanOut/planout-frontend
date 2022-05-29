import React from "react";
import Dashboard from "../components/Dashboard";
import { withProtected } from "../src/hook/route";

function Profile() {
  return (
    <div>
      {" "}
      <Dashboard />
    </div>
  );
}

export default withProtected(Profile);
