import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";
import { Image, Input, Spin } from "antd";
import { HorizontalNavShop } from "@/components/shop/horizontal-nav-shop";
import { ButtonInput } from "@/components/templates/button-input";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/util/session/context-user";
import { useInView } from "react-intersection-observer";
import { GetInfiniteProductsAPI } from "@/api/product";
import { EmptyData } from "@/components/templates/empty-data";
import ListProductsShop from "@/components/shop/list-products-shop";

const Shops = () => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { userStorage } = useAuth() as any;
  const [openModal, setOpenModal] = useState(false);

  const {
    isLoading: isLoadingGallery,
    isError: isErrorGallery,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteProductsAPI({
    userId: userStorage?.id,
    take: 6,
    sort: "DESC",
    queryKey: ["products", "infinite"],
  });

  useEffect(() => {
    let fetching = false;
    if (inView) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  const dataTableProducts = isLoadingGallery ? (
    <Spin
      tip="Loading"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      size="large"
    >
      <div className="content" />
    </Spin>
  ) : isErrorGallery ? (
    <strong>Error find data please try again...</strong>
  ) : dataGallery?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      title="Add your first listing to get started"
      description={`Your listing will appear on your page and be available for supporters to book. You can edit them anytime.`}
    />
  ) : (
    dataGallery.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListProductsShop item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Shop"}>
        <div className="flex-1">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              {/* <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">Shops</h1>
                  <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
                    Sell digital or physical items with a Un-Pot Shop!
                  </p>
                </div>
              </div> */}

              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <HorizontalNavShop />

                <div className="mt-8 px-3 py-2 border-gray-200 border bg-white rounded-lg">
                  <div className="px-2 py-3 sm:p-2">
                    <div className="md:flex md:items-center md:justify-between">

                      <div className="flex-1 max-w-xs mt-4 md:mt-0">
                        <p className="text-base font-bold text-gray-600">
                          Shop Open
                        </p>
                        {/* <p className="mt-1 text-sm font-medium text-gray-500">Shop are currently active. Your fans can request them from your page.</p> */}
                        <p className="mt-1 text-sm font-medium text-gray-500">Your shop are currently private and are not available for booking.</p>

                      </div>

                      <div className="flex items-center justify-start mt-6 space-x-6 md:ml-auto md:justify-end md:mt-0 md:space-x-reverse">
                        <ButtonInput
                          // onClick={() =>
                          //   router.push(`${`/commissions/create`}`)
                          // }
                          shape="default"
                          type="button"
                          size="large"
                          loading={false}
                          color={"indigo"}
                        >
                          Open
                        </ButtonInput>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 px-8 mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0">
                  <div className="overflow-hidden bg-white border border-gray-200 rounded-lg cursor-pointer">
                    <div className="p-4">
                      <div className="flex items-center">
                        <img
                          className="object-cover w-16 h-16 rounded-full shrink-0"
                          src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/team/7/member-1.png"
                          alt=""
                        />
                        <div className="flex-1 ml-4">
                          <p className="text-base font-bold text-gray-900">
                            Albert Flores
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden bg-white border border-gray-200 rounded-lg cursor-pointer">
                    <div className="p-4">
                      <div className="flex items-center">
                        <img
                          className="object-cover w-16 h-16 rounded-full shrink-0"
                          src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/team/7/member-2.png"
                          alt=""
                        />
                        <div className="flex-1 ml-4">
                          <p className="text-base font-bold text-gray-900">
                            Ralph Edwards
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                    <div className="p-4">
                      <div className="flex items-center">
                        <img
                          className="object-cover w-16 h-16 rounded-full shrink-0"
                          src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/team/7/member-3.png"
                          alt=""
                        />
                        <div className="flex-1 ml-4">
                          <p className="text-base font-bold text-gray-900">
                            Theresa Webb
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                    <div className="p-4">
                      <div className="flex items-center">
                        <img
                          className="object-cover w-16 h-16 rounded-full shrink-0"
                          src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/team/7/member-4.png"
                          alt=""
                        />
                        <div className="flex-1 ml-4">
                          <p className="text-base font-bold text-gray-900">
                            Jane Cooper
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flow-root">
                  <div className="mt-8 overflow-hidden bg-white border border-gray-200">
                    <div className="px-4 py-8">
                      {/* <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="mt-4 sm:mt-0">
                          <ButtonInput
                            onClick={() => router.push(`${`/shop/create`}`)}
                            shape="default"
                            type="button"
                            size="large"
                            loading={false}
                            color={"indigo"}
                          >
                            Create Product
                          </ButtonInput>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <Input placeholder="Search product" />
                        </div>
                      </div> */}

                      <div className="divide-y divide-gray-200">
                        {dataTableProducts}
                      </div>
                    </div>
                  </div>

                  {hasNextPage && (
                    <div className="mt-4 text-center justify-center mx-auto">
                      <div className="mt-4 sm:mt-0">
                        <ButtonInput
                          ref={ref}
                          onClick={() => fetchNextPage()}
                          shape="default"
                          type="button"
                          size="large"
                          loading={isFetchingNextPage ? true : false}
                          color={"indigo"}
                          minW="fit"
                        >
                          Load More
                        </ButtonInput>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Shops);
