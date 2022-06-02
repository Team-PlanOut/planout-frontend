import axios from "axios";
import React, { useState } from "react";

import useAuth from "../../src/hook/auth";
import EventModal from "./EventModal";

export default function EventForm({ getEvents }: any) {
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventBudget, setEventBudget] = useState("");
  const { token } = useAuth() as any;

  const createEvent = () => {
    const dataObj = {
      event_name: eventName,
      host: 1,
      date: eventDate,
      budget: eventBudget,
    };
    submitPostReq(dataObj);
  };

  const submitPostReq = async (data: object) => {
    try {
      await axios.post("https://cc26-planout.herokuapp.com/events", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="block text-white float-right mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        data-modal-toggle="authentication-modal"
        onClick={() => setShowModal(true)}
      >
        Create Event
      </button>
      <div className="m-auto bg-black">
        {showModal && (
          <EventModal
            setShowModal={setShowModal}
            setEventName={setEventName}
            setEventDate={setEventDate}
            setEventTime={setEventTime}
            setEventBudget={setEventBudget}
            createEvent={createEvent}
            getEvents={getEvents}
          />
        )}
      </div>
    </div>
  );
}
