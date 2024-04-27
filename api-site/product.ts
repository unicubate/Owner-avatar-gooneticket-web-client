import {
  ProductFormModel,
  ProductModel,
  ResponseProductModel,
} from '@/types/product';
import { makeApiCall } from '@/utils/end-point';
import { ModelType, PaginationRequest, SortModel } from '@/utils/paginations';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { RcFile } from 'antd/es/upload';

export const CreateOrUpdateOneProductAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['products'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: ProductFormModel & { productId?: string },
    ): Promise<any> => {
      const { productId, newImageLists, model, newFileLists } = payload;
      let data = new FormData();
      data.append('title', `${payload.title ?? ''}`);
      data.append('price', `${payload.price ?? ''}`);
      data.append('enableVisibility', `${payload.enableVisibility ?? ''}`);
      data.append('model', `${payload.model ?? 'PRODUCT'}`);
      data.append('urlMedia', `${payload.urlMedia ?? ''}`);
      data.append('limitSlot', `${payload.limitSlot ?? ''}`);
      data.append('enableLimitSlot', `${payload.enableLimitSlot ?? ''}`);
      data.append('urlRedirect', `${payload.urlRedirect ?? ''}`);
      data.append('productType', `${payload.productType ?? ''}`);
      data.append('categoryId', `${payload.categoryId ?? ''}`);
      data.append('city', `${payload.city ?? ''}`);
      data.append('timeInit', `${payload.timeInit ?? ''}`);
      data.append('timeEnd', `${payload.timeEnd ?? ''}`);
      data.append('address', `${payload.address ?? ''}`);
      data.append('countryId', `${payload.countryId ?? ''}`);
      data.append('expiredAt', `${payload.expiredAt ?? ''}`);
      data.append('enableUrlRedirect', `${payload.enableUrlRedirect ?? ''}`);
      data.append('enableChooseQuantity', `${payload.enableChooseQuantity}`);
      data.append(
        'messageAfterPayment',
        `${payload.messageAfterPayment ?? ''}`,
      );
      data.append('enableDiscount', `${payload.enableDiscount ?? ''}`);
      data.append('discountId', `${payload.discountId ?? ''}`);
      data.append('description', `${payload.description ?? ''}`);
      data.append('whoCanSee', `${payload.whoCanSee ?? ''}`);
      payload?.imageList?.length > 0 &&
        payload?.imageList?.forEach((file: any) => {
          data.append('attachmentImages', file?.originFileObj as RcFile);
        });
      payload?.fileList?.length > 0 &&
        payload?.fileList?.forEach((file: any) => {
          data.append('attachmentFiles', file?.originFileObj as RcFile);
        });
      if (productId) {
        const result = await makeApiCall({
          action: 'updateOneUpload',
          body: { newImageLists, newFileLists },
          queryParams: { uploadableId: productId, model },
        });
        if (result) {
          await makeApiCall({
            action: 'updateOneProduct',
            body: data,
            urlParams: { productId },
          });
        }
        return 'Ok';
      } else {
        return await makeApiCall({
          action: 'createOneProduct',
          body: data,
        });
      }
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

export const DeleteOneProductAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['products'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { productId: string }): Promise<any> => {
      const { productId } = payload;

      return await makeApiCall({
        action: 'deleteOneProduct',
        urlParams: { productId },
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

export const GetOneProductAPI = (payload: {
  productId?: string;
  productSlug?: string;
  organizationId?: string;
  enableVisibility?: 'TRUE' | 'FALSE';
}) => {
  const { productId, organizationId, enableVisibility, productSlug } = payload;
  const { data, isError, isLoading, isPending, status, refetch } = useQuery({
    queryKey: ['product', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneProduct',
        queryParams: {
          productId,
          organizationId,
          enableVisibility,
          productSlug,
        },
      }),
    // staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as ProductModel,
    isError,
    isPending,
    isLoading,
    status,
    refetch,
  };
};

export const getProductsAPI = async (
  payload: {
    organizationId: string;
    status?: string;
    modelIds: ModelType[];
    enableVisibility?: 'TRUE' | 'FALSE';
  } & PaginationRequest,
): Promise<{ data: ResponseProductModel }> => {
  return await makeApiCall({
    action: 'getProducts',
    queryParams: payload,
  });
};

export const GetInfiniteProductsAPI = (payload: {
  organizationId: string;
  take: number;
  status?: string;
  sort: SortModel;
  search?: string;
  modelIds: ModelType[];
  enableVisibility?: 'TRUE' | 'FALSE';
}) => {
  const {
    organizationId,
    take,
    sort,
    status,
    enableVisibility,
    modelIds,
    search,
  } = payload;
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getProductsAPI({
        organizationId,
        take,
        sort,
        search,
        modelIds,
        enableVisibility,
        status: status?.toUpperCase(),
        page: pageParam,
      }),
    initialPageParam: 1,
  });
};
