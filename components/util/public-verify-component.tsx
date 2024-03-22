import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useInputState } from '../hooks';
import { getCookieVerifyUser } from './context-user';

const PublicVerifyComponent = (Component: ComponentType) => {
  const userToken = getCookieVerifyUser();
  return function ProtectedRoute({ ...props }) {
    const { userStorage } = useInputState();
    const isOnline = userStorage?.id !== undefined;
    const { push, query } = useRouter();

    useEffect(() => {
      if (userToken && isOnline) {
        push(`/dashboard`);
      }
    }, [userStorage, isOnline, push, query]);

    return <Component {...props} />;
  };
};

export { PublicVerifyComponent };
