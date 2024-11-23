import { makeApiCall } from '@/api-site/clients';
import { useMutationHandlers } from '@/components/hooks';
import {
  OrderItemFormModel,
  OrderItemModel,
  OrderModel,
} from '@/types/order-item';
import { PaginationRequest } from '@/utils/paginations';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

export const UpdateOneOrderItemAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKeys = ['order-items'];
  const { handleError, handleSettled, handleSuccess } = useMutationHandlers({
    queryKeys,
    onSuccess,
    onError,
  });

  const result = useMutation({
    mutationKey: queryKeys,
    mutationFn: async (
      payload: OrderItemFormModel & { orderItemId: string },
    ) => {
      const { orderItemId } = payload;
      await makeApiCall({
        action: 'updateOneOrderItem',
        body: payload,
        urlParams: { orderItemId },
      });
    },

    onError: handleError,
    onSettled: handleSettled,
    onSuccess: handleSuccess,
  });

  return result;
};

export const GetOrderItemsAPI = (payload: {
  organizationSellerId: string;
  orderId?: string;
  cartOrderId?: string;
}) => {
  const { data, isError, isLoading, status, refetch } = useQuery({
    queryKey: ['order-item', { ...payload }],
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

export const GetOneOrderAPI = (payload: { orderId: string }) => {
  const { orderId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['order', payload],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneOrder',
        urlParams: { orderId },
      }),
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as OrderModel,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const GetOneOrderItemAPI = (payload: {
  customer: 'buyer';
  orderNumber: string;
}) => {
  const { data, isError, isLoading, status, isPending, error, refetch } =
    useQuery({
      queryKey: ['order-item', payload],
      queryFn: async () =>
        await makeApiCall({
          action: 'getOneOrderItem',
          queryParams: payload,
        }),
      refetchOnWindowFocus: false,
    });

  return {
    error: (error as any)?.response,
    data: data?.data as OrderItemModel,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const GetOneOrderItemPublicAPI = (payload: { orderNumber: string }) => {
  const { data, isError, isLoading, status, isPending, error, refetch } =
    useQuery({
      queryKey: ['order-item-public', payload],
      queryFn: async () =>
        await makeApiCall({
          action: 'getOneOrderItemPublic',
          queryParams: payload,
        }),
      refetchOnWindowFocus: false,
    });

  return {
    data: data?.data as OrderItemModel,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
    error,
  };
};

export const GetInfiniteOrderItemsAPI = (
  payload: {
    orderId?: string;
    modelIds: string[];
    period?: number;
    started?: number;
    daysConfirm?: number;
    status?: string;
    customer: 'seller' | 'buyer';
  } & PaginationRequest,
) => {
  const {
    modelIds,
    period,
    orderId,
    daysConfirm,
    search,
    take,
    sort,
    started,
    customer,
    status,
  } = payload;
  return useInfiniteQuery({
    queryKey: ['order-items', 'infinite', { ...payload }],
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    getPreviousPageParam: (firstPage: any) => firstPage.data.prev_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getOrderItems',
        queryParams: {
          modelIds,
          take,
          sort,
          period,
          orderId,
          customer,
          started,
          daysConfirm,
          search: search,
          status: status?.toUpperCase(),
          page: Number(pageParam),
        },
      }),
  });
};

export const GetInfiniteOrdersAPI = (
  payload: {
    orderItemId?: string;
    days?: number;
    daysConfirm?: number;
    status?: string;
    customer: 'seller' | 'buyer';
  } & PaginationRequest,
) => {
  const { days, orderItemId, daysConfirm, search, take, sort, customer } =
    payload;
  return useInfiniteQuery({
    queryKey: ['orders', 'infinite', { ...payload }],
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    getPreviousPageParam: (firstPage: any) => firstPage.data.prev_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getOrders',
        queryParams: {
          take,
          sort,
          days,
          search,
          customer,
          orderItemId,
          daysConfirm,
          page: Number(pageParam),
        },
      }),
  });
};
