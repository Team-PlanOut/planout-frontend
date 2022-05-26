import React from "react";
import { withProtected } from "../src/hook/route";

function Profile() {
  return <div> Hello from profile</div>;
}

export default withProtected(Profile);
