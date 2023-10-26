import { CommentFormModel } from "@/types/comment";
import queryString from "query-string";
import { PostModel, PostType, ResponsePostModel } from "@/types/post";
import dyaxios from "@/utils/dyaxios";
import { makeApiCall } from "@/utils/get-url-end-point";
import {
  ModelType,
  PaginationRequest,
  SortModel,
} from "@/utils/pagination-item";
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
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: CommentFormModel & { commentId: string }) => {
      const { commentId } = payload;
      return commentId
        ? await makeApiCall({
            action: "updateOneComment",
            body: payload,
            urlParams: { commentId },
          })
        : await makeApiCall({
            action: "createOneComment",
            body: { ...payload },
          });
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

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
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: CommentFormModel & { parentId: string; commentId: string }
    ) => {
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
    onError: async (error, variables, context) => {
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

export const DeleteOneCommentReplyAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["comments-replies"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { commentId: string }) => {
      const { commentId } = payload;
      return await makeApiCall({
        action: "deleteOneComment",
        urlParams: { commentId },
      });
    },
    onError: async (error, variables, context) => {
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

export const DeleteOneCommentAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["comments"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { commentId: string }) => {
      const { commentId } = payload;
      return await makeApiCall({
        action: "deleteOneComment",
        urlParams: { commentId },
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

export const getCommentsAPI = async (
  payload: PaginationRequest
): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: "getComments",
    queryParams: payload,
  });
};

export const getCommentsRepliesAPI = async (
  payload: PaginationRequest
): Promise<{ data: ResponsePostModel }> => {
  const queyParams = queryString.stringify(payload);
  return await dyaxios.get(`/comments/replies?${queyParams}`);
};

export const GetInfiniteCommentsAPI = (payload: {
  take: number;
  postId?: string;
  modelIds: ModelType[];
  productId?: string;
  organizationId?: string;
  userVisitorId?: string;
  sort: SortModel;
}) => {
  return useInfiniteQuery({
    queryKey: ["comments", "infinite", { ...payload }],
    queryFn: async ({ pageParam = 1 }) =>
      await getCommentsAPI({
        ...payload,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page ?? undefined,
  });
};

export const GetInfiniteCommentsRepliesAPI = (payload: {
  take: number;
  sort: SortModel;
  commentId: string;
  modelIds: ModelType[];
  userVisitorId?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["comments-replies", "infinite", { ...payload }],
    queryFn: async ({ pageParam = 1 }) =>
      await getCommentsRepliesAPI({
        ...payload,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page ?? undefined,
  });
};
