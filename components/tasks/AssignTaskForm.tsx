import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import useAuth from "../../src/hook/auth";
import AssignTaskModal from "./AssignTaskModal";

export default function AssignTask({
  id,
  getTasks,
}: {
  id: string | string[] | undefined;
  getTasks: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [eventUsers, setEventUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const { token } = useAuth() as any;

  const assignTask = async (userId: number) => {
    try {
      await axios.put(
        `https://cc26-planout.herokuapp.com/tasks/${id}`,
        {
          id: id,
          user_id: userId,
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

  const getUsersInEvent = async (id: number) => {
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
      <BsFillPersonLinesFill
        data-modal-toggle="small-modal"
        onClick={() => setShowModal(true)}
        className="float-right   text-2xl hover:cursor-pointer hover:fill-orange-300"
      />

      <div className="m-auto bg-black">
        {showModal && (
          <AssignTaskModal
            setShowModal={setShowModal}
            assignTask={assignTask}
            eventUsers={eventUsers}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            getTasks={getTasks}
          />
        )}
      </div>
    </div>
  );
}
