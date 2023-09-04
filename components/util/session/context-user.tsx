import {
  FC,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { UserModel } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { GetOneUserPrivateAPI } from "@/api/user";
import jwt_decode from "jwt-decode";

type AuthContextProps = {
  user: UserModel | undefined;
  userStorage: any;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  logout: () => void;
};

export const getCurrentUserFormToken = () => {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem(
        String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN)
      )
      : null;
  if (token !== null) {
    const user: any = jwt_decode(token);
    return user;
  } else {
    return;
  }
};

const initAuthContextPropsState = {
  saveAuth: () => { },
  setCurrentUser: () => { },
  user: undefined,
  logout: () => { },
};

const AuthContext = createContext<AuthContextProps>(
  initAuthContextPropsState as any
);

const useAuth = () => {
  return useContext(AuthContext);
};

const ContextUserProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [userStorage, setUserStorage] = useState(getCurrentUserFormToken());

  const { data: user } = GetOneUserPrivateAPI({ userId: userStorage?.id })

  const logout = () => {
    setUserStorage(undefined);
    window.localStorage.removeItem(
      String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN)
    );
  };

  return (
    <AuthContext.Provider value={{ ...user, userStorage, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { ContextUserProvider, useAuth };
