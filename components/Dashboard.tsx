import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../src/hook/auth";
import Image from "next/image";
import { FaCheckCircle, FaTasks } from "react-icons/fa";

export default function Dashboard() {
  const [task, setTasks] = useState<any>([]);
  const { token, user } = useAuth() as any;

  const fetchTaskData = async () => {
    const uid = user.uid;
    try {
      const response = await axios.get(
        `https://cc26-planout.herokuapp.com/tasks/user/${uid}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (id: number) => {
    const selectedTask = task.find((task: { id: number }) => task.id === id);

    if (selectedTask.status) {
      try {
        await axios.put(
          `https://cc26-planout.herokuapp.com/tasks/${id}`,
          {
            id: id,
            status: false,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.put(
          `https://cc26-planout.herokuapp.com/tasks/${id}`,
          {
            id: id,
            status: true,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchTaskData();
    }
  }, [token]);

  const sortedTasks = task.sort((a: { id: number }, b: { id: number }) =>
    a.id > b.id ? 1 : -1
  );

  return (
    <div className="container m-auto mt-20 border box-content h-screen no-scrollbar overflow-y-auto pb-2 md:w-1/2 bg-container bg-opacity-10">
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
            <div> Total Balance: </div>
          </div>
        </div>
        <div className="mt-10 text-center font-body flex justify-center">
          <FaTasks className="text-2xl -z-10  relative top-1" />
          <span className="ml-2 text-3xl relative font-bold  bottom-1 -z-10">
            Current Tasks
          </span>
        </div>
      </div>

      <div>
        {sortedTasks.map((task: any, index: number) => (
          <div
            key={task.id}
            className={`p-5 border md:rounded-md md:w-1/2 m-auto mt-10 ${
              task.status ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div className="text-2xl text-center font-body">
              {task.description}
            </div>
            <div className="mt-5 hover:underline hover:cursor-pointer text-right">
              <button
                onClick={() => {
                  completeTask(task.id);
                  setTimeout(() => {
                    fetchTaskData();
                  }, 200);
                }}
                className="text-2xl text-center font-body"
              >
                {task.status ? <FaCheckCircle /> : "Incomplete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
