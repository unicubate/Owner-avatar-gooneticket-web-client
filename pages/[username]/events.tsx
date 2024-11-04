import { GetInfiniteEventsAPI } from '@/api-site/event';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { ListPublicEvents } from '@/components/event/list-public-events';
import {
  useInputState,
  useReactIntersectionObserver,
} from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layouts/user-public-site';
import { CreateConversationsModal } from '@/components/messages/create-conversations-modal';
import { EventSkeleton } from '@/components/skeleton/event-skeleton';
import {
  ButtonLoadMore,
  ErrorFile,
  LoadingFile,
} from '@/components/ui-setting';
import { EventModel } from '@/types/event';
import { itemsNumberArray } from '@/utils/utils';
import { useRouter } from 'next/router';

const EventsPublic = () => {
  const { search, isOpen, setIsOpen, user: userVisiter } = useInputState();
  const { query } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    organizationVisitorId: userVisiter?.organizationId,
  });

  const {
    isLoading: isLoadingEvent,
    isError: isErrorEvent,
    data: dataEvent,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteEventsAPI({
    search,
    take: 10,
    sort: 'DESC',
    expired: 'false',
    organizationId: user?.organizationId,
  });
  const { ref } = useReactIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName || 'User'} ${
          user?.profile?.lastName ?? ''
        }`}
        user={user}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:py-10">
          <div className="container mx-auto space-y-8 p-6">
            {/* <div className="relative bg-gray-900 py-20 sm:py-20 lg:py-24 xl:py-32">
              <div className="absolute inset-0">
                <CoverComponent className="size-full object-cover" profile={user?.profile} />
              </div>

              <div className="absolute inset-0 bg-gray-900/50"></div>


              <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-max text-center">
                  <h1 className="text-3xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                    Events {user?.organization?.name}
                  </h1>

                </div>
              </div>
            </div> */}

            <div className="flow-root">
              <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                {user?.organizationId ? (
                  isLoadingEvent ? (
                    itemsNumberArray(3).map((i, index) => (
                      <EventSkeleton key={i} index={index} />
                    ))
                  ) : isErrorEvent ? (
                    <ErrorFile
                      title="404"
                      description="Error find data please try again..."
                    />
                  ) : Number(dataEvent?.pages[0]?.data?.total) <= 0 ? (
                    ''
                  ) : (
                    dataEvent?.pages
                      .flatMap((page: any) => page?.data?.value)
                      .map((item: EventModel, index: number) =>
                        user?.organizationId ? (
                          <ListPublicEvents
                            item={item}
                            key={index}
                            index={index}
                          />
                        ) : null,
                      )
                  )
                ) : null}
              </div>

              {user?.organizationId && hasNextPage && (
                <div className="mx-auto mt-4 justify-center text-center">
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

        <CreateConversationsModal
          isOpen={isOpen}
          user={user}
          setIsOpen={setIsOpen}
        />
      </LayoutUserPublicSite>

      {status === 'pending' ? <LoadingFile /> : null}

      {status === 'error' ? (
        <ErrorFile
          title="404"
          description="Error find data please try again"
          className="dark:text-white"
        />
      ) : null}
    </>
  );
};

export default EventsPublic;
