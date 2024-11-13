import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useInputState } from '../hooks';
import { useAuthContext } from './context-user';

const PrivateComponent = (Component: ComponentType) => {
  return function ProtectedRoute({ ...props }) {
    const { status } = useAuthContext();
    const { linkHref } = useInputState();
    const { push, pathname } = useRouter();

    useEffect(() => {
      if (status === 'error') {
        push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
      }
    }, [status, pathname, push, linkHref]);
    return <Component {...props} />;
  };
};

export { PrivateComponent };
