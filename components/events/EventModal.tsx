import React from "react";

export default function Event({
  setShowModal,
  setEventName,
  setEventDate,
  setEventBudget,
  handleCreateEvent,
}: {
  setShowModal: (showModal: boolean) => void;
  setEventName: (eventName: string) => void;
  setEventDate: (eventDate: string) => void;
  setEventBudget: (eventBudget: string) => void;
  handleCreateEvent: () => void;
}) {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleCreateEvent();
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
                    Enter information about your event
                  </h3>
                  <form className="space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="event-name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Event name
                      </label>
                      <input
                        type="text"
                        name="event_name"
                        id="event_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter event name"
                        onChange={(e) => setEventName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="budget"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Budget
                      </label>
                      <input
                        type="number"
                        name="budget"
                        id="budget"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        min="0"
                        max="10000000"
                        onChange={(e) => setEventBudget(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Create event
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
