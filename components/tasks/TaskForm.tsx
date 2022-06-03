import axios from "axios";
import router from "next/router";
import React, { useState } from "react";

import TaskModal from "../tasks/TaskModal";
import useAuth from "../../src/hook/auth";
import { FaPlusCircle } from "react-icons/fa";

export default function TaskForm({ getTasks }: any) {
  const [showModal, setShowModal] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPoints, setTaskPoints] = useState("");
  const [taskCost, setTaskCost] = useState("");
  const { token } = useAuth() as any;

  const createTask = () => {
    const dataObj = {
      description: taskDescription,
      status: false,
      points: taskPoints,
      event_id: router.query.id,
      user_id: 2,
      cost: taskCost,
    };
    submitPostReq(dataObj);
  };

  const submitPostReq = async (data: object) => {
    try {
      await axios.post("  https://cc26-planout.herokuapp.com/tasks ", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <button
        className="border-2  text-black float-right md:mr-24 p-2 hover:cursor-pointer"
        data-modal-toggle="small-modal"
        onClick={() => setShowModal(true)}
      >
        Create Task
      </button> */}
      <FaPlusCircle
        data-tooltip-target="tooltip-top"
        data-tooltip-placement="top"
        data-modal-toggle="small-modal"
        onClick={() => setShowModal(true)}
        className="float-right md:mr-36 text-2xl hover:cursor-pointer fill-orange-300 hover:fill-red-600"
      />

      {showModal && (
        <TaskModal
          setShowModal={setShowModal}
          setTaskDescription={setTaskDescription}
          setTaskPoints={setTaskPoints}
          setTaskCost={setTaskCost}
          createTask={createTask}
          getTasks={getTasks}
        />
      )}
    </div>
  );
}
