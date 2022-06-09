import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import TaskForm from "../../components/tasks/TaskForm";
import useAuth from "../../src/hook/auth";
import { Events, Tasks } from "../../types";
import { withProtected } from "../../src/hook/route";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import CostModal from "../../components/CostModal";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import AssignTaskForm from "../../components/tasks/AssignTaskForm";
import MembersModal from "../../components/events/MembersModal";

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
  const [openMenu, setOpenMenu] = useState<boolean>(false);

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
    console.log(response.data);
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
  const showOnlyDate = (date: Date) => date.toString().slice(0, 10);

  return (
    <div>
      <Navbar />

      <div className="container m-auto mt-24 box-content h-screen md:w-1/2 pb-10 mb-2">
        <div className="text-center text-5xl font-body font-bold capitalize">
          {event.name}
          <div className="text-xl mt-2">{showOnlyDate(event.date)}</div>
        </div>
        <div
          className="float-right mr-20  text-sm underline hover:cursor-pointer flex mt-2"
          data-modal-toggle="small-modal"
          onClick={() => setShowMembersModal(true)}
        >
          <IoIosPeople className="relative top-1 mr-1 -z-10" />
          Members
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
          <div className="mt-10 text-center text-4xl font-body font-bold mb-2">
            TASKS
          </div>

          <div className="overflow-hidden">
            <div>
              <TaskForm getTasks={getTasks} />
            </div>
            <div>
              {sortedTasks.map((task: any, index: number) => (
                <div
                  key={task.id}
                  className={`p-5 md:rounded-lg md:w-1/2 m-auto mt-10 ${
                    task.status ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <div className="text-lg ml-2 font-body">
                    <div className="float-right">
                      <div className="relative inline-block">
                        <div className="flex justify-end">
                          <button
                            onClick={() => setOpenMenu(!openMenu)}
                            type="button"
                            className="rounded-md hover:bg-gray-200 hover:rounded-full text-sm font-medium text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-orange-400"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                          >
                            <HiOutlineDotsHorizontal />
                          </button>
                        </div>
                        {openMenu && (
                          <div
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                          >
                            <div className="py-1" role="none">
                              <div
                                onClick={() => setShowCostModal(true)}
                                className="hover:cursor-pointer hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                              >
                                Edit Cost
                              </div>
                              {showCostModal ? (
                                <CostModal
                                  setShowCostModal={setShowCostModal}
                                />
                              ) : null}
                              <div
                                className="hover: cursor-pointer hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                id="menu-item-1"
                              >
                                <StripeCheckout />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>Task: {task.description}</div>
                    <div> Cost: {task.cost} ¥</div>

                    <div className="mr-2" data-modal-toggle="small-modal">
                      {task.user_id !== user.uid
                        ? `Assigned to ${task.userFirstName}`
                        : "Assigned to me!"}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-row justify-end hover:cursor-pointer ">
                    <div
                      onClick={() => {
                        completeTask(task.id);
                        setTimeout(() => {
                          getTasks();
                        }, 200);
                      }}
                      className="font-body"
                    >
                      {task.status ? (
                        <button className="mr-1 inline-flex bg-orange-300 text-sm px-1 py-1 rounded-md shadow-md text-white transition hover:bg-orange-400">
                          <FaCheckCircle className="w-3 h-3 mr-1 relative top-1" />{" "}
                          Completed
                        </button>
                      ) : (
                        <button className="mr-1 bg-orange-300 text-sm items-center px-1 py-1 rounded-md shadow-md text-white transition hover:bg-orange-400">
                          Complete task
                        </button>
                      )}
                    </div>
                    <AssignTaskForm id={id} getTasks={getTasks} />
                    {/* <button
                      data-modal-toggle="small-modal"
                      onClick={() => setShowCostModal(true)}
                      className="mr-1 ml-1 font-body bg-orange-300 text-sm items-center px-1 py-1 rounded-md shadow-md text-white transition hover:bg-orange-400"
                    >
                      Add cost
                    </button> */}
                    {/* {showCostModal ? (
                      <CostModal setShowCostModal={setShowCostModal} />
                    ) : null} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withProtected(SingleEventPage);
