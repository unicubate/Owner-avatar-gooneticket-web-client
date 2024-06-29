import { makeApiCall } from '@/api-site/clients';
import { PaginationRequest } from '@/utils';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const GetOneAffiliationAPI = (payload: {
  code: string;
  eventId?: string;
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

export const GetInfiniteAffiliationsUserAPI = (
  payload: {
    search?: string;
    take: number;
  } & PaginationRequest,
) => {
  const { take, sort, search } = payload;
  return useInfiniteQuery({
    queryKey: ['affiliations-user', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getAffiliationsUser',
        queryParams: {
          take,
          sort,
          search,
          page: pageParam,
        },
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};
