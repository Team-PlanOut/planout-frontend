import React from "react";
import axios from "axios";
import useAuth from "../../src/hook/auth";
import { FaTrash } from "react-icons/fa";
import { Tasks } from "../../types";

export default function DeleteTask({
  task,
  getTasks,
  setOpenMenu,
}: {
  task: Tasks;
  setOpenMenu: any;
  getTasks: () => void;
}) {
  const { token } = useAuth() as any;

  const deleteTask = (taskId: any) => {
    axios
      .delete(`https://cc26-planout.herokuapp.com/tasks/${taskId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    alert("Are you sure?");
    getTasks();
    setOpenMenu(false);
  };

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => handleDelete()}
          className="font-body inline-flex"
        >
          <FaTrash className="relative top-1 w-3 h-3 mr-1 " />
          Delete task
        </button>
      </div>
    </>
  );
}
