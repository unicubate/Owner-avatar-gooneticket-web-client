import { GetInfiniteCategoriesAPI } from '@/api-site/category';
import { GetInfiniteDiscountsAPI } from '@/api-site/discount';
import { CreateOrUpdateCategory } from '@/components/category/create-or-update-category';
import { ListCategories } from '@/components/category/list-categories';
import { ListDiscounts } from '@/components/discount/list-discounts';
import { useInputState } from '@/components/hooks/use-input-state';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { HorizontalNavSetting } from '@/components/setting/horizontal-nav-setting';
import { ButtonLoadMore, SearchInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

const Categories = () => {
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
  ) : Number(dataDiscounts?.pages[0]?.data?.total) <= 0 ? (
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
  ) : Number(dataCategories?.pages[0]?.data?.total) <= 0 ? (
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
      <LayoutDashboard title={'Categories'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <HorizontalNavSetting />

            <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
              <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="mt-2 sm:mt-0">
                    <ButtonInput
                      type="button"
                      className="w-full"
                      size="sm"
                      variant="primary"
                      onClick={() => setShowCategoryModal(true)}
                      icon={<PlusIcon className="size-4" />}
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

                <table className="mt-4 min-w-full lg:divide-y">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {dataTableCategories}
                  </tbody>
                </table>
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
          </div>
        </div>
      </LayoutDashboard>

      {showCategoryModal ? (
        <CreateOrUpdateCategory
          showModal={showCategoryModal}
          setShowModal={setShowCategoryModal}
        />
      ) : null}
    </>
  );
};

export default PrivateComponent(Categories);
