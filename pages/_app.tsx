import "../src/config/firebase.config";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import React from 'react'

import AuthStateChanged from "../components/AuthStateChanged";
import { AuthProvider } from "../src/hook/auth";

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {

  const [events, setEvents] = useState([]);
  const [order, setOrder] = useState(0);

  const fetchEvents = async () => {
    const response = await axios.get('https://cc26-planout.herokuapp.com/events');
    const allEvents = response.data;
    setEvents(allEvents);
  };
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  useEffect(() => {
    toast("New event!");
  }, [events]);

  const notify = () => toast("Welcome to PlanOut!");

  return (
    <AuthProvider>
      <AuthStateChanged>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthStateChanged>
    </AuthProvider>
  );
}

export default MyApp;
