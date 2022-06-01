import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import { useRouter } from "next/router";

import TaskForm from "../components/TaskForm";
import useAuth from "../src/hook/auth";
import axios from "axios";

function SingleEvent() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [task, setTask] = useState<Task[]>([]);
  const { token } = useAuth() as any;

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
  }

  interface Task {
    id: number;
    description: string;
    points: number;
    cost: number;
    status: boolean;
    event_id: number;
    user_id: number;
    created_at: number;
    modified: number;
  }

  const showEvents = async () => {
    const response = await axios.get(
      `https://cc26-planout.herokuapp.com/events/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setEvents(response.data);
  };

  const showTasks = async () => {
    const response = await axios.get(
      `https://cc26-planout.herokuapp.com/tasks/event/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setTask(response.data);
  };

  useEffect(() => {
    showEvents();
  }, [events]);

  useEffect(() => {
    showTasks();
  }, [task]);

  return (
    <div>
      <Navbar />
      <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border-2">
        <div className="mt-10 text-center text-4xl font-header">
          {events.name}
        </div>
        <div className="overflow-hidden m-10">
          <div className="mt-10 text-center text-4xl font-header"></div>
          <TaskForm />
          <div className="mt-10 text-center text-4xl font-header">TASKS</div>
          <div className="overflow-hidden m-10">
            <div>
              {task.map((task: any, index: number) => (
                <div
                  key={task.id}
                  className={`p-5   border-2 md:w-1/2 m-auto mt-10 ${
                    complete === index ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <div className="text-2xl text-center font-body">
                    {task.description}
                  </div>
                  <div className="mt-5 hover:underline hover:cursor-pointer text-right">
                    {complete === index ? (
                      <div onClick={() => setComplete(null)}>
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

export default withProtected(SingleEvent);
