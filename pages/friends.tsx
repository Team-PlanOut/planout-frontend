import React from "react";
import { FaPersonBooth } from "react-icons/fa";

import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";

function Friends() {
  return (
    <div>
      <Navbar />
      <div className="container m-auto h-auto mt-20 box-content md:w-1/2 shadow md:shadow-lg pb-10">
        <div>Friend List</div>
        <div>
          <FaPersonBooth />
        </div>
      </div>
    </div>
  );
}

export default withProtected(Friends);
