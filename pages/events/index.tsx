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
  const { token, user } = useAuth() as any;

  const getEvents = async () => {
    const uid = user.uid;
    console.log(uid);
    const response = await axios.get(
      "https://cc26-planout.herokuapp.com/events",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(user);
    setEvents(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  console.log(events.length);

  const showOnlyDate = (date: Date) => date.toString().slice(0, 10);
  return (
    <>
      <Navbar />
      {events.length < 0 ? (
        <>
          <div className="container m-auto mt-20 box-content h-auto md:w-1/2 shadow-lg pb-2">
            <div className="overflow-hidden m-10"></div>
            No events found
          </div>
        </>
      ) : (
        <div className="container m-auto mt-20 box-content h-auto md:w-1/2 shadow-lg pb-2">
          <div className="overflow-hidden m-10">
            <div className="mt-10 text-center text-4xl font-header">EVENTS</div>
            <div>
              <EventForm getEvents={getEvents} />
            </div>
            <div>
              {events.map((event) => (
                <Link
                  href="/events/[id]"
                  as={`/events/${event.id}`}
                  key={event.id}
                >
                  <div
                    key={event.id}
                    className="p-4 font-body text-2xl border-2 md:w-1/2 m-auto mt-10 text-center hover:cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition-all duration-500 ease-in"
                  >
                    <div className="text-left">Event name: {event.name}</div>
                    <div className="text-left mt-2">
                      Date: {showOnlyDate(event.date)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withProtected(Events);
