import { useRouter } from "next/router";
import React from "react";
import useAuth from "./auth";

export function withPublic(Component: any) {
  return function WithPublic({ ...props }) {
    const auth = useAuth();
    const router = useRouter();

    if (auth?.user) {
      router.replace("/");
      return <h1>Loadinggggggg.......</h1>;
    }
    return <Component auth={auth} {...props} />;
  };
}

export function withProtected(Component: any) {
  return function WithProtected({ ...props }) {
    const auth = useAuth();
    const router = useRouter();

    if (!auth?.user) {
      router.replace("/login");
      return <h1>Loadinggggggg.......</h1>;
    }
    return <Component auth={auth} {...props} />;
  };
}
