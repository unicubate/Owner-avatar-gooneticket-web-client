import { useState } from 'react';
import { useAuth } from '../util/context-user';

const useDialog = () => {
  const { userStorage } = useAuth() as any;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined,
  );

  return {
    success,
    loading,
    isOpen,
    hasErrors,
    setIsOpen,
    setLoading,
    setSuccess,
    setHasErrors,
    userStorage,
  };
};

export { useDialog };
