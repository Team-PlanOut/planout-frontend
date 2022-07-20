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
  const { httpConfig } = useAuth() as any;

  const deleteTask = async (taskId: any) => {
    try {
      const response = await axios.delete(
        `https://cc26-planout.herokuapp.com/tasks/${taskId}`,
        httpConfig
      );
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      deleteTask(task.id);
    }
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
