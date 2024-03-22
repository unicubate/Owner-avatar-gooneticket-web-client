import { ResponsePostModel } from '@/types/post';
import { makeApiCall } from '@/utils/end-point';
import { PaginationRequest, SortModel } from '@/utils/paginations';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export type PaymentModel =
  | 'PAYPAL-DONATION'
  | 'STRIPE-DONATION'
  | 'PAYMENT-CREATE'
  | 'PAYPAL-SUBSCRIBE'
  | 'STRIPE-SUBSCRIBE'
  | 'PAYPAL-COMMISSION'
  | 'STRIPE-COMMISSION'
  | 'PAYPAL-SHOP'
  | 'STRIPE-SHOP'
  | 'RESEND-VERIFY-CODE-PHONE'
  | 'VERIFY-CODE-PHONE';

export const CreateOnPaymentPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['payments'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { data: any; paymentModel: PaymentModel }) => {
      const { paymentModel, data } = payload;

      if (paymentModel === 'PAYPAL-SUBSCRIBE') {
        return await makeApiCall({
          action: 'createOnePaymentsPaypalSubscribe',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'STRIPE-SUBSCRIBE') {
        return await makeApiCall({
          action: 'createOnePaymentsStripeSubscribe',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'PAYPAL-DONATION') {
        return await makeApiCall({
          action: 'createOnePaymentsPaypalDonation',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'STRIPE-DONATION') {
        return await makeApiCall({
          action: 'createOnePaymentsStripeDonation',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'PAYPAL-SHOP') {
        return await makeApiCall({
          action: 'createOnePaymentsPaypalShop',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'STRIPE-SHOP') {
        return await makeApiCall({
          action: 'createOnePaymentsStripeShop',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'PAYPAL-COMMISSION') {
        return await makeApiCall({
          action: 'createOnePaymentsPaypalCommission',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'STRIPE-COMMISSION') {
        return await makeApiCall({
          action: 'createOnePaymentsStripeCommission',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'PAYMENT-CREATE') {
        return await makeApiCall({
          action: 'createOnePaymentsCreate',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'RESEND-VERIFY-CODE-PHONE') {
        return await makeApiCall({
          action: 'resendVerifyCodeOnePaymentsCreate',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'VERIFY-CODE-PHONE') {
        return await makeApiCall({
          action: 'verifyCodeOnePaymentsCreate',
          body: { paymentModel, ...data },
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

export const DeleteOnePaymentAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['payments'];
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

export const getPaymentsAPI = async (
  payload: PaginationRequest,
): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: 'getPayments',
    queryParams: payload,
  });
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
      await getPaymentsAPI({
        take: take,
        page: Number(pageParam),
        sort: sort,
      }),
    initialPageParam: 1,
  });
};
