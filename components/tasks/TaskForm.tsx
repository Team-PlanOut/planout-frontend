import axios from "axios";
import router from "next/router";
import React, { useState } from "react";

import TaskModal from "../tasks/TaskModal";
import useAuth from "../../src/hook/auth";
import { FaPlusCircle } from "react-icons/fa";

export default function TaskForm({ getTasks, newTaskNotification }: any) {
  const [showModal, setShowModal] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCost, setTaskCost] = useState("0");
  const { httpConfig, user } = useAuth() as any;

  const createTask = () => {
    const dataObj = {
      description: taskDescription,
      status: false,
      event_id: router.query.id,
      user_id: user.uid,
      cost: taskCost,
    };
    handleSubmit(dataObj);
  };

  const handleSubmit = async (data: object) => {
    try {
      const response = await axios.post(
        `https://cc26-planout.herokuapp.com/tasks`,
        data,
        httpConfig
      );
      if (response.status === 200) {
        getTasks();
        newTaskNotification();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        title="Add task"
        data-modal-toggle="small-modal"
        onClick={() => setShowModal(true)}
        className="bg-buttonColor font-body text-xl ml-8 mt-1 font-medium px-4 py-2 rounded-md shadow-md text-white flex transition text float-right hover:bg-blue-300"
      >
        <FaPlusCircle className="relative top-1 mr-1" />
        Add Task
      </button>
      {showModal && (
        <TaskModal
          setShowModal={setShowModal}
          setTaskDescription={setTaskDescription}
          setTaskCost={setTaskCost}
          createTask={createTask}
        />
      )}
    </div>
  );
}
