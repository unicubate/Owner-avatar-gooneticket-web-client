import { makeApiCall } from '@/api-site/clients';
import { useQuery } from '@tanstack/react-query';

export const GetStatisticsAffiliationsActivitiesAPI = (payload: {
  day?: string;
  period?: number;
  eventId?: string;
  byCreatedAt?: 'true';
  year?: string;
  month?: string;
  lang: string;
  isGraphic: 'true' | 'false';
}) => {
  const { data, isError, error, isLoading, isPending, status, refetch } =
    useQuery({
      queryKey: ['statistic-affiliations-activities', { ...payload }],
      queryFn: async () =>
        await makeApiCall({
          action: 'getStatisticsAffiliationsActivities',
          queryParams: payload,
        }),
    });

  return {
    data: data?.data as any,
    error,
    isError,
    isPending,
    isLoading,
    status,
    refetch,
  };
};
