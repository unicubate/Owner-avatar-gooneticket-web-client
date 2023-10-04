import { ProfileFormModel } from "@/types/profile.type";
import { ResponseTransactionModel } from "@/types/transaction";
import {
  UserLoginFormModel,
  UserRegisterFormModel,
  UserForgotPasswordFormModel,
  UserResetPasswordFormModel,
  UserModel,
  NextStep,
} from "@/types/user.type";
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
    userReceiveId: string;
    status?: string;
  } & PaginationRequest
): Promise<{ data: ResponseTransactionModel }> => {
  return await makeApiCall({
    action: "getTransactions",
    queryParams: payload,
  });
};

export const GetInfiniteTransactionsAPI = (payload: {
  userReceiveId: string;
  take: number;
  status?: string;
  sort: SortModel;
  queryKey: string[];
}) => {
  const { userReceiveId, take, sort, status, queryKey } = payload;
  return useInfiniteQuery({
    queryKey: queryKey,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 0 }) =>
      await getTransactionsAPI({
        userReceiveId,
        take,
        sort,
        status: status?.toUpperCase(),
        page: pageParam,
      }),
    keepPreviousData: true,
  });
};
