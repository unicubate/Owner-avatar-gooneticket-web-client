import { makeApiCall } from '@/api-site/clients';
import { useMutationHandlers } from '@/components/hooks';
import { UserAddressModel } from '@/types/user-address';
import { useMutation, useQuery } from '@tanstack/react-query';

export const CreateOrUpdateOneUserAddressAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKeys = ['user-address'];
  const { handleError, handleSettled, handleSuccess } = useMutationHandlers({
    queryKeys,
    onSuccess,
    onError,
  });
  const result = useMutation({
    mutationKey: queryKeys,
    mutationFn: async (
      payload: UserAddressModel & { userAddressId: string },
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

    onError: handleError,
    onSettled: handleSettled,
    onSuccess: handleSuccess,
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
  const queryKeys = ['user-address'];
  const { handleError, handleSettled, handleSuccess } = useMutationHandlers({
    queryKeys,
    onSuccess,
    onError,
  });
  const result = useMutation({
    mutationKey: queryKeys,
    mutationFn: async (payload: { userAddressId: string }) => {
      const { userAddressId } = payload;
      return await makeApiCall({
        action: 'deleteOneUserAddress',
        urlParams: { userAddressId },
      });
    },

    onError: handleError,
    onSettled: handleSettled,
    onSuccess: handleSuccess,
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
