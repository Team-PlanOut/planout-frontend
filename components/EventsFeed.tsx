import axios from 'axios';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

import EventForm from '../components/EventForm';
import useAuth from '../src/hook/auth';

export default function EventsFeed() {
  const [events, setEvents] = useState<Event[]>([]);
  const { token } = useAuth() as any;

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

  const showEvents = async () => {
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
    showEvents();
  }, []);

  const showOnlyDate = (date: Date) => {
    return date.toString().slice(0, 10);
  };

  return (
    <div>
      <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border-2">
        <div className="overflow-hidden m-10">
          <EventForm />
          <div className="mt-10 text-center text-4xl font-header">EVENTS</div>
          <div>
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 font-body text-2xl border-2 md:w-1/2 m-auto mt-10 text-center hover:cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition-all duration-500 ease-in"
              >
                <Link
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
        </div>
      </div>
    </div>
  );
}
