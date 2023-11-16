import { Avatar, Button } from "antd";
import { ButtonInput } from "@/components/ui/button-input";
import { useRouter } from "next/router";
import { GetOneProductAPI } from "@/api-site/product";
import { GetUploadsAPI } from "@/api-site/upload";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ListCarouselUpload } from "@/components/shop/list-carousel-upload";
import { formateDMYHH } from "@/utils";
import { HtmlParser } from "@/utils/html-parser";
import { LayoutSite } from "@/components/layout-site";
import { MdOutlineDiscount } from "react-icons/md";
import { GetStaticPropsContext } from "next";

const ShopView = () => {
  const { locale, push } = useRouter();
  const { query } = useRouter();
  const productSlug = String(query?.productId);

  const {
    isLoading: isLoadingProduct,
    data: product,
    isError: isErrorProduct,
  } = GetOneProductAPI({
    productSlug,
  });

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

  const dataTableImages =
    isLoadingImages && isLoadingProduct ? (
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
      <ListCarouselUpload
        uploads={dataImages}
        preview={false}
        folder="products"
      />
    );

  return (
    <>
      <LayoutSite title={`${product?.title ?? ""}`}>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 mt-8 lg:grid-rows-1 gap-y-12 lg:mt-12 lg:grid-cols-5 lg:gap-y-16 lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="overflow-hidden border-2 border-transparent rounded-lg">
                  <div className="mb-2 flex items-center">
                    <div
                      onClick={() =>
                        push(`/${product?.profile?.username}/shop`)
                      }
                      className="relative flex-shrink-0 cursor-pointer"
                    >
                      <Avatar
                        size={40}
                        className="object-cover w-10 h-10 rounded-full"
                        src={product?.profile?.image}
                        alt={`${product?.profile?.firstName} ${product?.profile?.lastName}`}
                      />
                    </div>

                    <div
                      onClick={() =>
                        push(`/${product?.profile?.username}/shop`)
                      }
                      className="ml-4 cursor-pointer"
                    >
                      <p className="text-sm font-bold text-gray-900">
                        {product?.profile?.firstName ?? ""}{" "}
                        {product?.profile?.lastName ?? ""}
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-500">
                        {formateDMYHH(
                          product?.createdAt as Date,
                          locale as string
                        )}
                      </p>
                    </div>

                    <div className="ml-auto">
                      <p className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900">
                        {" "}
                        Private{" "}
                      </p>
                    </div>
                  </div>

                  {dataTableImages}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 lg:row-end-2 lg:row-span-2">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-2xl">
                {product?.title ?? ""}
              </h1>

              <div className="flex items-center mt-4">
                <p className="text-4xl font-bold text-gray-900">
                  {product?.priceDiscount ?? ""}
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {product?.currency?.symbol ?? ""}
                </p>
                {product?.enableDiscount ? (
                  <>
                    <p className="ml-3 text-2xl font-bold text-gray-500">
                      <del> {product?.price ?? ""} </del>
                    </p>
                    <p className="text-lg font-bold text-gray-500">
                      <del> {product?.currency?.symbol ?? ""} </del>
                    </p>
                  </>
                ) : null}
              </div>

              {product?.enableDiscount ? (
                <div className="flex items-center mt-3 text-sm font-medium text-gray-500">
                  <MdOutlineDiscount className="w-4 h-5 mr-2 text-gray-400" />
                  Save {product?.discount?.percent}% right now
                </div>
              ) : null}

              <h2 className="mt-4 text-base font-bold text-gray-900">
                Features
              </h2>
              <ul className="mt-4 space-y-3 text-base font-medium text-gray-600 list-disc list-inside">
                <li>Made with full cotton</li>
                <li>Slim fit for any body</li>
                <li>Quality control by JC</li>
              </ul>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-end p-1 space-x-40 border border-gray-100 rounded-md">
                    <Button shape="default" size="large" loading={false}>
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M18 12H6"
                        />
                      </svg>
                    </Button>

                    <span className="text-base font-semibold text-gray-900">
                      {" "}
                      1{" "}
                    </span>

                    <Button shape="default" size="large" loading={false}>
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-6 space-x-4">
                <ButtonInput
                  minW="fit"
                  shape="default"
                  type="button"
                  size="huge"
                  loading={false}
                  color={product?.profile?.color}
                >
                  Add to cart
                </ButtonInput>
              </div>

              <ul className="mt-8 space-y-3">
                <li className="flex items-center text-sm font-medium text-gray-500">
                  <svg
                    className="w-5 h-5 mr-2.5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Free shipping worldwide
                </li>

                <li className="flex items-center text-sm font-medium text-gray-500">
                  <svg
                    className="w-5 h-5 mr-2.5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  100% Secured Payment
                </li>

                <li className="flex items-center text-sm font-medium text-gray-500">
                  <svg
                    className="w-5 h-5 mr-2.5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Made by the Professionals
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h2 className="mb-2 text-base font-bold text-gray-900">
                Description
              </h2>

              <p className="text-base text-gray-600">
                <HtmlParser html={String(product?.description)} />
              </p>

              {/* <div className="border-b border-gray-200">
                <nav className="flex -mb-px space-x-8 sm:space-x-14">
                  <a
                    href="#"
                    title=""
                    className="py-4 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
                  >
                    {" "}
                    Description{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center py-4 text-sm font-medium text-gray-900 border-b-2 border-gray-900 whitespace-nowrap"
                  >
                    Reviews
                    <span className="block px-2 py-0.5 ml-2 text-xs font-bold bg-gray-400 rounded-full text-gray-50">
                      {" "}
                      157{" "}
                    </span>
                  </a>

                  <a
                    href="#"
                    title=""
                    className="py-4 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
                  >
                    {" "}
                    Support{" "}
                  </a>
                </nav>
              </div> */}

              {/* <div className="flow-root mt-8 sm:mt-12">
                <ul className="divide-y divide-gray-100 -my-9">
                  <li className="py-8">
                    <div className="flex items-start">
                      <img
                        className="flex-shrink-0 rounded-full w-11 h-11"
                        src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/avatar-1.png"
                        alt=""
                      />

                      <div className="ml-6">
                        <div className="flex items-center space-x-px">
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <p className="mt-5 text-base font-normal leading-7 text-gray-900">
                          You made it so simple. My new site is so much faster
                          and easier to work with than my old site. I just
                          choose the page, make the changes.
                        </p>
                        <p className="mt-5 text-sm font-bold text-gray-900">
                          Kristin Watson
                        </p>
                        <p className="mt-1 text-sm font-normal text-gray-500">
                          March 14, 2021
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="py-8">
                    <div className="flex items-start">
                      <img
                        className="flex-shrink-0 rounded-full w-11 h-11"
                        src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/avatar-2.png"
                        alt=""
                      />

                      <div className="ml-6">
                        <div className="flex items-center space-x-px">
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <p className="mt-5 text-base font-normal leading-7 text-gray-900">
                          You made it so simple. My new site is so much faster
                          and easier to work with than my old site. I just
                          choose the page, make the changes.
                        </p>
                        <p className="mt-5 text-sm font-bold text-gray-900">
                          Jenny Wilson
                        </p>
                        <p className="mt-1 text-sm font-normal text-gray-500">
                          January 28, 2021
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="py-8">
                    <div className="flex items-start">
                      <img
                        className="flex-shrink-0 rounded-full w-11 h-11"
                        src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/avatar-3.png"
                        alt=""
                      />

                      <div className="ml-6">
                        <div className="flex items-center space-x-px">
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-6 h-6 text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <p className="mt-5 text-base font-normal leading-7 text-gray-900">
                          You made it so simple. My new site is so much faster
                          and easier to work with than my old site. I just
                          choose the page, make the changes.
                        </p>
                        <p className="mt-5 text-sm font-bold text-gray-900">
                          Bessie Cooper
                        </p>
                        <p className="mt-1 text-sm font-normal text-gray-500">
                          January 11, 2021
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div> */}

              {/* <div className="mt-8 text-center lg:pl-16 sm:mt-12 lg:text-left">
                <button
                  type="button"
                  className="inline-flex items-center justify-center text-xs font-bold tracking-widest text-gray-400 uppercase transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  <svg
                    className="w-4 h-4 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Load more reviews
                </button>
              </div> */}
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
    fallback: true,
  };
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}.json`)).default,
      },
    },
  };
}
