import "../styles/globals.css";
import "../src/config/firebase.config";
import type { AppProps } from "next/app";
import { AuthProvider } from "../src/hook/auth";
import AuthStateChanged from "../components/AuthStateChanged";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AuthStateChanged>
        <Component {...pageProps} />;
      </AuthStateChanged>
    </AuthProvider>
  );
}

export default MyApp;
