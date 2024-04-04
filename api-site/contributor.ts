import {
  ConfirmContributorFormModel,
  ContributorFormModel,
} from '@/types/contributor';
import { ResponsePostModel } from '@/types/post';
import { makeApiCall } from '@/utils/end-point';
import { PaginationRequest, SortModel } from '@/utils/paginations';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const CreateOrUpdateOneContributorAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['contributors'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: ContributorFormModel & { contributorId?: string },
    ) => {
      const { userId, action, contributorId } = payload;
      if (action === 'INVITED') {
        await makeApiCall({
          action: 'createOneContributorInvited',
          urlParams: { userId },
        });
      }
      if (action === 'NEW-CONTRIBUTOR') {
        await makeApiCall({
          action: 'createOneContributor',
          body: payload,
        });
      }

      if (action === 'UPDATE-CONTRIBUTOR' && contributorId) {
        await makeApiCall({
          action: 'updateOneContributor',
          urlParams: { contributorId },
          body: payload,
        });
      }

      return 'ok';
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};

export const DeleteOneContributorAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['contributors'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { contributorId: string }) => {
      const { contributorId } = payload;
      return await makeApiCall({
        action: 'deleteOneContributor',
        urlParams: { contributorId },
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

export const confirmOneContributorAPI = async (
  payload: ConfirmContributorFormModel,
): Promise<{ data: any }> => {
  const { token } = payload;
  return await makeApiCall({
    action: 'confirmOneContributor',
    urlParams: { token },
    body: payload,
  });
};

export const getContributorsAPI = async (
  payload: PaginationRequest,
): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: 'getContributors',
    queryParams: payload,
  });
};

export const GetInfiniteContributorsAPI = (payload: {
  organizationId?: string;
  userId?: string;
  search: string;
  take: number;
  sort: SortModel;
}) => {
  return useInfiniteQuery({
    queryKey: ['contributors', 'infinite', { ...payload }],
    queryFn: async ({ pageParam = 1 }) =>
      await getContributorsAPI({
        ...payload,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page ?? undefined,
  });
};
