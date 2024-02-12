import { CartFormModel, CartModel, CartOrderModel } from '@/types/cart';
import { makeApiCall } from '@/utils/end-point';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const CreateOrUpdateOneCartAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['carts', 'cart-order'];
  const queryClient = useQueryClient();
  const result = useMutation({
    // mutationKey: queryKey,
    mutationFn: async (payload: CartFormModel & { catId?: string }) => {
      const { catId } = payload;
      return catId
        ? await makeApiCall({
            action: 'updateOneCart',
            body: payload,
            urlParams: { catId },
          })
        : await makeApiCall({
            action: 'createOneCart',
            body: { ...payload },
          });
    },
    onError: (error) => {
      queryClient.invalidateQueries();
      if (onError) {
        onError(error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries();
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};

export const DeleteOneCartAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['carts'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { cartId: string }) => {
      const { cartId } = payload;

      return await makeApiCall({
        action: 'deleteOneCart',
        urlParams: { cartId },
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

export const GetCartsAPI = (payload: {
  organizationId?: string;
  ipLocation?: string;
  userId: string;
  cartOrderId?: string;
}) => {
  const { data, isError, isLoading, status, refetch } = useQuery({
    queryKey: ['carts', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getCarts',
        queryParams: payload,
      }),
    refetchOnWindowFocus: false,
  });

  return { data: data?.data as CartModel, isError, isLoading, status, refetch };
};

export const GetOneCartOrderAPI = (payload: {
  organizationId?: string;
  cartOrderId?: string;
}) => {
  const { data, isError, isLoading, status, refetch } = useQuery({
    queryKey: ['cart-order', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneCartOrder',
        queryParams: payload,
      }),
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as CartOrderModel,
    isError,
    isLoading,
    status,
    refetch,
  };
};
