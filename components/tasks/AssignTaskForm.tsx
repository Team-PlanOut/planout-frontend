import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import useAuth from "../../src/hook/auth";
import AssignTaskModal from "./AssignTaskModal";

export default function AssignTask({ id }: { id: number }) {
  const [showModal, setShowModal] = useState(false);
  const [eventUsers, setEventUsers] = useState([]);

  const { token, user } = useAuth() as any;

  const assignTask = async (id: number) => {
    // const selectedTask = task.find((task) => task.id === id);
    try {
      await axios.put(
        `https://cc26-planout.herokuapp.com/tasks/${id}`,
        {
          id: id,
          user_id: user.uid,
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
      <FaPlusCircle
        data-modal-toggle="small-modal"
        onClick={() => setShowModal(true)}
        className="float-right md:mr-48 text-2xl hover:cursor-pointer hover:fill-orange-300"
      />

      <div className="m-auto bg-black">
        {showModal && (
          <AssignTaskModal
            setShowModal={setShowModal}
            assignTask={assignTask}
            eventUsers={eventUsers}
          />
        )}
      </div>
    </div>
  );
}
