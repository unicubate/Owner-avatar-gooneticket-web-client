import {
  PostFormModel,
  PostModel,
  PostType,
  ResponsePostModel,
} from "@/types/post";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest } from "@/utils/pagination-item";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RcFile } from "antd/es/upload";

export const CreateOrUpdateOnePostGalleryAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: PostFormModel & { postId?: string }): Promise<any> => {
      const { postId } = payload;

      let data = new FormData();
      data.append("title", payload.title ?? "");
      data.append("description", payload.description ?? "");
      data.append("whoCanSee", `${payload.whoCanSee}`);
      data.append("type", payload.type ?? "");
      data.append("allowDownload", `${payload.allowDownload}`);

      payload?.attachment?.fileList?.length > 0 &&
        payload?.attachment?.fileList?.forEach((file: any) => {
          data.append("attachment", file?.originFileObj as RcFile);
        });

      return postId
        ? await makeApiCall({
            action: "updateOnePost",
            body: payload,
            urlParams: { postId },
          })
        : await makeApiCall({
            action: "createOnePostGallery",
            body: data,
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

export const CreateOrUpdateOnePostAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: PostFormModel & { postId?: string }): Promise<any> => {
      const { postId } = payload;
      let data = new FormData();
      data.append("title", payload.title ?? "");
      data.append("categories", payload.categories ?? "");
      data.append("description", payload.description ?? "");
      data.append("type", payload.type ?? "");
      data.append("whoCanSee", `${payload.whoCanSee}`);

      payload?.attachment?.fileList?.length > 0 &&
        payload?.attachment?.fileList?.forEach((file: any) => {
          data.append("attachment", file?.originFileObj as RcFile);
        });

      return postId
        ? await makeApiCall({
            action: "updateOnePost",
            body: data,
            urlParams: { postId },
          })
        : await makeApiCall({
            action: "createOnePost",
            body: data,
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

export const DeleteOnePostAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: { postId: string }): Promise<any> => {
      const { postId } = payload;

      return await makeApiCall({
        action: "deleteOnePost",
        urlParams: { postId },
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

export const getPostsAPI = async (
  payload: {
    userId: string;
    type?: PostType;
  } & PaginationRequest
): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: "getPosts",
    queryParams: payload,
  });
};

export const getCategoriesAPI = async (payload?: {
  userId: string;
}): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: "getCategories",
    queryParams: payload,
  });
};

export const createOnUploadPostAPI = async (
  payload: any
): Promise<{ data: { urlFile: string } }> => {
  return await makeApiCall({
    action: "createOnUploadPost",
    body: payload,
  });
};

export const getOnePostAPI = async (payload: {
  postId?: string;
}): Promise<{ data: PostModel }> => {
  const { postId } = payload;
  return await makeApiCall({
    action: "getOnePost",
    urlParams: { postId },
  });
};

export const getOneFilePostAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/posts/file/${fileName}`
    : null;

export const getOneFileGalleryAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/posts/gallery/${fileName}`
    : null;
