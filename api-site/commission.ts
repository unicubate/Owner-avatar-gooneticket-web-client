import {
  CommissionFormModel,
  CommissionModel,
  ResponseCommissionModel,
} from '@/types/commission';
import { makeApiCall } from '@/utils/end-point';
import { PaginationRequest, SortModel } from '@/utils/paginations';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { RcFile } from 'antd/es/upload';

export const CreateOrUpdateOneCommissionAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['commissions'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: CommissionFormModel & { commissionId?: string },
    ) => {
      const { commissionId, newImageLists } = payload;
      let data = new FormData();
      data.append('title', `${payload.title ?? ''}`);
      data.append('price', `${payload.price ?? ''}`);
      data.append('urlMedia', `${payload.urlMedia ?? ''}`);
      data.append('enableLimitSlot', `${payload.enableLimitSlot ?? ''}`);
      data.append('limitSlot', `${payload.limitSlot ?? ''}`);
      data.append('description', `${payload.description ?? ''}`);
      data.append('enableDiscount', `${payload.enableDiscount ?? ''}`);
      data.append('discountId', `${payload.discountId ?? ''}`);
      data.append(
        'messageAfterPayment',
        `${payload.messageAfterPayment ?? ''}`,
      );

      payload?.imageList?.length > 0 &&
        payload?.imageList?.forEach((file: any) => {
          data.append('attachmentImages', file?.originFileObj as RcFile);
        });

      if (commissionId) {
        const result = await makeApiCall({
          action: 'updateOneUpload',
          body: { newImageLists },
          queryParams: { uploadableId: commissionId, model: 'COMMISSION' },
        });

        if (result) {
          await makeApiCall({
            action: 'updateOneCommission',
            body: data,
            urlParams: { commissionId },
          });
        }

        return 'ok';
      } else {
        return await makeApiCall({
          action: 'createOneCommission',
          body: data,
        });
      }
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

export const DeleteOneCommissionAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['commissions'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { commissionId: string }) => {
      const { commissionId } = payload;
      return await makeApiCall({
        action: 'deleteOneCommission',
        urlParams: { commissionId },
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

export const GetOneCommissionAPI = (payload: {
  commissionId?: string;
  organizationId?: string;
}) => {
  const { data, isError, isLoading, status, refetch } = useQuery({
    queryKey: ['commission', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneCommission',
        queryParams: payload,
      }),
    refetchOnWindowFocus: true,
  });

  return {
    data: data?.data as CommissionModel,
    isError,
    isLoading,
    status,
    refetch,
  };
};

export const getCommissionsAPI = async (
  payload: {
    status?: string;
  } & PaginationRequest,
): Promise<{ data: ResponseCommissionModel }> => {
  return await makeApiCall({
    action: 'getCommissions',
    queryParams: payload,
  });
};

export const GetInfiniteCommissionsAPI = (payload: {
  organizationId: string;
  status?: string;
  take: number;
  sort: SortModel;
  search?: string;
}) => {
  const { organizationId, take, sort, status, search } = payload;
  return useInfiniteQuery({
    queryKey: ['commissions', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getCommissionsAPI({
        organizationId,
        take,
        sort,
        search,
        status: status?.toUpperCase(),
        page: pageParam,
      }),
    initialPageParam: 1,
  });
};
