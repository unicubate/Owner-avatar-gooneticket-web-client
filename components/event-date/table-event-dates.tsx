/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteEventDatesAPI } from '@/api-site/event-date';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { ButtonInput, ButtonLoadMore } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ListEventDates } from './list-event-dates';

const TableEventDates = ({
  eventId,
  currency,
}: {
  eventId: string;
  currency: { code: string; symbol: string };
}) => {
  const { push } = useRouter();
  const { search } = useInputState();
  const [showModal, setShowModal] = useState(false);

  const {
    isLoading: isLoadingEventDates,
    isError: isErrorEventDates,
    data: dataEventDates,
    isFetchingNextPage: isFetchingNextPageEventDates,
    hasNextPage: hasNextPageEventDates,
    fetchNextPage: fetchNextPagePrices,
  } = GetInfiniteEventDatesAPI({
    search,
    take: 10,
    sort: 'ASC',
    eventId,
  });

  return (
    <>
      <div className="mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#04080b]">
        <div className="px-4 py-3">
          <div className="py-4 sm:flex sm:items-center sm:justify-between">
            <div className="mt-4 sm:mt-0">
              <h2 className="text-base font-bold dark:text-white">
                Config price event
              </h2>
            </div>

            <div className="mt-4 sm:mt-0">
              <ButtonInput
                type="button"
                className="w-full"
                size="sm"
                variant="primary"
                onClick={() => setShowModal(true)}
                icon={<PlusIcon className="size-4" />}
              >
                Create price
              </ButtonInput>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {isLoadingEventDates ? (
              <LoadingFile />
            ) : isErrorEventDates ? (
              <ErrorFile
                title="404"
                description="Error find data please try again"
              />
            ) : Number(dataEventDates?.pages[0]?.data?.total) <= 0 ? (
              ''
            ) : (
              dataEventDates?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index: number) => (
                  <ListEventDates item={item} index={index} key={index} />
                ))
            )}
          </div>

          {hasNextPageEventDates && (
            <div className="mx-auto mt-2 justify-center text-center">
              <ButtonLoadMore
                className="mx-[200px]"
                isFetchingNextPage={isFetchingNextPageEventDates}
                onClick={() => fetchNextPagePrices()}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { TableEventDates };
