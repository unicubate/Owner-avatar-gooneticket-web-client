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
  const queryKey = ["product"];
  const queryClient = useQueryClient();
  const result = useMutation(
    async (
      payload: ProductFormModel & { productId?: string }
    ): Promise<any> => {
      const { productId, newImageLists, newFileLists } = payload;

      let data = new FormData();
      data.append("title", `${payload.title ?? ""}`);
      data.append("price", `${payload.price ?? ""}`);
      data.append("urlMedia", `${payload.urlMedia ?? ""}`);
      data.append("limitSlot", `${payload.limitSlot ?? ""}`);
      data.append("isLimitSlot", `${payload.isLimitSlot ?? ""}`);
      data.append("isChooseQuantity", `${payload.isChooseQuantity}`);
      data.append(
        "messageAfterPurchase",
        `${payload.messageAfterPurchase ?? ""}`
      );
      data.append("description", `${payload.description ?? ""}`);

      payload?.imageList?.length > 0 &&
        payload?.imageList?.forEach((file: any) => {
          data.append("attachmentImages", file?.originFileObj as RcFile);
        });

      payload?.fileList?.length > 0 &&
        payload?.fileList?.forEach((file: any) => {
          data.append("attachmentFiles", file?.originFileObj as RcFile);
        });

      if (productId) {
        const result = await makeApiCall({
          action: "updateOneUploadProduct",
          body: { newImageLists, newFileLists },
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
