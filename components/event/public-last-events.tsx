/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteEventsAPI } from '@/api-site/event';
import { ButtonLoadMore, ErrorFile } from '@/components/ui-setting';
import { Skeleton } from '@/components/ui/skeleton';
import { EventModel } from '@/types/event';
import { UserVisitorModel } from '@/types/user';
import { itemsNumberArray } from '@/utils/utils';
import { ListLastEvents } from './list-last-events';

export function PublicLastEvents({
  userVisitor,
}: {
  userVisitor: UserVisitorModel;
}) {
  const {
    isLoading: isLoadingEvents,
    isError: isErrorEvents,
    data: dataEvents,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteEventsAPI({
    take: 6,
    sort: 'DESC',
    organizationId: userVisitor?.organizationId,
    status: 'ACTIVE',
    expired: 'false',
  });

  const dataTable = isLoadingEvents ? (
    <>
      {itemsNumberArray(4).map((i, index) => (
        <li key={index} className="flex items-center space-x-2 py-2">
          <Skeleton className="size-16 rounded-md" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </li>
      ))}
    </>
  ) : isErrorEvents ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataEvents?.pages[0]?.data?.total) <= 0 ? (
    ''
  ) : (
    <>
      <div className="mt-8 flow-root">
        <ul className="-my-7 divide-y divide-gray-200 dark:divide-gray-800">
          {dataEvents?.pages
            .flatMap((page: any) => page?.data?.value)
            .map((item: EventModel, index) => (
              <ListLastEvents item={item} key={index} />
            ))}
        </ul>
      </div>
    </>
  );

  return (
    <>
      <div className="px-4 py-6 sm:p-6 lg:p-8">
        {userVisitor?.organizationId && (
          <h3 className="font-bold dark:text-white">More events</h3>
        )}
        {dataTable}

        <div className="mx-auto mt-4 justify-center text-center">
          {hasNextPage && (
            <ButtonLoadMore
              isFetchingNextPage={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            />
          )}
        </div>
      </div>
    </>
  );
}
