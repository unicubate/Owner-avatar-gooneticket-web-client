"use client";

import { useRouter } from "next/router";
import { GetOneMembershipAPI } from "@/api-site/membership";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ListCarouselUpload } from "@/components/shop/list-carousel-upload";
import { HtmlParser } from "@/utils/html-parser";
import { CreatePaymentPayPal } from "@/components/payment/create-payment-paypal";
import { LoadingFile } from "@/components/ui/loading-file";
import { useAuth } from "@/components/util/context-user";
import { CreatePaymentStripe } from "@/components/payment/stripe/create-payment-stripe";
import { ButtonInput } from "@/components/ui/button-input";
import { formatePrice } from "@/utils";
import { PrivateComponent } from "@/components/util/private-component";
import { convertToPluralMonth } from "@/utils/utils";
import { LayoutSite } from "@/components/layout-site";
import { AvatarComponent } from "@/components/ui/avatar-component";
import Skeleton from "react-loading-skeleton";
import { GetStaticPropsContext } from "next";

const CheckoutView = () => {
  const [isCardPay, setIsCardPay] = useState<boolean>(false);
  const { userStorage: userVisitor } = useAuth() as any;
  const { query, push } = useRouter();
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
    : {
      currency: item?.currency?.code,
      value: item?.price,
      month: item?.month,
    };

  if (status === "pending") {
    <LoadingFile />;
  }

  return (
    <>
      <LayoutSite title={`${item?.title ?? ""}`}>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-8xl">
          <div className="max-w-xl mx-auto mt-8 md:mt-12">
            <div className="overflow-hidden bg-white shadow rounded-xl">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="mb-2 flex items-center">
                  <AvatarComponent
                    size={40}
                    className="flex-shrink-0 bg-gray-300 rounded-full w-10 h-10"
                    profile={item?.profile}
                  />
                  <div
                    onClick={() =>
                      push(`/${item?.profile?.username}/memberships`)
                    }
                    className="ml-2 cursor-pointer"
                  >
                    <p className="text-sm font-bold text-gray-900">
                      {item?.profile?.firstName ?? ""}{" "}
                      {item?.profile?.lastName ?? ""}
                    </p>
                  </div>

                  <div className="ml-auto">
                    <p className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900">
                      {" "}
                      Membership{" "}
                    </p>
                  </div>
                </div>

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

                          {item?.price ? (
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
                                        currency: item?.currency?.code,
                                        value: item?.price,
                                        month: item?.month,
                                      })}
                                      className="w-5 h-5 text-blue-600 border-gray-500 rounded-full"
                                    />
                                    <label className="ml-2 mr-auto">
                                      <p className="text-xl font-semibold text-black">
                                        {item?.price}
                                        {item?.currency?.symbol} /{" "}
                                        {convertToPluralMonth(
                                          Number(item?.month)
                                        )}
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

                          {/* <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-y-5 gap-x-6">
                         
                        </div> */}

                          <hr className="border-gray-200 mt-4" />

                          <div className="flex items-center justify-between mt-6">
                            <p className="text-3xl font-bold text-gray-900">
                              Total
                            </p>
                            {newAmount?.value ? (
                              <>
                                <p className="ml-auto text-2xl font-bold text-gray-900">
                                  {formatePrice({
                                    value: Number(newAmount?.value),
                                    isDivide: false,
                                  }) ?? ""}
                                </p>
                                <p className="ml-1 text-2xl font-bold text-gray-900">
                                  {item?.currency?.symbol}
                                </p>
                              </>
                            ) : null}
                          </div>

                          {userVisitor?.id ? (
                            <>
                              {isCardPay ? (
                                <>
                                  <CreatePaymentStripe
                                    paymentModel="STRIPE-SUBSCRIBE"
                                    data={{
                                      membershipId,
                                      amount: newAmount,
                                      userReceiveId: item?.userId,
                                      userSendId: userVisitor?.id,
                                      organizationId: item?.organizationId,
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

                              <CreatePaymentPayPal
                                paymentModel="PAYPAL-SUBSCRIBE"
                                data={{
                                  membershipId,
                                  amount: newAmount,
                                  userReceiveId: item?.userId,
                                  userSendId: userVisitor?.id,
                                  organizationId: item?.organizationId,
                                }}
                              />
                            </>
                          ) : null}
                        </>
                      ) : (
                        <>
                          <Skeleton height={200} width={400} />
                          <Skeleton height={70} width={400} className="mt-4" />
                          <Skeleton height={20} width={400} className="mt-4" />
                          <Skeleton height={40} width={400} className="mt-6" />
                          <Skeleton height={40} width={400} className="mt-2" />
                        </>
                      )}
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
      </LayoutSite>
    </>
  );
};
export default PrivateComponent(CheckoutView);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      }
    }
  }
}