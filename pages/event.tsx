import React from "react";

import SingleEvent from "../components/events/SingleEvent";
import { withProtected } from "../src/hook/route";

function SingleEventPage() {
  return (
    <div>
      <SingleEvent />
    </div>
  );
}
export default withProtected(SingleEventPage);
