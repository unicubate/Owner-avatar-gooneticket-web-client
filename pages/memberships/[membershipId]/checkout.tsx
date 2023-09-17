"use client";

import { useRouter } from "next/router";
import * as yup from "yup";
import { GetOneMembershipAPI } from "@/api/membership";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { ButtonInput } from "@/components/templates/button-input";
import { TextInput } from "@/components/util/form";
import Link from "next/link";
import { GetAllCountiesAPI } from "@/api/profile";
import { MdDeleteOutline } from "react-icons/md";
import { SelectSearchInput } from "@/components/util/form/select-search-input";
import { Image, Radio } from "antd";
import { ListCarouselUpload } from "@/components/shop/list-carousel-upload";
import { HtmlParser } from "@/utils/html-parser";
import { SwitchInput } from "@/components/util/form/switch-input";
import { CreateBillingPayPal } from "@/components/payment/create-billing-paypal";
import { LoadingFile } from "@/components/templates/loading-file";
import { useAuth } from "@/components/util/session/context-user";

const schema = yup.object({
  amount: yup.string().required(),
  // firstName: yup.string().nullable(),
});

const CheckoutView = () => {
  const { userStorage } = useAuth() as any;
  const router = useRouter();
  const { query } = useRouter();
  const membershipId = String(query?.membershipId);
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    false
  );
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const watchAmount = watch("amount", "");
  const watchEnableAddress = watch("enableAddress", false);

  const { data: countries } = GetAllCountiesAPI();

  const { status, data: item } = GetOneMembershipAPI({
    membershipId,
  });

  if (status === "loading") {
    <LoadingFile />;
  }

  const onSubmit: SubmitHandler<any> = async (payload: any) => {
    const { amount } = payload;
    setLoading(true);
    setHasErrors(undefined);

    console.log("payload ======>", JSON.parse(amount));
  };

  const newAmount = watchAmount
    ? JSON.parse(watchAmount)
    : { value: item?.pricePerMonthly, month: 1 };

  console.log("newAmount =====>", newAmount);
  return (
    <>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-xl mx-auto mt-8 md:mt-12">
          <div className="overflow-hidden bg-white shadow rounded-xl">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 -my-7">
                  <li className="flex py-7">
                    <div className="overflow-hidden bg-white shadow-2xl shadow-gray-300/60">
                      <div className="p-8 sm:py-7 sm:px-8">
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
                        <form
                          className="mt-6"
                          onSubmit={handleSubmit(onSubmit)}
                        >
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

                          {hasErrors && (
                            <div className="font-regular relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                              {hasErrors}
                            </div>
                          )}

                          {/* <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                            <div className="flex items-center flex-1 min-w-0">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900">
                                  {`I'd prefer not to give my address right now `}
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-500">
                                  {`If you don't provide an address, the creator may not be able to send you physical benefits.`}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                              <button
                                type="button"
                                title=""
                                className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                              >
                                {" "}
                              </button>
                              <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                                <SwitchInput
                                  control={control}
                                  name="enableAddress"
                                  label=""
                                />
                              </div>
                            </div>
                          </div>

                          {!watchEnableAddress ? (
                            <>
                              <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-y-5 gap-x-6">
                                <div className="mt-2">
                                  <TextInput
                                    label="First name"
                                    control={control}
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    errors={errors}
                                  />
                                </div>

                                <div className="mt-2">
                                  <TextInput
                                    label="Last name"
                                    control={control}
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    errors={errors}
                                  />
                                </div>
                              </div>

                              <div className="mt-2">
                                <SelectSearchInput
                                  label="Counties"
                                  firstOptionName="Country"
                                  valueType="text"
                                  control={control}
                                  errors={errors}
                                  placeholder="Country"
                                  name="country"
                                  dataItem={countries}
                                />
                              </div>

                              <div className="mt-2">
                                <TextInput
                                  control={control}
                                  label="Street address"
                                  type="text"
                                  name="address"
                                  placeholder="Street address"
                                  errors={errors}
                                />
                              </div>

                              <div className="mt-2">
                                <TextInput
                                  control={control}
                                  label="City"
                                  type="text"
                                  name="city"
                                  placeholder="City"
                                  errors={errors}
                                />
                              </div>

                              <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-y-5 gap-x-6">
                                <div className="mt-2">
                                  <TextInput
                                    label="State/Province"
                                    control={control}
                                    type="text"
                                    name="province"
                                    placeholder="State/Province"
                                    errors={errors}
                                  />
                                </div>

                                <div className="mt-2">
                                  <TextInput
                                    label="Postal code"
                                    control={control}
                                    type="text"
                                    name="postalCode"
                                    placeholder="Postal code"
                                    errors={errors}
                                  />
                                </div>
                              </div>
                              <div className="mt-2">
                                <TextInput
                                  control={control}
                                  label="Telephone"
                                  type="text"
                                  name="phone"
                                  placeholder="Telephone"
                                  errors={errors}
                                />
                              </div>

                              <div className="mt-2">
                                <TextInput
                                  control={control}
                                  label="Email address"
                                  type="email"
                                  name="email"
                                  placeholder="Email address"
                                  errors={errors}
                                />
                              </div>
                            </>
                          ) : null} */}



                          {item?.id ? (
                            <>
                              <div className="mt-6">
                                <ButtonInput
                                  shape="default"
                                  type="submit"
                                  size="large"
                                  loading={loading}
                                  color={"indigo"}
                                >
                                  Card Pay
                                </ButtonInput>
                              </div>
                              <CreateBillingPayPal
                                data={{
                                  membershipId,
                                  userId: userStorage?.id,
                                  amount: newAmount,
                                  currency: item?.currency?.code,
                                }}
                              />
                            </>
                          ) : null}
                        </form>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-4 text-center">
                {/* <ButtonInput
                    minW="fit"
                    shape="default"
                    type="button"
                    size="large"
                    loading={false}
                    color={"indigo"}
                  >
                    Continue to Payment
                  </ButtonInput> */}

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
