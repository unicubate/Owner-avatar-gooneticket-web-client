import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";

const PublicComponent = (Component: ComponentType) => {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const user =
      typeof window !== "undefined"
        ? JSON.parse(
            String(
              localStorage.getItem(
                String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN)
              )
            )
          )
        : null;
    const userIsAuthenticated = user !== null;

    useEffect(() => {
      if (userIsAuthenticated) {
        router.push("/");
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
};

export { PublicComponent };
