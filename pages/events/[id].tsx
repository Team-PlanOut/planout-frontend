import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import TaskForm from "../../components/tasks/TaskForm";
import useAuth from "../../src/hook/auth";
import { Events, Tasks } from "../../types";
import { withProtected } from "../../src/hook/route";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import CostModal from "../../components/CostModal";
import { io } from "socket.io-client";
import DeleteTask from "../../components/tasks/DeleteTask";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import AssignTaskForm from "../../components/tasks/assign/AssignTaskForm";
import MembersModal from "../../components/events/members/MembersModal";
import { AiFillEdit } from "react-icons/ai";
import StripeCheckout from "../../components/StripeCheckout";

function SingleEventPage() {
  const socket = io("https://cc26-planout.herokuapp.com/");
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [event, setEvent] = useState<Events>({} as Events);
  const [task, setTask] = useState<Tasks[]>([]);
  const [data, setData] = useState<any>([]);
  const [member, setMember] = useState<string[]>([]);
  const [eventMembers, setEventMembers] = useState<any>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const { token, user } = useAuth() as any;

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

  const handleAddMember = async () => {
    member.forEach((user) => {
      axios.post(
        `https://cc26-planout.herokuapp.com/eventusers`,
        {
          event_id: id,
          user_id: user,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    });

    setTimeout(() => {
      getEventUsers();
    }, 300);
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
    socket.emit("taskCreated", { eventname: `${event.name}` });
  };

  const taskCompleteNotification = (task) => {
    socket.emit("taskCompleted", {
      eventname: `${event.name}`,
      taskName: `${task.description}`,
    });
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

  return (
    <div>
      <Navbar />

      <div className="container m-auto mt-24 bg-container bg-opacity-10 box-content h-screen no-scrollbar overflow-y-auto border md:w-1/2 pb-10 mb-2">
        <div className="text-center text-5xl font-body font-bold mt-2 capitalize">
          {event.name}
        </div>
        <div
          className="float-right mr-20  md:text-base underline hover:cursor-pointer flex mt-2"
          data-modal-toggle="small-modal"
          onClick={() => setShowModal(true)}
        >
          <IoIosPeople className="relative top-1 mr-1 -z-10" />
          Members
        </div>

        {showModal ? (
          <MembersModal
            setShowModal={setShowModal}
            data={data}
            member={member}
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
              <TaskForm
                getTasks={getTasks}
                newTaskNotification={newTaskNotification}
              />
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
                            onClick={() => {
                              if (openMenu === index) {
                                setOpenMenu(null);
                              } else {
                                setOpenMenu(index);
                              }
                            }}
                            type="button"
                            className="rounded-md hover:bg-gray-200 hover:rounded-full text-sm font-medium text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-orange-200"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                          >
                            <HiOutlineDotsHorizontal className="w-6 h-6" />
                          </button>
                        </div>
                        {openMenu === index && (
                          <div
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                          >
                            <div className="py-1" role="none">
                              <div
                                onClick={() => setShowModal(true)}
                                className="inline-flex hover:cursor-pointer hover:bg-gray-100 text-gray-700 px-4 py-2 text-sm"
                                role="menuitem"
                              >
                                <AiFillEdit className="relative top-1 mr-1" />{" "}
                                Edit cost
                              </div>
                              {showModal ? (
                                <CostModal setShowModal={setShowModal} />
                              ) : null}
                              <div
                                className="hover: cursor-pointer hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                id="menu-item-1"
                              >
                                <AssignTaskForm id={id} getTasks={getTasks} />
                              </div>
                              <div
                                className="hover: cursor-pointer hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                id="menu-item-1"
                              >
                                <StripeCheckout />
                              </div>
                              <div
                                className="hover: cursor-pointer hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                id="menu-item-1"
                              >
                                <DeleteTask
                                  task={task}
                                  getTasks={getTasks}
                                  setOpenMenu={setOpenMenu}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>Task: {task.description}</div>
                    <div> Cost: ${task.cost} </div>

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
                        taskCompleteNotification(task);
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
                    <AssignTaskForm id={id} task={task} getTasks={getTasks} />
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
