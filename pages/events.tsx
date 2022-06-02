import React from "react";
import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import EventsFeed from "../components/EventsFeed";

function Events() {
  return (
    <div>
      <Navbar />
      <EventsFeed />
    </div>
  );
}

export default withProtected(Events);
