import { CategoryFormModel, ResponseCategoryModel } from '@/types/category';
import { makeApiCall } from '@/utils/end-point';
import { PaginationRequest, SortModel } from '@/utils/pagination-item';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const CreateOrUpdateOneCategoryAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['categories'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: CategoryFormModel & { categoryId: string }) => {
      const { categoryId } = payload;
      return categoryId
        ? await makeApiCall({
            action: 'updateOneCategory',
            body: payload,
            urlParams: { categoryId },
          })
        : await makeApiCall({
            action: 'createOneCategory',
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
  const queryKey = ['categories'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { categoryId: string }) => {
      const { categoryId } = payload;
      return await makeApiCall({
        action: 'deleteOneCategory',
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
  payload: PaginationRequest,
): Promise<{ data: ResponseCategoryModel }> => {
  return await makeApiCall({
    action: 'getCategories',
    queryParams: payload,
  });
};

export const GetAllCategoriesAPI = (payload: {
  organizationId: string;
  isPaginate: 'true' | 'false';
  take: number;
  sort: SortModel;
}) => {
  const { take, organizationId, isPaginate, sort } = payload;
  const { data, isError, isLoading, status, refetch } = useQuery({
    queryKey: ['categories', { ...payload }],
    queryFn: async () =>
      await getCategoriesAPI({
        organizationId: organizationId,
        isPaginate: isPaginate,
        sort: sort,
        take: take,
      }),
    refetchOnWindowFocus: false,
  });

  return { data: data?.data, isError, isLoading, status, refetch };
};

export const GetInfiniteCategoriesAPI = (payload: {
  organizationId: string;
  isPaginate: 'true' | 'false';
  search?: string;
  take: number;
  sort: SortModel;
}) => {
  const { take, organizationId, sort, search, isPaginate } = payload;
  return useInfiniteQuery({
    queryKey: ['categories', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getCategoriesAPI({
        organizationId: organizationId,
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
