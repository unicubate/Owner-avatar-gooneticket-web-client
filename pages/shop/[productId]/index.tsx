import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";
import { Carousel, Image, Input } from "antd";
import { HorizontalNavShop } from "@/components/shop/horizontal-nav-shop";
import { ButtonInput } from "@/components/templates/button-input";
import { CreateOrUpdateFormShop } from "@/components/shop/create-or-update-form-shop";
import { useRouter } from "next/router";
import { GetOneProductAPI } from "@/api/product";
import { GetUploadsProductsAPI } from "@/api/upload";
import { Alert, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "@/components/util/session/context-user";
import Layout from "@/components/layout";
import ListCarouselUpload from "@/components/shop/list-carousel-upload";
import { UploadModel } from "@/types/upload";
import { ButtonCancelInput } from "@/components/templates/button-cancel-input";

const contentStyle: React.CSSProperties = {
  height: "100%",
  width: "100%",
  lineHeight: "50px",
  textAlign: "center",
  background: "#364d79",
};

const ShopView = () => {
  const { query } = useRouter();
  const productSlug = String(query?.productId);

  const { data: dataProduct, isError: isErrorProduct } = GetOneProductAPI({
    productSlug,
  });
  const product: any = dataProduct?.data;

  const {
    status,
    error,
    isLoading: isLoadingImages,
    isError: isErrorImages,
    data: dataImages,
  } = GetUploadsProductsAPI({
    productId: product?.id,
    uploadType: 'image'
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

  return (
    <>
      <Layout title={`${product?.title ?? ""}`}>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          {/* <nav className="flex">
            <ol role="list" className="flex items-center space-x-0.5">
              <li>
                <div className="-m-1">
                  <a
                    href="#"
                    className="p-1 text-sm font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-gray-700"
                  >
                    {" "}
                    Home{" "}
                  </a>
                </div>
              </li>

              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <div className="-m-1">
                    <a
                      href="#"
                      className="p-1 ml-0.5 text-sm font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-gray-700"
                    >
                      {" "}
                      Products{" "}
                    </a>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <div className="-m-1">
                    <a
                      href="#"
                      className="p-1 ml-0.5 text-sm font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-gray-700"
                      aria-current="page"
                    >
                      {" "}
                      CarityUI{" "}
                    </a>
                  </div>
                </div>
              </li>
            </ol>
          </nav> */}

          <div className="grid grid-cols-1 mt-8 lg:grid-rows-1 gap-y-12 lg:mt-12 lg:grid-cols-5 lg:gap-y-16 lg:gap-x-12 xl:gap-x-16">
            {/* <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start"> */}
            {/* <div className="lg:order-2 lg:ml-5">
                  <div className="overflow-hidden border-2 border-transparent rounded-lg"> */}

            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="overflow-hidden border-2 border-transparent rounded-lg">
                  {dataTableImages}

                  {/* {dataUploads?.data?.length >= 0 && (
                    <>
                      <Carousel
                        autoplay
                        dots={true}
                        dotPosition={"top"}
                        pauseOnDotsHover={true}
                        pauseOnHover={true}
                        draggable
                      >
                        {dataUploads?.data?.map((item: any, index: number) => (
                          <div key={index}>
                            <Image
                              className="object-cover w-full h-full"
                              style={contentStyle}
                              src={item?.url}
                              //src={`${getOneFileUploadProductAPI(item?.path)}`}
                              alt=""
                            />
                          </div>
                        ))}
                      </Carousel>
                    </>
                  )} */}
                </div>
              </div>
            </div>
            {/* </div>
                </div> */}

            {/* <div className="w-full lg:w-32 mt-2.5 lg:mt-0 lg:flex-shrink-0 lg:order-1">
                  <div className="flex flex-row items-stretch lg:flex-col lg:space-y-5 space-x-2.5 lg:space-x-0"> */}
            {/* <button type="button" className="flex-1">
                      <div className="overflow-hidden border-2 border-gray-900 rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                        <img
                          className="object-cover w-full h-full"
                          src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-2.png"
                          alt=""
                        />
                      </div>
                    </button> */}

            {/* <button type="button" className="flex-1">
                      <div className="overflow-hidden border-2 border-transparent rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                        <img
                          className="object-cover w-full h-full"
                          src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-3.png"
                          alt=""
                        />
                      </div>
                    </button>

                    <button type="button" className="flex-1">
                      <div className="overflow-hidden border-2 border-transparent rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                        <img
                          className="object-cover w-full h-full"
                          src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-4.png"
                          alt=""
                        />
                      </div>
                    </button>

                    <button type="button" className="flex-1">
                      <div className="overflow-hidden border-2 border-transparent rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                        <img
                          className="object-cover w-full h-full"
                          src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-5.png"
                          alt=""
                        />
                      </div>
                    </button> */}
            {/* </div>
                </div> */}
            {/* </div>
            </div> */}

            <div className="lg:col-span-2 lg:row-end-2 lg:row-span-2">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {product?.title ?? ""}
              </h1>

              <div className="flex items-center mt-8">
                <p className="text-3xl font-bold text-gray-900">$49</p>
                <p className="ml-2 text-2xl font-bold text-gray-500">
                  <del> $99 </del>
                </p>
              </div>

              <div className="flex items-center mt-3 text-sm font-medium text-gray-500">
                <svg
                  className="w-4 h-4 mr-2.5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                Save 50% right now
              </div>

              <h2 className="mt-8 text-base font-bold text-gray-900">
                Features
              </h2>
              <ul className="mt-4 space-y-3 text-base font-medium text-gray-600 list-disc list-inside">
                <li>Made with full cotton</li>
                <li>Slim fit for any body</li>
                <li>Quality control by JC</li>
              </ul>

              <div className="flex items-center mt-10 space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-12 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                >
                  Add to cart
                </button>

                <button
                  type="button"
                  className="
                            inline-flex
                            items-center
                            justify-center
                            px-4
                            py-3.5
                            text-gray-900
                            transition-all
                            duration-200
                            bg-transparent
                            border-2 border-gray-300
                            rounded-md
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                            hover:border-gray-900 hover:bg-gray-100
                            focus:border-gray-900
                        "
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
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
              <div className="border-b border-gray-200">
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
              </div>

              <div className="flow-root mt-8 sm:mt-12">
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
              </div>

              <div className="mt-8 text-center lg:pl-16 sm:mt-12 lg:text-left">
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
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ShopView;
