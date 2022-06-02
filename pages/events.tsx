import React from "react";

import EventsFeed from "../components/events/EventsFeed";
import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";

function Events() {
  return (
    <div>
      <Navbar />
      <EventsFeed />
    </div>
  );
}

export default withProtected(Events);
