import { GetInfiniteOrderItemsAPI } from '@/api-site/order-item';
import {
  useInputState,
  useReactIntersectionObserver,
} from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ListOrderItemsTicketUser } from '@/components/order-item/list-order-items-ticket-user';
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
import { OrderItemModel } from '@/types/order-item';
import {
  CalendarCheckIcon,
  ShoppingCartIcon,
  TicketPlusIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

const OrderItemsViewIndex = () => {
  const { query, push } = useRouter();
  const [period, setPeriod] = useState(30);
  const { t, search, handleSetSearch, userStorage: user } = useInputState();

  const {
    isLoading: isLoadingOrderItems,
    isError: isErrorOrderItems,
    data: dataOrderItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteOrderItemsAPI({
    period,
    search,
    take: 10,
    sort: 'ASC',
    customer: 'buyer',
    modelIds: ['EVENT', 'TICKET', 'BOOKING'],
  });
  const { ref } = useReactIntersectionObserver({ hasNextPage, fetchNextPage });

  const handlePeriodChange = (i: number) => setPeriod(i);
  return (
    <>
      <LayoutDashboard title={t.formatMessage({ id: 'MENU.TICKET' })}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="mt-4 flex items-center">
                <Link href="/orders">
                  <ButtonInput
                    type="button"
                    size="sm"
                    variant="outline"
                    icon={<ShoppingCartIcon className="size-4" />}
                  >
                    {t.formatMessage({ id: 'MENU.ORDER' })}
                  </ButtonInput>
                </Link>

                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <CalendarCheckIcon className="size-3.5" />
                        {period > 0
                          ? `${t.formatMessage({ id: 'TRANSACTION.LAST_DAY' }, { day: period })}`
                          : `${t.formatMessage({ id: 'TRANSACTION.ALL_TIME' })}`}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dark:border-input w-auto">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => {
                            handlePeriodChange(30);
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
                          handlePeriodChange(120);
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
                          handlePeriodChange(-1);
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
                      {t.formatMessage({ id: 'MENU.TICKET' })}
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
                          image={<TicketPlusIcon className="size-10" />}
                          title={t.formatMessage({ id: 'UTIL.ANY_TICKET' })}
                          description={t.formatMessage({
                            id: 'UTIL.ANY_SUB_ORDER',
                          })}
                        />
                      ) : (
                        dataOrderItems?.pages.map((page, i) => (
                          <Fragment key={i}>
                            {page?.data?.value.map(
                              (item: OrderItemModel, index: number) => (
                                <ListOrderItemsTicketUser
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

export default PrivateComponent(OrderItemsViewIndex);
