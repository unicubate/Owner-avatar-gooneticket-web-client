import { makeApiCall } from '@/api-site/clients';
import { ProductModel } from '@/types/product';
import { ModelType, SortModel } from '@/utils/paginations';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const GetOneProductAPI = (payload: {
  productId?: string;
  productSlug?: string;
  organizationId?: string;
  enableVisibility?: 'true' | 'false';
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

export const GetInfiniteProductsAPI = (payload: {
  organizationId?: string;
  take: number;
  status?: string;
  sort: SortModel;
  search?: string;
  modelIds: ModelType[];
  enableVisibility?: 'true' | 'false';
  expired: 'true' | 'false';
}) => {
  const {
    organizationId,
    take,
    sort,
    status,
    enableVisibility,
    modelIds,
    search,
    expired,
  } = payload;
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getProducts',
        queryParams: {
          organizationId,
          take,
          sort,
          search,
          modelIds,
          expired,
          enableVisibility,
          status: status?.toUpperCase(),
          page: pageParam,
        },
      }),
    initialPageParam: 1,
  });
};

export const GetInfiniteFollowsProductsAPI = (payload: {
  take: number;
  sort: SortModel;
  search?: string;
  status?: string;
  modelIds: ModelType[];
}) => {
  const { take, sort, status, search, modelIds } = payload;
  return useInfiniteQuery({
    queryKey: ['products-follows', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getFollowsProducts',
        queryParams: {
          take,
          sort,
          search,
          modelIds,
          status: status?.toUpperCase(),
          page: Number(pageParam),
        },
      }),
    initialPageParam: 1,
  });
};
