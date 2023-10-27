import {
  ResponseStatisticsTransactionModel,
  ResponseTransactionModel,
  StatisticTransactionModel,
} from "@/types/transaction";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const getTransactionsAPI = async (
  payload: {
    organizationId?: string;
    status?: string;
    model?: string;
  } & PaginationRequest
): Promise<{ data: ResponseTransactionModel }> => {
  return await makeApiCall({
    action: "getTransactions",
    queryParams: payload,
  });
};

export const GetStatisticsTransactionsAPI = (payload: {
  queryKey: string[];
}) => {
  const { queryKey } = payload;
  const { data, isError, isLoading, status, isPending, error } = useQuery({
    queryKey: queryKey,
    queryFn: async () =>
      await makeApiCall({
        action: "getStatisticsTransactions",
      }),
  });

  return {
    data: data?.data as StatisticTransactionModel[],
    isError,
    isPending,
    isLoading,
    status,
    error: error as any,
  };
};

export const GetInfiniteTransactionsAPI = (payload: {
  organizationId?: string;
  model?: string;
  take: number;
  status?: string;
  sort: SortModel;
  queryKey: string[];
}) => {
  const { model, organizationId, take, sort, status, queryKey } = payload;
  return useInfiniteQuery({
    queryKey: queryKey,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getTransactionsAPI({
        model,
        take,
        sort,
        organizationId,
        status: status?.toUpperCase(),
        page: Number(pageParam),
      }),
    initialPageParam: 1,
  });
};
