import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";
import { Button, Input, Skeleton } from "antd";
import { useAuth } from "@/components/util/session/context-user";
import { getOneProfileAPI } from "../../api/profile";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UpdateFormProfile } from "@/components/user/update-form-profile";
import { SwitchInput } from "@/components/util/form/switch-input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { HorizontalNavShop } from "@/components/shop/horizontal-nav-shop";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  MdDeleteOutline,
  MdOutlineModeEdit,
  MdOutlineIosShare,
} from "react-icons/md";
import { ButtonInput } from "@/components/templates/button-input";
import ListDiscounts from "@/components/discount/list-discounts";
import { GetInfiniteDiscountsAPI } from "@/api/discount";
import { CreateOrUpdateDiscount } from "@/components/discount/create-or-update-discount";

const Configs = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    isLoading: isLoadingDiscounts,
    isError: isErrorDiscounts,
    data: dataDiscounts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteDiscountsAPI({
    take: 10,
    sort: "DESC",
  });

  const dataTableDiscounts = isLoadingDiscounts ? (
    <Skeleton className="mt-4" loading={isLoadingDiscounts} paragraph={{ rows: 1 }} />
  ) : isErrorDiscounts ? (
    <strong>Error find data please try again...</strong>
  ) : dataDiscounts?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataDiscounts.pages
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
                        <Input placeholder="Search discount" />
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

                        {/* <div className="py-5">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <p className="text-sm font-bold text-gray-900">
                                Astrona
                              </p>
                              <p className="mt-1 text-sm font-medium text-gray-500">
                                12 members
                              </p>
                            </div>

                            <div className="ml-auto">
                              <a
                                href="#"
                                title=""
                                className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                              >
                                {" "}
                                Leave{" "}
                              </a>
                            </div>
                          </div>
                        </div> */}
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
