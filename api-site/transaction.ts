import { ResponseTransactionModel } from "@/types/transaction";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import { useInfiniteQuery } from "@tanstack/react-query";

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
    queryFn: async ({ pageParam = 0 }) =>
      await getTransactionsAPI({
        model,
        take,
        sort,
        organizationId,
        status: status?.toUpperCase(),
        page: pageParam,
      }),
    keepPreviousData: true,
  });
};
