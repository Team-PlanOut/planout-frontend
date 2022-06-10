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
}
