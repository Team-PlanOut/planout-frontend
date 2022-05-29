import React from "react";
import { withProtected } from "../src/hook/route";
import Navbar from "../components/Navbar";

function Friends() {
  return (
    <div>
      <Navbar />
      hello friends
    </div>
  );
}

export default withProtected(Friends);
