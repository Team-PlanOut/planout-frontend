import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EventForm from "../../components/events/EventForm";
import { Events } from "../../types";
import Navbar from "../../components/Navbar";
import useAuth from "../../src/hook/auth";
import { withProtected } from "../../src/hook/route";
import { HiOutlineX } from "react-icons/hi";
function Events() {
  const [events, setEvents] = useState<Events[]>([]);
  const { httpConfig, user } = useAuth() as any;

  const getUserEvents = async () => {
    const eventIds = {};
    const response = await axios.get(
      "https://cc26-planout.herokuapp.com/eventusers",
      httpConfig
    );

    let filteredResponse = response.data.filter((event: any) => {
      return event.user_id === user.uid;
    });
    for (let i = 0; i < filteredResponse.length; i++) {
      eventIds[filteredResponse[i].event_id]
        ? ""
        : (eventIds[filteredResponse[i].event_id] =
            filteredResponse[i].event_id);
    }

    getEvents(eventIds);
  };

  const getEvents = async (data: Object) => {
    const eventIds = data;
    const response = await axios.get(
      "https://cc26-planout.herokuapp.com/events",
      httpConfig
    );
    displayEvents(response, eventIds);
  };

  const displayEvents = async (
    response: AxiosResponse<any, any>,
    eventIds: Object
  ) => {
    const eventData = response.data;
    const filteredEvents = await eventData.filter((event) => {
      return eventIds[event.id] || event.hostId === user.uid;
    });
    filteredEvents.sort((a, b) =>
      a.date.localeCompare(b.date, { ignorePunctuation: true })
    );
    filteredEvents.sort((a: { date: string }, b: { date: any }) =>
      a.date.localeCompare(b.date)
    );
    setEvents(filteredEvents);
  };

  async function deleteEvent(eventId: any) {
    const response = await axios.delete(
      `https://cc26-planout.herokuapp.com/events/${eventId}`,
      httpConfig
    );
    if (response.status === 200) {
      getUserEvents();
    }
  }

  useEffect(() => {
    getUserEvents();
  }, []);

  const showOnlyDate = (date: Date) => date.toString().slice(0, 10);

  return (
    <>
      <Navbar />
      <div className="h-screen">
        <div className="mt-28">
          <div className="text-center text-5xl font-body font-bold">
            <div className="ml-8">EVENTS</div>
            <div className="flex justify-center">
              <EventForm getEvents={getUserEvents} />
            </div>
          </div>
        </div>

        <div className="container m-auto mt-10 box-content md:h-4/6 scrollbar overflow-y-auto pb-2 md:w-2/3 bg-dashboard md:rounded-lg shadow-2xl">
          <div className="overflow-hidden m-10 p-1">
            <div className="md:flex flex-row flex-wrap justify-center">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-yellow-100 md:w-80 m-auto mt-10 font-body rounded shadow-lg flex flex-col ml-4 mr-4"
                >
                  <div className="flex flex-row border-b border-gray-400 bg-nav rounded-t-lg">
                    <div className="flex flex-row items-center">
                      <img
                        src={event.hostPhoto}
                        className="ml-2 mt-2 mb-2 rounded-full w-16 h-16 mr-4"
                      />
                      <div className="text-lg">
                        Hosted by{" "}
                        <span className="font-semibold">
                          {event.hostFirstName} {event.hostLastName}
                        </span>
                      </div>
                    </div>
                    <HiOutlineX
                      className="ml-auto mr-1 mt-2 hover:cursor-pointer  hover:bg-gray-400 hover:text-black md:text-gray-300"
                      onClick={() => {
                        alert(`Deleting event ${event.name}`);
                        deleteEvent(event.id);
                        getUserEvents();
                      }}
                    />
                  </div>

                  <div className="text-center p-2 ">
                    <div className="text-2xl font-semibold break-all">
                      {event.name}
                    </div>
                    <div className="text-xl">{showOnlyDate(event.date)}</div>
                  </div>

                  <Link
                    href="/events/[id]"
                    as={`/events/${event.id}`}
                    key={event.id}
                  >
                    <div className="p-2">
                      <button className="bg-blue-300 text-lg hover:bg-opacity-80 border border-gray-300 hover:border-white font-semibold flex flex-row ml-auto pl-2 pr-2 pt-1 pb-1 rounded-md">
                        View tasks
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withProtected(Events);
