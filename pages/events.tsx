import React from "react";
import { withProtected } from "../src/hook/route";

function Events() {
  const events: { name: string }[] = [
    { name: "Ruprecht's Birthday" },
    { name: "Ruprecht's BBQ" },
    { name: "Ruprecht's Bar Mitzvah" },
  ];
  return (
    <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border-2">
      <div className="overflow-hidden m-10">
        {" "}
        <div className="mt-10 text-center text-2xl">Events</div>
        <div>
          {events.map((event) => (
            <div className="p-4 border-2 md:w-1/2 m-auto mt-10 text-center hover:cursor-pointer">
              {" "}
              {event.name}{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withProtected(Events);
