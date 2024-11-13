import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useInputState } from '../hooks';
import { getCookieUser } from './context-user';

const PrivateComponent = (Component: ComponentType) => {
  return function ProtectedRoute({ ...props }) {
    const userToken = getCookieUser();
    const { linkHref, user } = useInputState();
    const { push, pathname } = useRouter();

    useEffect(() => {
      if (!userToken) {
        if (!user?.id) {
          push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
        }
      }
    }, [user, userToken, pathname, push, linkHref]);

    return <Component {...props} />;
  };
};

export { PrivateComponent };
