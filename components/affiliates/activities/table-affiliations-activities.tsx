/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteAffiliationsActivitiesUserAPI } from '@/api-site/affiliation';
import {
  ButtonLoadMore,
  EmptyData,
  ErrorFile,
  LoadingFile,
} from '@/components/ui-setting';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowRightLeftIcon, CalendarCheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInputState } from '../../hooks/use-input-state';
import { StatisticAffiliationsActivities } from '../statistics/statistic-order-transactions';
import { ListAffiliationsTransactions } from './list-affiliations-activities';

export const TableAffiliationsActivities = () => {
  const [period, setPeriod] = useState(120);
  const { search, handleSetSearch, t } = useInputState();
  const { ref, inView } = useInView();
  const [dayCount, setDayCount] = useState(30);
  const handleDaysChange = (newDays: number) => setDayCount(newDays);

  const {
    isLoading: isLoading,
    isError: isError,
    data: data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteAffiliationsActivitiesUserAPI({
    search,
    take: 20,
    sort: 'DESC',
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      <StatisticAffiliationsActivities />

      <div className="mt-4 flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <CalendarCheckIcon className="size-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {dayCount > 0
                    ? `${t.formatMessage({ id: 'TRANSACTION.LAST_DAY' }, { day: dayCount })}`
                    : `${t.formatMessage({ id: 'TRANSACTION.ALL_TIME' })}`}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:border-input w-auto">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    handleDaysChange(30);
                  }}
                >
                  <span className="cursor-pointer">
                    {t.formatMessage(
                      { id: 'TRANSACTION.LAST_DAY' },
                      { day: 30 },
                    )}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  handleDaysChange(30);
                }}
              >
                <span className="cursor-pointer">
                  {t.formatMessage(
                    { id: 'TRANSACTION.LAST_DAY' },
                    { day: 120 },
                  )}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  handleDaysChange(-1);
                }}
              >
                <span className="cursor-pointer">
                  {t.formatMessage({ id: 'TRANSACTION.ALL_TIME' })}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="dark:border-input dark:bg-background mt-4 overflow-hidden rounded-lg border bg-white p-4">
        {/* <StatisticChartTransactions /> */}

        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="mt-4 sm:mt-0">
            <p className="text-lg font-bold">
              {t.formatMessage({ id: 'UTIL.ACTIVITY_RECENT' })}
            </p>
          </div>
        </div>

        <table className="mt-4 min-w-full lg:divide-y">
          <tbody className="dark:divide-input divide-y divide-gray-200">
            {isLoading ? (
              <tr className="table-row">
                <td className="table-cell">
                  <LoadingFile />
                </td>
              </tr>
            ) : isError ? (
              <ErrorFile
                title="404"
                description="Error find data please try again..."
              />
            ) : Number(data?.pages[0]?.data?.total) <= 0 ? (
              <tr className="table-row">
                <td className="table-cell">
                  <EmptyData
                    image={<ArrowRightLeftIcon className="size-10" />}
                    title={t.formatMessage({ id: 'TRANSACTION.ANY' })}
                    description={`Share your page with your audience to get started.`}
                  />
                </td>
              </tr>
            ) : (
              data?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index) => (
                  <ListAffiliationsTransactions
                    item={item}
                    key={index}
                    index={index}
                  />
                ))
            )}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div className="mx-auto mt-2 justify-center text-center">
          <ButtonLoadMore
            ref={ref}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
    </>
  );
};
