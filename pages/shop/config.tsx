import { PrivateComponent } from '@/components/util/private-component';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { Input, Skeleton } from 'antd';
import { useState } from 'react';
import { HorizontalNavShop } from '@/components/shop/horizontal-nav-shop';
import { PlusOutlined } from '@ant-design/icons';
import { ButtonInput } from '@/components/ui-setting/ant/button-input';
import { ListDiscounts } from '@/components/discount/list-discounts';
import { GetInfiniteDiscountsAPI } from '@/api-site/discount';
import { CreateOrUpdateDiscount } from '@/components/discount/create-or-update-discount';
import { CreateOrUpdateCategory } from '@/components/category/create-or-update-category';
import { ListCategories } from '@/components/category/list-categories';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { GetInfiniteCategoriesAPI } from '@/api-site/category';
import { GetStaticPropsContext } from 'next';
import { useAuth } from '@/components/util/context-user';
import { useInputState } from '@/components/hooks/use-input-state';
import { LoadingFile } from '@/components/ui-setting/ant';

const Configs = () => {
  const { search, handleSetSearch } = useInputState();
  const { userStorage: user } = useAuth() as any;
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
    organizationId: user?.organizationId,
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
    isPaginate: 'true',
    organizationId: user?.organizationId,
  });

  const dataTableDiscounts = isLoadingDiscounts ? (
    <LoadingFile />
  ) : isErrorDiscounts ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
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
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again"
    />
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
        <div className="max-w-6xl mx-auto py-6">
          <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
            <HorizontalNavShop />

            <div className="mt-8 overflow-hidden bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="mt-2 sm:mt-0">
                    <ButtonInput
                      onClick={() => setShowCategoryModal(true)}
                      shape="default"
                      type="button"
                      size="normal"
                      loading={false}
                      color={'indigo'}
                      icon={<PlusOutlined />}
                    >
                      Create category
                    </ButtonInput>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Input
                      placeholder="Search name"
                      className="dark:bg-[#121212] dark:text-white dark:placeholder-gray-500 dark:border-gray-800"
                      onChange={handleSetSearch}
                    />
                  </div>
                </div>

                <div className="flow-root mt-8">
                  <div className="-my-5 divide-y divide-gray-100">
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
              <div className="mt-2 text-center justify-center mx-auto">
                <div className="sm:mt-0">
                  <ButtonInput
                    onClick={() => fetchNextPageCategories()}
                    shape="default"
                    type="button"
                    size="large"
                    loading={isFetchingNextPageCategories ? true : false}
                    color={'indigo'}
                    minW="fit"
                  >
                    Load More
                  </ButtonInput>
                </div>
              </div>
            )}

            <div className="mt-8 overflow-hidden bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg">
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
                    <Input
                      placeholder="Search by name"
                      onChange={handleSetSearch}
                      className="dark:bg-[#121212] dark:text-white dark:placeholder-gray-500 dark:border-gray-800"
                    />
                  </div>
                </div>

                <div className="mt-2 sm:flex flex-col sm:items-start sm:justify-between">
                  <div className="mt-2 sm:mt-0">
                    <ButtonInput
                      onClick={() => setShowModal(true)}
                      shape="default"
                      type="button"
                      size="normal"
                      loading={false}
                      color={'indigo'}
                      icon={<PlusOutlined />}
                    >
                      Create discount
                    </ButtonInput>
                  </div>
                </div>

                <div className="flow-root mt-8">
                  <div className="-my-5 divide-y divide-gray-100">
                    {showModal ? (
                      <CreateOrUpdateDiscount
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
              <div className="mt-2 text-center justify-center mx-auto">
                <div className="sm:mt-0">
                  <ButtonInput
                    onClick={() => fetchNextPage()}
                    shape="default"
                    type="button"
                    size="large"
                    loading={isFetchingNextPage ? true : false}
                    color={'indigo'}
                    minW="fit"
                  >
                    Load More
                  </ButtonInput>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Configs);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
