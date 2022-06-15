import "../src/config/firebase.config";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { useEffect } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
const socket = io("https://cc26-planout.herokuapp.com/");

import AuthStateChanged from "../components/AuthStateChanged";
import { AuthProvider } from "../src/hook/auth";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    socket.on("newTask", (data) => {
      toast(`Hey, Listen! There's a new task in ${data.eventname}`);
    });
    socket.on("newEvent", (data) => {
      toast(`NEW EVENT ALERT: ${data.eventname}`);
    });
    socket.on("taskComplete", (data) => {
      toast.success(
        `${data.taskName} has been completed in the event: ${data.eventname}!`
      );
    });
  }, []);
  return (
    <AuthProvider>
      <AuthStateChanged>
        <Component {...pageProps} />
        <ToastContainer
          style={{
            width: "350px",
          }}
        />
      </AuthStateChanged>
    </AuthProvider>
  );
}

export default MyApp;
