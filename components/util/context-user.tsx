'use client';

import { GetOneUserMeAPI, IpLocationAPI } from '@/api-site/user';
import Cookies from 'js-cookie';
import { FC, ReactNode, createContext, useContext, useState } from 'react';

type ContextProps = {
  user?: any;
  ipLocation: any;
  collapse: string;
  toggleCollapse: () => void;
};

const initContextPropsState = {
  collapse: 'false',
  ipLocation: undefined,
  user: undefined,
} as ContextProps;

const CreateContext = createContext<ContextProps>(initContextPropsState);

const useAuthContext = () => {
  return useContext(CreateContext);
};

export const getCookieUser = () =>
  typeof window !== 'undefined'
    ? Cookies.get(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN))
    : null;

export const getCookieVerifyUser = () =>
  typeof window !== 'undefined'
    ? Cookies.get(String(process.env.NEXT_PUBLIC_BASE_NAME_VERIFY_TOKEN))
    : null;

const ContextProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [collapse, setCollapse] = useState(() => {
    return localStorage.getItem('collapse') || 'true';
  });

  const { data: user } = GetOneUserMeAPI();

  const { data: ipLocation } = IpLocationAPI();

  const toggleCollapse = () => {
    const newCollapse = collapse === 'true' ? 'false' : 'true';
    setCollapse(newCollapse);
    localStorage.setItem('collapse', newCollapse);
  };

  return (
    <>
      <CreateContext.Provider
        value={{
          user: user,
          ipLocation,
          collapse,
          toggleCollapse,
        }}
      >
        {children}
      </CreateContext.Provider>
    </>
  );
};

export { ContextProvider, useAuthContext };
