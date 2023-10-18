import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DiscountFormModel, ResponseDiscountModel } from "@/types/discount";

export const CreateOrUpdateOneDiscountAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["discounts"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: DiscountFormModel & { discountId: string }) => {
      const { discountId } = payload;
      return discountId
        ? await makeApiCall({
            action: "updateOneDiscount",
            body: payload,
            urlParams: { discountId },
          })
        : await makeApiCall({
            action: "createOneDiscount",
            body: { ...payload },
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

export const DeleteOneDiscountAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["discounts"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { discountId: string }) => {
      const { discountId } = payload;
      return await makeApiCall({
        action: "deleteOneDiscount",
        urlParams: { discountId },
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

export const getDiscountsAPI = async (
  payload: PaginationRequest
): Promise<{ data: ResponseDiscountModel }> => {
  return await makeApiCall({
    action: "getDiscounts",
    queryParams: payload,
  });
};

export const GetAllDiscountsAPI = (search?: string) => {
  return useQuery({
    queryKey: ["discounts"],
    queryFn: async () =>
      await makeApiCall({
        action: "getDiscountsUser",
        queryParams: search,
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};

export const GetInfiniteDiscountsAPI = (payload: {
  search?: string;
  take: number;
  sort: SortModel;
}) => {
  const { take, sort, search } = payload;
  return useInfiniteQuery({
    queryKey: ["discounts", "infinite"],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 0 }) =>
      await getDiscountsAPI({
        search: search,
        take: take,
        page: pageParam,
        sort: sort,
      }),
    staleTime: 60_000,
    initialPageParam: 0,
  });
};
