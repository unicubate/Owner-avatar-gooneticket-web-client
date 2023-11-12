import { ButtonInput } from "@/components/ui/button-input";
import { useRouter } from "next/router";
import { GetOneProductAPI } from "@/api-site/product";
import { AlertDangerNotification, AlertSuccessNotification, formatePrice } from "@/utils";
import { HtmlParser } from "@/utils/html-parser";
import { LayoutSite } from "@/components/layout-site";
import { MdOutlineDiscount } from "react-icons/md";
import { LoadingFile } from "@/components/ui/loading-file";
import ReactPlayer from "react-player";
import { ImageGalleryShopList } from "@/components/shop/image-gallery-shop-list";
import ListComments from "@/components/comment/list-comments";
import { useAuth } from "@/components/util/context-user";
import { AvatarComponent } from "@/components/ui/avatar-component";
import { ListCarouselUpload } from "@/components/shop/list-carousel-upload";
import { GetOneUserPublicAPI } from "@/api-site/user";
import { CreateOrUpdateOneCartAPI, GetOneCartOrderAPI } from "@/api-site/cart";
import { CartOrderFooterCart } from "@/components/cart/cart-order-footer-cart";
import { ErrorFile } from "@/components/ui/error-file";
import { useState } from "react";
import { LoginModal } from "@/components/auth-modal/login-modal";
import { GetStaticPropsContext } from "next";

const contentStyle: React.CSSProperties = {
  height: "100%",
  width: "100%",
  lineHeight: "50px",
  textAlign: "center",
  background: "#364d79",
};

const ShopView = () => {
  const { userStorage: userVisitor } = useAuth() as any;
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { query } = useRouter();
  const productSlug = String(query?.productId);

  const {
    isError: isErrorProduct,
    isPending: isPendingProduct,
    data: product,
  } = GetOneProductAPI({
    productSlug,
  });

  const {
    isError: isErrorUser,
    isPending: isPendingUser,
    data: user,
  } = GetOneUserPublicAPI({
    username: product?.profile?.username,
    userVisitorId: userVisitor?.id,
  });

  const { data: cartOrder } = GetOneCartOrderAPI({
    organizationId: user?.organizationId,
  });

  const { mutateAsync: saveMutation } = CreateOrUpdateOneCartAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const addToCart = async (itemCard: any) => {
    try {
      if (userVisitor?.id) {
        await saveMutation({
          quantity: 1,
          productId: itemCard?.id,
          organizationId: itemCard?.organizationId,
        });
        AlertSuccessNotification({
          text: `Product add to cart successfully`,
          gravity: "top",
          className: "info",
          position: "center",
        });
      } else {
        setShowModal(true);
      }
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };


  const dataProduct =
    isPendingProduct || isPendingUser ? (
      <LoadingFile />
    ) : isErrorProduct || isErrorUser ? (
      <ErrorFile
        status="error"
        title="404"
        description="Error find data please try again"
      />
    ) : (
      <>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 mt-8 lg:grid-rows-1 gap-y-12 lg:mt-12 lg:grid-cols-5 lg:gap-y-16 lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="overflow-hidden border-2 border-transparent rounded-lg">
                  <div className="mb-2 flex items-center">
                    <AvatarComponent
                      size={40}
                      className="flex-shrink-0 bg-gray-300 rounded-full w-10 h-10"
                      profile={product?.profile}
                    />
                    <div
                      onClick={() =>
                        router.push(`/${product?.profile?.username}/shop`)
                      }
                      className="ml-2 cursor-pointer"
                    >
                      <p className="text-sm font-bold text-gray-900">
                        {product?.profile?.firstName ?? ""}{" "}
                        {product?.profile?.lastName ?? ""}
                      </p>
                    </div>

                    <div
                      onClick={() =>
                        router.push(`/${product?.profile?.username}/shop`)
                      }
                      className="ml-auto"
                    >
                      <p className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900 cursor-pointer">
                        {" "}
                        View shop
                      </p>
                    </div>
                  </div>

                  {product?.uploadsImage && product?.uploadsImage.length > 0 ? (
                    <ListCarouselUpload
                      uploads={product?.uploadsImage}
                      folder="products"
                      preview={false}
                      className={`object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110`}
                    />
                  ) : null}

                  {/* {product?.uploadsImage.length > 0 && (
                    <ImageGalleryShopList
                      uploads={product?.uploadsImage}
                      folder="products"
                      preview={false}
                    />
                  )} */}

                  {product?.urlMedia ? (
                    <div className="mt-2 mx-auto">
                      <ReactPlayer
                        className="mr-auto"
                        url={product?.urlMedia}
                        height="350px"
                        width="100%"
                        controls
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 lg:row-end-2 lg:row-span-2">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-2xl">
                {product?.title ?? ""}
              </h1>

              <div className="flex items-center mt-4">
                <p className="text-4xl font-bold text-gray-900">
                  {formatePrice({
                    value: Number(product?.priceDiscount ?? 0),
                    isDivide: false,
                  }) ?? ""}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {product?.currency?.symbol ?? ""}
                </p>
                {product?.enableDiscount ? (
                  <>
                    <p className="ml-3 text-2xl font-bold text-gray-500">
                      <del>
                        {" "}
                        {formatePrice({
                          value: Number(product?.price ?? 0),
                          isDivide: false,
                        }) ?? ""}{" "}
                      </del>
                    </p>
                    <p className="text-2xl font-bold text-gray-500">
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

              {/* <h2 className="mt-4 text-base font-bold text-gray-900">
                Features
              </h2>
              <ul className="mt-4 space-y-3 text-base font-medium text-gray-600 list-disc list-inside">
                <li>Made with full cotton</li>
                <li>Slim fit for any body</li>
                <li>Quality control by JC</li>
              </ul> */}

              {/* <div className="mt-6 space-y-5">
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
              </div> */}

              <div className="flex items-center mt-6 space-x-4">
                <ButtonInput
                  minW="fit"
                  shape="default"
                  type="button"
                  size="huge"
                  loading={false}
                  color={product?.profile?.color}
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  Add to cart
                </ButtonInput>
              </div>

              {/* <ul className="mt-8 space-y-3">
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
              </ul> */}

              <h2 className="mt-2 text-xl font-bold text-gray-900">
                Description
              </h2>

              <p className="mt-4 text-base text-gray-600">
                <HtmlParser html={String(product?.description)} />
              </p>
            </div>

            <div className="lg:col-span-3">
              {product?.id ? (
                <ListComments
                  model="PRODUCT"
                  modelIds={["PRODUCT"]}
                  productId={String(product?.id)}
                  take={10}
                  organizationId={userVisitor?.organizationId}
                  userVisitorId={userVisitor?.id}
                />
              ) : null}

              {/* <h2 className="mb-2 text-base font-bold text-gray-900">
                Description
              </h2>

              <p className="text-base text-gray-600">
                <HtmlParser html={String(product?.description)} />
              </p> */}

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

        {user?.id && cartOrder?.id ? (
          <CartOrderFooterCart user={user} cartOrder={cartOrder} />
        ) : null}
        
        <LoginModal showModal={showModal} setShowModal={setShowModal} />
      </>
    );

  return (
    <>
      <LayoutSite title={`${product?.title ?? ""}`}>{dataProduct}</LayoutSite>
    </>
  );
};

export default ShopView;