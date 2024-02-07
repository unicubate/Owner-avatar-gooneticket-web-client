import { OrderItemModel, ResponseOrderItemModel } from '@/types/order-item';
import { makeApiCall } from '@/utils/end-point';
import { PaginationRequest, SortModel } from '@/utils/pagination-item';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const UpdateOneOrderItemAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['order-items'];
  const queryClient = useQueryClient();
  const result = useMutation({
    // mutationKey: queryKey,
    mutationFn: async (payload: any & { orderItemId: string }) => {
      const { orderItemId } = payload;
      await makeApiCall({
        action: 'updateOneOrderItem',
        body: payload,
        urlParams: { orderItemId },
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

export const GetOrderItemsAPI = (payload: {
  organizationSellerId: string;
  orderId?: string;
  cartOrderId?: string;
}) => {
  const { data, isError, isLoading, status, refetch } = useQuery({
    queryKey: ['order-items', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOrderItems',
        queryParams: payload,
      }),
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as OrderItemModel,
    isError,
    isLoading,
    status,
    refetch,
  };
};

export const getOrderItemsAPI = async (
  payload: {
    days?: number;
    status?: string;
    model?: string;
    orderId?: string;
    organizationSellerId: string;
  } & PaginationRequest,
): Promise<{ data: ResponseOrderItemModel }> => {
  return await makeApiCall({
    action: 'getOrderItems',
    queryParams: payload,
  });
};

export const GetInfiniteOrderItemsAPI = (payload: {
  organizationSellerId: string;
  orderId?: string;
  model?: string;
  search?: string;
  take: number;
  days?: number;
  status?: string;
  sort: SortModel;
  queryKey: string[];
}) => {
  const {
    model,
    days,
    orderId,
    organizationSellerId,
    search,
    take,
    sort,
    status,
    queryKey,
  } = payload;
  return useInfiniteQuery({
    queryKey: [...queryKey, { ...payload }],
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getOrderItemsAPI({
        model: model?.toUpperCase(),
        take,
        sort,
        days,
        orderId,
        organizationSellerId,
        search: search,
        status: status?.toUpperCase(),
        page: Number(pageParam),
      }),
  });
};
