import { makeApiCall } from '@/api-site/clients';
import { AffiliationModel } from '@/types/affiliation';
import { PaginationRequest } from '@/utils';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const GetOneAffiliationAPI = (payload: {
  code: string;
  eventId: string;
}) => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['affiliation', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneAffiliation',
        queryParams: payload,
      }),
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as AffiliationModel,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const GetInfiniteAffiliationsUserAPI = (payload: PaginationRequest) => {
  const { take, sort, search } = payload;
  return useInfiniteQuery({
    queryKey: ['affiliations', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getAffiliations',
        queryParams: {
          take,
          sort,
          search,
          page: pageParam,
          customer: 'affiliations',
        },
      }),
    initialPageParam: 1,
  });
};

export const GetInfiniteAffiliationsActivitiesUserAPI = (
  payload: PaginationRequest,
) => {
  const { take, sort, search } = payload;
  return useInfiniteQuery({
    queryKey: ['affiliations-activities', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getAffiliationsActivities',
        queryParams: {
          take,
          sort,
          search,
          page: pageParam,
        },
      }),
    initialPageParam: 1,
  });
};
