import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../src/hook/auth";
import Image from "next/image";
import { FaTasks } from "react-icons/fa";

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

    // Simple PUT request with a JSON body using axios
    // const article = JSON.stringify({ status: true });
    // axios
    //   .put(`https://cc26-planout.herokuapp.com/tasks/43`, article)
    //   .then((response) => console.log(response));

    try {
      fetch(`https://cc26-planout.herokuapp.com/tasks/${index}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      JSON.stringify({
        status: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeComplete = (index: number) => {
    const newSet = new Set(complete);
    newSet.delete(index);
    setComplete(newSet);

    // try {
    //   fetch(`https://cc26-planout.herokuapp.com/tasks/${index}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       Authorization: "Bearer " + token,
    //     },
    //   });
    //   JSON.stringify({
    //     status: false,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    if (token) {
      fetchTaskData();
    }
  }, [token]);

  return (
    <div className="container m-auto h-auto mt-20 box-content md:w-1/2 shadow md:shadow-lg pb-10">
      <div className="overflow-hidden m-10">
        <div className="flex flex-row md:ml-10 mt-10 md:justify-center">
          <Image
            className="-z-10 rounded-full"
            src={user.photoURL}
            alt="user image"
            width={100}
            height={100}
          ></Image>

          <div className="mt-5 font-body text-xl ml-5">
            <div> Name: {user.displayName} </div>
            <div> Points : </div>
          </div>
        </div>
        <div className="mt-10 text-center font-header flex justify-center">
          <FaTasks className="text-xl relative top-1" />{" "}
          <span className="ml-2 text-2xl relative bottom-1">
            Current Tasks{" "}
          </span>
        </div>
      </div>

      <div>
        {tasks.map((task: any, index: number) => (
          <div
            key={task.id}
            className={`p-5 shadow-md md:w-1/2 m-auto mt-10 ${
              complete.has(index) ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div className="text-xl ml-2 font-body">Event Name:</div>
            <div className="text-xl mt-2 ml-2 font-body">
              Task : {task.description}
            </div>
            <div className="mt-5 hover:underline hover:cursor-pointer font-body text-small text-right">
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
                <div onClick={() => addComplete(index)}>Mark as complete</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
