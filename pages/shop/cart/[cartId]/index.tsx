"use client";

import { Image } from "antd";
import { ButtonInput } from "@/components/ui-setting/button-input";
import { useRouter } from "next/router";
import { GetOneProductAPI } from "@/api-site/product";
import { ListCarouselUpload } from "@/components/shop/list-carousel-upload";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  LoadingFile } from "@/components/ui-setting/ant";
import { GetAllCountiesAPI } from "@/api-site/profile";
import { SelectSearchInput } from "@/components/ui-setting/ant/select-search-input";
import { LayoutSite } from "@/components/layout-site";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GetUploadsAPI } from "@/api-site/upload";
import { GetStaticPropsContext } from "next";
import { TextInput } from "@/components/ui-setting/shadcn";

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

  const { data: product, isError: isErrorProduct } = GetOneProductAPI({
    productSlug,
  });

  const { data: countries } = GetAllCountiesAPI();

  const {
    isLoading: isLoadingImages,
    isError: isErrorImages,
    data: dataImages,
  } = GetUploadsAPI({
    organizationId: product?.organizationId,
    model: "PRODUCT",
    uploadableId: product?.id,
    uploadType: "image",
  });

  const dataTableImages = isLoadingImages ? (
    <LoadingFile />
  ) : isErrorProduct || isErrorImages ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <ListCarouselUpload
      uploads={dataImages}
      preview={false}
      folder="products"
    />
  );

  const onSubmit: SubmitHandler<any> = async (payload: any) => {
    setLoading(true);
    setHasErrors(undefined);

    console.log("payload ======>", payload);
  };
  return (
    <>
      <LayoutSite title={`${product?.title ?? ""}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <span className="rounded-r-nonepy-1 ml-4 rounded-full bg-gray-400 px-2 py-1 text-xs font-bold uppercase tracking-widest text-gray-50">
              {" "}
              4 Items{" "}
            </span>
          </div>

          <div className="mx-auto mt-8 max-w-xl md:mt-12">
            <div className="overflow-hidden rounded-xl bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-7 divide-y divide-gray-200">
                    <li className="flex py-7">
                      <div className="shrink-0">
                        <Image
                          width={95}
                          height={95}
                          className="rounded-lg object-cover"
                          src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/cart-page/2/product-2.png"
                          alt=""
                        />
                      </div>

                      <div className="relative ml-5 flex flex-1 flex-col justify-between">
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

                          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p className="w-20 shrink-0 text-left text-base font-bold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
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

                        <div className="absolute right-0 top-0 flex sm:bottom-0 sm:top-auto">
                          <button
                            // onClick={() => deleteItem(item)}
                            className="text-gray-400 hover:text-red-400 focus:ring-red-400"
                          >
                            <MdOutlineDeleteOutline className="size-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <hr className="mt-7 border-gray-200" />
                <div className="mt-2 flex items-center justify-between">
                  <label className="mb-2 block text-sm dark:text-white"></label>
                  <Link
                    className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                    href="/shop/config"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div className="mt-6 flex items-center justify-between">
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

                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
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

                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
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
                      type="submit"
                      size="lg"
                      variant="info"
                      loading={loading}
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