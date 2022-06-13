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
  const { token, user } = useAuth() as any;

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
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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
      <FaPlusCircle
        title="Add event"
        data-modal-toggle="small-modal"
        onClick={() => setShowModal(true)}
        className="float-right md:mr-40 text-2xl hover:cursor-pointer hover:fill-eventsButton"
      />

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
