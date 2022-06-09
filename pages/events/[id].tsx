import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TaskForm from "../../components/tasks/TaskForm";
import useAuth from "../../src/hook/auth";
import { Events, Tasks } from "../../types";
import { withProtected } from "../../src/hook/route";
import { FaHandPointRight, FaMoneyBill } from "react-icons/fa";
import CostModal from "../../components/CostModal";
import { FaTrash } from "react-icons/fa";

import { io } from 'socket.io-client';
const socket = io('http://localhost:8080');

import AssignTaskForm from "../../components/tasks/assign/AssignTaskForm";
import MembersModal from "../../components/events/members/MembersModal";

import StripeCheckout from "../../components/StripeCheckout";

function SingleEventPage() {
  const router = useRouter();
  const [showCostModal, setShowCostModal] = useState<boolean>(false);
  const [event, setEvent] = useState<Events>({} as Events);
  const [task, setTask] = useState<Tasks[]>([]);

  const [showMembersModal, setShowMembersModal] = useState<boolean>(false);

  const { token, user } = useAuth() as any;
  const [data, setData] = useState<any>([]);
  const [member, setMember] = useState<string>("");
  const [eventMembers, setEventMembers] = useState<any>(null);

  const {
    query: { id },
  } = router;

  const getEventUsers = async () => {
    const response = await axios.get(
      `https://cc26-planout.herokuapp.com/eventusers/users/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setEventMembers(response.data);
    return data;
  };

  const addMemberToEvent = async (data: object) => {
    try {
      await axios.post("https://cc26-planout.herokuapp.com/eventusers", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMember = () => {
    const formData = {
      event_id: id,
      user_id: member,
    };
    addMemberToEvent(formData);
    getEventUsers();
  };

  const fetchUserData = async () => {
    const response = await axios.get(
      "https://cc26-planout.herokuapp.com/users",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setData(response.data);
    return data;
  };

  const getEventName = async () => {
    const response = await axios.get(
      `https://cc26-planout.herokuapp.com/events/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setEvent(response.data);
  };

  const getTasks = async () => {
    const response = await axios.get(
      `https://cc26-planout.herokuapp.com/tasks/event/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setTask(response.data);
  };

  const newTaskNotification = () => {
    socket.emit('taskCreated', { eventname: `${event.name}` });
  };

  useEffect(() => {
    fetchUserData();
    getEventUsers();
  }, []);

  useEffect(() => {
    getEventName();
    getTasks();
  }, []);

  const completeTask = async (id: number) => {
    const selectedTask = task.find((task: { id: number }) => task.id === id);

    if (selectedTask?.status) {
      try {
        await axios.put(
          `https://cc26-planout.herokuapp.com/tasks/${id}`,
          {
            id: id,
            status: false,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.put(
          `https://cc26-planout.herokuapp.com/tasks/${id}`,
          {
            id: id,
            status: true,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sortedTasks = task.sort((a: { id: number }, b: { id: number }) =>
    a.id > b.id ? 1 : -1
  );

  async function deleteEvent(eventId: any) {
    console.log("event", eventId);
    await axios.delete(`https://cc26-planout.herokuapp.com/events/${eventId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  return (
    <div>
      <Navbar />

      <div className="container m-auto mt-24 box-content h-auto md:w-1/2 md:shadow-lg pb-10">
        <div className="text-center text-4xl font-header capitalize">
          {event.name}
        </div>
        <div
          className="float-right mr-20  underline hover:cursor-pointer flex mt-2"
          data-modal-toggle="small-modal"
          onClick={() => setShowMembersModal(true)}
        >
          <FaHandPointRight className="relative top-1 mr-1 -z-10" />
          Show Members
        </div>
        {showMembersModal ? (
          <MembersModal
            setShowMembersModal={setShowMembersModal}
            data={data}
            setMember={setMember}
            handleAddMember={handleAddMember}
            eventMembers={eventMembers}
          />
        ) : null}

        <div className="overflow-hidden m-10">
          <div className="mt-10 text-center text-4xl font-header"></div>
          <div className="mt-10 text-center text-4xl font-header mb-2">
            TASKS
          </div>

          <div className="overflow-hidden">
            <div>
              <TaskForm getTasks={getTasks}
              newTaskNotification={newTaskNotification} />
            </div>
            <div>
              {sortedTasks.map((task: any, index: number) => (
                <div
                  key={task.id}
                  className={`p-5 border-2 md:w-1/2 m-auto mt-10 ${
                    task.status ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <div className="text-lg ml-2 font-body">
                    <div>Task: {task.description}</div>

                    <div>$ Cost: {task.cost}</div>
                    <div className="mt-2 flex text-base hover:underline hover:cursor-pointer">
                      <FaMoneyBill className="relative top-1 mr-1 text-lg" />
                      <div
                        className="mr-2"
                        data-modal-toggle="small-modal"
                        onClick={() => setShowCostModal(true)}
                      >
                        Add cost
                      </div>
                      {showCostModal ? (
                        <CostModal setShowCostModal={setShowCostModal} />
                      ) : null}
                    </div>
                    <div className="mr-2" data-modal-toggle="small-modal">
                      {task.user_id !== user.uid
                        ? `Assigned to ${task.userFirstName}`
                        : "Assigned to me!"}
                    </div>
                  </div>
                  <AssignTaskForm id={id} getTasks={getTasks} />
                  <StripeCheckout />
                  <div className="mt-5 hover:underline hover:cursor-pointer text-right">
                    <button
                      onClick={() => {
                        completeTask(task.id);
                        setTimeout(() => {
                          getTasks();
                        }, 200);
                      }}
                      className="text-xl text-center font-body "
                    >
                      {task.status ? "Complete" : "Incomplete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="z-10 mt-5 hover:underline hover:cursor-pointer text-right">
          <button
            type="button"
            onClick={() => {
              deleteEvent(event.id);
              router.push("/events");
            }}
            className="inset-y-0.5 text-2xl text-center font-body "
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default withProtected(SingleEventPage);
