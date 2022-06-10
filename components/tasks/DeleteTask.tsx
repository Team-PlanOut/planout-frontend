import React from "react";
import axios from "axios";
import useAuth from "../../src/hook/auth";
import { FaTrash } from "react-icons/fa";
import { Events, Tasks } from "../../types";

export default function DeleteTask({
  setOpenMenu,
  task,
  getTasks,
}: {
  task: Tasks;
  getTasks: () => void;
  setOpenMenu: any;
}) {
  const { token, user } = useAuth() as any;

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
          type="button"
          onClick={() => {
            deleteTask(task.id);
            alert("are you sure?");
            getTasks();
            setOpenMenu(null);
          }}
          className="font-body inline-flex"
        >
          <FaTrash className="relative top-1 w-3 h-3 mr-1 " />
          Delete task
        </button>
      </div>
    </>
  );
}
