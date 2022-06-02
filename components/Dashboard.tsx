import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../src/hook/auth";
import Image from "next/image";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any>([]);
  const { token, user } = useAuth() as any;
  const [complete, setComplete] = useState<Set<number>>(new Set());

  const fetchTaskData = async () => {
    const response = await axios.get(
      "https://cc26-planout.herokuapp.com/tasks",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setTasks(response.data);
    return tasks;
  };

  const addComplete = (index: number) => {
    const newSet = new Set(complete);
    newSet.add(index);
    setComplete(newSet);
  };

  const removeComplete = (index: number) => {
    const newSet = new Set(complete);
    newSet.delete(index);
    setComplete(newSet);
  };

  useEffect(() => {
    if (token) {
      fetchTaskData();
    }
  }, [token]);

  return (
    <div className="container m-auto h-screen mt-20 box-content md:w-1/2 border overflow-y-auto pb-10">
      <div className="overflow-hidden m-10">
        <div className="flex flex-row justify-center">
          <Image
            className="-z-10"
            src={user.photoURL}
            alt="user image"
            width={100}
            height={100}
          ></Image>
        </div>
        <div className="text-center mt-5 font-body text-2xl">
          {user.displayName}
        </div>
        <div className="mt-10 text-center text-4xl font-header">
          Current Tasks
        </div>
      </div>

      <div>
        {tasks.map((task: any, index: number) => (
          <div
            key={task.id}
            className={`p-5   border-2 md:w-1/2 m-auto mt-10 ${
              complete.has(index) ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div className="text-2xl text-center font-body">
              {task.description}
            </div>
            <div className="mt-5 hover:underline hover:cursor-pointer text-right">
              {complete.has(index) ? (
                <div onClick={() => removeComplete(index)}>
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
                <div onClick={() => addComplete(index)}>Complete task</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
