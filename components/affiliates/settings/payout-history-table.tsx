import { GetInfinitePaymentsWithdrawalsAPI } from '@/api-site/payment';
import { useInputState } from '@/components/hooks';
import {
  ButtonInput,
  ButtonLoadMore,
  EmptyData,
  ErrorFile,
  LoadingFile,
} from '@/components/ui-setting';
import { LandmarkIcon, WalletIcon } from 'lucide-react';
import { CreateWithdrawFormUser } from './create-withdraw-form-user';
import { ListPayoutHistory } from './list-payout-history';

const PayoutHistoryTable = () => {
  const { t, isOpen, setIsOpen } = useInputState();
  const {
    isLoading: isLoadingWithdrawals,
    isError: isErrorWithdrawals,
    data: dataWithdrawals,
    isFetchingNextPage: isFetchingNextPageWithdrawals,
    hasNextPage: hasNextPageWithdrawals,
    fetchNextPage: fetchNextPageWithdrawals,
  } = GetInfinitePaymentsWithdrawalsAPI({
    take: 10,
    sort: 'DESC',
  });

  return (
    <>
      <div className="dark:bg-background mt-8 overflow-hidden rounded-lg border bg-white dark:border-input">
        <div className="px-4 py-8 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="mt-2 sm:mt-0">
              <p className="font-bold">Payout history</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <div className="ml-auto">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="sm"
                  variant="primary"
                  onClick={() => setIsOpen(true)}
                  icon={<WalletIcon className="size-4" />}
                >
                  {t.formatMessage({ id: 'TRANSACTION.WITHDRAW' })}
                </ButtonInput>
              </div>
            </div>
          </div>

          <table className="mt-4 min-w-full lg:divide-y">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {isLoadingWithdrawals ? (
                <LoadingFile />
              ) : isErrorWithdrawals ? (
                <ErrorFile
                  title="404"
                  description="Error find data please try again"
                />
              ) : Number(dataWithdrawals?.pages[0]?.data?.total) <= 0 ? (
                <EmptyData
                  image={<LandmarkIcon className="size-10" />}
                  title=" You haven’t received any payouts so far. "
                  description={`Create your first withdraw`}
                />
              ) : (
                dataWithdrawals?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item, index: number) => (
                    <ListPayoutHistory item={item} key={index} index={index} />
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen ? (
        <CreateWithdrawFormUser isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : null}

      {hasNextPageWithdrawals && (
        <div className="mx-auto mt-2 justify-center text-center">
          <ButtonLoadMore
            hasNextPage={hasNextPageWithdrawals}
            isFetchingNextPage={isFetchingNextPageWithdrawals}
            onClick={() => fetchNextPageWithdrawals()}
          />
        </div>
      )}
    </>
  );
};

export { PayoutHistoryTable };
