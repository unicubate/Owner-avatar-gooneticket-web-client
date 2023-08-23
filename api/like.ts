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
  const result = useMutation(
    async (payload: {
      likeableId: string;
      type: string;
      isLike: boolean;
    }): Promise<any> => {
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
    {
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
      onError: async (error: any) => {
        await queryClient.invalidateQueries({ queryKey });
        if (onError) {
          onError(error);
        }
      },
    }
  );

  return result;
};
