import { ResponseFollowModel } from '@/types/follow';
import { makeApiCall } from '@/utils/end-point';
import { PaginationRequest, SortModel } from '@/utils/pagination-item';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const CreateOrDeleteOneFollowerAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['followers', 'followings'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: {
      followerId?: string;
      action: 'DELETE' | 'CREATE';
    }) => {
      const { followerId, action } = payload;
      if (action === 'DELETE') {
        return await makeApiCall({
          action: 'deleteOneFollowers',
          body: payload,
          urlParams: { followerId },
        });
      }
      if (action === 'CREATE') {
        return await makeApiCall({
          action: 'createOneFollowers',
          body: payload,
          urlParams: { followerId },
        });
      }
    },
    onError: async (error) => {
      await queryClient.invalidateQueries();
      if (onError) {
        onError(error);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};

export const deleteOneFollowersAPI = async (payload: {
  followerId: string;
}): Promise<{ data: ResponseFollowModel }> => {
  const { followerId } = payload;
  return await makeApiCall({
    action: 'deleteOneFollowers',
    urlParams: { followerId },
  });
};

export const createOneFollowersAPI = async (payload: {
  followerId: string;
}): Promise<{ data: ResponseFollowModel }> => {
  const { followerId } = payload;
  return await makeApiCall({
    action: 'createOneFollowers',
    urlParams: { followerId },
  });
};

export const getFollowersAPI = async (
  payload: PaginationRequest,
): Promise<{ data: ResponseFollowModel }> => {
  return await makeApiCall({
    action: 'getFollowers',
    queryParams: payload,
  });
};

export const getFollowingsAPI = async (
  payload: PaginationRequest,
): Promise<{ data: ResponseFollowModel }> => {
  return await makeApiCall({
    action: 'getFollowings',
    queryParams: payload,
  });
};

export const GetInfiniteFollowersAPI = (payload: {
  take: number;
  sort: SortModel;
  search?: string;
}) => {
  const { take, sort, search } = payload;
  return useInfiniteQuery({
    queryKey: ['followers', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getFollowersAPI({
        take: take,
        sort: sort,
        search: search,
        page: pageParam,
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};

export const GetInfiniteFollowingsAPI = (payload: {
  take: number;
  sort: SortModel;
  search?: string;
}) => {
  const { take, sort, search } = payload;
  return useInfiniteQuery({
    queryKey: ['followings', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getFollowingsAPI({
        take: take,
        page: pageParam,
        sort: sort,
        search: search,
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};
