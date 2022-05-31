import React, { useState } from "react";
import useAuth from "../src/hook/auth";
import EventModal from "./EventModal";

export default function EventForm() {
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventBudget, setEventBudget] = useState(0);

  const { user } = useAuth() as any;

  const createEvent = () => {
    try {
      fetch("https://cc26-planout.herokuapp.com/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          event_name: eventName,
          host: 1,
          date: eventDate,
          // hostFirstName: user.multiFactor.delegate.email,
          // date: "2022-06-22T00:00:00.000Z",
          // time: eventTime,
          budget: eventBudget,
        }),
      });
    } catch (error) {
      console.log(error);
    }
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

      {showModal && (
        <EventModal
          setShowModal={setShowModal}
          setEventName={setEventName}
          setEventDate={setEventDate}
          setEventTime={setEventTime}
          setEventBudget={setEventBudget}
          createEvent={createEvent}
        />
      )}
    </div>
  );
}
