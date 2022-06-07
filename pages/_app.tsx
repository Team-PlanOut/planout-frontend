import "../src/config/firebase.config";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import axios from "axios";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import AuthStateChanged from "../components/AuthStateChanged";
import { AuthProvider } from "../src/hook/auth";

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {

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
