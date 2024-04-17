import { GetInfiniteDiscountsAPI } from '@/api-site/discount';
import { CreateOrUpdateDiscountModal } from '@/components/discount/create-or-update-discount-modal';
import { ListDiscounts } from '@/components/discount/list-discounts';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { HorizontalNavShop } from '@/components/shop/horizontal-nav-shop';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { PrivateComponent } from '@/components/util/private-component';
import { useDebounce } from '@/utils';
import { Input, Skeleton } from 'antd';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

const Configs = () => {
  const [filter, setFilter] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const debouncedFilter = useDebounce(filter, 500);
  const {
    isLoading: isLoadingDiscounts,
    isError: isErrorDiscounts,
    data: dataDiscounts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteDiscountsAPI({
    search: debouncedFilter,
    take: 10,
    sort: 'DESC',
  });

  const dataTableDiscounts = isLoadingDiscounts ? (
    <Skeleton
      className="mt-4"
      loading={isLoadingDiscounts}
      paragraph={{ rows: 1 }}
    />
  ) : isErrorDiscounts ? (
    <strong>Error find data please try again...</strong>
  ) : Number(dataDiscounts?.pages[0]?.data?.total) <= 0 ? (
    ''
  ) : (
    dataDiscounts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index: number) => (
        <ListDiscounts item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={'Gifts'}>
        <div className="flex flex-1 flex-col">
          <main>
            <div className="mx-auto max-w-6xl py-6">
              <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">
                    Configurations
                  </h1>
                  {/* <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
                    Sell digital or physical items with a Un-Pot Shop!
                  </p> */}
                </div>
              </div>
              {/* <div className="px-4 mx-auto sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">Settings</h1>
                </div>
              </div> */}

              <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
                <HorizontalNavShop />

                <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <p className="text-base font-bold text-gray-900">
                        Discounts Setup
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-500">
                        Discount your shop or commissions for promotions or
                        membership benefits.
                      </p>
                    </div>

                    <div className="mt-4 sm:flex sm:items-center sm:justify-between">
                      <div className="mt-4 sm:mt-0">
                        <ButtonInput
                          onClick={() => setShowModal(true)}
                          type="button"
                          size="sm"
                          variant="info"
                          icon={<PlusIcon />}
                        >
                          Create discount
                        </ButtonInput>
                      </div>
                      <div className="mt-4 sm:mt-0">
                        <Input
                          placeholder="Search discount"
                          onChange={(
                            e: React.ChangeEvent<
                              HTMLInputElement | HTMLTextAreaElement
                            >,
                          ) => setFilter(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-8 flow-root">
                      <div className="-my-5 divide-y divide-gray-100">
                        {showModal ? (
                          <CreateOrUpdateDiscountModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                          />
                        ) : null}

                        {dataTableDiscounts}

                        {hasNextPage ? (
                          <>
                            <div className="mb-3 flex flex-col items-center justify-between">
                              {isFetchingNextPage ? null : (
                                <button
                                  disabled={isFetchingNextPage ? true : false}
                                  onClick={() => fetchNextPage()}
                                  className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                                >
                                  View more
                                </button>
                              )}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Configs);
