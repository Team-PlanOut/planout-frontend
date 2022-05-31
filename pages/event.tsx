import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import { useRouter } from "next/router";
import TaskForm from "../components/TaskForm";

function SingleEvent() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

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
  const [events, setEvents] = useState<Event[]>([]);

  const showEvents = async () => {
    await fetch(
      `https://cc26-planout.herokuapp.com/events/${router.query.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "x-auth-token": localStorage.getItem("token")
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  };

  useEffect(() => {
    showEvents();
  }, [events]);

  return (
    <div>
      <Navbar />
      <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border-2">
        <div className="overflow-hidden m-10">
          <TaskForm />
          <div className="mt-10 text-center text-4xl font-header">
            {events.name}
          </div>
          <div>TASKS</div>
        </div>
      </div>
    </div>
  );
}

export default withProtected(SingleEvent);
