import { CommentFormModel } from "@/types/comment";
import {
  PostModel,
  PostType,
  ResponsePostModel,
} from "@/types/post";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest } from "@/utils/pagination-item";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CreateOrUpdateOneCommentAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: CommentFormModel & { postId?: string }): Promise<any> => {
      const { postId } = payload;

      return postId
        ? await makeApiCall({
            action: "updateOneComment",
            body: payload,
            urlParams: { postId },
          })
        : await makeApiCall({
            action: "createOneComment",
            body: payload,
          });
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries();
        if (onSuccess) {
          onSuccess();
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries();
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: async (error: any) => {
        await queryClient.invalidateQueries();
        if (onError) {
          onError(error);
        }
      },
    }
  );

  return result;
};


export const DeleteOneCommentAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: { commentId: string }): Promise<any> => {
      const { commentId } = payload;

      return await makeApiCall({
        action: "deleteOneComment",
        urlParams: { commentId },
      });
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries();
        if (onSuccess) {
          onSuccess();
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries();
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: async (error: any) => {
        await queryClient.invalidateQueries();
        if (onError) {
          onError(error);
        }
      },
    }
  );

  return result;
};

export const getCommentsAPI = async (
  payload: {
    userId: string;
  } & PaginationRequest
): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: "getComments",
    queryParams: payload,
  });
};