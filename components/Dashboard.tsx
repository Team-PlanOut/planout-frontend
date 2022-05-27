import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "../src/hook/auth";

export default function Dashboard({}) {
  const { token } = useAuth() as any;
  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const fetchData = async (token: string) => {
    const response = await axios.get("http://localhost:8080/api", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response);
  };
  return (
    <div className="h-3/4 border border-solid w-1/3">
      This is the dashboard. The token is: {token}
    </div>
  );
}
