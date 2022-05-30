import React, { useState } from "react";
import Modal from "./Modal";

export default function EventForm() {
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventBudget, setEventBudget] = useState(0);

  const createEvent = () => {
    try {
      fetch("https://cc26-planout.herokuapp.com/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: eventName,
          date: eventDate,
          budget: eventBudget,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(eventName, eventDate, eventBudget);
  return (
    <div>
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        data-modal-toggle="authentication-modal"
        onClick={() => setShowModal(true)}
      >
        Create Event
      </button>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setEventName={setEventName}
          setEventDate={setEventDate}
          setEventBudget={setEventBudget}
          createEvent={createEvent}
        />
      )}
    </div>
  );
}
