/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { EmptyData, LoadingFile } from '../ui-setting/ant';
import { GetInfiniteTransactionsAPI } from '@/api-site/transaction';
import { useInView } from 'react-intersection-observer';
import { ListTransactions } from './list-transactions';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { BiTransfer } from 'react-icons/bi';
import { ModelType } from '@/utils/pagination-item';
import { useInputState } from '../hooks/use-input-state';
import { ButtonLoadMore, SearchInput } from '../ui-setting';

type Props = {
  model?: ModelType;
  days?: number;
  organizationId?: string;
};

const TableTransactions: React.FC<Props> = ({
  model,
  organizationId,
  days,
}) => {
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
    queryKey: ['transactions', 'infinite'],
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const dataTableTransactions = isLoadingTransaction ? (
    <LoadingFile />
  ) : isErrorTransaction ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataTransaction?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      image={<BiTransfer className="size-10" />}
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
};

export { TableTransactions };
