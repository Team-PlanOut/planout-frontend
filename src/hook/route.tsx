import { useRouter } from "next/router";
import React from "react";
import useAuth from "./auth";
import MoonLoader from "react-spinners/ClipLoader";

export function withPublic(Component: any) {
  return function WithPublic({ ...props }) {
    const auth = useAuth();
    const router = useRouter();

    if (auth?.user) {
      router.replace("/");
      return (
        <div className="flex flex-row justify-center mt-32">
          <MoonLoader color={"#201F17"} size={150} />
        </div>
      );
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
      return (
        <div className="flex flex-row justify-center mt-32">
          <MoonLoader color={"#201F17"} size={150} />
        </div>
      );
    }
    return <Component auth={auth} {...props} />;
  };
}
