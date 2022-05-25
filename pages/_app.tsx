import "../styles/globals.css";
import "../src/config/firebase.config";
import type { AppProps } from "next/app";
import { AuthProvider } from "../src/hook/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}

export default MyApp;
