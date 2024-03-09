import { UserAddressFormModel, UserAddressModel } from '@/types/user-address';
import { makeApiCall } from '@/utils/end-point';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const CreateOrUpdateOneUserAddressAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['user-address'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: UserAddressFormModel & { userAddressId: string },
    ) => {
      const { userAddressId } = payload;
      return userAddressId
        ? await makeApiCall({
            action: 'updateOneUserAddress',
            body: payload,
            urlParams: { userAddressId },
          })
        : await makeApiCall({
            action: 'createOneUserAddress',
            body: payload,
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

export const DeleteOneUserAddressAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['user-address'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { userAddressId: string }) => {
      const { userAddressId } = payload;
      return await makeApiCall({
        action: 'deleteOneUserAddress',
        urlParams: { userAddressId },
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

export const GetOneUserAddressMeAPI = () => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['user-address'],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneUserAddress',
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as UserAddressModel,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};
