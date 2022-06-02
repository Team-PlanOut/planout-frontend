import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import TaskForm from "../../components/tasks/TaskForm";
import useAuth from "../../src/hook/auth";
import { Events, Tasks } from "../../types";
import { withProtected } from "../../src/hook/route";

function SingleEventPage() {
  const router = useRouter();

  const [event, setEvent] = useState<Events>({} as Events);
  const [task, setTask] = useState<Tasks[]>([]);
  const { token } = useAuth() as any;

  let [complete, setComplete] = useState<number | null>(null);

  const {
    query: { id },
  } = router;

  const getEventName = async () => {
    const response = await axios.get(
      `https://cc26-planout.herokuapp.com/events/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setEvent(response.data);
  };

  const getTasks = async () => {
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
    getEventName();
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  const completeTask = async (id: number) => {
    const response = await axios.put(
      `https://cc26-planout.herokuapp.com/tasks/${id}`,
      {
        status: true,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setComplete(response.data.id);
  };

  return (
    <div>
      <Navbar />
      <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border-2">
        <div className="mt-10 text-center text-4xl font-header">
          {event.name}
        </div>
        <TaskForm getTasks={getTasks} />
        <div className="overflow-hidden m-10">
          <div className="mt-10 text-center text-4xl font-header"></div>
          <div className="mt-16 text-center text-4xl font-header">TASKS</div>
          <div className="overflow-hidden m-10">
            <div>
              {task.map((task: any, index: number) => (
                <div
                  key={task.id}
                  className={`p-5 border-2 md:w-1/2 m-auto mt-10 ${
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
                      <div onClick={() => completeTask(task.id)}>
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
export default withProtected(SingleEventPage);
