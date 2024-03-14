import {
  NextStepProfileFormModel,
  ProfileFormModel,
  ProfileModel,
} from '@/types/profile.type';
import { makeApiCall } from '@/utils/end-point';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const UpdateOneProfileNextStepAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['user'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: NextStepProfileFormModel): Promise<any> => {
      return await makeApiCall({
        action: 'updateOneProfileNextStep',
        body: payload,
        urlParams: { userId: payload?.userId },
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

export const UpdateOneProfileAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['profile'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: ProfileFormModel): Promise<any> => {
      const { attachment } = payload;
      let data = new FormData();
      data.append('url', `${payload.url ?? ''}`);
      data.append('color', `${payload.color ?? ''}`);
      data.append('currencyId', `${payload.currencyId ?? ''}`);
      data.append('countryId', `${payload.countryId ?? ''}`);
      data.append('birthday', `${payload.birthday ?? ''}`);
      data.append('phone', `${payload.phone ?? ''}`);
      data.append('lastName', `${payload.lastName ?? ''}`);
      data.append('firstName', `${payload.firstName ?? ''}`);
      data.append('username', `${payload.username ?? ''}`);
      data.append('description', `${payload.description ?? ''}`);
      data.append('attachment', attachment);

      await makeApiCall({
        action: 'updateOneProfile',
        body: data,
      });

      return 'Ok';
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

export const GetOneProfileAPI = (payload: { profileId: string }) => {
  const { profileId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['profile', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneProfile',
        urlParams: { profileId },
      }),
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as ProfileModel | any,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const GetAllCurrenciesAPI = (search?: string) => {
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ['currencies'],
    queryFn: async () =>
      await makeApiCall({
        action: 'getAllCurrencies',
        queryParams: search,
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return { data: data?.data as any, isError, isLoading, status };
};

export const GetAllCountiesAPI = (search?: string) => {
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ['countries'],
    queryFn: async () =>
      await makeApiCall({
        action: 'getAllCounties',
        queryParams: search,
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return { data: data?.data as any, isError, isLoading, status };
};

export const getOneFileProfileAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/users/file/${fileName}`
    : null;
