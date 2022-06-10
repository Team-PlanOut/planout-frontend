import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../../src/hook/auth";
import AssignTaskModal from "./AssignTaskModal";

export default function AssignTaskForm({
  id,
  task,
  getTasks,
}: {
  task: {
    id: string;
  };
  id: any;
  getTasks: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [eventUsers, setEventUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const { token } = useAuth() as any;

  const taskId = task.id;

  const assignTask = async (taskId: string) => {
    try {
      await axios.put(
        `https://cc26-planout.herokuapp.com/tasks/${taskId}`,
        {
          id: taskId,
          user_id: selectedUser,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      getTasks();
    }, 200);
  };

  const getUsersInEvent = async (id: string) => {
    const response = await axios.get(
      `https://cc26-planout.herokuapp.com/eventusers/users/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    setEventUsers(response.data);
  };

  useEffect(() => {
    getUsersInEvent(id);
  }, []);

  return (
    <div>
      <button
        data-modal-toggle="small-modal"
        onClick={() => setShowModal(true)}
        className="bg-orange-300 text-sm font-body items-center px-1 py-1 rounded-md shadow-md text-white transition hover:bg-orange-400"
      >
        Assign
      </button>
      <div className="m-auto bg-black">
        {showModal && (
          <AssignTaskModal
            setShowModal={setShowModal}
            assignTask={assignTask}
            taskId={taskId}
            eventUsers={eventUsers}
            setSelectedUser={setSelectedUser}
          />
        )}
      </div>
    </div>
  );
}
