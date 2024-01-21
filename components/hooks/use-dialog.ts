import { useState } from 'react';

const useDialog = () => {
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
  };
};

export { useDialog };
