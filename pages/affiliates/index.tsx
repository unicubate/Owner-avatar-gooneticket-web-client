import { GetInfiniteOrderItemsAPI } from '@/api-site/order-item';
import {
  useInputState,
  useReactIntersectionObserver,
} from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import {
  ButtonLoadMore,
  EmptyData,
  ErrorFile,
  LoadingFile,
  SearchInput,
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
import { PrivateComponent } from '@/components/util/private-component';
import { CalendarCheckIcon, ShoppingCartIcon } from 'lucide-react';
import { useState } from 'react';

const AffiliateIndex = () => {
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
    customer: 'buyer',
    modelIds: ['PRODUCT', 'EVENT'],
    take: 10,
    sort: 'DESC',
    //days: dayCount,
  });
  const { ref } = useReactIntersectionObserver({ hasNextPage, fetchNextPage });

  const handleDaysChange = (newDays: number) => setDayCount(newDays);

  return (
    <>
      <LayoutDashboard title={t.formatMessage({ id: 'MENU.ORDER' })}>
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

              <div className="dark:border-input dark:bg-background mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="mt-4 sm:mt-0">
                    <p className="text-lg font-bold">
                      {t.formatMessage({ id: 'UTIL.RECENT_ORDER' })}
                    </p>
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
                          title={t.formatMessage({ id: 'UTIL.ANY_ORDER' })}
                          description={t.formatMessage({
                            id: 'UTIL.ANY_SUB_ORDER',
                          })}
                        />
                      ) : (
                        <>Test</>
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

export default PrivateComponent(AffiliateIndex);
