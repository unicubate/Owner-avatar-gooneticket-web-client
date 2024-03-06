/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteTransactionsAPI } from '@/api-site/transaction';
import { ModelType } from '@/utils/pagination-item';
import { ArrowRightLeftIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInputState } from '../hooks/use-input-state';
import { ButtonLoadMore, SearchInput } from '../ui-setting';
import { EmptyData, LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ListTransactions } from './list-transactions';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

type Props = {
  model?: ModelType;
  days?: number;
  organizationId?: string;
};

export function TableTransactions(props: Props) {
  const { model, organizationId, days } = props;

  const { search, handleSetSearch } = useInputState();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingTransaction,
    isError: isErrorTransaction,
    data: dataTransaction,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteTransactionsAPI({
    search,
    organizationId,
    model: model?.toLocaleUpperCase(),
    take: 10,
    sort: 'DESC',
    days,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const dataTableTransactions = isLoadingTransaction ? (
    <LoadingFile />
  ) : isErrorTransaction ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : dataTransaction?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      image={<ArrowRightLeftIcon className="size-10" />}
      title="You don't have any transaction"
      description={`Share your page with your audience to get started.`}
    />
  ) : (
    dataTransaction?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListTransactions item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#121212]">
        {/* <StatisticChartTransactions /> */}

        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="mt-4 sm:mt-0">
            <p className="text-lg font-bold">Recent transactions</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <SearchInput
              placeholder="Search by first name, last name, email"
              onChange={handleSetSearch}
            />
          </div>
        </div>

        <table className="mt-4 min-w-full lg:divide-y">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {dataTableTransactions}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div className="mx-auto mt-2 justify-center text-center">
          <ButtonLoadMore
            ref={ref}
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
    </>
  );
}
