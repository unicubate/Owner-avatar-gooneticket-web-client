"use client";

import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { Avatar, Carousel, Image, Input } from "antd";
import { HorizontalNavShop } from "@/components/shop/horizontal-nav-shop";
import { ButtonInput } from "@/components/templates/button-input";
import { CreateOrUpdateFormShop } from "@/components/shop/create-or-update-form-shop";
import { useRouter } from "next/router";
import { GetOneProductAPI } from "@/api/product";
import { GetUploadsProductsAPI } from "@/api/upload";
import { Alert, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ListCarouselUpload from "@/components/shop/list-carousel-upload";
import { UploadModel } from "@/types/upload";
import { ButtonCancelInput } from "@/components/templates/button-cancel-input";
import { formateDMYHH } from "@/utils";
import { Linkify } from "@/utils/html-parser";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "@/components/util/form";
import { GetAllCountiesAPI } from "@/api/profile";
import { SelectSearchInput } from "@/components/util/form/select-search-input";
import { LayoutSite } from "@/components/layout-site";
import { MdDeleteOutline } from "react-icons/md";

const schema = yup.object({
  firstName: yup.string().nullable(),
});

const ShopView = () => {
  const router = useRouter();
  const { query } = useRouter();
  const productSlug = String(query?.productId);

  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    false
  );
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { data: dataProduct, isError: isErrorProduct } = GetOneProductAPI({
    productSlug,
  });
  const product: any = dataProduct?.data;

  const { data: dataCountries } = GetAllCountiesAPI();
  const countries: any = dataCountries?.data;

  const {
    isLoading: isLoadingImages,
    isError: isErrorImages,
    data: dataImages,
  } = GetUploadsProductsAPI({
    productId: product?.id,
    uploadType: "image",
  });

  const dataTableImages = isLoadingImages ? (
    <Spin
      tip="Loading"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      size="large"
    >
      <div className="content" />
    </Spin>
  ) : isErrorProduct || isErrorImages ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <ListCarouselUpload uploads={dataImages?.data} />
  );

  const onSubmit: SubmitHandler<any> = async (payload: any) => {
    setLoading(true);
    setHasErrors(undefined);

    console.log("payload ======>", payload);
  };

  console.log("productSlug ======>", productSlug);
  return (
    <>
      <LayoutSite title={`${product?.title ?? ""}`}>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <span className="px-2 py-1 ml-4 text-xs font-bold tracking-widest uppercase bg-gray-400 rounded-full rounded-r-nonepy-1 text-gray-50">
              {" "}
              4 Items{" "}
            </span>
          </div>

          <div className="max-w-xl mx-auto mt-8 md:mt-12">
            <div className="overflow-hidden bg-white shadow rounded-xl">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200 -my-7">

                    <li className="flex py-7">
                      <div className="flex-shrink-0">
                        <Image
                          width={95}
                          height={95}
                          className="object-cover rounded-lg"
                          src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/cart-page/2/product-2.png"
                          alt=""
                        />
                      </div>

                      <div className="relative flex flex-col justify-between flex-1 ml-5">
                        <div className="sm:grid sm:grid-cols-2 sm:gap-x-5">
                          <div className="pr-9 sm:pr-5">
                            <p className="text-base font-bold text-gray-900">
                              Apple Watch Series 7 - 44mm
                            </p>
                            <p className="mt-1.5 text-sm font-medium text-gray-500">
                              Golden
                            </p>
                          </div>
                          {/* <div className="pr-9 sm:pr-5">
                            <p className="text-base font-bold text-gray-900">
                              Beylob 90 Speaker
                            </p>
                            <p className="mt-1.5 text-sm font-medium text-gray-500">
                              Space Gray
                            </p>
                          </div> */}

                          <div className="flex items-end justify-between mt-4 sm:justify-end sm:items-start sm:mt-0">
                            <p className="flex-shrink-0 w-20 text-base font-bold text-left text-gray-900 sm:text-right sm:ml-8 sm:order-2">
                              279 $
                            </p>

                            {/* <div className="sm:order-1">
                              <select
                                name=""
                                id=""
                                className="block py-1 pl-3 pr-10 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                              >
                                <option value="">1</option>
                              </select>
                            </div> */}
                          </div>
                        </div>

                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                          <button
                            // onClick={() => deleteItem(item)}
                            className="text-gray-400 hover:text-red-400 focus:ring-red-400"
                          >
                            <MdDeleteOutline className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                    

                  </ul>
                </div>

                <hr className="border-gray-200 mt-7" />
                <div className="flex justify-between mt-2 items-center">
                  <label className="block text-sm mb-2 dark:text-white"></label>
                  <Link
                    className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                    href="/shop/config"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <p className="text-xl font-medium text-gray-900">Total</p>
                  <p className="text-xl font-bold text-gray-900">699 $</p>
                </div>

                {/* <div className="mt-2 text-center"> */}
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                  {hasErrors && (
                    <div className="font-regular relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                      {hasErrors}
                    </div>
                  )}

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
                      name="countryId"
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

                  <div className="mt-6">
                    <ButtonInput
                      shape="default"
                      type="submit"
                      size="large"
                      loading={loading}
                      color={"indigo"}
                    >
                      Create account
                    </ButtonInput>
                  </div>
                </form>
                <div className="mt-2 text-center">
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
      </LayoutSite>
    </>
  );
};

export default ShopView;
