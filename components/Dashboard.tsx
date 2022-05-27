import { executionAsyncResource } from "async_hooks";
import axios from "axios";
import React, { useEffect } from "react";

export default function Dashboard({ token }: string) {
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
  return <div className="h-3/4 border border-solid w-1/3"></div>;
}
