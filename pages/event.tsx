import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import { useRouter } from "next/router";

import TaskForm from "../components/TaskForm";
import Link from "next/link";

function singleEvent() {
  
  const router = useRouter();
  let [complete, setComplete] = useState<number | null>(null);
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
    description: string | null;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [tasks, setTasks] = useState([]);

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

  const showTasks = async () => {
    await fetch(
      `https://cc26-planout.herokuapp.com/tasks/event/${router.query.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setTasks(data);
      });
  };

  useEffect(() => {
    showEvents();
    showTasks();
  }, [events]);

  return (
    <div>
      <Navbar />
      <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border-2">
        <div className="overflow-hidden m-10">
          <div className="mt-10 text-center text-4xl font-header">
            {events.name}
          </div>
                  <div>TASKS</div>
          <div className="mt-10 text-center text-4xl ">TASKS</div>
          <div className="overflow-hidden m-10">
            <div>
              {tasks.map((task, index) => (
                <div
                  className={`p-5   border-2 md:w-1/2 m-auto mt-10 ${
                    complete === index ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <div key={task.id} className="text-2xl text-center font-body">
                    {task.description}
                  </div>
                  <div className="mt-5 hover:underline hover:cursor-pointer text-right">
                    {complete === index ? (
                      <div onClick={() => setComplete(null)}>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div onClick={() => setComplete(index)}>
                        Complete task
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default withProtected(singleEvent);
