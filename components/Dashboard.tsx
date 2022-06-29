import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../src/hook/auth";
import Image from "next/image";
import { FaTasks } from "react-icons/fa";
import Link from "next/link";
import { BsCircle } from "react-icons/bs";

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
    <div className="h-screen">
      <div className="flex justify-center items-center">
        <div className="md:w-1/2 flex justify-center">
          <div className="md:ml-10 mt-20 flex md:mt-36 mb-10 bg-nav p-8 rounded-xl shadow-xl">
            <Image
              className="rounded-full"
              src={user.photoURL}
              alt="user image"
              width={100}
              height={100}
            ></Image>

            <div className="mt-5 font-body ml-5 whitespace-nowrap ">
              <div className="font-semibold text-xl"> {user.displayName} </div>
              <div className="text-lg font-semibold truncate">
                {" "}
                {user.email}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container m-auto box-content md:h-3/6 overflow-auto scrollbar md:w-1/2 bg-dashboard shadow-xl md:rounded-lg mb-10">
        <div className="overflow-hidden m-10">
          <div className="mt-10 text-center font-body flex justify-center">
            <FaTasks className="text-2xl -z-10  relative top-1" />
            <span className="ml-2 text-3xl relative font-bold  bottom-1">
              Current Tasks
            </span>
          </div>
        </div>

        <div className="md:flex flex-row justify-center flex-wrap">
          {sortedTasks.map((task: any, index: number) => (
            <Link
              href="/events/[id]"
              as={`/events/${task.eventId}`}
              key={task.id}
            >
              <div
                title="Click to open task"
                className="border-2 border-white mr-4 ml-4 mb-8 md:w-60 rounded-lg bg-yellow-100 shadow-xl font-body hover:cursor-pointer scale-100 hover:scale-110 transition-all ease-in"
              >
                <div>
                  <div className="flex mt-1 border-b-2 border-white pb-1">
                    <div className="bg-red-200 w-5 h-5 rounded-full ml-1"></div>{" "}
                    <div className="bg-orange-300 w-5 h-5 rounded-full ml-1"></div>{" "}
                    <div className="bg-blue-300 w-5 h-5 rounded-full ml-1"></div>{" "}
                  </div>
                  <div className="md:text-2xl text-center font-semibold border-b-2 border-white ">
                    {" "}
                    {task.eventName}
                  </div>
                </div>
                <div className="mt-2 ml-2 font-bold">Assigned Task:</div>
                <div className="p-2 md:text-xl text-center font-semibold">
                  {" "}
                  {task.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
