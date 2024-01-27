import { DonationFormModel, DonationModel } from '@/types/donation';
import { makeApiCall } from '@/utils/end-point';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const UpdateOneDonationAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['donation'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: DonationFormModel & { donationId: string }) => {
      const { donationId } = payload;
      return await makeApiCall({
        action: 'updateOneDonation',
        body: payload,
        urlParams: { donationId },
      });
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

export const GetOneDonationAPI = (payload: { donationId: string }) => {
  const { donationId } = payload;
  const { data, isError, isLoading, status, refetch } = useQuery({
    queryKey: ['donation', payload],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneDonation',
        urlParams: { donationId },
      }),
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as DonationModel,
    isError,
    isLoading,
    status,
    refetch,
  };
};
