import {
  ProductFormModel,
  ProductModel,
  ResponseProductModel,
} from "@/types/product";
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
  const queryKey = ["products"];
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
      data.append("enableLimitSlot", `${payload.enableLimitSlot ?? ""}`);
      data.append("urlRedirect", `${payload.urlRedirect ?? ""}`);
      data.append("productType", `${payload.productType ?? ""}`);
      data.append("enableUrlRedirect", `${payload.enableUrlRedirect ?? ""}`);
      data.append("enableChooseQuantity", `${payload.enableChooseQuantity}`);
      data.append(
        "messageAfterPayment",
        `${payload.messageAfterPayment ?? ""}`
      );
      data.append("enableDiscount", `${payload.enableDiscount ?? ""}`);
      data.append("discountId", `${payload.discountId ?? ""}`);
      data.append("description", `${payload.description ?? ""}`);
      data.append("whoCanSee", `${payload.whoCanSee ?? ""}`);
      

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
          action: "updateOneUpload",
          body: { newImageLists, newFileLists },
          queryParams: { uploadableId: productId, model: 'PRODUCT' },
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

export const DeleteOneProductAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["products"];
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: { productId: string }): Promise<any> => {
      const { productId } = payload;

      return await makeApiCall({
        action: "deleteOneProduct",
        urlParams: { productId },
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

export const GetOneProductAPI = (payload: {
  productId?: string;
  productSlug?: string;
  userId?: string;
}) => {
  const { productId, userId, productSlug } = payload;
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["product", payload],
    queryFn: async () =>
      await makeApiCall({
        action: "getOneProduct",
        queryParams: { productId, userId, productSlug },
      }),
    // staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return { data: data?.data as ProductModel, isError, isLoading, status };
};

export const getProductsAPI = async (
  payload: {
    userId: string;
    status?: string;
  } & PaginationRequest
): Promise<{ data: ResponseProductModel }> => {
  return await makeApiCall({
    action: "getProducts",
    queryParams: payload,
  });
};

export const GetInfiniteProductsAPI = (payload: {
  userId: string;
  take: number;
  status?: string;
  sort: SortModel;
  queryKey: string[];
}) => {
  const { userId, take, sort, status, queryKey } = payload;
  return useInfiniteQuery({
    queryKey: queryKey,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 0 }) =>
      await getProductsAPI({
        userId,
        take,
        sort,
        status: status?.toUpperCase(),
        page: pageParam,
      }),
    keepPreviousData: true,
  });
};
