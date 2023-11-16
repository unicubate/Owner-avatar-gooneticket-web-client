import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";
import { getTokenToLocalStorage } from "./context-user";

const PublicComponent = (Component: ComponentType) => {
  const userToken = getTokenToLocalStorage();
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const userIsAuthenticated = userToken !== null;

    useEffect(() => {
      if (userIsAuthenticated) {
        router.push("/");
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
};

export { PublicComponent };
