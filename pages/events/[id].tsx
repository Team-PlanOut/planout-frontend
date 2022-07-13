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
import JSConfetti from "js-confetti";

function SingleEventPage() {
  const socket = io("https://cc26-planout.herokuapp.com/");
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCostModal, setShowCostModal] = useState<boolean>(false);
  const [event, setEvent] = useState<Events>({} as Events);
  const [task, setTask] = useState<Tasks[]>([]);
  const [data, setData] = useState<any>([]);
  const [checkedMembers, setCheckedMembers] = useState<string[]>([]);
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
    if (
      eventMembers.some(
        (findDup: { firstName: string }) =>
          checkedMembers.indexOf(findDup.firstName) >= 0
      )
    ) {
      alert("One of the users you selected is already in the event!");
      return;
    }

    try {
      checkedMembers.forEach((checkedPerson) => {
        axios.post(
          `https://cc26-planout.herokuapp.com/eventusers`,
          {
            event_id: id,
            user_id: checkedPerson,
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
      }, 400);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserData = async () => {
    const id = user.uid;
    const response = await axios.get(
      `https://cc26-planout.herokuapp.com/friends/${id}`,
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

  const taskCompleteNotification = (task: Tasks | undefined) => {
    socket.emit("taskCompleted", {
      eventname: `${event.name}`,
      taskName: `${task?.description}`,
    });
  };

  const completeTask = async (id: number) => {
    const jsConfetti = new JSConfetti();

    const selectedTask = task.find((task: { id: number }) => task.id === id);

    if (selectedTask?.status) {
      try {
        const response = await axios.put(
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
        if (response.status === 200) {
          getTasks();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.put(
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
        if (response.status === 200) {
          getTasks();
          taskCompleteNotification(selectedTask);
          jsConfetti.addConfetti();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sortedTasks = task.sort((a: { id: number }, b: { id: number }) =>
    a.id > b.id ? 1 : -1
  );

  useEffect(() => {
    fetchUserData();
    getEventUsers();
    getEventName();
    getTasks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="h-screen">
        <div className="shadow-2xl container m-auto mt-24 bg-dashboard box-content h-5/6 scrollbar overflow-y-auto border md:w-1/2 pb-10 mb-2 rounded-lg">
          <div className="text-center text-5xl font-body font-bold mt-4 capitalize break-all">
            {event.name}
          </div>
          <div
            className="float-right mr-20  font-body underline hover:cursor-pointer flex mt-2 md:text-2xl"
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
              checkedMembers={checkedMembers}
              setCheckedMembers={setCheckedMembers}
              handleAddMember={handleAddMember}
              eventMembers={eventMembers}
            />
          ) : null}
          <div className="overflow-hidden m-10">
            <div className="mt-10 text-center text-4xl font-body font-bold mb-2">
              TASKS
            </div>

            <div className="overflow-hidden pb-14 ">
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
                    className={`p-5 md:rounded-lg md:w-1/2 m-auto mt-10 shadow-lg ${
                      task.status ? "bg-completedBox" : "bg-red-200"
                    }`}
                  >
                    <div className="text-lg ml-2 font-body">
                      <div className="float-right">
                        <div className=" relative inline-block">
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
                              className="rounded-md hover:bg-gray-200 hover:rounded-full text-sm font-medium text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-200"
                              id="menu-button"
                              aria-expanded="true"
                              aria-haspopup="true"
                            >
                              <HiOutlineDotsHorizontal className="w-6 h-6 " />
                            </button>
                          </div>
                          {openMenu === index && (
                            <div
                              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="menu-button"
                            >
                              <div className="py-2" role="none">
                                <div
                                  className="hover: cursor-pointer hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm"
                                  onClick={() => setShowCostModal(true)}
                                  role="menuitem"
                                >
                                  <div className="inline-flex ">
                                    <AiFillEdit className="relative top-1 mr-1" />{" "}
                                    Edit cost
                                  </div>
                                </div>
                                {showCostModal ? (
                                  <CostModal
                                    setShowCostModal={setShowCostModal}
                                    task={task}
                                    getTasks={getTasks}
                                  />
                                ) : null}
                                <div
                                  className="hover: cursor-pointer hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm"
                                  role="menuitem"
                                  id="menu-item-1"
                                >
                                  <AssignTaskForm
                                    id={id}
                                    task={task}
                                    getTasks={getTasks}
                                  />
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
                      <div className="text-xl">Task: {task.description}</div>
                      <div className="text-xl"> Cost: ${task.cost} </div>

                      <div
                        className="mr-2 text-xl"
                        data-modal-toggle="small-modal"
                      >
                        {task.user_id !== user.uid
                          ? `Assigned to ${task.userFirstName}`
                          : "Assigned to me!"}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-row justify-end hover:cursor-pointer ">
                      <div
                        onClick={() => completeTask(task.id)}
                        className="font-body"
                      >
                        {task.status ? (
                          <button className="mr-1 inline-flex bg-login text-sm border px-2 py-2 rounded-md shadow-md text-white transition hover:bg-eventsButton">
                            <FaCheckCircle className="w-3 h-3 mr-1 relative top-1" />{" "}
                            Completed
                          </button>
                        ) : (
                          <button className="mr-1 bg-completeButton text-sm border hover:border-white items-center px-2 py-2 rounded-md shadow-md  text-white transition hover:bg-opacity-80 ">
                            Mark as complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withProtected(SingleEventPage);