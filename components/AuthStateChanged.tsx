import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import useAuth from "../src/hook/auth";
export default function AuthStateChanged({ children }: any) {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <div> LOADING.............</div>;
  }

  return children;
}
