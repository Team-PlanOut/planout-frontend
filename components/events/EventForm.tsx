import axios from "axios";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import useAuth from "../../src/hook/auth";
import EventModal from "./EventModal";
import { io } from "socket.io-client";
const socket = io("https://cc26-planout.herokuapp.com/");

export default function EventForm({ getEvents }: any) {
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventBudget, setEventBudget] = useState("");
  const { user, httpConfig } = useAuth() as any;

  function newEventNotification() {
    socket.emit("eventCreated", { eventname: eventName });
  }

  const dataObj = {
    event_name: eventName,
    host: user.uid,
    date: eventDate,
    budget: eventBudget,
  };

  const handleCreateEvent = async () => {
    try {
      if (dataObj.budget.length > 8) {
        alert("Please limit to 8 digits");
        return;
      }
      const response = await axios.post(
        "https://cc26-planout.herokuapp.com/events",
        dataObj,
        httpConfig
      );
      if (response.status === 200) {
        getEvents();
        newEventNotification();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        title="Add event"
        data-modal-toggle="small-modal"
        onClick={() => setShowModal(true)}
        className="bg-buttonColor font-body text-xl ml-8 mt-4 font-medium px-4 py-2 rounded-md shadow-md text-white flex transition hover:bg-blue-300"
      >
        <FaPlusCircle className="relative top-1 mr-1" />
        Add Event
      </button>
      <div className="m-auto bg-black">
        {showModal && (
          <EventModal
            setShowModal={setShowModal}
            setEventName={setEventName}
            setEventDate={setEventDate}
            setEventBudget={setEventBudget}
            handleCreateEvent={handleCreateEvent}
          />
        )}
      </div>
    </div>
  );
}
