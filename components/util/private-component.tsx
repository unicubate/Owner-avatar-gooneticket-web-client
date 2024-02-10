import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { getTokenToLocalStorage } from './context-user';

const PrivateComponent = (Component: ComponentType) => {
  const userToken = getTokenToLocalStorage();
  return function ProtectedRoute({ ...props }) {
    const { push, pathname } = useRouter();
    const linkHref =
      typeof window !== 'undefined' ? window.location.href : null;
    const userIsAuthenticated = userToken !== null;

    useEffect(() => {
      if (!userIsAuthenticated) {
        push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
      }
    }, [userIsAuthenticated, pathname, push]);

    return <Component {...props} />;
  };
};

export { PrivateComponent };
