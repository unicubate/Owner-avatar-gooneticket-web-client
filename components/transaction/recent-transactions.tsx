/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteTransactionsAPI } from '@/api-site/transaction';
import { ArrowRightLeftIcon } from 'lucide-react';
import { EmptyData, LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ListTransactions } from './list-transactions';

type Props = {
  model?: string;
  days?: number;
  organizationId?: string;
};

export const RecentTransactions = ({ model, organizationId, days }: Props) => {
  const {
    isLoading: isLoadingTransaction,
    isError: isErrorTransaction,
    data: dataTransaction,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteTransactionsAPI({
    organizationId,
    model: model?.toLocaleUpperCase(),
    take: 10,
    sort: 'DESC',
    days,
  });

  const dataTableTransactions = isLoadingTransaction ? (
    <LoadingFile />
  ) : isErrorTransaction ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataTransaction?.pages[0]?.data?.total) <= 0 ? (
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
      <div className="mt-4 overflow-hidden rounded-lg border bg-white p-4 dark:border-gray-800 dark:bg-[#04080b]">
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <table className="mt-4 min-w-full lg:divide-y lg:divide-gray-200">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {dataTableTransactions}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
