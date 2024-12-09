import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useInputState } from '../hooks';
import { useAuthContext } from './context-user';

const PrivateComponent = (Component: ComponentType) => {
  return function ProtectedRoute({ ...props }) {
    const { isAuthenticated } = useAuthContext();
    const { linkHref } = useInputState();
    const { push, pathname } = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
      }
    }, [isAuthenticated, pathname, push, linkHref]);
    return <Component {...props} />;
  };
};

export { PrivateComponent };
