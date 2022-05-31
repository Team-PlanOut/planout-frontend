import axios from "axios";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import React, { useState, useEffect } from "react";
import TaskList from "../pages/TaskList";
import useAuth from "../src/hook/auth";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any>([]);
  const { token, user } = useAuth() as any;
  const [complete, setComplete] = useState<number | null>(null);
  console.log(user);
  useEffect(() => {
    if (token) {
      fetchTaskData(token);
    }
  }, []);

  const fetchTaskData = async (token: string) => {
    const response = await axios.get(
      "https://cc26-planout.herokuapp.com/tasks",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setTasks(response.data);
    console.log(typeof response.data);
    console.log("this is response", response);
    return tasks;
  };

  return (
    <div className="container m-auto h-screen mt-20 box-content md:w-1/2 border overflow-y-auto pb-10">
      <div className="overflow-hidden m-10">
        {" "}
        <div>
          <img src={user.photoURL} className="m-auto"></img>
        </div>
        <div className="text-center mt-5 font-body text-2xl">
          {user.displayName}
        </div>
        <div className="mt-10 text-center text-4xl font-header">
          {" "}
          Current Tasks
        </div>
      </div>

      <div>
        {tasks.map((task: any, index: null | number) => (
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
                <div onClick={() => setComplete(index)}>Complete task</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
