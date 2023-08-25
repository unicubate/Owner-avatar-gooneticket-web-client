import {
  PostFormModel,
  PostModel,
  PostType,
  ResponsePostModel,
} from "@/types/post";
import { ProductFormModel } from "@/types/product";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { RcFile } from "antd/es/upload";

export const CreateOrUpdateOneProductAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (
      payload: ProductFormModel & { productId?: string }
    ): Promise<any> => {
      const { productId, newFileLists } = payload;

      let data = new FormData();
      data.append("title", payload.title ?? "");
      data.append("description", payload.description ?? "");
      // data.append("type", payload.type ?? "");
      // data.append("allowDownload", `${payload.allowDownload}`);

      payload?.fileList?.length > 0 &&
        payload?.fileList?.forEach((file: any) => {
          data.append("attachments", file?.originFileObj as RcFile);
        });

      payload?.attachment?.fileList?.length > 0 &&
        payload?.attachment?.fileList?.forEach((file: any) => {
          data.append("attachment", file?.originFileObj as RcFile);
        });

      if (productId) {
        const result = await makeApiCall({
          action: "updateOneUploadProduct",
          body: { newFileLists: newFileLists },
          urlParams: { productId },
        });

        if (result) {
          await makeApiCall({
            action: "updateOneProduct",
            body: data,
            urlParams: { productId },
          });
        }
        
        return "Ok";
      } else {
        return await makeApiCall({
          action: "createOneProduct",
          body: data,
        });
      }
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

export const GetOneProductAPI = (payload: {
  productId?: string;
  productSlug?: string;
  userId?: string;
}) => {
  const { productId, userId, productSlug } = payload;
  return useQuery({
    queryKey: ["product", productId, userId, productSlug],
    queryFn: async () =>
      await makeApiCall({
        action: "getOneProduct",
        queryParams: { productId, userId, productSlug },
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};
