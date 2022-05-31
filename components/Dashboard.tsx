import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../src/hook/auth";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any>([]);
  const { token, user } = useAuth() as any;
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
    <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border">
      <div className="overflow-hidden m-10">
        <div>
          <img src={user.photoURL} className=" m-auto"></img>
        </div>
        <div className="text-center mt-5 font-body text-2xl">
          {user.displayName}
        </div>
        <div className="mt-10 text-center text-4xl font-header">
          Current Tasks
        </div>
      </div>
      {tasks.map((task: any) => (
        <div key={task.id}> {task.description}</div>
      ))}
    </div>
  );
}
