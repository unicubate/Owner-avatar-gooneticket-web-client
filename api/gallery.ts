import { GalleryFormModel } from "@/types/gallery";
import { makeApiCall } from "@/utils/get-url-end-point";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RcFile } from "antd/es/upload";

export const CreateOneGalleryAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: GalleryFormModel): Promise<any> => {
      let data = new FormData();
      data.append("title", `${payload.title}`);
      data.append("description", `${payload.description}`);
      data.append("whoCanSee", `${payload.whoCanSee}`);

      payload?.attachment?.fileList?.length > 0 &&
        payload?.attachment?.fileList?.forEach((file: any) => {
          data.append("attachment", file?.originFileObj as RcFile);
        });

      return await makeApiCall({
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
