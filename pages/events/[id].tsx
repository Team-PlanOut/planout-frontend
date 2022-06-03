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

  let [complete, setComplete] = useState<number | null>(null);

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

    if (selectedTask.status) {
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
              {task.map((task: any, index: number) => (
                <div
                  key={task.id}
<<<<<<< HEAD
                  className={`p-5 shadow-md md:w-2/3 m-auto mt-10 ${
                    complete === index ? "bg-green-100" : "bg-red-100"
=======
                  className={`p-5 border-2 md:w-1/2 m-auto mt-10 ${
                    task.status ? "bg-green-100" : "bg-red-100"
>>>>>>> daa6c7f6aa8d66e2ca79775b6063e3ab95d22a20
                  }`}
                >
                  <div className="text-lg ml-2 font-body">
                    <div>Task: {task.description}</div>

                    <div>$ Cost:</div>
                    <div className="mt-2 flex text-base hover:underline hover:cursor-pointer">
                      {" "}
                      <FaMoneyBill className="relative top-1 mr-1 text-lg" />
                      <div
                        className="mr-2"
                        data-modal-toggle="small-modal"
                        onClick={() => setShowCostModal(true)}
                      >
                        {" "}
                        Add cost
                      </div>
                      {showCostModal ? (
                        <CostModal setShowCostModal={setShowCostModal} />
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-5 hover:underline hover:cursor-pointer text-right">
<<<<<<< HEAD
                    {complete === index ? (
                      <div onClick={() => setComplete(null)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div onClick={() => completeTask(task.id)}>
                        Mark as complete
                      </div>
                    )}
=======
                    <button
                      onClick={() => completeTask(task.id)}
                      className="text-2xl text-center font-body "
                    >
                      {task.status ? "Complete" : "Incomplete"}
                    </button>
>>>>>>> daa6c7f6aa8d66e2ca79775b6063e3ab95d22a20
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

//                       <div onClick={() => setComplete(null)}>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-6 w-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth={2}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                       </div>
//                     ) : (
//                       <div onClick={() => completeTask(task.id)}>
//                         Complete task
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default withProtected(SingleEventPage);
