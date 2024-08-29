import { GetInfiniteOrdersAPI } from '@/api-site/order-item';
import {
  useInputState,
  useReactIntersectionObserver,
} from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ListOrdersUser } from '@/components/order-item/list-orders-user';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
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
import { OrderModel } from '@/types/order-item';
import { modelProductArray } from '@/types/product';
import {
  CalendarCheckIcon,
  ListFilterIcon,
  ShoppingCartIcon,
  TicketIcon,
} from 'lucide-react';
import { Fragment, useState } from 'react';

const OrdersIndex = () => {
  const [model, setModel] = useState('');
  const [dayCount, setDayCount] = useState(30);
  const { t, search, handleSetSearch, userStorage: user } = useInputState();

  const {
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    data: dataOrders,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteOrdersAPI({
    search,
    customer: 'buyer',
    take: 10,
    sort: 'DESC',
    days: dayCount,
  });
  const { ref } = useReactIntersectionObserver({ hasNextPage, fetchNextPage });

  const handleDaysChange = (newDays: number) => setDayCount(newDays);
  const handleModelChange = (i: string) => setModel(i);
  return (
    <>
      <LayoutDashboard title={t.formatMessage({ id: 'MENU.ORDER' })}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="mt-4 flex items-center">
                <ButtonInput
                  type="button"
                  size="sm"
                  variant="outline"
                  // onClick={() => {
                  //   push(`/orders`);
                  // }}
                  icon={<TicketIcon className="size-4" />}
                >
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {t.formatMessage({ id: 'MENU.ORDER' })}
                  </span>
                </ButtonInput>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="h-8 gap-1">
                        <ListFilterIcon className="size-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          {model ? model : `All`}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto dark:border-gray-900">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => {
                            handleModelChange('');
                          }}
                        >
                          <span className="cursor-pointer">All</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      {modelProductArray.map((or, index) => (
                        <Fragment key={index}>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              handleModelChange(or?.label);
                            }}
                          >
                            <span className="cursor-pointer">{or?.label}</span>
                          </DropdownMenuItem>
                        </Fragment>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                    <DropdownMenuContent className="w-auto dark:border-input">
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
                          handleDaysChange(120);
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

              <div className="mt-4 overflow-hidden rounded-lg border bg-white p-4 dark:border-input dark:bg-background">
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
                  <tbody className="divide-y divide-input dark:divide-input">
                    {user?.organizationId ? (
                      isLoadingOrders ? (
                        <LoadingFile />
                      ) : isErrorOrders ? (
                        <ErrorFile
                          title="404"
                          description="Error find data please try again..."
                        />
                      ) : Number(dataOrders?.pages[0]?.data?.total) <= 0 ? (
                        <EmptyData
                          image={<ShoppingCartIcon className="size-10" />}
                          title={t.formatMessage({ id: 'UTIL.ANY_ORDER' })}
                          description={t.formatMessage({
                            id: 'UTIL.ANY_SUB_ORDER',
                          })}
                        />
                      ) : (
                        dataOrders?.pages.map((page, i) => (
                          <Fragment key={i}>
                            {page?.data?.value.map(
                              (item: OrderModel, index: number) => (
                                <ListOrdersUser
                                  item={item}
                                  key={index}
                                  index={index}
                                />
                              ),
                            )}
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
