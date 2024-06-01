import { makeApiCall } from '@/utils/clients';
import { useQuery } from '@tanstack/react-query';

export const GetOneAffiliationAPI = (payload: {
  code: string;
  productId?: string;
}) => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['affiliation', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneAffiliation',
        queryParams: payload,
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as any,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};
