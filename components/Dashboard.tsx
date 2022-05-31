import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "../src/hook/auth";

export default function Dashboard() {
  const { token, user } = useAuth() as any;
  console.log(user);
  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, []);

  const fetchData = async (token: string) => {
    const response = await axios.get(
      "https://cc26-planout.herokuapp.com/events",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("this is response", response);
  };

  return (
    <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border">
      <div className="overflow-hidden m-10">
        {" "}
        <div>
          <img src={user.photoURL} className=" m-auto"></img>
        </div>
        <div className="text-center mt-5 font-body text-2xl">
          {user.displayName}
        </div>
        <div className="mt-10 text-center text-4xl font-header">
          {" "}
          Current Tasks
        </div>
      </div>
    </div>
  );
}
