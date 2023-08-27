import { CommentFormModel } from "@/types/comment";
import queryString from "query-string";
import { PostModel, PostType, ResponsePostModel } from "@/types/post";
import dyaxios from "@/utils/dyaxios";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import {
  useInfiniteQuery,
  useMutation,
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
  const result = useMutation(
    async (
      payload: DiscountFormModel & {
        discountId: string;
      }
    ): Promise<any> => {
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

export const DeleteOneDiscountAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["discounts"];
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: { discountId: string }): Promise<any> => {
      const { discountId } = payload;

      return await makeApiCall({
        action: "deleteOneDiscount",
        urlParams: { discountId },
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

export const getDiscountsAPI = async (
  payload: PaginationRequest
): Promise<{ data: ResponseDiscountModel }> => {
  return await makeApiCall({
    action: "getDiscounts",
    queryParams: payload,
  });
};

export const GetInfiniteDiscountsAPI = (payload: {
  take: number;
  sort: SortModel;
}) => {
  const { take, sort } = payload;
  return useInfiniteQuery({
    queryKey: ["discounts", "infinite"],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getDiscountsAPI({
        take: take,
        page: pageParam,
        sort: sort,
      }),
    staleTime: 60_000,
    keepPreviousData: true,
  });
};
