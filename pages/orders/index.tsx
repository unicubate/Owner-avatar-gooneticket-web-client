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
import { OrderModel } from '@/types/order-item';
import { modelProductArray } from '@/types/product';
import {
  CalendarCheckIcon,
  ListFilterIcon,
  ShoppingCartIcon,
  TicketPlusIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Fragment, useState } from 'react';

const OrdersIndex = () => {
  const [model, setModel] = useState('');
  const [dayCount, setDayCount] = useState(30);
  const { t, search, handleSetSearch, user } = useInputState();

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
                <Link href="/tickets">
                  <ButtonInput
                    type="button"
                    size="sm"
                    variant="outline"
                    icon={<TicketPlusIcon className="size-4" />}
                  >
                    {t.formatMessage({ id: 'MENU.TICKET' })}
                  </ButtonInput>
                </Link>

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
                    <DropdownMenuContent className="w-auto">
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
                        {dayCount > 0
                          ? `${t.formatMessage({ id: 'TRANSACTION.LAST_DAY' }, { day: dayCount })}`
                          : `${t.formatMessage({ id: 'TRANSACTION.ALL_TIME' })}`}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto">
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

              <div className="dark:border-input dark:bg-background mt-4 overflow-hidden rounded-lg border bg-white p-4">
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
                  <tbody className="divide-input dark:divide-input divide-y">
                    {isLoadingOrders ? (
                      <tr className="table-row">
                        <td className="table-cell">
                          <LoadingFile className="table-row" />
                        </td>
                      </tr>
                    ) : isErrorOrders ? (
                      <ErrorFile
                        title="404"
                        description="Error find data please try again..."
                      />
                    ) : Number(dataOrders?.pages[0]?.data?.total) <= 0 ? (
                      <tr className="table-row">
                        <td className="table-cell">
                          <EmptyData
                            image={<ShoppingCartIcon className="size-10" />}
                            title={t.formatMessage({ id: 'UTIL.ANY_ORDER' })}
                            description={t.formatMessage({
                              id: 'UTIL.ANY_SUB_ORDER',
                            })}
                          />
                        </td>
                      </tr>
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
                    )}
                  </tbody>
                </table>
              </div>

              {hasNextPage && (
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
