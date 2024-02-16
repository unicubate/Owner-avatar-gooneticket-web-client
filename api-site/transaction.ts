import {
  ResponseTransactionModel,
  StatisticTransactionModel,
} from '@/types/transaction';
import { makeApiCall } from '@/utils/end-point';
import { PaginationRequest, SortModel } from '@/utils/pagination-item';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const getTransactionsAPI = async (
  payload: {
    days?: number;
    status?: string;
    model?: string;
  } & PaginationRequest,
): Promise<{ data: ResponseTransactionModel }> => {
  return await makeApiCall({
    action: 'getTransactions',
    queryParams: payload,
  });
};

export const GetStatisticsTransactionsAPI = (payload: {
  days?: number;
  isEnabled?: boolean;
}) => {
  const { days, isEnabled } = payload;
  const { data, isError, isLoading, status, isPending, error, refetch } =
    useQuery({
      queryKey: ['statistics-transactions', { days }],
      queryFn: async () =>
        await makeApiCall({
          action: 'getStatisticsTransactions',
          queryParams: { days },
        }),
    });

  return {
    data: data?.data as StatisticTransactionModel[],
    isError,
    isPending,
    isLoading,
    status,
    error: error as any,
    refetch,
  };
};

export const GetInfiniteTransactionsAPI = (payload: {
  organizationId?: string;
  model?: string;
  search?: string;
  take: number;
  days?: number;
  status?: string;
  sort: SortModel;
  queryKey: string[];
}) => {
  const { model, days, organizationId, search, take, sort, status, queryKey } =
    payload;
  return useInfiniteQuery({
    queryKey: [...queryKey, { ...payload }],
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getTransactionsAPI({
        model,
        take,
        sort,
        days,
        organizationId,
        search: search,
        status: status?.toUpperCase(),
        page: Number(pageParam),
      }),
  });
};
