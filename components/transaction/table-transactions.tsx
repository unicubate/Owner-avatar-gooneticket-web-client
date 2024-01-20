/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { ButtonInput, EmptyData, LoadingFile } from '../ui-setting/ant';
import { GetInfiniteTransactionsAPI } from '@/api-site/transaction';
import { useInView } from 'react-intersection-observer';
import { ListTransactions } from './list-transactions';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { BiTransfer } from 'react-icons/bi';
import { ModelType } from '@/utils/pagination-item';
import { Input } from 'antd';
import { useInputState } from '../hooks/use-input-state';

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
            <Input
              placeholder="Search by email, name"
              onChange={handleSetSearch}
              className="dark:border-gray-800 dark:bg-[#121212] dark:text-white dark:placeholder:text-gray-500"
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
          <div className="sm:mt-0">
            <ButtonInput
              ref={ref}
              onClick={() => fetchNextPage()}
              shape="default"
              type="button"
              size="large"
              loading={isFetchingNextPage ? true : false}
              color={'indigo'}
              minW="fit"
            >
              Load More
            </ButtonInput>
          </div>
        </div>
      )}

      {/* <div className="flex items-center mt-2 mb-4 space-x-4">
        <ButtonInput
          status="cancel"
          type="button"
          shape="default"
          size="normal"
          loading={false}
        // onClick={() => back()}
        >
          Preview
        </ButtonInput>
        <ButtonInput
          status="cancel"
          type="button"
          shape="default"
          size="normal"
          loading={false}
        >
          Next
        </ButtonInput>
      </div> */}
    </>
  );
};

export { TableTransactions };
