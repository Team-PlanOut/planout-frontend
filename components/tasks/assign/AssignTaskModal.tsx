import { MouseEvent } from "react";

export default function AssignTaskModal({
  setShowModal,
  assignTask,
  taskId,
  eventUsers,
  setSelectedUser,
}: {
  setShowModal: (showModal: boolean) => void;
  assignTask: (id: string) => void;
  taskId: string;
  eventUsers: any;
  setSelectedUser: (user: string) => void;
}) {
  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    assignTask(taskId);
    setShowModal(false);
  };

  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className=" auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="m-auto mt-16 p-4 w-full max-w-md h-full md:h-auto">
        <div className="m-auto bg-white rounded-lg shadow dark:bg-gray-700">
          <div
            className="fixed z-10 overflow-y-auto top-0 w-full left-0"
            id="modal"
          >
            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-20" />
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                &#8203;
              </span>
              <div
                className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <button
                  type="button"
                  className="float-right mr-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="authentication-modal"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>

                <div className="py-6 px-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    Assign a user to complete the task:
                  </h3>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    {eventUsers.map((user: any) => (
                      <div
                        key={user.id}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                      >
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor={`user-${user.id}`}
                        >
                          {user.firstName}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <svg
                              className="h-5 w-5 text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            ></svg>
                          </div>
                          <input
                            id={`user-${user.id}`}
                            type="radio"
                            name="user"
                            value={user.id}
                            className="form-radio h-5 w-5 text-gray-600 transition-colors duration-200 ease-in-out"
                            onChange={() => setSelectedUser(user.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <form className="space-y-6" action="#">
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Assign
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
