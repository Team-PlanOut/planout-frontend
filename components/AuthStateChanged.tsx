import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import useAuth from "../src/hook/auth";
import { MoonLoader } from "react-spinners";

export default function AuthStateChanged({ children }: any) {
  const { setUser, setToken } = useAuth();
  const [loading, setLoading] = useState<Boolean>(true);
  const color: string = "#3977C7";
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      user?.getIdToken().then((uniqueToken) => {
        setToken(uniqueToken);
      });
    });
  }, [setUser, setToken]);

  if (loading) {
    return (
      <div className="flex flex-row justify-center mt-32">
        <MoonLoader color={color} size={100} />
      </div>
    );
  }

  return children;
}
