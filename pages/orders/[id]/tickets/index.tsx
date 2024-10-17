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
import { PrivateComponent } from '@/components/util/private-component';
import { OrderItemModel } from '@/types/order-item';
import { MoveLeftIcon, TicketPlusIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const OrderItemsViewIndex = () => {
  const { query, push } = useRouter();
  const orderId = String(query?.id);
  const { t, search, handleSetSearch, userStorage: user } = useInputState();

  const {
    isLoading: isLoadingOrderItems,
    isError: isErrorOrderItems,
    data: dataOrderItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteOrderItemsAPI({
    search,
    take: 10,
    sort: 'DESC',
    orderId: orderId,
    customer: 'buyer',
    modelIds: ['EVENT', 'TICKET', 'BOOKING'],
  });
  const { ref } = useReactIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <>
      <LayoutDashboard title={t.formatMessage({ id: 'MENU.TICKET' })}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="mt-4 flex items-center">
                <ButtonInput
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    push(`/orders`);
                  }}
                  icon={<MoveLeftIcon className="size-4" />}
                >
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {t.formatMessage({ id: 'UTIL.COME_BACK' })}
                  </span>
                </ButtonInput>
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
                        <tr className="table-row">
                          <td className="table-cell">
                            <LoadingFile className="table-row" />
                          </td>
                        </tr>
                      ) : isErrorOrderItems ? (
                        <ErrorFile
                          title="404"
                          description="Error find data please try again..."
                        />
                      ) : Number(dataOrderItems?.pages[0]?.data?.total) <= 0 ? (
                        <tr className="table-row">
                          <td className="table-cell">
                            <EmptyData
                              image={<TicketPlusIcon className="size-10" />}
                              title={t.formatMessage({ id: 'UTIL.ANY_TICKET' })}
                              description={t.formatMessage({
                                id: 'UTIL.ANY_SUB_ORDER',
                              })}
                            />
                          </td>
                        </tr>
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
