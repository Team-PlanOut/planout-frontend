import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../src/hook/auth";
import Image from "next/image";
import { FaTasks } from "react-icons/fa";
import Link from "next/link";

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

  useEffect(() => {
    if (token) {
      fetchTaskData();
    }
  }, [token]);

  const sortedTasks = task.sort((a: { id: number }, b: { id: number }) =>
    a.id > b.id ? 1 : -1
  );

  return (
    <div className="container m-auto mt-20 border box-content h-screen no-scrollbar overflow-y-auto pb-2 md:w-1/2 bg-container bg-opacity-10 shadow-xl">
      <div className="overflow-hidden m-10">
        <div className="flex flex-row md:ml-10 mt-10 md:justify-center">
          <Image
            className="-z-10 rounded-full"
            src={user.photoURL}
            alt="user image"
            width={100}
            height={100}
          ></Image>

          <div className="mt-5 font-body text-lg ml-5">
            <div> Name: {user.displayName} </div>
            <div className="text-lg"> @ {user.email} </div>
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
          <Link
            href="/events/[id]"
            as={`/events/${task.eventId}`}
            key={task.id}
          >
            <div
              title="Click to open task"
              className="pb-4 pt-4 pr-2 font-body rounded-md mb-2 shadow-md w-80 m-auto mt-10 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-500 ease-in bg-white hover:cursor-pointer"
            >
              <div className="text-xl font-semibold"> {task.eventName}</div>
              <div className="text-"> {task.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
