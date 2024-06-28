import { makeApiCall } from '@/api-site/clients';
import { SortModel } from '@/utils/paginations';
import { useInfiniteQuery } from '@tanstack/react-query';

export const GetInfiniteTicketsAPI = (payload: {
  eventId: string;
  search?: string;
  take: number;
  sort: SortModel;
}) => {
  const { take, sort, search, eventId } = payload;
  return useInfiniteQuery({
    queryKey: ['tickets', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getTickets',
        queryParams: {
          eventId,
          sort,
          take,
          search,
          page: pageParam,
        },
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};
