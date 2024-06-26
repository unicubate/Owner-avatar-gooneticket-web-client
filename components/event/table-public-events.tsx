/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteEventsAPI } from '@/api-site/event';
import { EventModel } from '@/types/event';
import { UserModel } from '@/types/user';
import { itemsNumberArray } from '@/utils/utils';
import { TicketIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useInputState } from '../hooks';
import { EventSkeleton } from '../skeleton/event-skeleton';
import { ButtonLoadMore } from '../ui-setting';
import { EmptyData } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ListPublicEvents } from './list-public-events';

const TablePublicEvents = ({ user }: { user: UserModel }) => {
  const { search } = useInputState();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingEvents,
    isError: isErrorEvents,
    data: dataEvents,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteEventsAPI({
    search,
    take: 10,
    sort: 'DESC',
    expired: 'FALSE',
    organizationId: user?.organizationId,
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoadingEvents ? (
          itemsNumberArray(3).map((i, index) => (
            <EventSkeleton key={i} index={index} />
          ))
        ) : isErrorEvents ? (
          <ErrorFile
            title="404"
            description="Error find data please try again..."
          />
        ) : Number(dataEvents?.pages[0]?.data?.total) <= 0 ? (
          ''
        ) : (
          dataEvents?.pages
            .flatMap((page: any) => page?.data?.value)
            .map((item: EventModel, index: number) => (
              <ListPublicEvents item={item} key={index} index={index} />
            ))
        )}
      </div>

      {Number(dataEvents?.pages[0]?.data?.total) <= 0 ? (
        <>
          <EmptyData
            image={<TicketIcon className="size-10" />}
            title={`This ${user?.status.toLowerCase()} has not yet published anything as an event`}
            description={`When he does, his publications will appear here first.`}
          />
        </>
      ) : null}

      {hasNextPage && (
        <div className="mx-auto justify-center text-center">
          <ButtonLoadMore
            className="w-[240px]"
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
    </>
  );
};
export { TablePublicEvents };
