import React, { useState } from "react";
import Modal from "./Modal";

export default function EventForm() {
  const [showModal, setShowModal] = useState(false);

  const createEvent = () => {
    fetch("https://cc26-planout.herokuapp.com/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "x-auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        // host: "",
        name: "",
        event_name: "",
        date: "",
        budget: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

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

      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  );
}
