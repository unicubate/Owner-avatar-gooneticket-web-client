'use client';

import { GetOneUserMeAPI, IpLocationAPI } from '@/api-site/user';
import { FC, ReactNode, createContext, useContext, useState } from 'react';

type ContextProps = {
  user?: any;
  ipLocation: any;
  collapse: string;
  status?: 'error' | 'success' | 'pending';
  toggleCollapse: () => void;
};

const initContextPropsState = {
  collapse: 'false',
  ipLocation: undefined,
  user: undefined,
  status: undefined,
} as ContextProps;

const CreateContext = createContext<ContextProps>(initContextPropsState);

const useAuthContext = () => {
  return useContext(CreateContext);
};

const ContextProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [collapse, setCollapse] = useState(() => {
    return localStorage.getItem('collapse') || 'true';
  });

  const { status, data: user } = GetOneUserMeAPI();

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
          status,
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
