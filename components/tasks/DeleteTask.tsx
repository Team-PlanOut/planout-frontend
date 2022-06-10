import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../src/hook/auth";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { Events, Tasks } from "../../types";

export default function DeleteTask({
  task,
  getTasks,
}: {
  task: Tasks;
  getTasks: () => void;
}) {
  const { token, user } = useAuth() as any;
  const router = useRouter();

  function deleteTask(taskId: any) {
    axios
      .delete(`https://cc26-planout.herokuapp.com/tasks/${taskId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((error) => {
        console.log(error);
      });
  }



  return (<>

    <div className="z-10 mt-5 hover:underline hover:cursor-pointer text-right">
      <button
        type="button"
        onClick={() => {
          deleteTask(task.id);
          getTasks();
        }}
        className="inset-y-0.5 text-2xl text-center font-body "
      ><FaTrash />
      </button>

    </div>



  </>)
}
