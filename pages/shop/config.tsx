import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { Input, Skeleton } from "antd";
import { useState } from "react";
import { HorizontalNavShop } from "@/components/shop/horizontal-nav-shop";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonInput } from "@/components/ui/button-input";
import { ListDiscounts } from "@/components/discount/list-discounts";
import { GetInfiniteDiscountsAPI } from "@/api-site/discount";
import { CreateOrUpdateDiscount } from "@/components/discount/create-or-update-discount";
import { useDebounce } from "@/utils";
import { CreateOrUpdateCategory } from "@/components/category/create-or-update-category";
import { ListCategories } from "@/components/category/list-categories";
import { ErrorFile } from "@/components/ui/error-file";
import { GetInfiniteCategoriesAPI } from "@/api-site/category";

const Configs = () => {
  const [filter, setFilter] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

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
    sort: "DESC",
  });

  const {
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    data: dataCategories,
    isFetchingNextPage: isFetchingNextPageCategories,
    hasNextPage: hasNextPageCategories,
    fetchNextPage: fetchNextPageCategories,
  } = GetInfiniteCategoriesAPI({
    take: 10,
    sort: "DESC",
    isPaginate: "true",
  });

  const dataTableDiscounts = isLoadingDiscounts ? (
    <Skeleton
      className="mt-2 py-2"
      loading={isLoadingDiscounts}
      paragraph={{ rows: 1 }}
    />
  ) : isErrorDiscounts ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataDiscounts?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataDiscounts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index: number) => (
        <ListDiscounts item={item} key={index} index={index} />
      ))
  );

  const dataTableCategories = isLoadingCategories ? (
    <Skeleton
      className="mt-2 py-2"
      loading={isLoadingCategories}
      paragraph={{ rows: 1 }}
    />
  ) : isErrorCategories ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again"
    />
  ) : dataCategories?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataCategories?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index: number) => (
        <ListCategories item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Setting"}>
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
                      color={"indigo"}
                      icon={<PlusOutlined />}
                    >
                      Create category
                    </ButtonInput>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Input
                      placeholder="Search name"
                      className="dark:bg-[#121212] dark:text-white dark:placeholder-gray-500 dark:border-gray-800"
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => setFilter(e.target.value)}
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
                    color={"indigo"}
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

                {/* <div className="mt-4 sm:flex sm:items-center sm:justify-between">
                      <div className="mt-4 sm:mt-0">
                        <ButtonInput
                          onClick={() => setShowModal(true)}
                          shape="default"
                          type="button"
                          size="normal"
                          loading={false}
                          color={"indigo"}
                          icon={<PlusOutlined />}
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
                            >
                          ) => setFilter(e.target.value)}
                        />
                      </div>
                    </div> */}

                <div className="sm:flex flex-col sm:items-start sm:justify-between">
                  <div className="mt-2 sm:mt-0">
                    <ButtonInput
                      onClick={() => setShowModal(true)}
                      shape="default"
                      type="button"
                      size="normal"
                      loading={false}
                      color={"indigo"}
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
                    color={"indigo"}
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
