import { useQueryClient } from "@tanstack/react-query";

const useMutationHandlers = ({
  queryKeys,
  onSuccess,
  onError,
}: {
  queryKeys: string[];
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();

  const handleError = async (error: any) => {
    queryKeys.forEach(async (key) => {
      await queryClient.invalidateQueries({ queryKey: [key] });
    });

    if (onError) {
      onError(error);
    }
  };

  const handleSettled = async () => {
    queryKeys.forEach(async (key) => {
      await queryClient.invalidateQueries({ queryKey: [key] });
    });

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleSuccess = async () => {
    queryKeys.forEach(async (key) => {
      await queryClient.invalidateQueries({ queryKey: [key] });
    });

    if (onSuccess) {
      onSuccess();
    }
  };

  return {
    handleError,
    handleSettled,
    handleSuccess,
  };
};

export { useMutationHandlers };
