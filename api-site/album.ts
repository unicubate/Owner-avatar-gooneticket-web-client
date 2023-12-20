import { makeApiCall } from '@/utils/end-point';
import { PaginationRequest, SortModel } from '@/utils/pagination-item';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AlbumFormModel, ResponseAlbumModel } from '@/types/album';

export const CreateOrUpdateOneAlbumAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['albums'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: AlbumFormModel & { albumId: string }) => {
      const { albumId } = payload;
      return albumId
        ? await makeApiCall({
            action: 'updateOneAlbum',
            body: payload,
            urlParams: { albumId },
          })
        : await makeApiCall({
            action: 'createOneAlbum',
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

export const DeleteOneAlbumAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['albums'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { AlbumId: string }) => {
      const { AlbumId } = payload;
      return await makeApiCall({
        action: 'deleteOneAlbum',
        urlParams: { AlbumId },
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

export const getAlbumsAPI = async (
  payload: PaginationRequest,
): Promise<{ data: ResponseAlbumModel }> => {
  return await makeApiCall({
    action: 'getAlbums',
    queryParams: payload,
  });
};

export const GetAllAlbumsAPI = (payload: {
  organizationId: string;
  isPaginate: 'true' | 'false';
  take: number;
  page: number;
  sort: SortModel;
  queryKey: string[];
}) => {
  const { take, organizationId, isPaginate, sort, page, queryKey } = payload;
  const { data, isError, isLoading, status } = useQuery({
    queryKey: queryKey,
    queryFn: async () =>
      await getAlbumsAPI({
        // organizationId: organizationId,
        isPaginate: isPaginate,
        sort: sort,
        page: page,
        take: take,
      }),
    refetchOnWindowFocus: false,
  });

  return { data: data?.data, isError, isLoading, status };
};

export const GetInfiniteAlbumsAPI = (payload: {
  organizationId: string;
  isPaginate: 'true' | 'false';
  search?: string;
  take: number;
  sort: SortModel;
}) => {
  const { take, organizationId, sort, search, isPaginate } = payload;
  return useInfiniteQuery({
    queryKey: ['albums', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getAlbumsAPI({
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
