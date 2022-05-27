import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "../src/hook/auth";

export default function Dashboard() {
  const { token } = useAuth() as any;

  useEffect(() => {
    if (token) {
      fetchData(token);
      console.log(token);
    }
  }, [token]);


  const fetchData = async (token: any) => {
    const response = await axios.get("http://localhost:8080/users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("this is respones", response);
  };
  return (
    <div className="mt-20">
      This is the dashboard. The token is:{token}
      <div className="text-black"></div>
    </div>
  );
}
