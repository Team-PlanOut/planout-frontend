import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import useAuth from "../../../src/hook/auth";
import AssignTaskModal from "./AssignTaskModal";

export default function AssignTaskForm({
  id,
  getTasks,
}: {
  id: any;
  getTasks: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [eventUsers, setEventUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const { token } = useAuth() as any;

  const assignTask = async () => {
    try {
      await axios.put(
        `https://cc26-planout.herokuapp.com/tasks/${id}`,
        {
          event_id: id,
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
      {/* <BsFillPersonLinesFill
        data-modal-toggle="small-modal"
        onClick={() => setShowModal(true)}
        className="float-right   text-2xl hover:cursor-pointer hover:fill-orange-300"
      /> */}

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
            eventUsers={eventUsers}
            setSelectedUser={setSelectedUser}
            getTasks={getTasks}
          />
        )}
      </div>
    </div>
  );
}
