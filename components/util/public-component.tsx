import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useAuthContext } from './context-user';

const PublicComponent = (Component: ComponentType) => {
  return function ProtectedRoute({ ...props }) {
    const { isAuthenticated } = useAuthContext();
    const { push } = useRouter();

    useEffect(() => {
      if (isAuthenticated) {
        push(`/tickets`);
      }
    }, [isAuthenticated, push]);

    return <Component {...props} />;
  };
};

export { PublicComponent };
