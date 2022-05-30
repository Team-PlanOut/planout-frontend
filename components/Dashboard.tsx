import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "../src/hook/auth";

export default function Dashboard() {
  const { token } = useAuth() as any;

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const fetchData = async (token: string) => {
    const response = await axios.get("http://localhost:8080/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("this is response", response);
  };
  return (
    <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border">
      <div className="overflow-hidden m-10">
        {" "}
        <div className="bg-blue-200 rounded-full w-40 h-40 m-auto"></div>
        <div className="text-center mt-5">user's name here</div>
        <div className="mt-10 text-center text-4xl font-header">
          {" "}
          Current Tasks
        </div>
      </div>
    </div>
  );
}
