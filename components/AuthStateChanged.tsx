import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import useAuth from "../src/hook/auth";
export default function AuthStateChanged({ children }: any) {
  const { setUser } = useAuth() as any;
  const [loading, setLoading] = useState<Boolean>(true);
  const [token, setToken] = useState<String | null>("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      user?.getIdToken().then((uniqueToken) => {
        setToken(uniqueToken);
      });
    });
  }, []);

  if (loading) {
    return <div> LOADING.............</div>;
  }

  return children;
}
