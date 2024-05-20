import { GetInfiniteOrderItemsAPI } from '@/api-site/order-item';
import {
  useInputState,
  useReactIntersectionObserver,
} from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ListOrderItemsUser } from '@/components/order-item/list-order-items-user';
import { ButtonLoadMore, SearchInput } from '@/components/ui-setting';
import { EmptyData, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PrivateComponent } from '@/components/util/private-component';
import { CalendarCheckIcon, ShoppingCartIcon } from 'lucide-react';
import { Fragment, useState } from 'react';

const OrdersIndex = () => {
  const [dayCount, setDayCount] = useState(30);
  const { userStorage: user } = useInputState() as any;
  const { t, search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingOrderItems,
    isError: isErrorOrderItems,
    data: dataOrderItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteOrderItemsAPI({
    search,
    organizationBuyerId: user?.organizationId,
    modelIds: ['PRODUCT', 'EVENT'],
    take: 10,
    sort: 'DESC',
    days: dayCount,
  });
  const { ref } = useReactIntersectionObserver({ hasNextPage, fetchNextPage });

  const handleDaysChange = (newDays: number) => {
    setDayCount(newDays);
  };

  return (
    <>
      <LayoutDashboard title={'Orders'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="mt-4 flex items-center">
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <CalendarCheckIcon className="size-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          {t.formatMessage(
                            { id: 'TRANSACTION.LAST_DAY' },
                            { day: dayCount },
                          )}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-20 dark:border-gray-800">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => {
                            handleDaysChange(3);
                          }}
                        >
                          <span className="cursor-pointer">
                            {t.formatMessage(
                              { id: 'TRANSACTION.LAST_DAY' },
                              { day: 3 },
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
                            { day: 30 },
                          )}
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#04080b]">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="mt-4 sm:mt-0">
                    <p className="text-lg font-bold">Recent orders</p>
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
                    {user?.organizationId ? (
                      isLoadingOrderItems ? (
                        <LoadingFile />
                      ) : isErrorOrderItems ? (
                        <ErrorFile
                          title="404"
                          description="Error find data please try again..."
                        />
                      ) : Number(dataOrderItems?.pages[0]?.data?.total) <= 0 ? (
                        <EmptyData
                          image={<ShoppingCartIcon className="size-10" />}
                          title="You don't have any order"
                          description={`Find your first product or event`}
                        />
                      ) : (
                        dataOrderItems?.pages.map((page, i) => (
                          <Fragment key={i}>
                            {page?.data?.value.map((item, index) => (
                              <ListOrderItemsUser
                                item={item}
                                key={index}
                                index={index}
                              />
                            ))}
                          </Fragment>
                        ))
                      )
                    ) : null}
                  </tbody>
                </table>
              </div>

              {user?.organizationId && hasNextPage && (
                <div className="mx-auto mt-2 justify-center text-center">
                  <ButtonLoadMore
                    ref={ref}
                    hasNextPage={hasNextPage}
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

export default PrivateComponent(OrdersIndex);
