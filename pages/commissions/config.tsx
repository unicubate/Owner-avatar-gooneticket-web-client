import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { Input, Skeleton } from "antd";
import { useState } from "react";
import { HorizontalNavShop } from "@/components/shop/horizontal-nav-shop";
import {
  PlusOutlined,
} from "@ant-design/icons";
import { ButtonInput } from "@/components/ui/button-input";
import ListDiscounts from "@/components/discount/list-discounts";
import { GetInfiniteDiscountsAPI } from "@/api-site/discount";
import { CreateOrUpdateDiscount } from "@/components/discount/create-or-update-discount";
import { useDebounce } from "@/utils";

const Configs = () => {
  const [filter, setFilter] = useState<string>('')
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
    sort: "DESC",
  });

  const dataTableDiscounts = isLoadingDiscounts ? (
    <Skeleton
      className="mt-4"
      loading={isLoadingDiscounts}
      paragraph={{ rows: 1 }}
    />
  ) : isErrorDiscounts ? (
    <strong>Error find data please try again...</strong>
  ) : dataDiscounts?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataDiscounts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index: number) => (
        <ListDiscounts item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Gifts"}>
        <div className="flex flex-col flex-1">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
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

              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <HorizontalNavShop />

                <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-xl">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-base font-bold text-gray-900">
                          Discounts Setup
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          Discount your shop or commissions for promotions or
                          membership benefits.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 sm:flex sm:items-center sm:justify-between">
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

                        {hasNextPage ? (
                          <>
                            <div className="mb-3 flex flex-col justify-between items-center">
                              {isFetchingNextPage ? null : (
                                <button
                                  disabled={isFetchingNextPage ? true : false}
                                  onClick={() => fetchNextPage()}
                                  className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
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
