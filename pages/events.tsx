import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";

function Events() {
  const [events, setEvents] = useState<any[]>([]);

  const showEvents = () => {
    fetch("http://localhost:8080/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "x-auth-token": localStorage.getItem("token")
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  };

  console.log(events);

  useEffect(() => {
    showEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border-2">
        <div className="overflow-hidden m-10">
          <div className="mt-10 text-center text-4xl font-header">EVENTS</div>
          <div>
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 font-body text-2xl border-2 md:w-1/2 m-auto mt-10 text-center hover:cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition-all duration-500 ease-in"
              >
                {event.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withProtected(Events);
