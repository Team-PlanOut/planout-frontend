import React from "react";
import { withProtected } from "../src/hook/route";

function Friends() {
  return <div>hello friends</div>;
}

export default withProtected(Friends);
