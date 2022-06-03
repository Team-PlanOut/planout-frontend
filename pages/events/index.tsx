import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EventForm from "../../components/events/EventForm";
import { Events } from "../../types";

import Navbar from "../../components/Navbar";
import useAuth from "../../src/hook/auth";
import { withProtected } from "../../src/hook/route";

function Events() {
  const [events, setEvents] = useState<Events[]>([]);

  const { token } = useAuth() as any;

  const getEvents = async () => {
    const response = await axios.get(
      "https://cc26-planout.herokuapp.com/events",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setEvents(response.data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const showOnlyDate = (date: Date) => date.toString().slice(0, 10);

  return (
    <>
      <Navbar />
      <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border-2">
        <div className="overflow-hidden m-10">
          <EventForm getEvents={getEvents} />
          <div className="mt-10 text-center text-4xl font-header">EVENTS</div>
          <div>
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 font-body text-2xl border-2 md:w-1/2 m-auto mt-10 text-center hover:cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition-all duration-500 ease-in"
              >
                <Link href={"/events/" + event.id} key={event.id}>
                  {event.name}
                </Link>
                <br />
                {showOnlyDate(event.date)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default withProtected(Events);
