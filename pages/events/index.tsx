import { GetInfiniteFollowsEventsAPI } from '@/api-site/event';
import { ListPublicEvents } from '@/components/event/list-public-events';
import {
  useInputState,
  useReactIntersectionObserver,
} from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { EventSkeleton } from '@/components/skeleton/event-skeleton';
import {
  ButtonLoadMore,
  EmptyData,
  ErrorFile,
  SearchInput,
} from '@/components/ui-setting';
import { PrivateComponent } from '@/components/util/private-component';
import { EventModel } from '@/types/event';
import { itemsNumberArray } from '@/utils/utils';
import { TicketIcon } from 'lucide-react';

const EventsIndex = () => {
  const { search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingEvents,
    isError: isErrorEvents,
    data: dataEvents,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteFollowsEventsAPI({
    search,
    take: 10,
    sort: 'DESC',
  });
  const { ref } = useReactIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <>
      <LayoutDashboard title={'Orders'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="py-4 sm:flex sm:items-center sm:justify-between">
                <div className="mt-4 sm:mt-0">
                  <p className="text-lg font-bold">Recent Events</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <SearchInput
                    placeholder="Search by title"
                    onChange={handleSetSearch}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-3">
                {isLoadingEvents
                  ? itemsNumberArray(3).map((i, index) => (
                      <EventSkeleton key={i} index={index} />
                    ))
                  : isErrorEvents
                    ? null
                    : Number(dataEvents?.pages[0]?.data?.total) <= 0
                      ? null
                      : dataEvents?.pages
                          .flatMap((page: any) => page?.data?.value)
                          .map((item: EventModel, index: number) => (
                            <ListPublicEvents
                              item={item}
                              key={index}
                              index={index}
                            />
                          ))}
              </div>

              {isErrorEvents ? (
                <ErrorFile
                  title="404"
                  className="flex items-center justify-center"
                  description="Error find data please try again..."
                />
              ) : null}

              {Number(dataEvents?.pages[0]?.data?.total) <= 0 ? (
                <EmptyData
                  image={<TicketIcon className="size-10" />}
                  title="This page hasn't published anything!"
                  description={`When he does, his publications will appear here first.`}
                />
              ) : null}

              {hasNextPage && (
                <div className="mx-auto justify-center text-center">
                  <ButtonLoadMore
                    ref={ref}
                    className="w-[240px]"
                    isFetchingNextPage={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(EventsIndex);
