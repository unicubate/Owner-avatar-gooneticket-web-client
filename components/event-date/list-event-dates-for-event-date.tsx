/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteEventDatesAPI } from '@/api-site/event-date';
import { useInputState } from '../hooks';
import { ButtonLoadMore } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ListEventDates } from './list-event-dates';

const ListEventDatesForEventDate = ({
  event,
}: {
  event: { id: string; slug: string };
}) => {
  const { search } = useInputState();

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
    sort: 'DESC',
    eventId: event?.id,
  });

  return (
    <>
      {isLoading ? (
        <LoadingFile />
      ) : isError ? (
        <ErrorFile title="404" description="Error find data please try again" />
      ) : Number(data?.pages[0]?.data?.total) <= 0 ? null : event?.id ? (
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
