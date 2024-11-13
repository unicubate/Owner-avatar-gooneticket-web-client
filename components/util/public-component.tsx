import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useInputState } from '../hooks';
import { getCookieUser } from './context-user';

const PublicComponent = (Component: ComponentType) => {
  const userToken = getCookieUser();
  return function ProtectedRoute({ ...props }) {
    const { user } = useInputState();
    const { push } = useRouter();

    useEffect(() => {
      if (userToken) {
        if (user) {
          push(`/dashboard`);
        }
      }
    }, [user, push]);

    return <Component {...props} />;
  };
};

export { PublicComponent };
