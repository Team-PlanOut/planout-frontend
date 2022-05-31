import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import Link from "next/link";

import EventForm from "../components/EventForm";

function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  interface Event {
    id: number;
    host: string;
    name: string;
    event_name: string;
    date: Date;
    budget: number;
    created_at: number;
    modified: number;
  }

  const showEvents = () => {
    try {
      fetch("https://cc26-planout.herokuapp.com/events", {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showEvents();
  }, [events]);

  const showOnlyDate = (date: Date) => {
    return date.toString().slice(0, 10);
  };

  return (
    <div>
      <Navbar />
      <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border-2">
        <div className="overflow-hidden m-10">
          <div className="mt-10 text-center text-4xl font-header">EVENTS</div>
          <div>
            {events.map((event) => (
              <div className="p-4 font-body text-2xl border-2 md:w-1/2 m-auto mt-10 text-center hover:cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition-all duration-500 ease-in">
                <Link
                  key={event.id}
                  href={{
                    pathname: "/event",
                    query: { id: event.id },
                  }}
                >
                  {event.name}
                </Link>
                <br />
                {showOnlyDate(event.date)}
              </div>
            ))}
          </div>
          .
        </div>
      </div>
    </div>
  );
}

export default withProtected(Events);
