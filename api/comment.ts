import { CommentFormModel } from "@/types/comment";
import queryString from 'query-string';
import { PostModel, PostType, ResponsePostModel } from "@/types/post";
import dyaxios from "@/utils/dyaxios";
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
  const queryKey = ["comments"];
  const queryClient = useQueryClient();
  const result = useMutation(
    async (
      payload: CommentFormModel & { postId?: string; commentId: string }
    ): Promise<any> => {
      const { postId, commentId } = payload;

      return commentId
        ? await makeApiCall({
            action: "updateOneComment",
            body: payload,
            urlParams: { commentId },
          })
        : await makeApiCall({
            action: "createOneComment",
            body: { ...payload, postId },
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

export const DeleteOneCommentAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["comments"];
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

export const getCommentsAPI = async (
  payload: {
    postId: string;
  } & PaginationRequest
): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: "getComments",
    queryParams: payload,
  });
};

export const getCommentsRepliesAPI = async (
  payload: {
    commentId: string;
  } & PaginationRequest
): Promise<{ data: ResponsePostModel }> => {
  const queyParams = queryString.stringify(payload)
  return dyaxios.get(
    `/comments/replies?${queyParams}`
  );
};
