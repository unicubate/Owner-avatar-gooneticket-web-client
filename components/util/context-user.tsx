import { GetOneUserMeAPI, logoutUsersAPI } from '@/api-site/user';
import { UserModel } from '@/types/user.type';
import Cookies from 'js-cookie';
import { FC, ReactNode, createContext, useContext } from 'react';

type AuthContextProps = {
  user?: UserModel | undefined;
  userStorage?: any;
  logout?: () => void;
};

export const logoutUser = () => {
  logoutUsersAPI();
  location.reload();
};

const initAuthContextPropsState = {
  user: undefined,
  userStorage: undefined,
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(
  initAuthContextPropsState as any,
);

const useAuth = () => {
  return useContext(AuthContext);
};

export const getCookieUser = () =>
  typeof window !== 'undefined'
    ? Cookies.get(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN))
    : null;

const ContextUserProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const { data: user } = GetOneUserMeAPI();
  const logout = () => logoutUser();

  return (
    <>
      <AuthContext.Provider
        value={{
          ...(user as any),
          userStorage: user,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { ContextUserProvider, useAuth };
