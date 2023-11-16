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
import { GetOneUserPrivateAPI } from "@/api-site/user";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "next-themes";

type AuthContextProps = {
  user: UserModel | undefined;
  userStorage: any;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  logout: () => void;
};

export const logoutUser = () => {
  localStorage.removeItem(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN));
  window.location.href = `${process.env.NEXT_PUBLIC_SITE}`;
};

export const getCurrentUserFormToken = () => {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem(
          String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN)
        )
      : null;
  if (token !== null) {
    const user: any = jwtDecode(token);
    return user;
  } else {
    return;
  }
};

export const getTokenToLocalStorage = () => {
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
      
  return user;
};

export const getThemeLocalStorage = () => {
  const theme =
    typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
  if (theme !== null) {
    return theme;
  } else {
    return;
  }
};

const initAuthContextPropsState = {
  saveAuth: () => {},
  setCurrentUser: () => {},
  user: undefined,
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(
  initAuthContextPropsState as any
);

const useAuth = () => {
  return useContext(AuthContext);
};

const ContextUserProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const [userStorage, setUserStorage] = useState(getCurrentUserFormToken());

  const { data: user } = GetOneUserPrivateAPI({
    userId: userStorage?.id,
  });

  const logout = () => logoutUser();

  return (
    <AuthContext.Provider value={{ ...user, userStorage, theme, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { ContextUserProvider, useAuth };
