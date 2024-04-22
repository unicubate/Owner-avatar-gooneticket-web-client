import { AffiliationFormModel } from '@/types/affiliation';
import { makeApiCall } from '@/utils/end-point';
import { PaginationRequest } from '@/utils/paginations';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const CreateOrUpdateOneAffiliationAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['affiliations'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: AffiliationFormModel & { affiliationId: string },
    ) => {
      const { affiliationId } = payload;
      return affiliationId
        ? await makeApiCall({
            action: 'updateOneAffiliation',
            body: payload,
            urlParams: { affiliationId },
          })
        : await makeApiCall({
            action: 'createOneAffiliation',
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

export const DeleteOneAffiliationAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['affiliations'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { affiliationId: string }) => {
      const { affiliationId } = payload;
      return await makeApiCall({
        action: 'deleteOneAffiliation',
        urlParams: { affiliationId },
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

export const GetInfiniteAffiliatesAPI = (
  payload: {
    search?: string;
    take: number;
    productId?: string;
    organizationSellerId?: string;
    organizationReceivedId?: string;
  } & PaginationRequest,
) => {
  const {
    take,
    sort,
    productId,
    organizationSellerId,
    search,
    organizationReceivedId,
  } = payload;
  return useInfiniteQuery({
    queryKey: ['affiliations', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getAffiliations',
        queryParams: {
          take,
          sort,
          search,
          productId,
          page: pageParam,
          organizationSellerId,
          organizationReceivedId,
        },
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};
