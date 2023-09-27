import { CommentFormModel } from "@/types/comment";
import queryString from "query-string";
import { PostModel, PostType, ResponsePostModel } from "@/types/post";
import dyaxios from "@/utils/dyaxios";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

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
      payload: CommentFormModel & {
        postId: string;
        commentId: string;
      }
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

export const CreateOrUpdateOneCommentReplyAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["comments-replies"];
  const queryClient = useQueryClient();
  const result = useMutation(
    async (
      payload: CommentFormModel & { parentId: string; commentId: string }
    ): Promise<any> => {
      const { parentId, commentId } = payload;

      return commentId
        ? await makeApiCall({
            action: "updateOneComment",
            body: payload,
            urlParams: { commentId },
          })
        : await makeApiCall({
            action: "createOneCommentReply",
            body: { ...payload, parentId },
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

export const DeleteOneCommentReplyAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["comments-replies"];
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
      onSettled: async (action) => {
        await queryClient.invalidateQueries({ queryKey });
        if (onSuccess) {
          onSuccess();
        }
      },
      onSuccess: async (action) => {
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
  const queyParams = queryString.stringify(payload);
  return await dyaxios.get(`/comments/replies?${queyParams}`);
};

export const GetInfiniteCommentsAPI = (payload: {
  take: number;
  postId: string;
  sort: SortModel;
}) => {
  return useInfiniteQuery({
    queryKey: ["comments", "infinite", { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 0 }) =>
      await getCommentsAPI({
        ...payload,
        page: pageParam,
      }),
    keepPreviousData: true,
  });
};

export const GetInfiniteCommentsRepliesAPI = (payload: {
  take: number;
  sort: SortModel;
  commentId: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["comments-replies", "infinite", { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 0 }) =>
      await getCommentsRepliesAPI({
        ...payload,
        page: pageParam,
      }),
    keepPreviousData: true,
  });
};
