import { useRouter } from "next/router";
import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

import useAuth from "./auth";

export function withPublic(Component: any) {
  return function WithPublic({ ...props }) {
    const auth = useAuth();
    const router = useRouter();
    const color: string = "#3977C7";

    if (auth?.user) {
      router.replace("/");
      return (
        <div className="flex flex-row justify-center mt-32">
          <MoonLoader color={color} size={150} />
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
    const color: string = "#3977C7";

    if (!auth?.user) {
      router.replace("/login");
      return (
        <div className="flex flex-row justify-center mt-32">
          <MoonLoader color={color} size={100} />
        </div>
      );
    }
    return <Component auth={auth} {...props} />;
  };
}
