import { GalleryFormModel, ResponseGalleryModel } from "@/types/gallery";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest } from "@/utils/pagination-item";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RcFile } from "antd/es/upload";

export const CreateOrUpdateOneGalleryAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (
      payload: GalleryFormModel & { galleryId?: string }
    ): Promise<any> => {
      const { galleryId } = payload;

      let data = new FormData();
      data.append("title", payload.title ?? "");
      data.append("description", payload.description ?? "");
      data.append("whoCanSee", `${payload.whoCanSee}`);
      data.append("allowDownload", `${payload.allowDownload}`);

      payload?.attachment?.fileList?.length > 0 &&
        payload?.attachment?.fileList?.forEach((file: any) => {
          data.append("attachment", file?.originFileObj as RcFile);
        });

      return galleryId
        ? await makeApiCall({
            action: "updateOneGallery",
            body: payload,
            urlParams: { galleryId },
          })
        : await makeApiCall({
            action: "createOneGallery",
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

export const DeleteOneGalleryAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: { galleryId: string }): Promise<any> => {
      const { galleryId } = payload;

      return await makeApiCall({
        action: "deleteOneGallery",
        urlParams: { galleryId },
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

export const getGalleriesApi = async (
  payload: {
    userId: string;
  } & PaginationRequest
): Promise<{ data: ResponseGalleryModel }> => {
  return await makeApiCall({
    action: "getGalleries",
    queryParams: payload,
  });
};
