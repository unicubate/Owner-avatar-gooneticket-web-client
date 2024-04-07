import { GetInfiniteCategoriesAPI } from '@/api-site/category';
import { GetInfiniteDiscountsAPI } from '@/api-site/discount';
import { CreateOrUpdateCategory } from '@/components/category/create-or-update-category';
import { ListCategories } from '@/components/category/list-categories';
import { CreateOrUpdateDiscountModal } from '@/components/discount/create-or-update-discount-modal';
import { ListDiscounts } from '@/components/discount/list-discounts';
import { useInputState } from '@/components/hooks/use-input-state';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { HorizontalNavShop } from '@/components/shop/horizontal-nav-shop';
import { ButtonLoadMore, SearchInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

const Configs = () => {
  const { search, handleSetSearch } = useInputState();
  const { organizationId } = useAuth() as any;
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const {
    isLoading: isLoadingDiscounts,
    isError: isErrorDiscounts,
    data: dataDiscounts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteDiscountsAPI({
    search,
    take: 10,
    sort: 'DESC',
    organizationId: organizationId,
  });

  const {
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    data: dataCategories,
    isFetchingNextPage: isFetchingNextPageCategories,
    hasNextPage: hasNextPageCategories,
    fetchNextPage: fetchNextPageCategories,
  } = GetInfiniteCategoriesAPI({
    search,
    take: 10,
    sort: 'DESC',
    isPaginate: 'TRUE',
    organizationId: organizationId,
  });

  const dataTableDiscounts = isLoadingDiscounts ? (
    <LoadingFile />
  ) : isErrorDiscounts ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : dataDiscounts?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataDiscounts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index: number) => (
        <ListDiscounts item={item} key={index} index={index} />
      ))
  );

  const dataTableCategories = isLoadingCategories ? (
    <LoadingFile />
  ) : isErrorCategories ? (
    <ErrorFile title="404" description="Error find data please try again" />
  ) : dataCategories?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataCategories?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index: number) => (
        <ListCategories item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={'Setting'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <HorizontalNavShop />

            <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
              <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="mt-2 sm:mt-0">
                    <ButtonInput
                      type="button"
                      className="w-full"
                      size="sm"
                      variant="info"
                      onClick={() => setShowCategoryModal(true)}
                      icon={<PlusIcon className="mr-2 size-4" />}
                    >
                      Create category
                    </ButtonInput>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <SearchInput
                      placeholder="Search by name"
                      onChange={handleSetSearch}
                    />
                  </div>
                </div>

                <div className="mt-8 flow-root">
                  <div className="-my-5 divide-y divide-gray-100 dark:divide-gray-900">
                    {showCategoryModal ? (
                      <CreateOrUpdateCategory
                        showModal={showCategoryModal}
                        setShowModal={setShowCategoryModal}
                      />
                    ) : null}

                    {dataTableCategories}
                  </div>
                </div>
              </div>
            </div>

            {hasNextPageCategories && (
              <div className="mx-auto mt-2 justify-center text-center">
                <ButtonLoadMore
                  isFetchingNextPage={isFetchingNextPageCategories}
                  onClick={() => fetchNextPageCategories()}
                />
              </div>
            )}

            <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
              <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="mt-4 sm:mt-0">
                    {/* <p className="text-lg font-bold">Recent transactions</p> */}
                    <div>
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        Discounts Setup
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-500">
                        Discount your shop or commissions for promotions or
                        membership benefits.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <SearchInput
                      placeholder="Search by title"
                      onChange={handleSetSearch}
                    />
                  </div>
                </div>

                <div className="mt-2 flex-col sm:flex sm:items-start sm:justify-between">
                  <div className="mt-2 sm:mt-0">
                    <ButtonInput
                      type="button"
                      className="w-full"
                      size="sm"
                      variant="info"
                      onClick={() => setShowModal(true)}
                      icon={<PlusIcon className="mr-2 size-4" />}
                    >
                      Create discount
                    </ButtonInput>
                  </div>
                </div>

                <div className="mt-8 flow-root">
                  <div className="-my-5 divide-y divide-gray-100 dark:divide-gray-900">
                    {showModal ? (
                      <CreateOrUpdateDiscountModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                      />
                    ) : null}

                    {dataTableDiscounts}
                  </div>
                </div>
              </div>
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
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Configs);
