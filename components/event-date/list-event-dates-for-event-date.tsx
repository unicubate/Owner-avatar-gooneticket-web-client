/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteEventDatesAPI } from '@/api-site/event-date';
import {
  ButtonLoadMore,
  ErrorFile,
  LoadingFile,
} from '@/components/ui-setting';
import { useInputState } from '../hooks';
import { ListEventDates } from './list-event-dates';

const ListEventDatesForEventDate = ({
  event,
}: {
  event: { id: string; organizationId: string; slug: string };
}) => {
  const { t, search } = useInputState();

  const {
    isLoading: isLoading,
    isError: isError,
    data: data,
    isFetchingNextPage: isFetchingNextPage,
    hasNextPage: hasNextPage,
    fetchNextPage: fetchNextPage,
  } = GetInfiniteEventDatesAPI({
    search,
    take: 6,
    sort: 'ASC',
    eventId: event?.id,
    organizationId: event?.organizationId,
  });

  return (
    <>
      <div className="py-2 sm:mt-0">
        <p className="font-bold">
          {t.formatMessage({ id: 'UTIL.SELECT_DATE' })}
        </p>
      </div>
      {isLoading ? (
        <LoadingFile />
      ) : isError ? (
        <ErrorFile title="404" description="Error find data please try again" />
      ) : Number(data?.pages[0]?.data?.total) <= 0 ? (
        <div className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-input p-4 text-sm font-medium shadow-sm hover:border-blue-500 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500 dark:bg-background">
          <p className="text-gray-700 dark:text-gray-200">Date not present</p>
        </div>
      ) : event?.id ? (
        data?.pages
          .flatMap((page: any) => page?.data?.value)
          .map((item, index: number) => (
            <ListEventDates item={item} index={index} key={index} />
          ))
      ) : null}

      {event?.id && hasNextPage && (
        <div className="mx-auto mt-2 justify-center text-center">
          <ButtonLoadMore
            size="sm"
            className="mx-[200px]"
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
    </>
  );
};

export { ListEventDatesForEventDate };
