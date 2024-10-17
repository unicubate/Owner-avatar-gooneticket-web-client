import { makeApiCall } from '@/api-site/clients';
import { PaymentsPayoutModel } from '@/types/payment';
import { PaginationRequest, SortModel } from '@/utils/paginations';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export type PaymentModel =
  | 'PAYMENT-CREATE'
  | 'FREE-EVENT'
  | 'BOOKING-EVENT'
  | 'PAYPAL-EVENT'
  | 'STRIPE-EVENT'
  | 'PAYPAL-SHOP'
  | 'STRIPE-SHOP'
  | 'STRIPE-CHECKOUT-SESSION-EVENT'
  | 'STRIPE-CONFIRM-CHECKOUT-SESSION-EVENT'
  | 'PAYMENT-SELLER-WITHDRAWALS-CREATE';

export const CreateOnPaymentAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey1 = ['payout-setup'];
  const queryKey2 = ['user'];
  const queryKey3 = ['withdrawals'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: [...queryKey1],
    mutationFn: async (payload: { data: any; paymentModel: PaymentModel }) => {
      const { paymentModel, data } = payload;

      if (paymentModel === 'PAYPAL-SHOP') {
        return await makeApiCall({
          action: 'createOnePaymentsPaypalShop',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'PAYMENT-CREATE') {
        return await makeApiCall({
          action: 'createOnePaymentsCreate',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'STRIPE-CHECKOUT-SESSION-EVENT') {
        return await makeApiCall({
          action: 'createOnePaymentsStripeCheckoutSessionEvent',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'STRIPE-CONFIRM-CHECKOUT-SESSION-EVENT') {
        return await makeApiCall({
          action: 'confirmPaymentsStripeCheckoutSessionEvent',
          urlParams: { token: data?.token },
        });
      }

      if (paymentModel === 'STRIPE-SHOP') {
        return await makeApiCall({
          action: 'createOnePaymentsStripeShop',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'PAYPAL-EVENT') {
        return await makeApiCall({
          action: 'createOnePaymentsPaypalEvent',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'STRIPE-EVENT') {
        return await makeApiCall({
          action: 'createOnePaymentsStripeEvent',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'FREE-EVENT') {
        return await makeApiCall({
          action: 'createOnePaymentsFreeEvent',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'BOOKING-EVENT') {
        return await makeApiCall({
          action: 'createOnePaymentsBookingEvent',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'PAYMENT-SELLER-WITHDRAWALS-CREATE') {
        return await makeApiCall({
          action: 'createOnePaymentsSellerWithdrawals',
          body: { payload, ...data },
        });
      }
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey: queryKey1 });
      await queryClient.invalidateQueries({ queryKey: queryKey2 });
      await queryClient.invalidateQueries({ queryKey: queryKey3 });
      if (onError) {
        onError(error);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKey1 });
      await queryClient.invalidateQueries({ queryKey: queryKey2 });
      await queryClient.invalidateQueries({ queryKey: queryKey3 });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKey1 });
      await queryClient.invalidateQueries({ queryKey: queryKey2 });
      await queryClient.invalidateQueries({ queryKey: queryKey3 });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};

export const DeleteOnePaymentAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['payout-setup'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { paymentId: string }) => {
      const { paymentId } = payload;
      return await makeApiCall({
        action: 'deleteOnePayment',
        urlParams: { paymentId },
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

export const GetInfinitePaymentsAPI = (payload: {
  take: number;
  sort: SortModel;
}) => {
  const { take, sort } = payload;
  return useInfiniteQuery({
    queryKey: ['payments', 'infinite'],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getPayments',
        queryParams: {
          sort,
          take,
          customer: 'client',
          page: pageParam,
        },
      }),
    initialPageParam: 1,
  });
};

export const GetOnePaymentsStripeClientSecretAPI = (payload: any) => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['stripe-client-secret', payload],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOnePaymentsStripeClientSecret',
        queryParams: payload,
      }),
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const GetPaymentsPayoutSetupAPI = () => {
  const { data, isError, isLoading, status, refetch } = useQuery({
    queryKey: ['payout-setup'],
    queryFn: async () =>
      await makeApiCall({
        action: 'getPaymentsPayoutSetup',
      }),
    refetchOnWindowFocus: true,
  });

  return {
    data: data?.data as PaymentsPayoutModel,
    isError,
    isLoading,
    status,
    refetch,
  };
};

export const GetInfinitePaymentsWithdrawalsAPI = (
  payload: PaginationRequest,
) => {
  const { take, sort } = payload;
  return useInfiniteQuery({
    queryKey: ['withdrawals', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getPaymentsWithdrawals',
        queryParams: {
          sort,
          take,
          customer: 'client',
          page: pageParam,
        },
      }),
    initialPageParam: 1,
  });
};
