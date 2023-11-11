import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CategoryFormModel,
  CategoryModel,
  ResponseCategoryModel,
} from "@/types/category";

export const CreateOrUpdateOneCategoryAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["categories"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: CategoryFormModel & { categoryId: string }) => {
      const { categoryId } = payload;
      return categoryId
        ? await makeApiCall({
            action: "updateOneCategory",
            body: payload,
            urlParams: { categoryId },
          })
        : await makeApiCall({
            action: "createOneCategory",
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

export const DeleteOneCategoryAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["categories"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { categoryId: string }) => {
      const { categoryId } = payload;
      return await makeApiCall({
        action: "deleteOneCategory",
        urlParams: { categoryId },
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

export const getCategoriesAPI = async (
  payload: PaginationRequest
): Promise<{ data: ResponseCategoryModel }> => {
  return await makeApiCall({
    action: "getCategories",
    queryParams: payload,
  });
};

export const GetInfiniteCategoriesAPI = (payload: {
  isPaginate: "true" | "false";
  search?: string;
  take: number;
  sort: SortModel;
}) => {
  const { take, sort, search, isPaginate } = payload;
  return useInfiniteQuery({
    queryKey: ["categories", "infinite"],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getCategoriesAPI({
        isPaginate: isPaginate,
        search: search,
        take: take,
        page: pageParam,
        sort: sort,
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};
