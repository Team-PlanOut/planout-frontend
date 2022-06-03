import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import TaskForm from "../../components/tasks/TaskForm";
import useAuth from "../../src/hook/auth";
import { Events, Tasks } from "../../types";
import { withProtected } from "../../src/hook/route";
import { FaMoneyBill } from "react-icons/fa";
import CostModal from "../../components/CostModal";

function SingleEventPage() {
  const router = useRouter();
  const [showCostModal, setShowCostModal] = useState<boolean>(false);
  const [event, setEvent] = useState<Events>({} as Events);
  const [task, setTask] = useState<Tasks[]>([]);
  console.log("~ task", task);
  const { token } = useAuth() as any;

  const {
    query: { id },
  } = router;

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

  useEffect(() => {
    getEventName();
    getTasks();
  }, []);

  const completeTask = async (id: number) => {
    const selectedTask = task.find((task) => task.id === id);

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

      <div className="container m-auto mt-24 box-content h-auto md:w-1/2 md:shadow-lg pb-10">
        <div className="text-center text-4xl font-header">{event.name}</div>

        <div className="overflow-hidden m-10">
          <div className="mt-10 text-center text-4xl font-header"></div>
          <div className="mt-10 text-center text-4xl font-header mb-2">
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
                  className={`p-5 border-2 md:w-1/2 m-auto mt-10 ${
                    task.status ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <div className="text-lg ml-2 font-body">
                    <div>Task: {task.description}</div>

                    <div>$ Cost:</div>
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
                  </div>
                  <div className="mt-5 hover:underline hover:cursor-pointer text-right">
                    <button
                      onClick={() => {
                        completeTask(task.id);
                        setTimeout(() => {
                          getTasks();
                        }, 200);
                      }}
                      className="text-2xl text-center font-body "
                    >
                      {task.status ? "Complete" : "Incomplete"}
                    </button>
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
