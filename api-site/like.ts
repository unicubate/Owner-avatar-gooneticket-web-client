import { makeApiCall } from "@/utils/get-url-end-point";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CreateOrUpdateOneLikeAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["likes"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: {
      likeableId: string;
      type: string;
      isLike: boolean;
    }) => {
      const { likeableId, type, isLike } = payload;
      return !isLike
        ? await makeApiCall({
            action: "createOneLike",
            urlParams: { likeableId, type },
          })
        : await makeApiCall({
            action: "deleteOneLike",
            urlParams: { likeableId, type },
          });
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
