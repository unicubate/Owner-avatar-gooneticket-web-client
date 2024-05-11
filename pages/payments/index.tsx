import { GetInfiniteOrderItemsAPI } from '@/api-site/order-item';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ListOrderItemsUser } from '@/components/order-item/list-order-items-user';
import { ButtonLoadMore, SearchInput } from '@/components/ui-setting';
import { EmptyData, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { ArrowRightLeftIcon } from 'lucide-react';

const PaymentsIndex = () => {
  const { userStorage } = useInputState() as any;
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
    organizationBuyerId: userStorage?.organizationId,
    modelIds: ['PRODUCT', 'EVENT'],
    take: 10,
    sort: 'DESC',
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
      <LayoutDashboard title={'Payments'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            {/* <HorizontalNavShop /> */}

            <div className="flow-root">
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#04080b]">
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
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PaymentsIndex);
