/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteOrderItemsAPI } from '@/api-site/order-item';
import { ArrowRightLeftIcon } from 'lucide-react';
import { useInputState } from '../hooks/use-input-state';
import { ButtonLoadMore, SearchInput } from '../ui-setting';
import { EmptyData, LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ListOrderItemsUser } from './list-order-items-user';

type Props = {
  days?: number;
  organizationId: string;
};

export function TableOrderItemsUser(props: Props) {
  const { organizationId, days } = props;
  const { search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingOrderItems,
    isError: isErrorOrderItems,
    data: dataOrderItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteOrderItemsAPI({
    search,
    organizationBuyerId: organizationId,
    modelIds: ['MEMBERSHIP', 'PRODUCT'],
    take: 10,
    sort: 'DESC',
    days,
  });

  const dataTables = isLoadingOrderItems ? (
    <LoadingFile />
  ) : isErrorOrderItems ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataOrderItems?.pages[0]?.data?.total) <= 0 ? (
    <EmptyData
      image={<ArrowRightLeftIcon className="size-10" />}
      title="You don't have any order"
      description={`Share your page with your audience to get started.`}
    />
  ) : (
    dataOrderItems?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListOrderItemsUser item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#121212]">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="mt-4 sm:mt-0">
            <p className="text-lg font-bold">Recent payments</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <SearchInput
              placeholder="Search by order number"
              onChange={handleSetSearch}
            />
          </div>
        </div>

        <table className="mt-4 min-w-full lg:divide-y">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {dataTables}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div className="mx-auto mt-2 justify-center text-center">
          <ButtonLoadMore
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
    </>
  );
}
