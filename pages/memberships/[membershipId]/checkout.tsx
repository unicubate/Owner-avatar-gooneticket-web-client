"use client";

import { useRouter } from "next/router";
import { GetOneMembershipAPI } from "@/api-site/membership";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ListCarouselUpload } from "@/components/shop/list-carousel-upload";
import { HtmlParser } from "@/utils/html-parser";
import { CreateSubscribePayPal } from "@/components/payment/create-subscribe-paypal";
import { LoadingFile } from "@/components/ui/loading-file";
import { useAuth } from "@/components/util/context-user";
import { CreateSubscribeStripe } from "@/components/payment/stripe/create-subscribe-stripe";
import { ButtonInput } from "@/components/ui/button-input";
import ContentLoader from "react-content-loader";


const CheckoutView = () => {
  const [isCardPay, setIsCardPay] = useState<boolean>(false);
  const { userStorage } = useAuth() as any;
  const { query } = useRouter();
  const membershipId = String(query?.membershipId);
  const {
    watch,
    control,
    register,
    formState: { errors },
  } = useForm();
  const watchAmount = watch("amount", "");
  const { status, data: item } = GetOneMembershipAPI({
    membershipId,
  });
  const newAmount = watchAmount
    ? JSON.parse(watchAmount)
    : { value: item?.pricePerMonthly, month: 1 };

  if (status === "loading") {
    <LoadingFile />;
  }

  return (
    <>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-xl mx-auto mt-8 md:mt-12">
          <div className="overflow-hidden bg-white shadow rounded-xl">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <div className="overflow-hidden bg-white shadow-2xl shadow-gray-300/60">
                  <div className="p-8 sm:py-7 sm:px-8">
                    {item?.id ? (
                      <>
                        <div className="flex mt-2 items-center">
                          {item?.id ? (
                            <p className="text-lg font-bold text-gray-900 cursor-pointer">
                              {item?.title ?? ""}
                            </p>
                          ) : null}
                        </div>

                        {item?.uploadsImage?.length > 0 ? (
                          <div className="mt-4 text-center justify-center mx-auto">
                            <ListCarouselUpload
                              uploads={item?.uploadsImage}
                              folder="memberships"
                              preview={false}
                              height={200}
                            />
                          </div>
                        ) : null}

                        <div className="mt-4 text-sm font-normal text-gray-600">
                          <HtmlParser html={String(item?.description)} />
                        </div>

                        <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-y-5 gap-x-6">
                          {item?.pricePerMonthly ? (
                            <div className="mt-2">
                              <div
                                className={`overflow-hidden transition-all duration-200 bg-white border-2 ${errors?.amount
                                    ? "border-red-500"
                                    : "border-gray-200"
                                  } rounded-md hover:bg-gray-50`}
                              >
                                <div className="px-2 py-2 sm:p-4">
                                  <div className="flex items-center">
                                    <input
                                      type="radio"
                                      {...register("amount")}
                                      id="amount"
                                      defaultChecked
                                      value={JSON.stringify({
                                        value: item?.pricePerMonthly,
                                        month: 1,
                                      })}
                                      className="w-5 h-5 text-blue-600 border-gray-500 rounded-full"
                                    />
                                    <label className="ml-2 mr-auto">
                                      <p className="text-xl font-semibold text-black">
                                        {item?.pricePerMonthly}
                                        {item?.currency?.symbol}/month
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        monthly billing
                                      </p>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {item?.pricePerYearly ? (
                            <div className="mt-2">
                              <div
                                className={`overflow-hidden transition-all duration-200 bg-white border-2 ${errors?.amount
                                    ? "border-red-500"
                                    : "border-gray-200"
                                  } rounded-md hover:bg-gray-50`}
                              >
                                <div className="px-2 py-2 sm:p-4">
                                  <div className="flex items-center">
                                    <input
                                      type="radio"
                                      {...register("amount")}
                                      id="amount"
                                      value={JSON.stringify({
                                        value: item?.pricePerYearly,
                                        month: 12,
                                      })}
                                      className="w-5 h-5 text-blue-600 border-gray-500 rounded-full"
                                    />
                                    <label className="ml-2 mr-auto">
                                      <p className="text-xl font-semibold text-black">
                                        {item?.pricePerYearly}
                                        {item?.currency?.symbol}/year
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        billed in a year
                                      </p>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>

                        <hr className="border-gray-200 mt-4" />

                        <div className="flex items-center justify-between mt-6">
                          <p className="text-3xl font-bold text-gray-900">
                            Total
                          </p>
                          {newAmount?.value ? (
                            <>
                              <p className="ml-auto text-2xl font-bold text-gray-900">
                                {newAmount?.value}
                              </p>
                              <p className="ml-0.5 text-2xl font-bold text-gray-900">
                                {item?.currency?.symbol}
                              </p>
                            </>
                          ) : null}
                        </div>

                        {userStorage?.id ? (
                          <>
                            {isCardPay ? (
                              <>
                                <CreateSubscribeStripe
                                  paymentModel="STRIPE-SUBSCRIBE"
                                  data={{
                                    membershipId,
                                    userId: userStorage?.id,
                                    amount: newAmount,
                                    currency: item?.currency?.code,
                                  }}
                                />
                              </>
                            ) : (
                              <>
                                <div className="mt-2">
                                  <ButtonInput
                                    onClick={() => setIsCardPay(true)}
                                    shape="default"
                                    type="button"
                                    size="large"
                                    color="indigo"
                                    loading={false}
                                  >
                                    Card Pay
                                  </ButtonInput>
                                </div>
                              </>
                            )}

                            <CreateSubscribePayPal
                              paymentModel="PAYPAL-SUBSCRIBE"
                              data={{
                                membershipId,
                                userId: userStorage?.id,
                                amount: newAmount,
                                currency: item?.currency?.code,
                              }}
                            />
                          </>
                        ) : null}
                      </>
                    ) :
                      <ContentLoader height="500" width="100%" viewBox="0 0 265 230" >
                        <rect x="15" y="25" rx="2" ry="2" width="350" height="15" />
                        <rect x="15" y="50" rx="2" ry="2" width="350" height="100" />
                        <rect x="15" y="160" rx="2" ry="2" width="130" height="40" />
                        <rect x="150" y="160" rx="2" ry="2" width="150" height="40" />
                        <rect x="15" y="210" rx="2" ry="2" width="350" height="40" />
                      </ContentLoader>}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="mt-4 text-sm font-normal text-gray-500">
                  All the taxes will be calculated while checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutView;
