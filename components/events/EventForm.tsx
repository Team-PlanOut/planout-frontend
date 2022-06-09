import axios from "axios";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import useAuth from "../../src/hook/auth";
import EventModal from "./EventModal";
import { io } from 'socket.io-client';
const socket = io('https://cc26-planout.herokuapp.com/');

export default function EventForm({ getEvents }: any) {
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventBudget, setEventBudget] = useState("");
  const { token, user } = useAuth() as any;

  function newEventNotification(){
    socket.emit('eventCreated', { eventname: eventName });
  };

  const createEvent = () => {
    const dataObj = {
      event_name: eventName,
      host: user.uid,
      date: eventDate,
      budget: eventBudget,
    };

    submitPostReq(dataObj);
  };

  const submitPostReq = async (data: object) => {
    console.log("submitting post request with data", data);
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
      <FaPlusCircle
        data-modal-toggle="small-modal"
        onClick={() => setShowModal(true)}
        className="float-right md:mr-48 text-2xl hover:cursor-pointer hover:fill-orange-300"
      />

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
            newEventNotification={newEventNotification}
          />
        )}
      </div>
    </div>
  );
}
