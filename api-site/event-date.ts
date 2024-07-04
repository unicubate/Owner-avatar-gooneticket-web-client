import { makeApiCall } from '@/api-site/clients';
import { EventDateModel } from '@/types/event-date';
import { SortModel } from '@/utils/paginations';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const GetOneEventDateAPI = (payload: { id: string }) => {
  const { id } = payload;
  const { data, isError, isLoading, isPending, status, refetch } = useQuery({
    queryKey: ['event-date', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneEventDate',
        urlParams: { id },
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as EventDateModel,
    isError,
    isPending,
    isLoading,
    status,
    refetch,
  };
};

export const GetInfiniteEventDatesAPI = (payload: {
  eventId?: string;
  search?: string;
  take: number;
  sort: SortModel;
  organizationId: string;
}) => {
  const { take, sort, search, organizationId, eventId } = payload;
  return useInfiniteQuery({
    queryKey: ['event-dates', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getEventDates',
        queryParams: {
          eventId,
          sort,
          take,
          search,
          expired: 'false',
          page: pageParam,
          organizationId,
        },
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};
