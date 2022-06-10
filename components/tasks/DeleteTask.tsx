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

<<<<<<< HEAD


  return (<>

    <div className="z-10 mt-5 hover:underline hover:cursor-pointer text-right">
      <button
        type="button"
        onClick={() => {
          console.log(token)
          console.log(task.id)
          deleteTask(task.id);
          console.log(`clicked`, task);
          //router.push('/'); 
          getTasks();
        }}
        className="inset-y-0.5 text-2xl text-center font-body "
      ><FaTrash />
      </button>

    </div>



  </>)
=======
  return (
    <>
      <div>
        <button
          className="inline-flex "
          type="button"
          onClick={() => {
            deleteTask(task.id);
            router.push("/events"); //then go back to all events
          }}
        >
          <FaTrash className="relative top-1 mr-1 w-3 h-3" />
          Delete Task
        </button>
      </div>
    </>
  );
>>>>>>> fde9c347a242b3377db57ed34bd86ab571fde1cb
}
