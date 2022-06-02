import React from "react";
import Navbar from "../components/Navbar";
import SingleEvent from "../components/SingleEvent";
import { withProtected } from "../src/hook/route";

function SingleEventPage() {
  return (
    <div>
      <SingleEvent />
    </div>
  );
}
export default withProtected(SingleEventPage);
